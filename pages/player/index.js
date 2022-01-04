import React, { useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import Dropdown from "../../components/UI/Dropdown";
import Button from "../../components/UI/Button.js";
import DataTable from "../../components/UI/Table/DataTable";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import SearchIcon from '@mui/icons-material/Search';

function PlayerPage() {
  const { isLoggined } = useAuth();
  const router = useRouter();

  const dropdownOptions = [
    { title: "Most recent logins", value: 0 },
    { title: "Highest value to date", value: 1 },
  ];
  const styleLinkTable = {
    color: "#00C48C",
  };
  const styleStatusTable = {
    color: "white",
    textTransform: "uppercase",
    border: "1px solid transparent",
    borderRadius: "32px",
    width: "80px",
    height: "40px",
    lineHeight: "31px",
    padding: "5px 7px"
  }
  const highlightLabel = {
    Active: {
      backgroundColor: "#00C48C"
    },
    Minted: {
      backgroundColor: "#FFA803"
    }
  }
  const tableColumns = [
    {
      title: "Player ID",
      field: "id",
      prefixLink: "player",
      style: styleLinkTable,
    },
    { title: "Wallet Address", field: "wallet" },
    { title: "Create On", field: "createOn" },
    { title: "Status", field: "status", style: styleStatusTable, highlightLabel: highlightLabel },
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
    const loginStatus = isLoggined();
    if (!loginStatus) router.replace("/")
  }, []);

  return (
    <div className="container--custom players-contain">
      <section className="interactive-list-player">
        <p>Total player: 16</p>
        <Button  className="btn-main">
          Export Player
        </Button>
      </section>

      <section className="card-custom">
        <h5 className="card__title">Query</h5>
        <div className="card__body card__query">
          <Dropdown options={dropdownOptions} className='card__query--dropdown'/>
          <input type="text" className="input-main large" placeholder="Search players" />
          <div className="card__interactive">
            <Button  className="btn-main">
              <SearchIcon /> <span>Search</span>
            </Button>
            <Button className="btn-main--clear">
              Clear
            </Button>
          </div>
        </div>
      </section>

      <div style={{ marginTop: 20 }}>
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
