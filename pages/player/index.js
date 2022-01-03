import React, { useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import Dropdown from "../../components/UI/Dropdown";
import Button from "../../components/UI/Button.js";
import DataTable from "../../components/UI/Table/DataTable";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";

function PlayerPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const dropdownOptions = [
    { title: "Most recent logins", value: 0 },
    { title: "Highest value to date", value: 1 },
  ];
  const styleLinkTable = {
    color: "#1A85D8",
  };
  const styleStatusTable = {
    color: "#008A25",
    textTransform: "uppercase",
  };
  const tableColumns = [
    {
      title: "Player ID",
      field: "id",
      prefixLink: "player",
      style: styleLinkTable,
    },
    { title: "Wallet Address", field: "wallet" },
    { title: "Create On", field: "createOn" },
    { title: "Status", field: "status", style: styleStatusTable },
  ];
  const tablesData = [
    {
      id: "123as1df5saf35asdf1asdf",
      wallet: "4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G",
      createOn: "2021-11-18 11:29:00",
      status: "Active",
    },
    {
      id: "123as1df5sdf35asdf1asdf",
      wallet: "4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G",
      createOn: "2021-11-18 11:29:00",
      status: "Active",
    },
    {
      id: "123as1df5adf35asdf1asdf",
      wallet: "4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G",
      createOn: "2021-11-18 11:29:00",
      status: "Minted",
    },
    {
      id: "123as1df5sdf35asf1asdf",
      wallet: "4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G",
      createOn: "2021-11-18 11:29:00",
      status: "Active",
    },
    {
      id: "123as1df5adf35sdf1asdf",
      wallet: "4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G",
      createOn: "2021-11-18 11:29:00",
      status: "Active",
    },
    {
      id: "12as1df5sdf35asdf1asdf",
      wallet: "4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G",
      createOn: "2021-11-18 11:29:00",
      status: "Minted",
    },
    {
      id: "123as1df5sdf3j5asdf1asdf",
      wallet: "4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G",
      createOn: "2021-11-18 11:29:00",
      status: "Active",
    },
    {
      id: "123as1df5asdf3j5asf1asdf",
      wallet: "4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G",
      createOn: "2021-11-18 11:29:00",
      status: "Active",
    },

    {
      id: "123asj1df5sdf3j5asdf1sdf",
      wallet: "4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G",
      createOn: "2021-11-18 11:29:00",
      status: "Active",
    },
  ];

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, []);

  return (
    <div className="container--custom players-contain">
      <section className="card-custom">
        <h5 className="card__title">Query</h5>
        <div className="card__body card__query">
          <Dropdown options={dropdownOptions} className="query__dropdown" />
          <input type="text" className="input-main large" placeholder="Search players" />
          <div className="card__interactive">
            <Button variant="outlined" className="btn-main--outline">
              Clear
            </Button>
            <Button variant="contained" className="btn-main">
              Search
            </Button>
          </div>
        </div>
      </section>

      <div style={{ marginTop: 8 }}>
        <DataTable
          columns={tableColumns}
          data={tablesData}
          tableMaxHeight={300}
          message="No player available"
        />
      </div>
    </div>
  );
}

export default PlayerPage;

PlayerPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
