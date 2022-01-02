import React, {useCallback} from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function DataTable({ columns, data, tableMaxRows, message}) {
  const styleTable = {
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.4)",
  }
  const setMaxHeightBodyTable = {
    maxHeight: `calc(80px * ${tableMaxRows})`,
  }
  const styleRowNoItem ={
    height: "80px",
    lineHeight: "80px",
    textAlign: "center"
  }
  const styleTextOverflow = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    display:"block",
    margin: "0px auto"
  }
  const styleLabel = (style, highlightLabel, label) => {
    let styleLabel = {...styleTextOverflow};
    if(style){
      styleLabel = {...styleLabel, ...style}
    }
    if(highlightLabel && highlightLabel[label]){
      styleLabel = {...styleLabel, ...style, ...highlightLabel[label]}
    }
    return styleLabel;
  }

  function renderMessageIfEmptyData(){
    if(data.length > 0 ) return;

    return (
      <TableRow
        colSpan={columns.length}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        style={styleRowNoItem}
      > 
        <TableCell align="center">{message}</TableCell>
      </TableRow>
    );
  }

  const checkNotEmptyArr = (array) => Array.isArray(array) && array.length > 0;
  const renderData = useCallback((fieldCustom, value)=>{
    if(fieldCustom && checkNotEmptyArr(fieldCustom)){
      return fieldCustom.map((item, index) => {
        return(
          <React.Fragment key={`${value[item]}-${index}`}>
            {value[item]} <br />
          </React.Fragment>
        );
      })
    }else{
      return(<React.Fragment>{value}</React.Fragment>);
    }
  }, []);

  return (
    <>
      <TableContainer style={styleTable} component={Paper}>
        <Table className="table--custom" aria-label="simple table">
          <TableHead sx={{background: '#F9FAFB'}}>
            <TableRow sx={{fontWeight: 'bold'}} style={{height: 64}}>
              {
                columns.map( col => {
                  return (
                    <TableCell 
                      key={col.title} 
                      sx={{fontWeight: 'bold'}} 
                      style={{height: 'auto !important'}} 
                      align="center"
                    >
                      {col.title}
                    </TableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>

          <TableBody style={setMaxHeightBodyTable}>
            { renderMessageIfEmptyData() }

            {data.map((item, index) => (
              <TableRow
                key={`${item[columns[0].field]}-${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={{height: 80}}
              >
                {
                  columns.map( col => {
                    return (
                      <TableCell key={col.field} align='center' style={{height: 'auto !important'}}>
                        {
                          col.prefixLink 
                          ? <a style={styleLabel(col.style, col.highlightLabel, item[col.field])} 
                               href={`${col.prefixLink}/${item[col.field]}`}
                            >
                              {renderData(col.fieldChildWillGet, item[col.field])}
                            </a>
                          : <span 
                               style={styleLabel(col.style, col.highlightLabel, item[col.field])}
                            >
                               {renderData(col.fieldChildWillGet, item[col.field])}
                            </span>
                        }
                      </TableCell>
                    )
                  })
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

DataTable.defaultProps = {
  columns: [],
  data: [],
  tableMaxRows: 10,
  message: 'No item available',
};

export default DataTable;