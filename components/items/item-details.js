import classes from './item-details.module.css';
import IconButton from '../ui/button/icon-button';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { showMessage, hideMessage, showLoading } from '@/store/actions/messages';
import { setItemId, setAppMode, setActiveShoppingList, setShoppingListDirty, setItems } from '@/store/actions/items';
import { APP_MODES } from '@/store/reducers/itemsReducer';
import TransparentButton from '../ui/button/transparent-button';
import RoundedButton from '../ui/button/rounded-button';

const deleteItem = async (itemId) => {
  const response = await fetch(`/api/items/${itemId}`, {
    method: "DELETE"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Errooooor!");
  }

  return data;
};

const ItemDetails = () => {
  const [itemData, setItemData] = useState(null);
  const dispatch = useDispatch();
  const{ itemId, activeShoppingList } = useSelector(state => state.itemsData);

  useEffect(() => {
    const fetchItem = async (itemId) => {
      const response = await fetch(`/api/items/${itemId}`, {
        method: "GET"
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "Errooooor!");
      }
    
      return data;
    };

    if (itemId) {
      fetchItem(itemId)
        .then(result => {
          if (result.success === true) {
            setItemData(result.item);
          } else {
            dispatch(showMessage(
              result.message,
              "Ok",
              () => {
                dispatch(hideMessage());
              },
              null,
              null
            ));
          }
        })
        .catch(err => {
          console.info('err', err);
          dispatch(showMessage(
            err,
            "Ok",
            () => {
              dispatch(hideMessage());
            },
            null,
            null
          ));
        });
    } else {
      setItemData(null);
    }
  }, [itemId]);

  const handleBackClick = () => {
    dispatch(setItemId(null));
    dispatch(setAppMode(APP_MODES.EDIT_SHOPPING_LIST));
  };

  const handleAddToListClick = () => {
    const shoppingList = {
      ...activeShoppingList,
      items: [
        ...activeShoppingList.items
      ]
    };

    const indexExisting = shoppingList.items.findIndex(i => i.id === itemData.id);

    if (indexExisting !== -1) {
      shoppingList.items[indexExisting] = {
        ...shoppingList.items[indexExisting],
        amount: shoppingList.items[indexExisting].amount + 1
      };
    } else {
      const { id, name, category } = itemData;
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
    dispatch(setAppMode(APP_MODES.EDIT_SHOPPING_LIST));
  };

  const handleDeleteClick = () => {
    dispatch(showMessage(
      "Are you sure that you want to delete this item?",
      "Yes",
      async () => {
        dispatch(showLoading());

        const shoppingList = {
          ...activeShoppingList,
          items: [
            ...activeShoppingList.items
          ]
        };
    
        const indexToRemove = shoppingList.items.findIndex(i => i.id === itemData.id);

        shoppingList.items.splice(indexToRemove, 1);

        const result = await deleteItem(itemData.id);
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
          dispatch(setItems(result.items));
          dispatch(setActiveShoppingList(shoppingList));
          if (indexToRemove > -1) {
            dispatch(setShoppingListDirty(true));
          }
          dispatch(setAppMode(APP_MODES.EDIT_SHOPPING_LIST));
          dispatch(showMessage(
            "Item deleted successfully",
            "Ok",
            () => {
              dispatch(hideMessage());
            },
            null,
            null
          ));
        }
      },
      "No",
      () => {
        dispatch(hideMessage());
      }
    ));
  };

  return (
    <div className={classes.container}>
      <div className={classes.backContainer}>
        <IconButton icon={faLeftLong} fontSize={14} label="back" className={classes.back} onClick={handleBackClick} />
      </div>

      {itemData && (
        <div className={classes.data}>
          <div className={classes.imageContainer} style={{ backgroundImage: `url(${itemData.image_url})`}} />
          <span className={classes.label}>name</span>
          <span className={classes.itemName}>{itemData.name}</span>
          <span className={classes.label}>category</span>
          <span className={classes.text}>{itemData.category}</span>
          <span className={classes.label}>note</span>
          <span className={classes.text}>{itemData.note}</span>
          <div className={classes.fieldContainer}>
            <TransparentButton className={classes.delete} onClick={handleDeleteClick}>delete</TransparentButton>
            <RoundedButton className={classes.add} onClick={handleAddToListClick}>Add to list</RoundedButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;