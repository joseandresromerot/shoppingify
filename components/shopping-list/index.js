import classes from './index.module.css';
import ShoppingListHeader from './header';
import ShoppingListTitleBar from './title-bar';
import ShoppingListItems from './items';
import ShoppingListSaveBar from './save-bar';
import ShoppingListCompleteBar from './complete-bar';
import { useDispatch, useSelector } from 'react-redux';
import { APP_MODES } from '@/store/reducers/itemsReducer';
import NoItems from './no-items';
import { setAppMode } from '@/store/actions/items';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const { activeShoppingList, appMode } = useSelector((state) => state.itemsData);
  const items = activeShoppingList?.items || [];

  const handleAddNewItemClick = () => {
    dispatch(setAppMode(APP_MODES.ADD_NEW_ITEM));
  };

  return (
    <div className={classes.container}>
      <ShoppingListHeader onAddClick={handleAddNewItemClick} />
      <ShoppingListTitleBar />
      {items.length === 0 ? (
        <NoItems />
      ) : (
        <ShoppingListItems items={items} />
      )}
      
      {appMode === APP_MODES.EDIT_SHOPPING_LIST ? (
        <ShoppingListSaveBar />
      ) : (
        <ShoppingListCompleteBar />
      )}
    </div>
  );
};

export default ShoppingList;