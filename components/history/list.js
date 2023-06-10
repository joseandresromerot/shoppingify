import classes from './list.module.css';
import { format, parse } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../ui/button/icon-button';

const HistoryList = ({ id, name, finishedOn, state }) => {
  return (
    <div className={classes.container}>
      <div className={classes.name}>{name}</div>
      <FontAwesomeIcon
        icon={faCalendar}
        style={{ fontSize: 16 }}
        className={classes.icon}
      />
      <div className={classes.date}>{format(parse(finishedOn, "yyyy-MM-dd", new Date()), "EEE dd.MM.yyyy")}</div>
      <div className={`${classes.state} ${state === "completed" ? classes.completed : (state === "cancelled" ? classes.cancelled : "")}`}>{state}</div>
      <IconButton
        icon={faChevronRight}
        fontSize={16}
        className={classes.arrow}
      />
    </div>
  );
};

export default HistoryList;