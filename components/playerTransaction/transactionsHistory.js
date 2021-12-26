import React from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import DataTable from '../UI/Table/DataTable';

function TransactionsHistory(){
  const tableColumns = [
    { title: 'Status', field: 'status'},
    { title: 'Deposit Address', field: 'address' },
    { title: 'Deposit Amount', field: 'amount' },
    { title: 'TimeStamp', field: 'time'},
  ];
  const tablesData = [
    {
      status: "Deposited",
      address: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      amount: 0.5,
      id: 'G24DS5GDS3D3F2G1S5D4G1S',
      time: '2021-11-18 11:29:00',
    },
    {
      status: "Deposited",
      address: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      amount: 1,
      id: 'G24DS5GDS31GSDD4G1S',
      time: '2021-11-18 11:29:00',
    },
    {
      status: "Deposited",
      address: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      amount: 100,
      id: 'G24DS5GDSSD3F2G1S5D4G1S',
      time: '2021-11-18 11:29:00',
    },
    {
      status: "Deposited",
      address: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      amount: 1,
      id: 'S31GSD3F2G1S5D4G1S',
      time: '2021-11-18 11:29:00',
    },
    {
      status: "Deposited",
      address: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      amount: 1,
      id: 'GD31GSD3F2G1S5D4G1S',
      time: '2021-11-18 11:29:00',
    },
    {
      status: "Deposited",
      address: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      amount: 0.5,
      id: 'G24D1GSD3F2G1S5D4G1S',
      time: '2021-11-18 11:29:00',
    },
    {
      status: "Deposited",
      address: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      amount: 100,
      id: 'G24DS5GDS1S5D4G1S',
      time: '2021-11-18 11:29:00',
    },
    {
      status: "Deposited",
      address: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      amount: 100,
      id: 'G5GDS31GSD3F2G1S5S',
      time: '2021-11-18 11:29:00',
    },
    {
      status: "Deposited",
      address: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      amount: 1,
      id: '24DS5GD3F2G1S5D4G1S',
      time: '2021-11-18 11:29:00',
    },
    {
      status: "Deposited",
      address: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      amount: 100,
      id: 'GS5GDS31GSD3F25D4G1S',
      time: '2021-11-18 11:29:00',
    },

    {
      status: "Deposited",
      address: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      amount: 0.5,
      id: 'G1GSD3F2G1S5D4G1S',
      time: '2021-11-18 11:29:00',
    },
  ];

  return(
    <>
      <section className='card-custom card__transactions'>
        <h5 className='card__title'>Transaction search</h5>
        <div className='card__body'>
          <div>
            <label htmlFor='transactionID'>Enter transaction ID:</label>
            <input type='text' id='transactionID' />
          </div>
          
          <div className='filter-by-date'>
            <TextField
              id="date"
              label="From"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="To"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className='card__interactive'>
            <Button variant="outlined" className='btn-main--outline'>Clear</Button>
            <Button variant="contained" className='btn-main'>Search</Button>
          </div>
        </div>
      </section>

      <div style={{marginTop: 8}}>
        <DataTable columns={tableColumns} data={tablesData} tableMaxHeight={300} message="No transaction available"/>
      </div>
    </>
  )
}

export default TransactionsHistory