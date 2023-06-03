import classes from './amount-field.module.css';
import { useState } from 'react';
import IconButton from '../ui/button/icon-button';
import { faTrashCan, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const AmountField = ({ value, onClick, onRemove, onMinus, onPlus }) => {
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    setEditing(!editing);
    onClick();
  };

  return (
    <div className={classes.fieldContainer} style={{ background: editing ? "#fff" : "transparent" }}>
      {editing && <IconButton icon={faTrashCan} fontSize={13} className={classes.delete} onClick={onRemove} />}
      {editing && <IconButton icon={faMinus} fontSize={18} className={classes.minusPlus} onClick={onMinus} />}
      <button className={classes.amount} onClick={handleClick}>
        <span className={classes.amountText}>{value} pcs</span>
      </button>
      {editing &&<IconButton icon={faPlus} fontSize={18} className={classes.minusPlus} onClick={onPlus} />}
    </div>
  );
}

AmountField.defaultProps = {
  onClick: () => {},
  onRemove: () => {},
  onMinus: () => {},
  onPlus: () => {}
};

export default AmountField;