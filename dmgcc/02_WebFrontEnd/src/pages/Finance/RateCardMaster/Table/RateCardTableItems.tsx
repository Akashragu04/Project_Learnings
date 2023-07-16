import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const RateCardTableItems = (props?: any) => {
    return (
        <TableRow
            key={props.index}
            sx={{
                "& .tableCell": {
                    fontSize: 13,
                    padding: 2,
                    whiteSpace: "nowrap",
                    "&:first-of-type": {

                    },
                    "&:last-of-type": {

                    },
                },
            }}
            className="item-hover"
        >
            <TableCell sx={{ border: '1px solid #ccc' }}>{props.data.hourly_description ? props.data.hourly_description : '-'}</TableCell>
            <TableCell sx={{ border: '1px solid #ccc' }}>{props.data.hourly_rate_ero ? props.data.hourly_rate_ero : '-'}</TableCell>
            <TableCell sx={{ border: '1px solid #ccc' }}>{props.data.hourly_rate_inr ? props.data.hourly_rate_inr : '-'}</TableCell>
            <TableCell sx={{ border: '1px solid #ccc' }}>{props.data.hourly_rate_usd ? props.data.hourly_rate_usd : '-'}</TableCell>
            <TableCell sx={{ border: '1px solid #ccc' }}>{props.data.level ? props.data.level : '-'}</TableCell>
            <TableCell sx={{ border: '1px solid #ccc' }}>{props.data.year ? props.data.year : '-'}</TableCell>
        </TableRow>
    )
}

export default RateCardTableItems;