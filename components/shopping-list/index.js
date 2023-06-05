import classes from './index.module.css';
import { useEffect } from 'react';
import ShoppingListHeader from './header';
import ShoppingListTitleBar from './title-bar';
import ShoppingListItems from './items';
import ShoppingListSaveBar from './save-bar';
import ShoppingListCompleteBar from './complete-bar';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveShoppingList } from '@/store/actions/items';
import { APP_MODES } from '@/store/reducers/itemsReducer';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const { activeShoppingList, appMode } = useSelector((state) => state.itemsData);
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
      {appMode === APP_MODES.EDIT_SHOPPING_LIST ? (
        <ShoppingListSaveBar />
      ) : (
        <ShoppingListCompleteBar />
      )}
    </div>
  );
};

export default ShoppingList;