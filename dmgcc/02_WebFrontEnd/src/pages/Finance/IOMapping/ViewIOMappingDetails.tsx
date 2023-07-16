import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { AppTableContainer } from '@crema';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const ViewIOMappingDetails = (props?:any) => {
  return (
<AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 800,
                    width: "100%",
                    height: 280
                },
                "& .MuiTypography-h6": {
                    fontWeight: Fonts.SEMI_BOLD,
                    backgroundColor: "#00677F",
                    color: "#ffffff"
                },
            }}
            dividers
            open={props.onOpen}
            onClose={() => props.onClose()}
            title={`Expenses Against IO Numbers`}
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
                            <TableCell sx={{ border: '1px solid #ccc' }}>Expense</TableCell>
                            <TableCell sx={{ border: '1px solid #ccc' }}>Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(props.data && props.data.length !== 0) &&
                            props.data.map((items?: any, index?: any) => (
                                <TableRow key={index} sx={{
                                    "& th": {
                                        fontSize: 13, padding: 2, whiteSpace: "nowrap",
                                        "&:first-of-type": {},
                                        "&:last-of-type": {},
                                    },
                                }} >
                                    <TableCell sx={{ border: '1px solid #ccc' }}>{items?.ionumber}</TableCell>
                                    <TableCell sx={{ border: '1px solid #ccc' }}>{items?.expense}</TableCell>
                                    <TableCell sx={{ border: '1px solid #ccc' }}>{items?.year}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </AppTableContainer>
</AppDialog>
  )
}

export default ViewIOMappingDetails