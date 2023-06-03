import classes from './index.module.css';
import { useEffect } from 'react';
import ShoppingListHeader from './header';
import ShoppingListTitleBar from './title-bar';
import ShoppingListItems from './items';
import ShoppingListSaveBar from './save-bar';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveShoppingList } from '@/store/actions/items';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const { activeShoppingList } = useSelector((state) => state.itemsData);
  const items = activeShoppingList?.items || [];

  useEffect(() => {
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

    getActiveShoppingList()
      .then(data => {
        dispatch(setActiveShoppingList(data.shoppingList));
      })
      .catch(err => {
        console.info('err', err);
      });
  }, []);

  return (
    <div className={classes.container}>
      <ShoppingListHeader />
      <ShoppingListTitleBar />
      <ShoppingListItems items={items} />
      <ShoppingListSaveBar />
    </div>
  );
};

export default ShoppingList;