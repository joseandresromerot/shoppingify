import classes from './save-bar.module.css';
import RoundedButton from '../ui/button/rounded-button';
import OutlinedTextfield from '../ui/field/outlined-textfield';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const ShoppingListSaveBar = () => {
  return (
    <div className={classes.fieldContainer}>
        <OutlinedTextfield containerClassName={classes.fieldWrapper} className={`${classes.field} ${quicksand.className}`} placeholder="Enter a name" />
        <RoundedButton className={classes.save}>Save</RoundedButton>
      </div>
  );
}

export default ShoppingListSaveBar;