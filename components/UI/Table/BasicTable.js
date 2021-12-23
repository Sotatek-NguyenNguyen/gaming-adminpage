import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ title, rows }) {
  return (
    <TableContainer sx={{ width: 342, height: 300 }} component={Paper}>
      <Table sx={{ minWidth: 342 }} aria-label="simple table">
        <TableHead sx={{background: '#F9FAFB'}}>
          <TableRow sx={{fontWeight: 'bold'}}>
            <TableCell style={{ textTransform: "uppercase" }}>
              <div
                style={{ fontWeight: "bold", 
                width: "115px", 
                height: "39px",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #DFDFDF',
                borderRadius: '4px',
                background: '#FFF'
              }}
              >
                {title}
              </div>
            </TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="right">Amount</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="right">Change</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.change}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
