import classes from './category.module.css';
import Item from './item';

const Category = ({ name, items }) => {
  return (
    <div className={classes.category}>
      <div className={classes.categoryTitle}>{name}</div>
      <div className={classes.itemsContainer}>
        {items.map(i => (
          <Item key={i.id} name={i.name} />
        ))}
      </div>
    </div>
  );
}

export default Category;