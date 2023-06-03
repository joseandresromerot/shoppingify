import classes from './amount-field.module.css';
import IconButton from '../ui/button/icon-button';
import { faTrashCan, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const AmountField = ({
  value,
  onValueChange,
  editing,
  onEditingChange,
  onRemove,
  disabled
}) => {
  const handleEditingChange = () => {
    if (!disabled) {
      onEditingChange(!editing);
    }
  };

  const handleMinusClick = () => {
    if (value > 1) {
      onValueChange(value - 1);
    }
  };

  const handlePlusClick = () => {
    onValueChange(value + 1);
  };

  const handleRemoveClick = () => {
    onRemove();
  };

  return (
    <div className={classes.fieldContainer} style={{ background: editing ? "#fff" : "transparent" }}>
      {editing && <IconButton icon={faTrashCan} fontSize={13} className={classes.delete} onClick={handleRemoveClick} />}
      {editing && <IconButton icon={faMinus} fontSize={18} className={classes.minusPlus} onClick={handleMinusClick} />}
      <button className={classes.amount} onClick={handleEditingChange}>
        <span className={classes.amountText}>{value} pcs</span>
      </button>
      {editing &&<IconButton icon={faPlus} fontSize={18} className={classes.minusPlus} onClick={handlePlusClick} />}
    </div>
  );
}

AmountField.defaultProps = {
  onEditingChange: () => {},
  onRemove: () => {},
  onValueChange: () => {}
};

export default AmountField;