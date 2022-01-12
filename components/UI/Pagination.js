import React from "react";
import Pagination from '@mui/material/Pagination';

function PaginationCustom({totalPage, currentPage, onChange}) {
  return(
    <React.Fragment>
      {
        (totalPage > 1) 
        ? <Pagination 
            className="paginate_custom"
            count={totalPage} 
            page={currentPage}
            onChange={onChange}
            variant="outlined" 
            shape="rounded" 
          />
        : ''
      }
    </React.Fragment>
  );
} 

export default PaginationCustom;