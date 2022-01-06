import React, { useCallback, useEffect, useState, useMemo } from "react";
import Layout from "../../components/Layouts/Layout";
import Card from "../../components/UI/Card.js";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks";

function createData(name, amount, change) {
  return { name, amount, change };
}

const cardData = [
  {
    id: 1,
    title: "Deposits",
    rows: [
      createData("Last 24 hours", 1, 0.5),
      createData("7 days ago", 3, "NA"),
      createData("30 days ago", 5, 1),
    ],
  },
  {
    id: 2,
    title: "New User",
    rows: [
      createData("Last 24 hours", 1, 0.5),
      createData("7 days ago", 3, "NA"),
      createData("30 days ago", 5, 1),
    ],
  },
  {
    id: 3,
    title: "Withdraw",
    rows: [
      createData("Last 24 hours", 1, 0.5),
      createData("7 days ago", 3, "NA"),
      createData("30 days ago", 5, 1),
    ],
  },
];

function OverviewPage() {
  const router = useRouter();
  const {isLoggined} = useAuth();

  useEffect(() => {
    const loginStatus = isLoggined();
    if (!loginStatus) router.replace("/")
  }, []);

  return (
    <React.Fragment>
      <div className="card-list">
        {cardData.map((card) => (
          <Card key={card.id} id={card.id} title={card.title} rows={card.rows} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default OverviewPage;

OverviewPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
