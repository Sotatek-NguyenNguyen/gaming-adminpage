import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import Dropdown from "../../components/UI/Dropdown";
import Card from "../../components/UI/Card.js";
import { getJSON } from "../../common.js";
import { ADMIN_PAGE_BACKEND_URL } from "../../config";

function OverviewPage() {
  const [transactionData, setTransactionData] = useState([]);
  const dropdownOptions = [
    { title: "Last 24 hours", value: 1 },
    { title: "Last 7 days", value: 7 },
    { title: "Last 30 days", value: 30 },
  ];

  useEffect(() => {
    const getTransactionData = async () => {
      try {
        const res = await getJSON(
          `${ADMIN_PAGE_BACKEND_URL}/admin/users/transactions?page=1&pageSize=20`
        );
        if (res.status === 200) setTransactionData(res.data);
      } catch (error) {
        throw error;
      }
    };

    getTransactionData().catch((err) => console.error(err.message));
  }, []);

  function createData(name, amount, change) {
    return { name, amount, change };
  }

  const cardData = [
    {
      id: 1,
      title: "Deposits",
      rows: [
        createData("Last 24 hours", 1, 0.5),
        createData("1 day ago", 3, "NA"),
        createData("7 days ago", 5, 1),
      ],
    },
    {
      id: 2,
      title: "New Users",
      rows: [
        createData("Last 24 hours", 1, 0.5),
        createData("1 day ago", 3, "NA"),
        createData("7 days ago", 5, 1),
      ],
    },
    {
      id: 3,
      title: "Reports",
      rows: [
        createData("New Users", 0, "NA"),
        createData("Deposits", 5, 1),
        createData("Withdraws", 3, "NA"),
      ],
    },
  ];

  return (
    <React.Fragment>
      <div className="time-period">
        <span>Time period:</span>
        <Dropdown options={dropdownOptions} />
      </div>

      <div className="card-list">
        {cardData.map((card) => (
          <Card key={card.id} title={card.title} rows={card.rows} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default OverviewPage;

OverviewPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
