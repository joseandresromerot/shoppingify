import classes from './outlined-textfield.module.css';

const OutlinedTextfield = ({containerClassName, className, ref, ...rest}) => {
  return (
    <div className={`${classes.container} ${containerClassName}`}>
      <input {...rest} ref={ref} className={`${classes.input} ${className}`} />
    </div>
  );
}

OutlinedTextfield.defaultProps = {
  containerClassName: "",
  className: ""
};

export default OutlinedTextfield;