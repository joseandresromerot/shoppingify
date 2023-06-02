import { useEffect } from "react";
import RootLayout from "@/components/layout";
import { getSession } from "next-auth/react";
import { redirectUnauthenticated } from "@/lib/auth";
import classes from './index.module.css';
import ShadowTextfield from "@/components/ui/field/shadow-textfield";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Category from "@/components/items/category";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "@/store/actions/items";

const groupBy = (list, property) => {
  return list.reduce((groups, item) => {
    const group = (groups[item[property]] || []);
    group.push(item);
    groups[item[property]] = group;
    return groups;
  }, {});
}

const ItemsPage = () => {
  const dispatch = useDispatch();
  const itemsData = useSelector((state) => state.itemsData);
  const { items } = itemsData;
  const itemsByCategory = groupBy(items, "category");
  const categories = Object.keys(itemsByCategory);

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch('/api/items', {
        method: "GET"
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Errooooor!");
      }
    
      return data;
    };

    getItems()
      .then(data => {
        dispatch(setItems(data.items));
      })
      .catch(err => {
        console.info('err', err);
      })
  }, []);

  return (
    <RootLayout>
      <div className={classes.mainContainer}>
        <div className={classes.header}>
          <div className={classes.title}>
            <span className={classes.shoppingify}>Shoppingify </span><span>allows you take your shopping list wherever you go</span>
          </div>
          <ShadowTextfield
            containerClassName={classes.search}
            icon={faMagnifyingGlass}
            iconSize={17}
            placeholder="search item"
          />
        </div>
        {categories.map(c => (
          <Category
              key={`cat-${c}`}
              name={c}
              items={itemsByCategory[c]}
          />
        ))}
      </div>
    </RootLayout>
  );
};

export async function getServerSideProps(context) {
  const result = await redirectUnauthenticated(getSession, context);
  return result;
}

export default ItemsPage;