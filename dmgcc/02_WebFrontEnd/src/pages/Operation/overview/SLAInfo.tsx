import React from 'react'
import { AppTableContainer } from '@crema';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const SLAInfo = (props:any) => {
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
                            SLA Value
                        </TableCell>
                        <TableCell align="left" className="tableCell">
                            {props.data.slavalue}
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
                            Budget
                        </TableCell>
                        <TableCell align="left" className="tableCell">
                        {props.data.budget}
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
                            Delta
                        </TableCell>
                        <TableCell align="left" className="tableCell">
                        {props.data.delta}
                        </TableCell>
                    </TableRow>
                   
                </TableBody>
            </Table>
        </AppTableContainer>
    )
}

export default SLAInfo;
