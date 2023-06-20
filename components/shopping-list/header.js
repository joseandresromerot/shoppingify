import classes from './header.module.css';
import Image from 'next/image';
import bottleImg from '../../public/source.svg';
import RoundedButton from '../ui/button/rounded-button';

const ShoppingListHeader = ({ onAddClick }) => {
  return (
    <div className={classes.header}>
      <div className={classes.imageContainer}>
        <Image src={bottleImg} className={classes.image} fill alt="Add new item" />
      </div>
      <div className={classes.buttonContainer}>
        <div className={classes.hint}>{"Didn't find what you need?"}</div>
        <RoundedButton className={classes.add} onClick={onAddClick}>Add item</RoundedButton>
      </div>
    </div>
  );
};

ShoppingListHeader.defaultProps = {
  onAddClick: () => {}
};

export default ShoppingListHeader;