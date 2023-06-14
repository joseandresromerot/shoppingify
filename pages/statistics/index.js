import RootLayout from "@/components/layout";
import classes from './index.module.css';
import { redirectUnauthenticated } from "@/lib/auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TopResults from "@/components/statistics/top-results";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const StatisticsPage = () => {
  const [topItems, setTopItems] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState([]);

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

    const getMonthlySummary = async () => {
      const response = await fetch('/api/shopping-list/summary', {
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

    getMonthlySummary()
      .then(data => {
        setMonthlySummary(data.monthlySummary);
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

        <h2 className={classes.graphTitle}>Monthly Summary</h2>

        <div className={classes.graphContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={"100%"}
              height={"100%"}
              data={monthlySummary}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis width={22} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="items" stroke="#F9A109" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
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