import classes from './category.module.css';
import Item from './item';

const Category = ({ name, items, readMode }) => {
  return (
    <div className={classes.category}>
      <div className={classes.categoryTitle}>{name}</div>
      <div className={classes.itemsContainer}>
        {items.map(i => (
          <Item key={i.id} id={i.id} name={i.name} category={i.category} readMode={readMode} value={i.amount} />
        ))}
      </div>
    </div>
  );
};

Category.defaultProps = {
  readMode: false
}

export default Category;