import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from './icon-button.module.css'

const IconButton = ({ icon, fontSize, buttonClassName, ...rest }) => {
  return (
    <button  {...rest} className={`${classes.button} ${buttonClassName}`}>
      <FontAwesomeIcon
        icon={icon}
        style={{ fontSize }}
      />
    </button>
  );
}

IconButton.defaultProps = {
  buttonClassName: ""
}

export default IconButton;