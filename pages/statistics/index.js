import RootLayout from "@/components/layout";
import classes from './index.module.css';
import { redirectUnauthenticated } from "@/lib/auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TopResults from "@/components/statistics/top-results";

const StatisticsPage = () => {
  const [topItems, setTopItems] = useState([]);
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    const getTopItems = async () => {
      const response = await fetch('/api/items/top', {
        method: "GET"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Errooooor!");
      }

      return data;
    };

    const getTopCategories = async () => {
      const response = await fetch('/api/categories/top', {
        method: "GET"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Errooooor!");
      }

      return data;
    };

    getTopItems()
      .then(data => {
        setTopItems(data.top);
      })
      .catch(err => {
        console.info('err', err);
      });

    getTopCategories()
      .then(data => {
        setTopCategories(data.top);
      })
      .catch(err => {
        console.info('err', err);
      });
  }, []);
  return (
    <RootLayout>
      <div className={classes.mainContainer}>
        <div className={classes.topContainer}>
          <TopResults
            title="Top items"
            results={topItems}
            progressBarColor="#F9A109"
          />
          <TopResults
            title="Top Categories"
            results={topCategories}
            progressBarColor="#56CCF2"
          />
        </div>
      </div>
    </RootLayout>
  );
};

export async function getServerSideProps(context) {
  const result = await redirectUnauthenticated(getSession, context);
  return result;
}

export default StatisticsPage;