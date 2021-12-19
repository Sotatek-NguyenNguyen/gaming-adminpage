import React from "react";
import Layout from "../../components/Layouts/Layout";

function CatalogPage() {
  return <div>Catalog Page</div>;
}

export default CatalogPage;

CatalogPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
