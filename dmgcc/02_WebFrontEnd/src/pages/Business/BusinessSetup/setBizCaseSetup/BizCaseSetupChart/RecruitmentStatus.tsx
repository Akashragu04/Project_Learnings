import React from 'react'
import { AppTableContainer } from '@crema';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const RecruitmentStatus = (props: any) => {
    return (
        <React.Fragment>
            <AppTableContainer>
                <Table className="table" sx={{ border: "1px solid #ccc", height:305 }}>
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
                                Sourcing
                            </TableCell>
                            <TableCell align="left" className="tableCell">
                               {props.data && props.data.sourcing?props.data.sourcing:0}
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
                                Shortlisted
                            </TableCell>
                            <TableCell align="left" className="tableCell">                                
                               {props.data && props.data.shortlisted?props.data.shortlisted:0}
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
                                Interview
                            </TableCell>
                            <TableCell align="left" className="tableCell">                                
                               {props.data && props.data.interview?props.data.interview:0}
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
                            Offer Accepted
                            </TableCell>
                            <TableCell align="left" className="tableCell">                                
                               {props.data && props.data.offer_accepted?props.data.offer_accepted:0}
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
                                LOI
                            </TableCell>
                            <TableCell align="left" className="tableCell">                                
                               {props.data && props.data.loi?props.data.loi:0}
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
                                Onboard
                            </TableCell>
                            <TableCell align="left" className="tableCell">                                
                               {props.data && props.data.onboard?props.data.onboard:0}
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </AppTableContainer>
        </React.Fragment>
    )
}

export default RecruitmentStatus;
