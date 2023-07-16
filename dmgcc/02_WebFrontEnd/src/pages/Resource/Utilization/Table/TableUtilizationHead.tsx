import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fonts } from "../../../../shared/constants/AppEnums";

const TableUtilizationHead = () => {
  return (
    <TableRow
    sx={{
        backgroundColor: "#00677F",
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
    <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 50, border:'1px solid #ffffff' }}>S.No</TableCell>
    <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 100, border:'1px solid #ffffff' }}>HR ID</TableCell>
    <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 150, border:'1px solid #ffffff' }}>Employee</TableCell>
    <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 250, border:'1px solid #ffffff' }}>Current Projects</TableCell>
    <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 100, border:'1px solid #ffffff' }}>Current Utilization</TableCell>
    <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 350, border:'1px solid #ffffff' }}>YTD Utilization</TableCell>
</TableRow>
  )
}

export default TableUtilizationHead;