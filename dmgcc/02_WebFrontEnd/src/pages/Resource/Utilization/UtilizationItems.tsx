import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CircularProgressWithLabel from '@crema/commonservices/CircularProgress';

const UtilizationItems = (props?:any) => {
  return (
    <TableRow
    key={props.key}
    sx={{
      "& .tableCell": {
        fontSize: 13,
        padding: 2,
        whiteSpace: "nowrap",
        "&:first-of-type": {
          
        },
        "&:last-of-type": {
          
        },
      },
    }}
    className="item-hover"
  >
      <TableCell sx={{border:'1px solid #ccc'}}>{props.data.project}</TableCell>
         <TableCell sx={{border:'1px solid #ccc'}}><CircularProgressWithLabel value={props.data.working}/></TableCell>
      </TableRow>
  )
}

export default UtilizationItems;