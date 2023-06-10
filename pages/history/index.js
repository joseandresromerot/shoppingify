import RootLayout from "@/components/layout";
import { redirectUnauthenticated } from "@/lib/auth";
import { getSession } from "next-auth/react";
import classes from "./index.module.css";
import { useEffect } from "react";
import { setHistory } from "@/store/actions/items";
import { useDispatch, useSelector } from "react-redux";
import { groupBy } from "@/lib/utils";
import HistoryPeriod from "@/components/history/period";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const { history } = useSelector(state => state.itemsData);
  const groupedHistory = groupBy(history, "period");
  const periods = Object.keys(groupedHistory);

  useEffect(() => {
    const getHistory = async () => {
      const response = await fetch('/api/shopping-list/history', {
        method: "GET"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Errooooor!");
      }

      return data;
    };

    getHistory()
      .then(data => {
        dispatch(setHistory(data.shoppingLists));
      })
      .catch(err => {
        console.info('err', err);
      });
  }, []);

  return (
    <RootLayout>
      <div className={classes.mainContainer}>
        <h2 className={classes.title}>Shopping history</h2>
        {periods.map(p => (
          <HistoryPeriod key={p} name={p} lists={groupedHistory[p]} />
        ))}
      </div>
    </RootLayout>
  );
};

export async function getServerSideProps(context) {
  const result = await redirectUnauthenticated(getSession, context);
  return result;
}

export default HistoryPage;