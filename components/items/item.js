import IconButton from "../ui/button/icon-button";
import classes from './item.module.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setActiveShoppingList, setAppMode, setShoppingListDirty, setItemId, setSidebarVisible } from "@/store/actions/items";
import { APP_MODES } from "@/store/reducers/itemsReducer";
import { showMessage, hideMessage } from "@/store/actions/messages";

const Item = ({ id, name, category, readMode, value }) => {
  const dispatch = useDispatch();
  const { activeShoppingList, appMode } = useSelector((state) => state.itemsData);

  const handleClick = () => {
    if (appMode === APP_MODES.EDIT_SHOPPING_LIST) {
      const shoppingList = {
        ...activeShoppingList,
        items: [
          ...activeShoppingList.items
        ]
      };

      const indexExisting = shoppingList.items.findIndex(i => i.id === id);

      if (indexExisting !== -1) {
        shoppingList.items[indexExisting] = {
          ...shoppingList.items[indexExisting],
          amount: shoppingList.items[indexExisting].amount + 1
        };
      } else {
        shoppingList.items.push({
          id,
          name,
          category,
          editing: false,
          checked: false,
          amount: 1
        });
      }

      dispatch(setActiveShoppingList(shoppingList));
      dispatch(setShoppingListDirty(true));
    } else {
      dispatch(showMessage(
        "Shopping list is not in edit mode",
        "Ok",
        () => {
          dispatch(hideMessage());
        },
        null,
        null
      ));
    }
  };

  const handleNameClick = async () => {
    if (!readMode) {
      dispatch(setItemId(id));
      dispatch(setAppMode(APP_MODES.VIEW_ITEM));
      dispatch(setSidebarVisible(true));
    }
  };

  return (
    <div className={classes.item}>
      <div className={classes.nameContainer} onClick={handleNameClick}>
        <span className={classes.itemName}>{name}</span>
      </div>
      {readMode ? (
        <button className={`${classes.amount} ${readMode ? classes.noBorder : ""}`}>
          <span className={classes.amountText}>{value} pcs</span>
        </button>
      ) : (
        <IconButton className={classes.plus} icon={faPlus} fontSize={18} onClick={handleClick} />
      )}
    </div>
  );
}

Item.defaultProps = {
  readMode: false,
  value: 0
};

export default Item;