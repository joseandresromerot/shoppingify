import classes from './index.module.css';
import Navbar from './navbar';
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <div className={`${classes.mainContainer} ${quicksand.className}`}>
      <Navbar />
      {children}
    </div>
  )
}
