import { useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Input from "./Input.js";
import Button from "./Button.js";
import { useGlobal, useAlert } from '../../hooks';

export default function SimpleAccordion(props) {
  const amountGrantToken = useRef();
  const grantWalletAddress = useRef();
  const grantNote = useRef();

  const amountDeductToken = useRef();
  const deductWalletAddress = useRef();
  const deductNote = useRef();

  const { playerList } = useGlobal();
  const { alertError } = useAlert();

  const resetForm = () => {
    amountGrantToken.current.value = "";
    grantWalletAddress.current.value = "";
    grantNote.current.value = "";

    amountDeductToken.current.value = "";
    deductWalletAddress.current.value = "";
    deductNote.current.value = "";
  };

  const findWalletAddress = (address) => playerList.some(player => player.address === address);

  const grantTokenSubmitHandler = (e) => {
    e.preventDefault();
    const amount = +amountGrantToken.current.value;
    const userAddress = grantWalletAddress.current.value;
    const note = grantNote.current.value;

    if(findWalletAddress(userAddress)){
      props.onGrantToKenSubmit(amount, userAddress, note);
    }else{
      alertError("The wallet address is not found in Gaming Service. Either the wallet is not registered with Gaming Service or has been de-registered");
    }
    resetForm();
  };

  const deductTokenSubmitHandler = (e) => {
    e.preventDefault();
    const amount = +amountDeductToken.current.value;
    const userAddress = deductWalletAddress.current.value;
    const note = deductNote.current.value;

    if(findWalletAddress(userAddress)){
      props.onDeductTokenSubmit(amount, userAddress, note);
    }else{
      alertError("The wallet address is not found in Gaming Service. Either the wallet is not registered with Gaming Service or has been de-registered");
    }
    resetForm();
  };

  return (
    <div className="accordion-list container--custom">
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
          <form onSubmit={grantTokenSubmitHandler} className="accordion-form">
            <div>
              <label htmlFor="token-amount">
                <h5>Enter Token amount: <span className="label-required">*</span> </h5>
              </label>
              <Input
                required
                ref={amountGrantToken}
                min="0"
                pattern="[0-9]"
                placeholder="Token Amount"
                className="input-main large"
                type="number"
                id="token-amount"
              />
            </div>
            
            <div>
              <label htmlFor="wallet-address">
                <h5>Destination Wallet address: <span className="label-required">*</span></h5>
              </label>
              <Input
                placeholder="Player’s wallet address"
                type="text"
                id="wallet-address"
                className="input-main large"
                ref={grantWalletAddress}
                required
              />
            </div>

            <div>
              <label htmlFor="transition-note">
                <h5>Transaction Note: <span className="label-required">*</span></h5>
              </label>
              <Input
                required 
                type="text" 
                id="wallet-address" 
                className="input-main large" 
                ref={grantNote} 
              />
            </div>

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
          <form onSubmit={deductTokenSubmitHandler} className="accordion-form">
            <div>
              <label htmlFor="token-amount">
                <h5>Enter Token amount: <span className="label-required">*</span> </h5>
              </label>
              <Input
                required
                ref={amountDeductToken}
                className="input-main large"
                placeholder="Token Amount"
                type="number"
                id="token-amount"
                min="0"
                pattern="[0-9]"
              />
            </div>
              
            <div>
              <label htmlFor="wallet-address">
                <h5>Originate Player’s wallet address: <span className="label-required">*</span></h5>
              </label>
              <Input
                placeholder="Player’s wallet address"
                type="text"
                id="wallet-address"
                className="input-main large"
                ref={deductWalletAddress}
                required
              />
            </div>

            <div>
              <label htmlFor="transition-note">
                <h5>Transaction Note: <span className="label-required">*</span></h5>
              </label>
              <Input 
                required 
                ref={deductNote} 
                type="text" 
                id="wallet-address" 
                className="input-main large"  
              />
            </div>

            <div className="form-actions">
              <Button className="btn-main">Deduct</Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
