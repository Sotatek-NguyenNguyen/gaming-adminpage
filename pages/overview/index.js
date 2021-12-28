import React, { useCallback, useEffect, useState, useMemo } from "react";
import Layout from "../../components/Layouts/Layout";
import Dropdown from "../../components/UI/Dropdown";
import Card from "../../components/UI/Card.js";
import { getDateBefore, getJSON } from "../../common.js";
import { ADMIN_PAGE_BACKEND_URL } from "../../config";

function getAllDeposit(transactionData) {
  return transactionData.filter((trans) => trans.type === "deposit");
}

const getAllWithDraw = (transactionData) => {
  return transactionData.filter((trans) => trans.type === "withdrawn");
};

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
    title: "New Users",
    rows: [
      createData("Last 24 hours", 1, 0.5),
      createData("7 days ago", 3, "NA"),
      createData("30 days ago", 5, 1),
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

function OverviewPage() {
  const [transactionData, setTransactionData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [filterValue, setFiterValue] = useState(1);

  const dropdownOptions = useMemo(() => [
    { title: "Last 24 hours", value: 1 },
    { title: "Last 7 days", value: 7 },
    { title: "Last 30 days", value: 30 },
  ], []);

  const handleDropdownChange = (value) => {
    setFiterValue(value);
  };

  const filterDataByDateRange = (data, filteredDate) => {
    const startDate = getDateBefore(filteredDate);
    const endDate = new Date();

    data.filter(el => {
      const date = new Date(el.createdAt);
      if (date >= startDate) return (date >= startDate && date <= endDate)
    })
  };

  const getTransactionData = useCallback(async () => {
    try {
      const res = await getJSON(
        `${ADMIN_PAGE_BACKEND_URL}/admin/users/transactions?page=1&pageSize=20`
      );

      if (res.status === 200) setTransactionData(res.data.data);
    } catch (error) {
      throw error;
    }
  }, []);

  const getListUser = useCallback(async () => {
    try {
      const res = await getJSON(
        `${ADMIN_PAGE_BACKEND_URL}/admin/users?page=1&pageSize=20`
      );

      if (res.status === 200) setUserList(res.data.data);
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    getTransactionData().catch((err) => console.error(err.message));
    getListUser().catch((err) => console.error(err.message));
  }, [getTransactionData]);

  useEffect(() => {
    filterDataByDateRange(transactionData, filterValue)
  }, [filterValue, transactionData]);

  return (
    <React.Fragment>
      <div className="time-period">
        <span>Time period:</span>
        <Dropdown
          onChange={handleDropdownChange}
          options={dropdownOptions}
        />
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
