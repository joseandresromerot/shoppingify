import classes from './transparent-button.module.css';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const TransparentButton = ({ className, ...rest }) => {
  return (
    <button {...rest} className={`${classes.button} ${className} ${quicksand.className}`} />
  );
}

TransparentButton.defaultProps = {
  className: ""
};

export default TransparentButton;