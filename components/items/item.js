import IconButton from "../ui/button/icon-button";
import classes from './item.module.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Item = ({ name, onClick }) => {
  return (
    <div className={classes.item}>
      <div className={classes.itemName}>{name}</div>
      <IconButton buttonClassName={classes.plus} icon={faPlus} fontSize={18} onClick={onClick} />
    </div>
  );
}

Item.defaultProps = {
  onClick: () => {}
};

export default Item;