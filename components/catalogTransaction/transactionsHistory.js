import React, {useState, useEffect, useRef, useCallback} from 'react'
import Button from "../../components/UI/Button.js";
import DataTable from '../UI/Table/DataTable';
import {  getJSON } from "../../common.js";
import SearchIcon from '@mui/icons-material/Search';

import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import { createTheme, ThemeProvider} from '@mui/material/styles';


function TransactionsHistory(){
  const [transactionData, setTransactionsData] = useState([]);
  const [endpoint, setEndpoint] = useState(['/admin/users/transactions?page=1&pageSize=20']);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(new Date());
  
  const styleWalletAddress = {
    color: '#00C48C'
  }
  const styleStatusTable = {
    textTransform: 'capitalize',
    color: "white",
    border: "1px solid transparent",
    borderRadius: "32px",
    width: "120px",
    height: "45px",
    fontSize: "16px",
    letterSpacing: "0.8",
    lineHeight: "34px",
    padding: "5px 7px"
  }
  const highlightLabel = {
    deposit: {
      backgroundColor: "#00C48C"
    },
    withdrawn: {
      backgroundColor: "#FFA803"
    },
    deducted: {
      backgroundColor: "#FFA803"
    },
    granted: {
      backgroundColor: "#FFA803"
    }
  }
  const tableColumns = [
    { title: 'Status', field: 'type', style: styleStatusTable, highlightLabel: highlightLabel},
    { title: 'Wallet Address', field: 'userAddress', style: styleWalletAddress, prefixLink: '/player'},
    { title: 'Amount', field: 'amount' },
    { title: 'Transaction ID', field: 'transactionId'},
    { title: 'Transaction Note', field: 'note'},
    { title: 'TimeStamp', field: 'createdAt', isDate: true},
  ];

  const removePrefix = (transactionType) => transactionType.split("_")[1] + 'ed';

  const getTransactionHistory = useCallback(()=>{
      getJSON(`${endpoint}`)
      .then(res => {
        const _transactionHistory = [...res.data];

        _transactionHistory.map( transaction => {
          if(transaction.type === "admin_deduct" || transaction.type === "admin_grant"){
            return transaction.type = removePrefix(transaction.type);
          }
        });

        setTransactionsData(_transactionHistory);
      })
      .catch (err => {throw err})
  },[endpoint]);
  useEffect(()=>{
    getTransactionHistory()
  },[getTransactionHistory]);

  const transactionIdRef = useRef(null);

  const checkSameDay = (day1, day2) => day1.setHours(0,0,0,0) == day2.setHours(0,0,0,0);

  const search = (event) => {
    event.preventDefault();
    const currentEndpoint = '/admin/users/transactions?page=1&pageSize=20';
    
    if(fromDate !== null){
      let fromDateFormat = fromDate?.toISOString().split('T')[0];
      let toDateFormat = toDate?.toISOString().split('T')[0];

      if(checkSameDay(fromDate, toDate)){
        fromDateFormat = new Date(fromDate.setHours(0, 0, 0, 0)).toISOString();
        toDateFormat = new Date(fromDate.setHours(23, 59, 59, 999)).toISOString();
      }
      
      currentEndpoint += `&fromDate=${fromDateFormat}&toDate=${toDateFormat}`;
    }
    if(transactionIdRef.current.value !== ''){
      currentEndpoint += `&transactionId=${transactionIdRef.current.value}`;
    }
    
    setEndpoint(currentEndpoint);
  }

  const clearQuery = () => {
    transactionIdRef.current.value = '';
    setFromDate(null);
    setToDate(new Date());

    const endpointDefault = '/admin/users/transactions?page=1&pageSize=20';
    setEndpoint(endpointDefault);
  }

  const materialTheme = createTheme({
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: '#9F99B3',
        },
      },
      MuiPickersBasePicker:{
        pickerView:{
          justifyContent: 'flex-start'
        }
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          backgroundColor: '#9F99B3',
          color: "white",
          marginBottom: '0px',
          marginTop: '0px',
          height: '41px',
          padding: '0px 25px',
        },
        iconButton:{
          width: '24px',
          height: '24px',
          borderRadius: '6px',
          color: 'white',
          backgroundColor: '#200064'
        },
        daysHeader: {
          backgroundColor: '#9F99B3',
          maxHeight: '25px',
          height: '25px',
        },
        dayLabel: {
          color: 'white',
          lineHeight: '21px',
        }
      },
      MuiPickersDay: {
        day: {
          color: '#120037',
        },
        daySelected: {
          color: 'white',
          backgroundColor: '#200064',
        },
        dayDisabled: {
          color: '#9F99B3',
        },
        current: {
          color: '#120037',
          backgroundColor: '#EEDFF2',
        },
      }
    },
  });

  return(
    <>
      <section className='card-custom card__transactions'>
        <h5 className='card__title'>Transaction search</h5>
        <form className='card__body' onSubmit={search}>
          <div className='search-by-id'>
            <label htmlFor='transactionID'>Enter transaction ID <span className="label-required">*</span></label>
            <input type='text' id='transactionID' className='input-main large' ref={transactionIdRef}/>
          </div>
          
          <div className='filter-by-date'>
            <ThemeProvider theme={materialTheme}>
              <DatePicker
                placeholder='dd/mm/yyyy'
                value={fromDate}
                onChange={setFromDate}
                disableFuture={true}
                format="dd/MM/yyyy"
                InputProps={{ readOnly: true }}
                renderInput={(params) => <TextField {...params} />}
              />
            </ThemeProvider>

            <ThemeProvider theme={materialTheme}>
              <DatePicker
                placeholder='dd/mm/yyyy'
                value={toDate}
                onChange={setToDate}
                disableFuture={true}
                format="dd/MM/yyyy"
                InputProps={{ readOnly: true }}
                renderInput={(params) => <TextField {...params} />}
              />
            </ThemeProvider>
          </div>

          <div className='card__interactive'>
            <Button className='btn-main' type="submit">
              <SearchIcon /> <span>Search</span>
            </Button>

            <Button className='btn-main--clear' onClick={clearQuery}>Clear</Button>
          </div>
        </form>
      </section>

      <div style={{marginTop: 8}}>
        <DataTable columns={tableColumns} data={transactionData} message="No transaction available"/>
      </div>
    </>
  )
}

export default React.memo(TransactionsHistory)