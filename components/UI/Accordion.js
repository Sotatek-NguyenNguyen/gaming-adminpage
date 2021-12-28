import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Input from "./Input.js";
import Button from "./Button.js";

export default function SimpleAccordion(props) {
  
  const grantTokenSubmitHandler = e => {
    e.preventDefault();
    props.onGrantToKenSubmit()
  };

  const deductTokenSubmitHandler = e => {
    e.preventDefault();
    props.onDeductTokenSubmit()
  };


  return (
    <div className="accordion-list">
      <Accordion>
        <AccordionSummary
          sx={{ background: "#EBEAF7", color: "#6823BF" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h7">Grant tokens</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <form onSubmit={grantTokenSubmitHandler}>
            <label htmlFor="token-amount">
              <h5>Enter Token amount: * </h5>
            </label>
            <Input placeholder="Token Amount" type="number" id="token-amount" />

            <label htmlFor="wallet-address">
              <h5>Destination Wallet address: *</h5>
            </label>
            <Input
              placeholder="Player’s wallet address"
              type="text"
              id="wallet-address"
            />

            <label htmlFor="transition-note">
              <h5>Transation Note: *</h5>
            </label>
            <Input type="text" id="wallet-address" />

            <div className="form-actions">
              <Button className="btn-main">Grant</Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          sx={{ background: "#EBEAF7", color: "#6823BF" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h7">Deduct tokens</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={deductTokenSubmitHandler}>
            <label htmlFor="token-amount">
              <h5>Enter Token amount: * </h5>
            </label>
            <Input placeholder="Token Amount" type="text" id="token-amount" />

            <label htmlFor="wallet-address">
              <h5>Originate Player’s wallet address: *</h5>
            </label>
            <Input
              placeholder="Player’s wallet address"
              type="text"
              id="wallet-address"
            />

            <label htmlFor="transition-note">
              <h5>Transation Note: *</h5>
            </label>
            <Input type="text" id="wallet-address" />

            <div className="form-actions">
              <Button className="btn-main">Deduct</Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
