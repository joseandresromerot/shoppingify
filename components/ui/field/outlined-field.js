import classes from './outlined-field.module.css';

const OutlinedField = ({children, containerClassName, disabledClassName, error, ...rest}) => {
  return (
    <>
      <div className={`${classes.container} ${containerClassName} ${rest.disabled === true ? disabledClassName : ""} ${error ? classes.error : ""}`}>
        {children}
      </div>
    </>
  );
}

OutlinedField.defaultProps = {
  containerClassName: "",
  disabledClassName: ""
};

export default OutlinedField;