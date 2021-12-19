import React from "react";
import Layout from "../../components/Layouts/Layout";

function OverviewPage() {
  return <div>Overview Page</div>;
}

export default OverviewPage;

OverviewPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
