import classes from './navbar.module.css';
import NavItem from './nav-item';
import {
  faList,
  faRotateLeft,
  faChartColumn,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import logo from '../../public/logo.svg';
import ShoppingCart from './shopping-cart';
import IconButton from '../ui/button/icon-button';
import { signOut } from 'next-auth/react';

const PAGES = [
  {
    url: "/",
    name: "Items",
    icon: faList
  },
  {
    url: "/history",
    name: "History",
    icon: faRotateLeft
  },
  {
    url: "/statistics",
    name: "Statistics",
    icon: faChartColumn
  }
];

const Navbar = () => {
  return (
    <nav className={classes.toolbar}>
      <Image src={logo} />
      <ul>
        {PAGES.map(page => (
          <NavItem key={page.url} url={page.url} name={page.name} icon={page.icon} />
        ))}
        <IconButton
          icon={faRightFromBracket}
          fontSize={20}
          buttonClassName={classes.logoutButton}
          onClick={() => {
            signOut();
          }}
        />
      </ul>
      <ShoppingCart badgeNumber={3}/>
    </nav>
  );
};

export default Navbar;