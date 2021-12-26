import React from 'react'
import Layout from "../../components/Layouts/Layout";
import Dropdown from "../../components/UI/Dropdown";
import { Button } from '@mui/material';
import DataTable from '../../components/UI/Table/DataTable';

function PlayerPage() {
  const dropdownOptions = [
    {title: 'Most recent logins', value: 0},
    {title: 'Highest value to date', value: 1}
  ];
  const tableColumns = [
    { title: 'User ID', field: 'id'},
    { title: 'Username', field: 'name' },
    { title: 'Age', field: 'age'},
    { title: 'Email', field: 'email' },
    { title: 'Country', field: 'country' }
  ];
  const tablesData = [
    {
      id: '2233',
      name: 'test01',
      age: 21,
      email: 'test01@gmail.com',
      country: 'VietNam'
    },
    {
      id: 'asdf',
      name: 'test03',
      age: 21,
      email: 'test01@gmail.com',
      country: 'VietNam'
    },
    {
      id: 'djf',
      name: 'test04',
      age: 21,
      email: 'test01@gmail.com',
      country: 'VietNam'
    },
    {
      id: 'afd',
      name: 'test05',
      age: 21,
      email: 'test01@gmail.com',
      country: 'VietNam'
    },
    {
      id: 'djf',
      name: 'test04',
      age: 21,
      email: 'test01@gmail.com',
      country: 'VietNam'
    },
    {
      id: 'afd',
      name: 'test05',
      age: 21,
      email: 'test01@gmail.com',
      country: 'VietNam'
    },
    {
      id: 'djf',
      name: 'test04',
      age: 21,
      email: 'test01@gmail.com',
      country: 'VietNam'
    },
    {
      id: 'afd',
      name: 'test05',
      age: 21,
      email: 'test01@gmail.com',
      country: 'VietNam'
    },
    {
      id: 'djf',
      name: 'test04',
      age: 21,
      email: 'test01@gmail.com',
      country: 'VietNam'
    },
    {
      id: 'afd',
      name: 'test05',
      age: 21,
      email: 'test01@gmail.com',
      country: 'VietNam'
    }
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

      <div style={{marginTop: 8}}>
        <DataTable columns={tableColumns} data={[]} tableMaxHeight={300} message="No transaction available"/>
      </div>

    </div>
  )
}

export default PlayerPage

PlayerPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
  