import OutlinedField from './outlined-field';
import classes from './outlined-textfield.module.css';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const OutlinedTextfield = ({className, ref, containerClassName, disabledClassName, error, ...rest}) => {
  return (
    <>
      <OutlinedField containerClassName={containerClassName} disabledClassName={disabledClassName} error={error} disabled={rest.disabled}>
        <input {...rest} ref={ref} className={`${classes.input} ${quicksand.className} ${className}`} />
      </OutlinedField>
    </>
  );
}

OutlinedTextfield.defaultProps = {
  className: ""
};

export default OutlinedTextfield;