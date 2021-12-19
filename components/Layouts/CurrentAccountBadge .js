import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

function CurrentAccountBadge () {
    return (
        <div className='account-badge'>
            <CancelIcon />
            <div className='account-badge__title'>
                xxxxx Token <span className='token-id'>Fc5e...rpvv</span>
            </div>
        </div>
    )
}

export default CurrentAccountBadge 
