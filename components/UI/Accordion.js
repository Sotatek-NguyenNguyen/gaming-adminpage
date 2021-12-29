import { useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Input from "./Input.js";
import Button from "./Button.js";

export default function SimpleAccordion(props) {
  const amountGrantToken = useRef();
  const grantWalletAddress = useRef();
  const grantNote = useRef();

  const amountDeductToken = useRef();
  const deductWalletAddress = useRef();
  const deductNote = useRef();

  const resetForm = () => {
    amountGrantToken.current.value = "";
    grantWalletAddress.current.value = "";
    grantNote.current.value = "";

    amountDeductToken.current.value = "";
    deductWalletAddress.current.value = "";
    deductNote.current.value = "";
  };

  const grantTokenSubmitHandler = (e) => {
    e.preventDefault();
    const amount = +amountGrantToken.current.value;
    const userAddress = grantWalletAddress.current.value;
    const note = grantNote.current.value;
    props.onGrantToKenSubmit(amount, userAddress, note);
    resetForm();
  };

  const deductTokenSubmitHandler = (e) => {
    e.preventDefault();
    const amount = +amountDeductToken.current.value;
    const userAddress = deductWalletAddress.current.value;
    const note = deductNote.current.value;
    props.onDeductTokenSubmit(amount, userAddress, note);
    resetForm();
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
            <Input
              required
              ref={amountGrantToken}
              placeholder="Token Amount"
              type="number"
              id="token-amount"
            />

            <label htmlFor="wallet-address">
              <h5>Destination Wallet address: *</h5>
            </label>
            <Input
              placeholder="Player’s wallet address"
              type="text"
              id="wallet-address"
              ref={grantWalletAddress}
              required
            />

            <label htmlFor="transition-note">
              <h5>Transation Note: *</h5>
            </label>
            <Input required type="text" id="wallet-address" ref={grantNote} />

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
            <Input
              required
              ref={amountDeductToken}
              placeholder="Token Amount"
              type="text"
              id="token-amount"
            />

            <label htmlFor="wallet-address">
              <h5>Originate Player’s wallet address: *</h5>
            </label>
            <Input
              placeholder="Player’s wallet address"
              type="text"
              id="wallet-address"
              ref={deductWalletAddress}
              required
            />

            <label htmlFor="transition-note">
              <h5>Transation Note: *</h5>
            </label>
            <Input required ref={deductNote} type="text" id="wallet-address" />

            <div className="form-actions">
              <Button className="btn-main">Deduct</Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
