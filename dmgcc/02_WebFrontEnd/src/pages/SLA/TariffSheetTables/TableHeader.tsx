import React from 'react'
import { TableCell, TableHead, TableRow } from '@mui/material';
import { tariffSheetTableHeader } from '../SLACreation/Types';

const TableHeader = () => {
    return (
        <TableHead sx={{ backgroundColor: "#00677F", marginTop: 2 }}>
            <TableRow>
                {
                    tariffSheetTableHeader.map((items?: any, index?: any) => (
                        <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }} key={index}>{items.lable}</TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )
}

export default TableHeader