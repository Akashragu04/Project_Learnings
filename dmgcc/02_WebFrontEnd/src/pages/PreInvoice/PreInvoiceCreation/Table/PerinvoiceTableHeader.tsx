import React from 'react'
import { TableCell, TableRow } from '@mui/material';
import { perInvoiceList } from '../Types';

const PerinvoiceTableHeader = () => {
    return (
        <TableRow>
            {
                perInvoiceList ?
                    perInvoiceList.map((items: any, index?: any) => (
                        <TableCell key={index} sx={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>{items.lable}</TableCell>
                    ))
                    : null
            }
        </TableRow>
    )
}

export default PerinvoiceTableHeader;