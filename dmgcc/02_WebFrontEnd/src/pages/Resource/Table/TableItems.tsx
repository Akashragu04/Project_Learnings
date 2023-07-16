import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const TableItems = (props?:any) => {
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
      <TableCell>FTE</TableCell>
        {
      props.data?
      props.data.map((tableHead:any, index:any)=>(
        <TableCell key={index} sx={{border:'1px solid #ccc'}}>{tableHead.fte}</TableCell>
      ))
      :null
  }
      </TableRow>
  )
}

export default TableItems;