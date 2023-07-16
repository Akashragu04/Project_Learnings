import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fonts } from 'shared/constants/AppEnums';

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
  <TableCell sx={{border:'1px solid #ccc'}}>S.No</TableCell>
    <TableCell sx={{border:'1px solid #ccc'}}>Description</TableCell>
    <TableCell sx={{border:'1px solid #ccc'}}>Values</TableCell>
    <TableCell sx={{border:'1px solid #ccc'}}>Remark/Comment</TableCell>
  </TableRow>
  )
}

export default TableHeadDetail;