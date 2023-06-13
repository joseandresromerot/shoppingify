import { useEffect, useState } from 'react';
import classes from './list-details.module.css';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import RootLayout from '@/components/layout';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@/components/ui/button/icon-button';
import { format, parse } from 'date-fns';
import { groupBy } from '@/lib/utils';
import Category from "@/components/items/category";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

const ListDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const [shoppingList, setShoppingList] = useState(null);

  useEffect(() => {
    if (id) {
      const getShoppingList = async (shoppingListId) => {
        const response = await fetch(`/api/shopping-list/${shoppingListId}`, {
          method: "GET"
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Errooooor!");
        }

        return data;
      };

      getShoppingList(id)
        .then(data => {
          if (data.success === true) {
            setShoppingList(data.shoppingList);
          } else {
            console.info('err', data.message);
          }
          
        })
        .catch(err => {
          console.info('err', err);
        });
    }
  }, [id]);

  const handleBackClick = () => {
    router.back();
  };

  if (!shoppingList) {
    return null;
  }

  const { name, finished_on_text, items } = shoppingList;
  const groupedItems = groupBy(items, "category");
  const categories = Object.keys(groupedItems);

  return (
    <RootLayout>
      <div className={classes.mainContainer}>
        <div className={classes.backContainer}>
          <IconButton icon={faLeftLong} fontSize={14} label="back" className={classes.back} onClick={handleBackClick} />
        </div>
        <h2 className={classes.title}>{name}</h2>
        <div className={classes.dateContainer}>
          <FontAwesomeIcon
            icon={faCalendar}
            className={classes.dateIcon}
          />
          <h4 className={classes.date}>{format(parse(finished_on_text, "yyyy-MM-dd", new Date()), "EEE dd.MM.yyyy")}</h4>
        </div>
        
        {categories.map(c => (
          <Category
              key={`cat-${c}`}
              name={c}
              items={groupedItems[c]}
              readMode
          />
        ))}
      </div>
    </RootLayout>
    
  );
};

export default ListDetails;