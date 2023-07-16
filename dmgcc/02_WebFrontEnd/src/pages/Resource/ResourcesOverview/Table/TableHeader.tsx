import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fonts } from "../../../../shared/constants/AppEnums";

const TableHeader = (props?:any) => {
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
  <TableCell>Level</TableCell>
  {
      props.tableHeaderField?
      props.tableHeaderField.map((tableHead:any, index:any)=>(
        <TableCell key={index} sx={{border:'1px solid #ccc'}}>{tableHead.level}</TableCell>
      ))
      :null
  }
  </TableRow>
  )
}

export default TableHeader;