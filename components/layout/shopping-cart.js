import { setSidebarVisible } from '@/store/actions/items';
import classes from './shopping-cart.module.css';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

const ShoppingCart = ({ badgeNumber }) => {
  const { sidebarVisible } = useSelector(state => state.itemsData);
  const dispatch = useDispatch();

  const toggleSidebarVisible = () => {
    dispatch(setSidebarVisible(!sidebarVisible));
  };

  return (
    <div className={classes.container} onClick={toggleSidebarVisible}>
      <div className={classes.circularButton}>
        <FontAwesomeIcon 
          icon={faCartShopping}
          style={{ fontSize: 20, margin: "auto", color: "#fff" }}
        />
      </div>
      {badgeNumber > 0 &&
        <div className={classes.badge}>{badgeNumber}</div>
      }
    </div>
  );
};

ShoppingCart.defaultProps = {
  badgeNumber: 0
};

export default ShoppingCart;