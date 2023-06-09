import { useEffect, useMemo, useState } from "react";
import RootLayout from "@/components/layout";
import { getSession } from "next-auth/react";
import { redirectUnauthenticated } from "@/lib/auth";
import classes from './index.module.css';
import ShadowTextfield from "@/components/ui/field/shadow-textfield";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Category from "@/components/items/category";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setActiveShoppingList, setAppMode } from "@/store/actions/items";
import { groupBy } from "@/lib/utils";
import { APP_MODES } from "@/store/reducers/itemsReducer";
import debounce from "lodash/debounce";

const getItemsByKeyword = async (keyword) => {
  const response = await fetch(`/api/items/search?keyword=${keyword}`, {
    method: "GET"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Errooooor!");
  }

  return data;
};

const ItemsPage = () => {
  const dispatch = useDispatch();
  const itemsData = useSelector((state) => state.itemsData);
  const { items } = itemsData;
  const itemsByCategory = groupBy(items, "category");
  const categories = Object.keys(itemsByCategory);
  const [keyword, setKeyword] = useState("");

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

    const getActiveShoppingList = async () => {
      const response = await fetch('/api/shopping-list/active', {
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
      });

    getActiveShoppingList()
      .then(data => {
        dispatch(setActiveShoppingList(data.shoppingList));
        if (!data.shoppingList.id) {
          dispatch(setAppMode(APP_MODES.EDIT_SHOPPING_LIST));
        }
      })
      .catch(error => {
        console.info('err', error);
      });
  }, []);

  const eventHandler = (newKeyword) => {
    getItemsByKeyword(newKeyword)
      .then(data => {
        dispatch(setItems(data.items));
      })
      .catch(err => {
        console.info('err', err);
      });
  };

  const debouncedEventHandler = useMemo(() => debounce(eventHandler, 500), []);

  const handleKeywordChange = (e) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    debouncedEventHandler(newKeyword);
  };

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
            value={keyword}
            onChange={handleKeywordChange}
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