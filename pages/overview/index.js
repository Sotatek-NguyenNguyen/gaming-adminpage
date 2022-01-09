import React, { useEffect, useState, useMemo } from "react";
import Layout from "../../components/Layouts/Layout";
import Card from "../../components/UI/Card.js";
import { useRouter } from "next/router";
import { useAlert, useAuth, useGlobal } from "../../hooks";
import { getJSON } from "../../common.js";

function OverviewPage() {
  const router = useRouter();
  const { isLoggined } = useAuth();
  const { alertError } = useAlert();
  const { gameData } = useGlobal();
  const tokenDecimals = gameData?.tokenDecimals;

  const [depositStatistic, setDepositStatistic] = useState({});
  const [withdrawStatistic, setWithdrawStatistic] = useState({});
  const [newUserStatistic, setNewUserStatistic] = useState({});

  function createData(name, amount, change) {
    return {
      name,
      amount:
        amount?.toString().length > 7
          ? Math.trunc(amount / Math.pow(10, tokenDecimals))
          : amount,
      change:
        change?.toString().length > 7
          ? Math.trunc(change / Math.pow(10, tokenDecimals))
          : change,
    };
  }

  const getOverviewStatistic = async () => {
    try {
      const data = await getJSON(`/admin/overview-statistic`);
      const {
        depositLast30Days,
        depositLast24Hours,
        depositSevenDaysAgo,
        newUserLast24Hours,
        newUserLast30Days,
        newUserSevenDaysAgo,
        withdrawnLast24Hours,
        withdrawnLast30Days,
        withdrawnSevenDaysAgo,
      } = data;
      setDepositStatistic({
        depositSevenDaysAgo,
        depositLast24Hours,
        depositLast30Days,
      });
      setNewUserStatistic({
        newUserLast24Hours,
        newUserLast30Days,
        newUserSevenDaysAgo,
      });
      setWithdrawStatistic({
        withdrawnLast24Hours,
        withdrawnLast30Days,
        withdrawnSevenDaysAgo,
      });
    } catch (error) {
      throw error;
    }
  };

  const cardData = useMemo(
    () => [
      {
        id: 1,
        title: "Deposits",
        rows: [
          createData(
            "Last 24 hours",
            depositStatistic?.depositLast24Hours?.amount,
            depositStatistic?.depositLast24Hours?.change
          ),
          createData(
            "7 days ago",
            depositStatistic?.depositSevenDaysAgo?.amount,
            depositStatistic?.depositSevenDaysAgo?.change
          ),
          createData(
            "30 days ago",
            depositStatistic?.depositLast30Days?.amount,
            depositStatistic?.depositLast30Days?.change
          ),
        ],
      },
      {
        id: 2,
        title: "New User",
        rows: [
          createData(
            "Last 24 hours",
            newUserStatistic?.newUserLast24Hours?.amount,
            newUserStatistic?.newUserLast24Hours?.change
          ),
          createData(
            "7 days ago",
            newUserStatistic?.newUserSevenDaysAgo?.amount,
            newUserStatistic?.newUserSevenDaysAgo?.change
          ),
          createData(
            "30 days ago",
            newUserStatistic?.newUserLast30Days?.amount,
            newUserStatistic?.newUserLast30Days?.change
          ),
        ],
      },
      {
        id: 3,
        title: "Withdraw",
        rows: [
          createData(
            "Last 24 hours",
            withdrawStatistic?.withdrawnLast24Hours?.amount,
            withdrawStatistic?.withdrawnLast24Hours?.change
          ),
          createData(
            "7 days ago",
            withdrawStatistic?.withdrawnSevenDaysAgo?.amount,
            withdrawStatistic?.withdrawnSevenDaysAgo?.change
          ),
          createData(
            "30 days ago",
            withdrawStatistic?.withdrawnLast30Days?.amount,
            withdrawStatistic?.withdrawnLast30Days?.change
          ),
        ],
      },
    ],
    [depositStatistic, withdrawStatistic, newUserStatistic]
  );

  useEffect(() => {
    const loginStatus = isLoggined();
    if (!loginStatus) router.replace("/");
  }, []);

  useEffect(() => {
    getOverviewStatistic().catch((err) => alertError(err.message));
  }, []);

  return (
    <React.Fragment>
      <div className="card-list">
        {cardData.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            rows={card.rows}
            amountLast24hr={newUserStatistic?.newUserLast24Hours?.amount}
            amountLast30days={
              newUserStatistic?.newUserLast30Days?.amount.toString().length > 7
                ? Math.trunc(
                    newUserStatistic?.newUserLast30Days?.amount /
                      Math.pow(10, tokenDecimals)
                  )
                : newUserStatistic?.newUserLast30Days?.amount
            }
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default OverviewPage;

OverviewPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
