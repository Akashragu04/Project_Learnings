import React from 'react'
import { AppTableContainer } from '@crema';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

export const ProjectDetailsTable = (props:any) => {
  return (
    <AppTableContainer>
            <Table className="table" sx={{ border: "1px solid #ccc" }}>
                <TableBody>
                    <TableRow
                        sx={{
                            "& .tableCell": {
                                fontSize: 13,
                                padding: 3,
                                whiteSpace: "nowrap",
                                "&:first-of-type": {
                                    pl: 5,
                                },
                                "&:last-of-type": {
                                    pr: 5,
                                },
                            },
                        }}
                        className="item-hover"
                    >
                        <TableCell align="left" className="tableCell">
                            Project Profitability
                        </TableCell>
                        <TableCell align="left" className="tableCell">
                            {props.data && props.data.manpower_precentage?props.data.manpower_precentage:0}
                        </TableCell>
                    </TableRow>
                        <TableRow
                        sx={{
                            "& .tableCell": {
                                fontSize: 13,
                                padding: 3,
                                whiteSpace: "nowrap",
                                "&:first-of-type": {
                                    pl: 5,
                                },
                                "&:last-of-type": {
                                    pr: 5,
                                },
                            },
                        }}
                        className="item-hover"
                    >
                             <TableCell align="left" className="tableCell">
                           Quarterly Payment SLA
                        </TableCell>
                        <TableCell align="left" className="tableCell">
                        {props.data.sla_value}
                        </TableCell>
                    </TableRow>
                     
                        <TableRow
                        sx={{
                            "& .tableCell": {
                                fontSize: 13,
                                padding: 3,
                                whiteSpace: "nowrap",
                                "&:first-of-type": {
                                    pl: 5,
                                },
                                "&:last-of-type": {
                                    pr: 5,
                                },
                            },
                        }}
                        className="item-hover"
                    >
                            <TableCell align="left" className="tableCell">
                            Invoice Raised
                        </TableCell>
                        <TableCell align="left" className="tableCell">
                        {props.data.invoice_raised}
                        </TableCell>
                    </TableRow>
                               
                    <TableRow
                        sx={{
                            "& .tableCell": {
                                fontSize: 13,
                                padding: 3,
                                whiteSpace: "nowrap",
                                "&:first-of-type": {
                                    pl: 5,
                                },
                                "&:last-of-type": {
                                    pr: 5,
                                },
                            },
                        }}
                        className="item-hover"
                    >
                            <TableCell align="left" className="tableCell">
                            Rasource Utilization
                        </TableCell>
                        <TableCell align="left" className="tableCell">
                        {props.data.invoice_raised}
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </AppTableContainer>
  )
}
