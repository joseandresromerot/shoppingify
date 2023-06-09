import classes from './save-bar.module.css';
import { useState } from 'react';
import RoundedButton from '../ui/button/rounded-button';
import OutlinedTextfield from '../ui/field/outlined-textfield';
import { Quicksand } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import { setShoppingListDirty, setActiveShoppingList, setAppMode } from '@/store/actions/items';
import { showMessage, hideMessage, showLoading } from '@/store/actions/messages';
import { APP_MODES } from '@/store/reducers/itemsReducer';

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

async function saveShoppingList(shoppingList) {
  const response = await fetch('/api/shopping-list', {
    method: "POST",
    body: JSON.stringify({activeShoppingList: shoppingList}),
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

const ShoppingListSaveBar = () => {
  const { activeShoppingList } = useSelector((state) => state.itemsData);
  const shoppingListName = activeShoppingList?.name || "";
  const shoppingListItems = activeShoppingList?.items || [];
  const [name, setName] = useState(shoppingListName);
  const dispatch = useDispatch();

  const handleSaveClick = async () => {
    if (name.trim() === "") {
      dispatch(showMessage(
        "Enter a valid name for the current shopping list",
        "Ok",
        () => {
          dispatch(hideMessage());
        },
        null,
        null
      ));

      return;
    }

    const shoppingList = {
      ...activeShoppingList,
      name
    };

    // Call the api for updating shopping list and return shopping list fetched again
    dispatch(showLoading());
    const result = await saveShoppingList(shoppingList);
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
      // Set active shopping list
      dispatch(setActiveShoppingList(result.shoppingList));

      // Switch list mode to complete mode
      dispatch((setAppMode(APP_MODES.VIEW_SHOPPING_LIST)));

      // Set dirty to false
      dispatch(setShoppingListDirty(false));

      dispatch(showMessage(
        "Shopping list saved successfully",
        "Ok",
        () => {
          dispatch(hideMessage());
        },
        null,
        null
      ));
    }
  };

  return (
    <div className={classes.fieldContainer}>
      <OutlinedTextfield
        containerClassName={classes.fieldWrapper}
        className={`${classes.field} ${quicksand.className}`}
        placeholder="Enter a name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={shoppingListItems.length === 0}
        disabledClassName={classes.fieldDisabled}
      />
      <RoundedButton
        className={classes.save}
        onClick={handleSaveClick}
        disabled={shoppingListItems.length === 0}
      >
        Save
      </RoundedButton>
    </div>
  );
}

export default ShoppingListSaveBar;