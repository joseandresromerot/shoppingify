import classes from './shadow-textfield.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShadowTextfield = ({containerClassName, className, icon, iconSize, ref, ...rest}) => {
  return (
    <div className={`${classes.container} ${containerClassName}`}>
      <FontAwesomeIcon
        icon={icon}
        style={{ fontSize: iconSize }}
      />
      <input {...rest} ref={ref} className={`${classes.input} ${className}`} />
    </div>
  );
}

ShadowTextfield.defaultProps = {
  containerClassName: "",
  className: ""
};

export default ShadowTextfield;