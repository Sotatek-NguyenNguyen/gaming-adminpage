import React, {useState, useEffect, useRef, useCallback} from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import DataTable from '../UI/Table/DataTable';
import {  getJSON } from "../../common.js";

function TransactionsHistory(){
  const [transactionData, setTransactionsData] = useState([]);
  const [endpoint, setEndpoint] = useState(['/admin/users/transactions?page=1&pageSize=20']);
  const [query] = useState({
    transactionId: '',
    fromDate: new Date(new Date().getTime() - 24*60*60*1000).toISOString().split('T')[0], // from yesterday
    toDate: new Date(new Date().getTime() + 24*60*60*1000).toISOString().split('T')[0] // from tomorrow
  })

  const tableColumns = [
    { title: 'Status', field: 'type'},
    { title: 'Wallet Address', field: 'userAddress' },
    { title: 'Amount', field: 'amount' },
    { title: 'Transaction ID', field: 'transactionId'},
    { title: 'TimeStamp', field: 'createdAt'},
  ];

  const getTransactionHistory = useCallback(()=>{
      getJSON(`${endpoint}`)
      .then(res => {
        setTransactionsData(res.data);
      })
      .catch (err => {throw err})
  },[endpoint]);
  useEffect(()=>{
    getTransactionHistory()
  },[getTransactionHistory]);

  const transactionIdRef = useRef(null);
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  const search = (event) => {
    event.preventDefault();
    const currentEndpoint = '/admin/users/transactions?page=1&pageSize=20';
    let newEndpoint = `${currentEndpoint}&fromDate=${fromDateRef.current.value}&toDate=${toDateRef.current.value}`;
    if(transactionIdRef.current.value !== ''){
        newEndpoint += `&transactionId=${transactionIdRef.current.value}`;
    }
    
    setEndpoint(newEndpoint);
  }

  const clearQuery = () => {
    transactionIdRef.current.value = query.transactionId;
    fromDateRef.current.value = query.fromDate;
    toDateRef.current.value = query.toDate;

    const endpointDefault = '/admin/users/transactions?page=1&pageSize=20';
    setEndpoint(endpointDefault);
  }

  return(
    <>
      <section className='card-custom card__transactions'>
        <h5 className='card__title'>Transaction search</h5>
        <form className='card__body' onSubmit={search}>
          <div>
            <label htmlFor='transactionID'>Enter transaction ID <span className="label-required">*</span></label>
            <input type='text' id='transactionID' ref={transactionIdRef}/>
          </div>
          
          <div className='filter-by-date'>
            <TextField
              id="date"
              label="From"
              type="date"
              defaultValue={query.fromDate}
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={fromDateRef}
            />
            <TextField
              id="date"
              label="To"
              type="date"
              defaultValue={query.toDate}
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={toDateRef}
            />
          </div>

          <div className='card__interactive'>
            <Button variant="outlined" className='btn-main--outline' onClick={clearQuery}>Clear</Button>
            <Button variant="contained" type="submit" className='btn-main'>Search</Button>
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