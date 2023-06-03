import classes from './category.module.css';
import ShoppingListItem from './item';

const ShoppingListCategory = ({ name, items, onItemClick }) => {
  return (
    <div className={classes.category}>
      <div className={classes.categoryName}>{name}</div>
      {items.map(i => (
        <ShoppingListItem
          key={i.id}
          name={i.name}
          checked={i.checked}
          amount={i.amount}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
}

export default ShoppingListCategory;