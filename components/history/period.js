import HistoryList from './list';
import classes from './period.module.css';

const HistoryPeriod = ({ name, lists }) => {
  return (
    <div className={classes.container}>
      <h3 className={classes.name}>{name.substring(7)}</h3>
      {lists.map(l => (
        <HistoryList
          key={l.id}
          id={l.id}
          name={l.name}
          finishedOn={l.finished_on_text}
          state={l.state}
        />
      ))}
    </div>
  );
};

export default HistoryPeriod;