import classes from './index.module.css';
import Navbar from './navbar';
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { Quicksand } from 'next/font/google';
import { useSelector } from 'react-redux';
import ShoppingList from '../shopping-list';
import NewItemForm from '../items/new-item-form';
import ItemDetails from '../items/item-details';
import { APP_MODES } from '@/store/reducers/itemsReducer';
import { ResponsiveBreakpoints, useMediaQuery } from '@/styles';

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const appModesComponents = {
  [APP_MODES.VIEW_SHOPPING_LIST]: ShoppingList,
  [APP_MODES.EDIT_SHOPPING_LIST]: ShoppingList,
  [APP_MODES.ADD_NEW_ITEM]: NewItemForm,
  [APP_MODES.VIEW_ITEM]: ItemDetails
};

export default function RootLayout({ children }) {
  const { appMode, sidebarVisible } = useSelector((state) => state.itemsData);
  const ActiveModeComponent = appModesComponents[appMode];
  const isAtLeastDesktop = useMediaQuery(`(min-width: ${ResponsiveBreakpoints.DESKTOP}px)`);

  return (
    <div className={`${classes.mainContainer} ${quicksand.className}`}>
      <Navbar />
      <div className={classes.children}>
        {children}
      </div>

      {(sidebarVisible || isAtLeastDesktop) && 
        <ActiveModeComponent />
      }
    </div>
  )
}
