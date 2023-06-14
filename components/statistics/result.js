import classes from './result.module.css';

const Result = ({ name, percentage, progressBarColor }) => {
  return (
    <div className={classes.container}>
      <div className={classes.nameContainer}>
        <div className={classes.name}>{name}</div>
        <div className={classes.percentage}>{`${percentage}%`}</div>
      </div>
      <div className={classes.progressBarBg}>
        <div className={classes.progressBar} style={{ backgroundColor: progressBarColor, width: `${percentage}%` }} />
      </div>
    </div>
  );
};

Result.defaultProps = {
  progressBarColor: "#efefef",
  percentage: 0
};

export default Result;