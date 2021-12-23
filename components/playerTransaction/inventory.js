import React from 'react'
import { Button } from '@mui/material';

function Inventory(){

  return(
    <>
      <section className='card-custom card__inventory'>
        <h5 className='card__title'>Item search</h5>
        <div className='card__body'>
          <div>
            <label htmlFor='itemID'>Enter item ID:</label>
            <input type='text' id='itemID' />
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

export default Inventory