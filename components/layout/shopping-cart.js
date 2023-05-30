import classes from './shopping-cart.module.css';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShoppingCart = ({ badgeNumber }) => {
  return (
    <div className={classes.container}>
      <div className={classes.circularButton}>
        <FontAwesomeIcon 
          icon={faCartShopping}
          style={{ fontSize: 20, margin: "auto", color: "#fff" }}
        />
      </div>
      {badgeNumber &&
        <div className={classes.badge}>{badgeNumber}</div>
      }
    </div>
  );
}

export default ShoppingCart;