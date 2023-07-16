import React from 'react'
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Fonts } from "shared/constants/AppEnums";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import AppTableContainer from "@crema/core/AppTableContainer";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const ManpowerHiringcost = (props?: any) => {
    return (
        <>
            {
                props.manpowerHiringcost ?
                    props.manpowerHiringcost.map((items: any, i: any) => (
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                aria-controls='manpower' id='manpower' sx={{ backgroundColor: "#f5f3f3" }} >
                                <Typography variant={'h5'}>Level: {items.level} Total: {items.total} </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {
                                    items.properties ?
                                       
                                            <AppTableContainer>
                                                <Table className="table">
                                                    <TableHead>
                                                        <TableRow
                                                            sx={{
                                                                "& th": {
                                                                    fontSize: 13,
                                                                    padding: 2,
                                                                    fontWeight: Fonts.BOLD,
                                                                    "&:first-of-type": {
                                                                        pl: 5,
                                                                    },
                                                                    "&:last-of-type": {
                                                                        pr: 5,
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            <TableCell>Property Name</TableCell>
                                                            <TableCell>Property Value</TableCell>
                                                            <TableCell>Property Date</TableCell>
                                                            <TableCell>Year</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        { items.properties.map((properList: any, index: any) => (
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
                                                                    {items.property_name}
                                                                </TableCell>
                                                                <TableCell align="left" className="tableCell">
                                                                    {items.property_value}
                                                                </TableCell>
                                                                <TableCell align="left" className="tableCell">
                                                                    {items.property_date}
                                                                </TableCell>
                                                                <TableCell align="left" className="tableCell">
                                                                    {items.year}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </AppTableContainer>
                                       
                                        : null
                                }
                            </AccordionDetails>
                        </Accordion>
                    ))

                    : null}
        </>

    )
}

export default ManpowerHiringcost;