import React from "react";
import Layout from "../../components/Layouts/Layout";
import Dropdown from "../../components/UI/Dropdown";
import Card from "../../components/UI/Card.js";
import BasicTable from "../../components/UI/Table/BasicTable";

function OverviewPage() {
  const dropdownOptions = [
    { title: "Last 24 hours", value: 1 },
    { title: "Last 7 days", value: 7 },
    { title: "Last 30 days", value: 30 },
  ];

  function createData(name, amount, change) {
    return { name, amount, change };
  }

  const tablesData = [
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
        createData("New Users", 3, "NA"),
        createData("Deposits", 5, 1),
        createData("API Calls", 3, "NA"),
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
          {
            tablesData.map(tb => <BasicTable 
              key={tb.id} 
              title={tb.title}
              rows={tb.rows}
              />)
          }
      </div>
    </React.Fragment>
  );
}

export default OverviewPage;

OverviewPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
