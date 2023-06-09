import classes from './item.module.css';
import AmountField from './amount-field';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveShoppingList, setShoppingListDirty } from '@/store/actions/items';
import Checkbox from '../ui/field/checkbox';
import { APP_MODES } from '@/store/reducers/itemsReducer';
import { showLoading, hideMessage, showMessage } from '@/store/actions/messages';

async function updateChecked(shoppingListId, itemId, checked) {
  const response = await fetch('/api/shopping-list/updatechecked', {
    method: "POST",
    body: JSON.stringify({shoppingListId, itemId, checked}),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Errooooor!");
  }

  return data;
}

const ShoppingListItem = ({ id, name, checked, amount, editing }) => {
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
    dispatch(setShoppingListDirty(true));
  };

  const handleCheckedChange = async (value) => {
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

    dispatch(showLoading());
    const result = await updateChecked(shoppingList.id, id, value);
    dispatch(hideMessage());

    if (result.success === false) {
      dispatch(showMessage(
        result.message,
        "Ok",
        () => {
          dispatch(hideMessage());
        },
        null,
        null
      ));
    } else {
      dispatch(setActiveShoppingList(shoppingList));
    }
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
    dispatch(setShoppingListDirty(true));
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
      <div className={`${classes.itemName} ${checked === true ? classes.crossWord : ""}`}>{name}</div>
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

export default ShoppingListItem;