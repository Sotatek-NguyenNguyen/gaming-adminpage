import { useRef, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Input from "./Input.js";
import Button from "./Button.js";
import { getJSON } from "../../common";
import { useGlobal, useGameBalance } from "../../hooks";

export default function SimpleAccordion(props) {
  const amountGrantToken = useRef();
  const grantWalletAddress = useRef();
  const grantNote = useRef();

  const amountDeductToken = useRef();
  const deductWalletAddress = useRef();
  const deductNote = useRef();
  const { getPlayerBalanceByAddress } = useGlobal();
  const { unallocatedInGameBalance } = useGameBalance();

  const [errors, setErrors] = useState(null);
  const [refresh, doRefresh] = useState(0);

  const resetForm = () => {
    amountGrantToken.current.value = "";
    grantWalletAddress.current.value = "";
    grantNote.current.value = "";
    doRefresh(prev => prev + 1);

    amountDeductToken.current.value = "";
    deductWalletAddress.current.value = "";
    deductNote.current.value = "";
  };

  const getWalletAddress = async (address) => {
    let result;

    try {
      let res = await getJSON(
        `/admin/users?page=1&pageSize=20&address=${address}`
      );

      if (res?.data?.[0]) {
        result = true;
      } else {
        result = false;
      }
    } catch (err) {
      throw err;
    }

    return result;
  };

  const findWalletAddress = async (address) => {
    let check = await getWalletAddress(address);
    return check;
  };

  const validateGrantTokenAmount = (amount, _errors) => {
    if (amount === ''){
        _errors['grantAmount'] = 'This field is required';
        return false;
    } else if (amount == 0) {
        _errors['grantAmount'] = 'Input Token amount must be larger than 0';
        return false;
    } else if (amount > unallocatedInGameBalance) {
        _errors['grantAmount'] = 'Grant Amount cannot be larger than Unallocated in-game balance';
        return false;
    } else{
        _errors['grantAmount'] = null;
        return true;
    } 
  };

  const validateDeductTokenAmount = (amount, playerBalance, _errors) => {
    if (amount === ''){
        _errors['deductAmount'] = 'This field is required';
        return false;
    } else if (amount == 0) {
        _errors['deductAmount'] = 'Input Token amount must be larger than 0';
        return false;
    } else if (amount > playerBalance) {
        _errors['deductAmount'] = "Input Token amount cannot be larger than Player Game Balance";
        return false;
    } else {
        _errors['deductAmount'] = null;
        return true;
    } 
  };

  const grantTokenSubmitHandler = async (e) => {
    e.preventDefault();
    const amount = amountGrantToken.current.value;
    const userAddress = grantWalletAddress.current.value;
    const note = grantNote.current.value;

    const _errors = {...errors};

    if(note.trim() == ''){
      _errors['noteGrant'] = 'This field is required';
    }else{
      _errors['noteGrant'] = null;
    }

    let checkAddress;

    if(userAddress.trim() === ''){
      checkAddress = false;
    }else{
      checkAddress = await findWalletAddress(userAddress);
    } 
    
    if(userAddress.trim() === ''){
      _errors['walletAddressGrant'] = 'This field is required';
    } else if(!checkAddress) {
      _errors['walletAddressGrant'] = 'The wallet address is not found in Gaming Service. Either the wallet is not registered with Gaming Service or has been de-registered';
    }else{
      _errors['walletAddressGrant'] = null;
    }

    const checkAmount = validateGrantTokenAmount(amount, _errors);

    if (checkAddress && checkAmount && note.trim() !== '') {
      setErrors(null);
      props.onGrantToKenSubmit(amount, userAddress, note);
      resetForm();
    } else {
      setErrors(_errors);
    }
  };

  const deductTokenSubmitHandler = async (e) => {
    e.preventDefault();
    const amount = amountDeductToken.current.value;
    const userAddress = deductWalletAddress.current.value;
    const note = deductNote.current.value;
    const playerBalance = await getPlayerBalanceByAddress(userAddress);
    
    const _errors = {...errors};

    if(note.trim() == ''){
      _errors['noteDeduct'] = 'This field is required';
    }else{
      _errors['noteDeduct'] = null;
    }

    let checkAddress;

    if(userAddress.trim() === ''){
      checkAddress = false;
    }else{
      checkAddress = await findWalletAddress(userAddress);
    } 

    if(userAddress.trim() === ''){
      _errors['walletAddressDeduct'] = 'This field is required';
    } else if(!checkAddress) {
      _errors['walletAddressDeduct'] = 'The wallet address is not found in Gaming Service. Either the wallet is not registered with Gaming Service or has been de-registered';
    }else{
      _errors['walletAddressDeduct'] = null;
    }

    const checkAmount = validateDeductTokenAmount(amount, playerBalance, _errors);
    
    if (checkAddress && checkAmount && note.trim() !== '') {
      setErrors(null);
      props.onDeductTokenSubmit(amount, userAddress, note);
      resetForm();
    } else {
      setErrors(_errors);
    }
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
                <h5>
                  Enter Token amount: <span className="label-required">*</span>{" "}
                </h5>
              </label>
              <Input
                ref={amountGrantToken}
                placeholder="Token Amount"
                className="input-main large"
                type="number"
                id="token-amount"
                error={errors?.grantAmount}
                resetValue={refresh}
              />
            </div>

            <div>
              <label htmlFor="wallet-address">
                <h5>
                  Destination Wallet address:{" "}
                  <span className="label-required">*</span>
                </h5>
              </label>
              <Input
                placeholder="Player’s wallet address"
                type="text"
                id="wallet-address"
                className="input-main large"
                ref={grantWalletAddress}
                error={errors?.walletAddressGrant}
              />
            </div>

            <div>
              <label htmlFor="transition-note">
                <h5>
                  Transaction Note: <span className="label-required">*</span>
                </h5>
              </label>
              <Input
                type="text"
                id="wallet-address"
                className="input-main large"
                ref={grantNote}
                error={errors?.noteGrant}
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
                <h5>
                  Enter Token amount: <span className="label-required">*</span>{" "}
                </h5>
              </label>
              <Input
                ref={amountDeductToken}
                className="input-main large"
                placeholder="Token Amount"
                type="number"
                id="token-amount"
                error={errors?.deductAmount}
                resetValue={refresh}
              />
            </div>

            <div>
              <label htmlFor="wallet-address">
                <h5>
                  Originate Player’s wallet address:{" "}
                  <span className="label-required">*</span>
                </h5>
              </label>
              <Input
                placeholder="Player’s wallet address"
                type="text"
                id="wallet-address"
                className="input-main large"
                ref={deductWalletAddress}
                error={errors?.walletAddressDeduct}
              />
            </div>

            <div>
              <label htmlFor="transition-note">
                <h5>
                  Transaction Note: <span className="label-required">*</span>
                </h5>
              </label>
              <Input
                ref={deductNote}
                type="text"
                id="wallet-address"
                className="input-main large"
                error={errors?.noteDeduct}
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
