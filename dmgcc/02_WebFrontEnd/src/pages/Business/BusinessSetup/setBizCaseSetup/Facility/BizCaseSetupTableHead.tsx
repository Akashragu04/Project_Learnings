import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fonts } from "../../../../../shared/constants/AppEnums";

export const BizCaseSetupTableHead = (props?:any) => {
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
  <TableCell>Description</TableCell>
    <TableCell>Meeting Rooms/Seats/Others</TableCell>
    <TableCell>Quantity</TableCell>
    {/* <TableCell>To Buy</TableCell> */}
    <TableCell>Cost</TableCell>
    <TableCell>Cost Type</TableCell>
    <TableCell>Target Date</TableCell>
    <TableCell>Business Year</TableCell>
  </TableRow>
  )
}

