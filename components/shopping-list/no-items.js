import classes from './no-items.module.css';
import emptyImg from '../../public/empty.svg';
import Image from 'next/image';

const NoItems = () => {
  return (
    <div className={classes.container}>
      <h3 className={classes.emptyText}>No items</h3>
      <div className={classes.imageContainer}>
        <Image src={emptyImg} className={classes.image} fill />
      </div>
    </div>
  );
}

export default NoItems;