import React from 'react'
import { Fonts } from "shared/constants/AppEnums";
import AppDialog from "@crema/core/AppDialog";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import AppTableContainer from "@crema/core/AppTableContainer";
import TableHeadDetail from '../../../../../@crema/commonservices/TableHead';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const ItGridDetails = (props?: any) => {
    return (
        <AppTableContainer>
            <Table className="table">
                <TableHead>
                    <TableHeadDetail />
                </TableHead>
                <TableBody>
                    {props.businessRequirementDetails.map((items: any, i: any) => (
                        <TableRow
                            key={i}
                            sx={{
                                "& .tableCell": {
                                    fontSize: 13,
                                    padding: 2,
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
                                {items.quantity}
                            </TableCell>
                            <TableCell align="left" className="tableCell">
                                {items.cost}
                            </TableCell>
                            <TableCell align="left" className="tableCell">
                                {items.cost_type}
                            </TableCell>
                            <TableCell align="left" className="tableCell">
                                {items.description}
                            </TableCell>
                            <TableCell align="left" className="tableCell">
                                {items.remark}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AppTableContainer>
    )
}

export default ItGridDetails;