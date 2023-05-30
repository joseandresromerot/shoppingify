import classes from './navbar.module.css';
import NavItem from './nav-item';
import {
  faList,
  faRotateLeft,
  faChartColumn
} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import logo from '../../public/logo.svg';
import ShoppingCart from './shopping-cart';

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
      </ul>
      <ShoppingCart badgeNumber={3}/>
    </nav>
  );
};

export default Navbar;