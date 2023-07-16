import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fonts } from "../../../shared/constants/AppEnums";

const TableHeading = () => {
  return (
    <TableRow
    sx={{
      "& th": {
        fontSize: 13,
        padding: 2,
        fontWeight: Fonts.BOLD,
        "&:first-of-type": {
          pl: 5,
        },
        "&:last-of-type": {
          pr: 5,
        },
      },
    }}
  >
  <TableCell className='boardLine'>Approver name</TableCell>
    <TableCell className='boardLine'>Approver Email</TableCell>
    <TableCell className='boardLine'>Sequence Order</TableCell>
    <TableCell className='boardLine'>Status</TableCell>
  </TableRow>
  )
}

export default TableHeading;
