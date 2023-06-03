import classes from './title-bar.module.css';
import IconButton from '../ui/button/icon-button';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const ShoppingListTitleBar = () => {
  return (
    <div className={classes.titleContainer}>
      <h3 className={classes.title}>Shopping list</h3>
      <IconButton icon={faPen} fontSize={17} className={classes.edit} />
    </div>
  );
}

export default ShoppingListTitleBar;