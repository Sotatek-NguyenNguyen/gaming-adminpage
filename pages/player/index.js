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
    { title: 'Player ID', field: 'id'},
    { title: 'Wallet Address', field: 'wallet' },
    { title: 'Create On', field: 'createOn'},
    { title: 'Status', field: 'status' }
  ];
  const tablesData = [
    {
      id: '1asdf125asdf13asf5sdh',
      wallet: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      createOn: '2021-11-18 11:29:00',
      status: 'Active'
    },
    {
      id: '1asdf125asdf13asf5sdh',
      wallet: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      createOn: '2021-11-18 11:29:00',
      status: 'Active'
    },
    {
      id: '1asdf125asdf13asf5sdh',
      wallet: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      createOn: '2021-11-18 11:29:00',
      status: 'Active'
    },
    {
      id: '1asdf125asdf13asf5sdh',
      wallet: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      createOn: '2021-11-18 11:29:00',
      status: 'Active'
    },
    {
      id: '1asdf125asdf13asf5sdh',
      wallet: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      createOn: '2021-11-18 11:29:00',
      status: 'Active'
    },
    {
      id: '1asdf125asdf13asf5sdh',
      wallet: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      createOn: '2021-11-18 11:29:00',
      status: 'Active'
    },
    {
      id: '1asdf125asdf13asf5sdh',
      wallet: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      createOn: '2021-11-18 11:29:00',
      status: 'Active'
    },
    {
      id: '1asdf125asdf13asf5sdh',
      wallet: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      createOn: '2021-11-18 11:29:00',
      status: 'Active'
    },

    {
      id: '1asdf125asdf13asf5sdh',
      wallet: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      createOn: '2021-11-18 11:29:00',
      status: 'Active'
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
        <DataTable columns={tableColumns} data={tablesData} tableMaxHeight={300} message="No transaction available"/>
      </div>

    </div>
  )
}

export default PlayerPage

PlayerPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
  