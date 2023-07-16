import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const LeadConTableItem = (props?:any) => {
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
        {props.data.id}
      </TableCell>
      <TableCell align="left" className="tableCell">
        {props.data.project_name}
      </TableCell>
      </TableRow>
  )
}

export default LeadConTableItem;