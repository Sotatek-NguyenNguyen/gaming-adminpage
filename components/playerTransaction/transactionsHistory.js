import React from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

function TransactionsHistory(){

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
    </>
  )
}

export default TransactionsHistory