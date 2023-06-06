import classes from './complete-bar.module.css';
import TransparentButton from '../ui/button/transparent-button';
import RoundedButton from '../ui/button/rounded-button';
import { useDispatch, useSelector } from 'react-redux';
import { setAppMode, setActiveShoppingList  } from '@/store/actions/items';
import { APP_MODES, SHOPPING_LIST_STATES } from '@/store/reducers/itemsReducer';
import { showMessage, hideMessage, showLoading } from '@/store/actions/messages';

async function updateState(shoppingListId, state) {
  const response = await fetch('/api/shopping-list/updatestate', {
    method: "POST",
    body: JSON.stringify({shoppingListId, state}),
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

const ShoppingListCompleteBar = () => {
  const dispatch = useDispatch();
  const { activeShoppingList } = useSelector((state) => state.itemsData);

  const handleStateClick = async (state) => {
    dispatch(showLoading());
    const result = await updateState(activeShoppingList.id, state);
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
      dispatch(setActiveShoppingList({ items: [] }));
      dispatch(setAppMode(APP_MODES.EDIT_SHOPPING_LIST));
    }
  };

  return (
    <div className={classes.fieldContainer}>
      <TransparentButton className={classes.cancel} onClick={() => handleStateClick(SHOPPING_LIST_STATES.CANCELLED)}>cancel</TransparentButton>
      <RoundedButton className={classes.complete} onClick={() => handleStateClick(SHOPPING_LIST_STATES.COMPLETED)}>Complete</RoundedButton>
    </div>
  );
}

export default ShoppingListCompleteBar;