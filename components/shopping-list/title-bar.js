import classes from './title-bar.module.css';
import IconButton from '../ui/button/icon-button';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setAppMode, setActiveShoppingList } from '@/store/actions/items';
import { APP_MODES } from '@/store/reducers/itemsReducer';

const ShoppingListTitleBar = () => {
  const dispatch = useDispatch();
  const { appMode, activeShoppingList } = useSelector((state) => state.itemsData);

  const handleEditToggle = () => {
    let newAppMode = APP_MODES.EDIT_SHOPPING_LIST;
    if (appMode === newAppMode) {
      newAppMode = APP_MODES.VIEW_SHOPPING_LIST;
      const shoppingList = {
        ...activeShoppingList
      }

      shoppingList.items = shoppingList.items.map(i => ({
        ...i,
        editing: false
      }));

      dispatch(setActiveShoppingList(shoppingList));
    }
    dispatch(setAppMode(newAppMode));
  };

  return (
    <div className={classes.titleContainer}>
      <h3 className={classes.title}>Shopping list</h3>
      <IconButton
        icon={faPen}
        fontSize={17}
        className={classes.edit}
        onClick={handleEditToggle}
        style={{ color: appMode === APP_MODES.VIEW_SHOPPING_LIST ? "#34333A" : "#F9A109"}}
      />
    </div>
  );
}

export default ShoppingListTitleBar;