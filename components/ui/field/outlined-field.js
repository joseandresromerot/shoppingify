import classes from './outlined-field.module.css';

const OutlinedField = ({children, containerClassName, disabledClassName, error, disabled}) => {
  return (
    <>
      <div className={`${classes.container} ${containerClassName} ${disabled === true ? disabledClassName : ""} ${error ? classes.error : ""}`}>
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