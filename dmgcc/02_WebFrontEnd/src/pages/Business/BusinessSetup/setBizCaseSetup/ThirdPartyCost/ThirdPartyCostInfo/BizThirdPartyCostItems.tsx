import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const BizThirdPartyCostItems = (props?:any) => {
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
      {props.data.remark?props.data.remark:'-'}
    </TableCell>
    <TableCell align="left" className="tableCell">
      {props.data.quantity}
    </TableCell>
    <TableCell align="left" className="tableCell">
      {props.data.cost?props.data.cost:'-'}
    </TableCell>
    <TableCell align="left" className="tableCell">
      {props.data.cost_type && props.data.cost_type !=="" ? props.data.cost_type:"-"}
    </TableCell>
    <TableCell align="left" className="tableCell">
      {props.data.target_date}
    </TableCell>
    <TableCell align="left" className="tableCell">
      {props.data.business_year && props.data.business_year !=="" ?props.data.business_year:"-"}
    </TableCell>
  </TableRow>
  )
}

export default BizThirdPartyCostItems;
