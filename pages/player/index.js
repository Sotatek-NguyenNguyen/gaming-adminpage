import React from 'react'
import Layout from "../../components/Layouts/Layout";
import Dropdown from "../../components/UI/Dropdown";
import { Button } from '@mui/material';

function PlayerPage() {
  const dropdownOptions = [
    {title: 'Most recent logins', value: 0},
    {title: 'Highest value to date', value: 1}
  ];

  return (
    <div className="container--custom players-contain">
      <section className='card-custom'>
        <h5 className='card__title'>Query</h5>
        <div className='card__body card__query'>
          <Dropdown options={dropdownOptions} className='query__dropdown' />
          <input type="text" placeholder="Search players" />
          <div className='card__interactive'>
            <Button variant="outlined" className='btn-main--outline'>Clear</Button>
            <Button variant="contained" className='btn-main'>Search</Button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default PlayerPage

PlayerPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
  