import classes from './item.module.css';
import AmountField from './amount-field';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveShoppingList } from '@/store/actions/items';
import Checkbox from '../ui/field/checkbox';
import { APP_MODES } from '@/store/reducers/itemsReducer';

const ShoppingListItem = ({ id, name, checked, amount, editing, onItemClick }) => {
  const dispatch = useDispatch();
  const { activeShoppingList, appMode } = useSelector((state) => state.itemsData);

  const handleEditingChange = (newEditing) => {
    const shoppingList = {
      ...activeShoppingList,
      items: [
        ...activeShoppingList.items
      ]
    };

    const index = shoppingList.items.findIndex(i => i.id === id);

    shoppingList.items[index] = {
      ...shoppingList.items[index],
      editing: newEditing
    };

    dispatch(setActiveShoppingList(shoppingList));
  };

  const handleValueChange = (value) => {
    const shoppingList = {
      ...activeShoppingList,
      items: [
        ...activeShoppingList.items
      ]
    };

    const index = shoppingList.items.findIndex(i => i.id === id);
    shoppingList.items[index] = {
      ...shoppingList.items[index],
      amount: value
    };

    dispatch(setActiveShoppingList(shoppingList));
  };

  const handleCheckedChange = (value) => {
    const shoppingList = {
      ...activeShoppingList,
      items: [
        ...activeShoppingList.items
      ]
    };

    const index = shoppingList.items.findIndex(i => i.id === id);
    shoppingList.items[index] = {
      ...shoppingList.items[index],
      checked: value
    };

    dispatch(setActiveShoppingList(shoppingList));
  };


  const handleItemRemove = () => {
    const shoppingList = {
      ...activeShoppingList,
      items: [
        ...activeShoppingList.items
      ]
    };

    const indexToRemove = shoppingList.items.findIndex(i => i.id === id);
    shoppingList.items.splice(indexToRemove, 1);
    dispatch(setActiveShoppingList(shoppingList));
  };

  return (
    <div className={classes.itemContainer}>
      {appMode === APP_MODES.VIEW_SHOPPING_LIST &&
        <Checkbox
          value={checked}
          onValueChange={handleCheckedChange}
          className={classes.check}
          size={20}
        />
      }
      <div className={classes.itemName}>{name}</div>
      <AmountField
        value={amount}
        onValueChange={handleValueChange}
        editing={editing}
        onEditingChange={handleEditingChange}
        onRemove={handleItemRemove}
        disabled={appMode === APP_MODES.VIEW_SHOPPING_LIST}
      />
    </div>
  );
}

ShoppingListItem.defaultProps = {
  onItemClick: () => {}
};

export default ShoppingListItem;