import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

const TableHeader = () => {
  return (
    <TableHead sx={{ marginTop: 2 }}>
    <TableRow>
    <TableCell sx={{ fontWeight: 'bold', fontSize: 14, border:'1px solid #ccc' }} >Short #</TableCell>
    <TableCell sx={{ fontWeight: 'bold', fontSize: 14, border:'1px solid #ccc' }} >Name</TableCell>
    <TableCell sx={{ fontWeight: 'bold', fontSize: 14, border:'1px solid #ccc' }} >Email Id</TableCell>
    <TableCell sx={{ fontWeight: 'bold', fontSize: 14, border:'1px solid #ccc' }} >Approve Date</TableCell>
    <TableCell sx={{ fontWeight: 'bold', fontSize: 14, border:'1px solid #ccc' }} >Status</TableCell>
    </TableRow>
</TableHead>
  )
}

export default TableHeader