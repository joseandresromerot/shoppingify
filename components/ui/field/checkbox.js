import classes from './checkbox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';

const Checkbox = ({ value, onValueChange, size, className }) => {
  return (
    <div className={`${classes.container} ${className}`}>
      <FontAwesomeIcon
        icon={value === true ? faSquareCheck : faSquare}
        style={{ fontSize: size }}
        onClick={() => onValueChange(!value)}
      />
    </div>
  );
};

Checkbox.defaultProps = {
  value: false,
  className: "",
  onValueChange: () => {}
};

export default Checkbox;