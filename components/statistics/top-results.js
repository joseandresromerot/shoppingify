import Result from './result';
import classes from './top-results.module.css';

const TopResults = ({ title, results, numberOfResults, progressBarColor }) => {
  const truncatedResults = [...results];
  console.info('truncatedResults.length, numberOfResults', truncatedResults.length, numberOfResults);
  if (truncatedResults.length > numberOfResults) {
    truncatedResults.length = numberOfResults;
  }
  
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{title}</h2>
      {truncatedResults.map(r => (
        <Result
          name={r.name}
          percentage={r.percentage}
          progressBarColor={progressBarColor}
        />
      ))}
    </div>
  );
};

TopResults.defaultProps = {
  numberOfResults: 3
}

export default TopResults;