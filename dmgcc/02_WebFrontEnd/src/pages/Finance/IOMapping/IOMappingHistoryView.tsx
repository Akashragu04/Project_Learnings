import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { TableBody, TableHead, Table, TableRow, TableCell } from '@mui/material';
import AppTableContainer from "@crema/core/AppTableContainer";

const IOMappingHistoryView = (props?: any) => {
    
    return (
        <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 800,
                    width: "100%"
                },
                "& .MuiTypography-h6": {
                    fontWeight: Fonts.SEMI_BOLD,
                    backgroundColor: "#00677F",
                    color: "#ffffff"
                },
            }}
            dividers
            open={props.openIOMapHistory}
            onClose={() => props.closeIOMapHistory()}
            title={`View IO History - ${props.projectResponse.project_name}`}
        >
            <AppTableContainer>
                <Table className="table" sx={{ border: '1px solid #ccc' }}>
                    <TableHead>
                        <TableRow sx={{
                            "& th": {
                                fontSize: 13, padding: 2, fontWeight: Fonts.BOLD,
                                "&:first-of-type": {},
                                "&:last-of-type": {},
                            },
                        }} >
                            <TableCell sx={{ border: '1px solid #ccc' }}>IO Number</TableCell>
                            <TableCell sx={{ border: '1px solid #ccc' }}>Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(props.projectResponse && props.projectResponse.ioMapping.length !== 0) &&
                            props.projectResponse.ioMapping.map((data?: any, index?: any) => (
                                <TableRow key={index} sx={{
                                    "& th": {
                                        fontSize: 13, padding: 2, whiteSpace: "nowrap",
                                        "&:first-of-type": {},
                                        "&:last-of-type": {},
                                    },
                                }} >
                                    <TableCell sx={{ border: '1px solid #ccc' }}>{data?.ionumber}</TableCell>
                                    <TableCell sx={{ border: '1px solid #ccc' }}>{data?.year}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </AppTableContainer>
        </AppDialog>
    )
}

export default IOMappingHistoryView;