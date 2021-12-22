import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import Dropdown from "../../components/UI/Dropdown";

function OverviewPage() {
  const dropdownOptions = [
    {title: 'Last 24 hours', value: 1},
    {title: 'Last 7 days', value: 7},
    {title: 'Last 30 days', value: 30}
  ];

  return (
    <React.Fragment>
      <div className="time-period">
        <span>Time period:</span>
        <Dropdown options={dropdownOptions} />
      </div>
    </React.Fragment>
  );
}

export default OverviewPage;

OverviewPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
