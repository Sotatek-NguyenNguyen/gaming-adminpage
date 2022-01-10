import React, {useState, useEffect, useRef, useCallback} from 'react'
import Button from "../../components/UI/Button.js";
import DataTable from '../UI/Table/DataTable';
import {  getJSON } from "../../common.js";
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";

function Inventory(){
  const [inventory, setInventory] = useState([]);
  const router = useRouter();
  const [endpoint, setEndpoint] = useState([`/admin/users/nft?page=1&pageSize=20&userAddress=${router.query.playerId}`]);

  const getInventory = useCallback(()=>{
    getJSON(`${endpoint}`)
    .then(res => {
      // fake field status, item name
      const _inventory = [...res.data];
      const inventoryCustom = _inventory.map(inventory => {
        const gameItemName = inventory.gameItemName ?? ' ';
        const itemsNameToArr = gameItemName.split(' ');
        const typeCustom = itemsNameToArr[0];
        const nameCustom = (gameItemName.length > 1) ? itemsNameToArr.slice(1).join(' ') : ' ';

        inventory.name = {
          type: typeCustom,
          name: nameCustom
        };

        if(inventory.status === 'MetadataUploading'){
           inventory.status = 'Active';
        }

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
    const currentEndpoint = `/admin/users/nft?page=1&pageSize=20&userAddress=${router.query.playerId}`;
    const newEndpoint = `${currentEndpoint}&gameItemId=${itemIdRef.current.value}`;
    setEndpoint(newEndpoint);
  };
  const clearQuery = () => {
    itemIdRef.current.value = '';
    const endpointDefault = `/admin/users/nft?page=1&pageSize=20&userAddress=${router.query.playerId}`;
    setEndpoint(endpointDefault);
  };

  const styleStatusTable = {
    color: "white",
    textTransform: "uppercase",
    border: "1px solid transparent",
    borderRadius: "32px",
    width: "80px",
    height: "40px",
    lineHeight: "31px",
    padding: "5px 7px"
  }
  const highlightLabel = {
    Active: {
      backgroundColor: "#00C48C"
    },
    Minted: {
      backgroundColor: "#FFA803"
    }
  }
  const styleLinkTable = {
    color: "#1A85D8"
  }
  const styleFieldName = {
    textAlign: 'left',
    display: 'inline-block',
    width: 'auto',
    marginLeft: '8px'
  }
  const tableColumns = [
    { title: 'Status', field: 'status', style: styleStatusTable, highlightLabel: highlightLabel },
    { title: 'Item ID', field: 'gameItemId' },
    { title: 'Item Name', field: 'name', fieldChildWillGet: ['type', 'name'], style: styleFieldName},
    { title: 'Create On', field: 'createdAt', isDate: true}
  ];

  return(
    <>
      <section className='card-custom card__inventory'>
        <h5 className='card__title'>Item search</h5>
        <div className='card__body'>
          <div className='search-by-id'>
            <label htmlFor='itemID'>Enter item ID <span className="label-required">*</span> </label>
            <input type='text' id='itemID' className="input-main large" ref={itemIdRef}/>
          </div>
          <div className='card__interactive'>
            <Button className='btn-main' onClick={search}>
              <SearchIcon /> <span>Search</span>
            </Button>
            <Button className='btn-main--clear' onClick={clearQuery}>Clear</Button>
          </div>
        </div>
      </section>
      
      <div style={{marginTop: 8}}>
        <DataTable columns={tableColumns} data={inventory} message="No item available"/>
      </div>
    </>
  )
}

export default React.memo(Inventory)