import React from 'react'
import { Button } from '@mui/material';
import DataTable from '../UI/Table/DataTable';

function Inventory(){
  const styleStatusTable = {
    color: "white",
    textTransform: "uppercase",
    border: "1px solid transparent",
    width: "80px",
    height: "30px",
    padding: "5px 7px"
  }
  const highlightLabel = {
    Active: {
      backgroundColor: "#008A25"
    },
    Minted: {
      backgroundColor: "#F4BF2A"
    }
  }
  const tableColumns = [
    { title: 'Status', field: 'status', style: styleStatusTable, highlightLabel: highlightLabel },
    { title: 'Item ID', field: 'id' },
    { title: 'Item Name', field: 'name' },
    { title: 'Create On', field: 'createOn'},
  ];
  const tablesData = [
    {
      status: "Active",
      id: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      name: 'test0',
      createOn: '2021-11-18 11:29:00',
    },
    {
      status: "Active",
      id: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      name: 'test1',
      createOn: '2021-11-18 11:29:00',
    },
    {
      status: "Active",
      id: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      name: 'test2',
      createOn: '2021-11-18 11:29:00',
    },
    {
      status: "Active",
      id: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      name: 'test3',
      createOn: '2021-11-18 11:29:00',
    },
    {
      status: "Minted",
      id: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      name: 'test4',
      createOn: '2021-11-18 11:29:00',
    },
    {
      status: "Minted",
      id: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      name: 'test5',
      createOn: '2021-11-18 11:29:00',
    },
    {
      status: "Active",
      id: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      name: 'test6',
      createOn: '2021-11-18 11:29:00',
    },
    {
      status: "Active",
      id: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      name: 'test7',
      createOn: '2021-11-18 11:29:00',
    },

    {
      status: "Minted",
      id: '4SDGDSG24DS5GDS31GSD3F2G1S5D4G1SDF2G1S3DGF1S5DF4G',
      name: 'test8',
      createOn: '2021-11-18 11:29:00',
    }
  ];

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
      
      <div style={{marginTop: 8}}>
        <DataTable columns={tableColumns} data={tablesData} tableMaxHeight={300} message="No item available"/>
      </div>
    </>
  )
}

export default Inventory