import React, {useState, useEffect, useRef, useCallback} from 'react'
import Button from "../../components/UI/Button.js";
import DataTable from '../UI/Table/DataTable';
import {  getJSON } from "../../common.js";
import { ADMIN_PAGE_BACKEND_URL } from "../../config";

function Inventory(){
  const [inventory, setInventory] = useState([]);
  const [endpoint, setEndpoint] = useState(['users/nft?page=1&pageSize=20']);
  const [isQuery, setIsQuery] = useState(false);

  const getInventory = useCallback(()=>{
    getJSON(`${ADMIN_PAGE_BACKEND_URL}/${endpoint}`)
    .then(res => {
      // fake field status, item name
      const inventoryCustom = res.data.data.map(inventory => {
        inventory.status = "Active";
        inventory.name = "NFT";

        return inventory;
      });
      setInventory(inventoryCustom);
    })
    .catch (err => {throw err})
  },[endpoint]);

  useEffect(()=>{
    getInventory();
  },[getInventory]);

  const itemIdRef = useRef(null);
  const search = () => {
    if(itemIdRef.current.value.trim() === '') return;
    const currentEndpoint = 'users/nft?page=1&pageSize=20';
    const newEndpoint = `${currentEndpoint}&address=${itemIdRef.current.value}`;
    setEndpoint(newEndpoint);
    setIsQuery(true);
  };
  const clearQuery = () => {
    itemIdRef.current.value = '';
    if(inventory.length === 0 && isQuery){
      const oldEndpoint = 'users/nft?page=1&pageSize=20';
      setEndpoint(oldEndpoint);
    }
  };

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
  const styleLinkTable = {
    color: "#1A85D8"
  }
  const tableColumns = [
    { title: 'Status', field: 'status', style: styleStatusTable, highlightLabel: highlightLabel },
    { title: 'Item ID', field: 'id' },
    { title: 'Item Name', field: 'name' },
    { title: 'Create On', field: 'createdAt'},
    { title: 'Owning Player address', field: 'userAddress', style: styleLinkTable}
  ];

  return(
    <>
      <section className='card-custom card__inventory'>
        <h5 className='card__title'>Item search</h5>
        <div className='card__body'>
          <div>
            <label htmlFor='itemID'>Enter item ID:</label>
            <input type='text' id='itemID' ref={itemIdRef}/>
          </div>
          <div className='card__interactive'>
            <Button className='btn-main--outline' onClick={clearQuery}>Clear</Button>
            <Button className='btn-main' onClick={search}>Search</Button>
          </div>
        </div>
      </section>
      
      <div style={{marginTop: 8}}>
        <DataTable columns={tableColumns} data={inventory} tableMaxHeight={300} message="No item available"/>
      </div>
    </>
  )
}

export default React.memo(Inventory)