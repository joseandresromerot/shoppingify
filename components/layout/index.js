import classes from './index.module.css';
import Navbar from './navbar';
import { Inter } from 'next/font/google';
// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <div className={`${classes.mainContainer} ${inter.className}`}>
      <Navbar />
      {children}
    </div>
  )
}
