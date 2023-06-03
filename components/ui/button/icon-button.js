import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from './icon-button.module.css'

const IconButton = ({ icon, fontSize, className, ...rest }) => {
  return (
    <button  {...rest} className={`${classes.button} ${className}`}>
      <FontAwesomeIcon
        icon={icon}
        style={{ fontSize }}
      />
    </button>
  );
}

IconButton.defaultProps = {
  className: ""
}

export default IconButton;