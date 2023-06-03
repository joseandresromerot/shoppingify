import classes from './items.module.css';
import ShoppingListCategory from './category';
import { groupBy } from '@/lib/utils';

const ShoppingListItems = ({ items }) => {
  const itemsByCategory = groupBy(items, "category");
  const categories = Object.keys(itemsByCategory);

  return (
    <div className={classes.list}>
      {categories.map(c => (
        <ShoppingListCategory
          key={`cat-${c}`}
          name={c}
          items={itemsByCategory[c]}
        />
      ))}
    </div>
  );
}

export default ShoppingListItems;