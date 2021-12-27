import React from "react";
import Layout from "../../components/Layouts/Layout";
import CurrentAccountBadge from "../../components/Layouts/CurrentAccountBadge ";
import Sidebar from "../../components/Layouts/Sidebar";
import WarningIcon from "@mui/icons-material/Warning";

function NotGamifyAdminPage() {
  return (
    <div
      style={{
        fontSize: "14px",
        lineHeight: "24px",
        position: "absolute",
        top: "15%",
        left: "23%",
        display: "flex",
        alignItems: "center",
        width: "682px",
        height: "101px",
      }}
    >
      <WarningIcon
        sx={{ fontSize: 35 }}
        style={{ color: "#FF6060", marginRight: "29px" }}
      />
      Current connected address is not a Gamify Admin. <br /> Please connect
      using another Wallet or register as a Gamify Admin
    </div>
  );
}

export default NotGamifyAdminPage;

NotGamifyAdminPage.getLayout = function getLayout(page) {
  return (
    <Layout>
        {page}
    </Layout>
  );
};
