import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from './icon-button.module.css'

const IconButton = ({ icon, fontSize, className, label, ...rest }) => {
  return (
    <button  {...rest} className={`${classes.button} ${className}`}>
      <FontAwesomeIcon
        icon={icon}
        style={{ fontSize }}
      />
      {label &&
        <span className={classes.label}>{label}</span>
      }
    </button>
  );
}

IconButton.defaultProps = {
  className: ""
}

export default IconButton;