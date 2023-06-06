import classes from './outlined-textfield.module.css';

const OutlinedTextfield = ({containerClassName, disabledClassName, className, ref, ...rest}) => {
  return (
    <div className={`${classes.container} ${containerClassName} ${rest.disabled === true ? disabledClassName : ""}`}>
      <input {...rest} ref={ref} className={`${classes.input} ${className}`} />
    </div>
  );
}

OutlinedTextfield.defaultProps = {
  containerClassName: "",
  className: "",
  disabledClassName: ""
};

export default OutlinedTextfield;