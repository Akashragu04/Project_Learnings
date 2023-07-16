import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fonts } from "../../../../shared/constants/AppEnums";

const RateCardTableHeader = (props?:any) => {
  return (
    <TableRow
    sx={{
      "& th": {
        fontSize: 13,
        padding: 2,
        fontWeight: Fonts.BOLD,
        "&:first-of-type": {
         
        },
        "&:last-of-type": {
          
        },
      },
    }}
  >
  <TableCell>Hourly Description</TableCell>
  <TableCell>Hourly Rate EUR</TableCell>
  <TableCell>Hourly Rate INR</TableCell>
  <TableCell>Hourly Rate USD</TableCell>
  <TableCell>Level</TableCell>
  <TableCell>Year</TableCell>
  </TableRow>
  )
}

export default RateCardTableHeader;