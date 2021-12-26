import React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function DataTable({ columns, data, tableMaxHeight, message}) {
  const styleTable = {
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.4)",
  }
  const setMaxHeightBodyTable = {
    maxHeight: tableMaxHeight,
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
  return (
    <>
      <TableContainer style={styleTable} component={Paper}>
        <Table className="table--custom" aria-label="simple table">
          <TableHead sx={{background: '#F9FAFB'}}>
            <TableRow sx={{fontWeight: 'bold'}}>
              {
                columns.map( col => {
                  return (<TableCell key={col.title} sx={{fontWeight: 'bold'}} align="center">{col.title}</TableCell>)
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
              >
                {
                  columns.map( col => {
                    return (
                      <TableCell key={col.field} align='center'>
                        {
                          col.prefixLink 
                          ? <a style={styleLabel(col.style, col.highlightLabel, item[col.field])} 
                               href={`${col.prefixLink}/${item[col.field]}`}
                            >
                               {item[col.field]}
                            </a>
                          : <span 
                               style={styleLabel(col.style, col.highlightLabel, item[col.field])}>
                               {item[col.field]}
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
  tableMaxHeight: 500,
  message: 'No item available',
};

export default DataTable;