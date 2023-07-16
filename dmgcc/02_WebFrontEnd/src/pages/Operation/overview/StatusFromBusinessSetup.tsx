import React from 'react'
import { AppTableContainer } from '@crema';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

export const StatusFromBusinessSetup = (props:any) => {
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
                        Manpower cost
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
                           Facility
                        </TableCell>
                        <TableCell align="left" className="tableCell">
                        {props.data && props.data.facility_precentage? props.data.facility_precentage:""}
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
                            Overall project
                        </TableCell>
                        <TableCell align="left" className="tableCell">
                        {props.data && props.data.overall_project_status ?props.data.overall_project_status:''}
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
                            System Access
                        </TableCell>
                        <TableCell align="left" className="tableCell">
                        {props.data && props.data.system_access_precentage?props.data.system_access_precentage:'-'}
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
                            3th Party Services
                        </TableCell>
                        <TableCell align="left" className="tableCell">
                        {props.data && props.data.third_party_services_precentage?props.data.third_party_services_precentage:'-'}
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
                            3th Party Cost
                        </TableCell>
                        <TableCell align="left" className="tableCell">
                        {props.data && props.data.third_party_cost_precentage?props.data.third_party_cost_precentage:'-'}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </AppTableContainer>
  )
}
