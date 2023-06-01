import Modal from 'react-modal';
import { useSelector, useDispatch } from "react-redux";
import { hideMessage } from '@/store/actions/messages';
import classes from './alert.module.css';
import { Quicksand } from 'next/font/google';
import RoundedButton from '../button/rounded-button';
import TransparentButton from '../button/transparent-button';

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const Alert = () => {
  const dispatch = useDispatch();
  const messagesData = useSelector((state) => state.messagesData);
  const {
    visible,
    message,
    primaryButtonText = "",
    primaryButtonHandler = () => {},
    secondaryButtonText = "",
    secondaryButtonHandler = () => {}
  } = messagesData;

  return (
    <Modal
      overlayClassName={classes.overlayPanel}
      className={`${classes.container} ${quicksand.className}`}
      isOpen={visible}
      onRequestClose={() => {
        dispatch(hideMessage());
      }}
    >
      <div className={classes.message}>
        {message}
      </div>

      <div className={classes.buttonsContainer}>
        {(secondaryButtonText && secondaryButtonText.trim() !== "") &&
          <TransparentButton className={`${classes.secondaryButton} ${quicksand.className}`} onClick={secondaryButtonHandler}>{secondaryButtonText}</TransparentButton>
        }
        {(primaryButtonText && primaryButtonText.trim() !== "") &&
          <RoundedButton className={`${classes.primaryButton} ${quicksand.className}`} onClick={primaryButtonHandler}>{primaryButtonText}</RoundedButton>
        }
      </div>
    </Modal>
  );
}

export default Alert;