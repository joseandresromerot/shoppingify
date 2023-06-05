import classes from './complete-bar.module.css';
import TransparentButton from '../ui/button/transparent-button';
import RoundedButton from '../ui/button/rounded-button';

const ShoppingListCompleteBar = () => {
  return (
    <div className={classes.fieldContainer}>
      <TransparentButton className={classes.cancel}>cancel</TransparentButton>
      <RoundedButton className={classes.complete}>Complete</RoundedButton>
    </div>
  );
}

export default ShoppingListCompleteBar;