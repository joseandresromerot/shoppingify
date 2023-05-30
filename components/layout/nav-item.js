import Link from 'next/link';
import classes from './nav-item.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from 'next/navigation';

const NavItem = ({ url, icon }) => {
  const pathname = usePathname();
  const isActive = pathname === url;
  const itemStyle = [classes.item];

  if (isActive) {
    itemStyle.push(classes.activeItem);
  }

  return (
    <li className={`${classes.item} ${classes.activeItem}`}>
      <Link href={url}>
        <FontAwesomeIcon
          icon={icon}
          style={{ fontSize: 20 }}
        />
      </Link>
      {isActive &&
        <div className={classes.activeItemIndicator} />
      }
    </li>
  )
}

export default NavItem;