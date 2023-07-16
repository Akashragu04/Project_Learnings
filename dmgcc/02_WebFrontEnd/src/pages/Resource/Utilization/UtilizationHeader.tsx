import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fonts } from "../../../shared/constants/AppEnums";

const UtilizationHeader = (props?:any) => {
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
  <TableCell sx={{border:'1px solid #ccc'}}>Current Projects</TableCell>
    <TableCell sx={{border:'1px solid #ccc'}}>Current Utilization</TableCell>
  </TableRow>
  )
}

export default UtilizationHeader;