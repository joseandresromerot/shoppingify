import classes from './rounded-button.module.css';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const RoundedButton = ({ className, ...rest }) => {
  return (
    <button {...rest} className={`${classes.button} ${className} ${quicksand.className}`} />
  );
}

RoundedButton.defaultProps = {
  className: ""
};

export default RoundedButton;