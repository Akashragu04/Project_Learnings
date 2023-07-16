import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Brightness1Icon from '@mui/icons-material/Brightness1';

const ItTableItem = (props?:any) => {
  return (
    <TableRow
    key={props.data.approver_email}
    sx={{
      "& .tableCell": {
        fontSize: 13,
        padding: 2,
        whiteSpace: "nowrap",
        "&:first-of-type": {
          pl: 5,
        },
        "&:last-of-type": {
          pr: 5,
        },
      },
    }}
    className="item-hover"
  >
    <TableCell align="left" className="tableCell">
      {props.data.description}
    </TableCell>
    <TableCell align="left" className="tableCell">
      {props.data.remark_comment}
    </TableCell>
    <TableCell align="left" className="tableCell">
      {props.data.quantity}
    </TableCell>
    <TableCell align="left" className="tableCell">
      {props.data.remaining_quantity}
    </TableCell>
    <TableCell align="left" className="tableCell">
      {props.data.cost}
    </TableCell>
    <TableCell align="left" className="tableCell">
      {props.data.cost_type}
    </TableCell>
    <TableCell align="left" className="tableCell">
      {props.data.target_date}
    </TableCell>
    <TableCell align="left" className="tableCell">
    <Brightness1Icon sx={{color:`${props.data.status_color || 'white'}`, fontSize:24, marginTop:5, marginRight:3}}/>
    </TableCell>
    <TableCell align="left" className="tableCell">
      {props.data.business_year}
    </TableCell>
    <TableCell align="left" className="tableCell">
      {props.data.remark}
    </TableCell>
  </TableRow>
  )
}

export default ItTableItem;
