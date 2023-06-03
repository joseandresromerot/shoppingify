import classes from './item.module.css';
import AmountField from './amount-field';

const ShoppingListItem = ({ id, name, checked, amount, onItemClick }) => {
  const handleClick = () => {
    onItemClick(id);
  };

  return (
    <div className={classes.itemContainer}>
      <div className={classes.itemName}>{name}</div>
      <AmountField value={amount} onClick={handleClick}/>
    </div>
  );
}

ShoppingListItem.defaultProps = {
  onItemClick: () => {}
};

export default ShoppingListItem;