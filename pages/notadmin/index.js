import React from "react";
import CurrentAccountBadge from "../../components/Layouts/CurrentAccountBadge ";
import Sidebar from "../../components/Layouts/Sidebar";
import ErrorIcon from "@mui/icons-material/Error";

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
      }}
    >
      <ErrorIcon
        sx={{ fontSize: 35 }}
        style={{ color: "#E00707", marginRight: "13px" }}
      />
      Current connected address is not a Gamify Admin. <br /> Please connect
      using another Wallet or register as a Gamify Admin
    </div>
  );
}

export default NotGamifyAdminPage;

NotGamifyAdminPage.getLayout = function getLayout(page) {
  return (
    <>
      <Sidebar />
      <CurrentAccountBadge />
      {page}
    </>
  );
};
