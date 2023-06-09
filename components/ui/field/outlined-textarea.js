import OutlinedField from './outlined-field';
import classes from './outlined-textfield.module.css';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const OutlinedTextArea = ({className, ref, containerClassName, disabledClassName, error, ...rest}) => {
  return (
    <>
      <OutlinedField containerClassName={containerClassName} disabledClassName={disabledClassName} error={error}>
        <textarea {...rest} ref={ref} className={`${classes.input} ${quicksand.className} ${className}`} />
      </OutlinedField>
    </>
  );
}

OutlinedTextArea.defaultProps = {
  className: ""
};

export default OutlinedTextArea;