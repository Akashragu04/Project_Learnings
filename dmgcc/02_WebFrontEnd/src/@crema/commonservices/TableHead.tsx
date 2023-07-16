import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fonts } from "../../shared/constants/AppEnums";

const TableHeadDetail = (props?:any) => {
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
  <TableCell sx={{border:'1px solid #ccc'}}>Quantity</TableCell>
    <TableCell>Cost</TableCell>
    <TableCell>Cost Type</TableCell>
    <TableCell>Description</TableCell>
    <TableCell>Remark/Comment</TableCell>
  </TableRow>
  )
}

export default TableHeadDetail;