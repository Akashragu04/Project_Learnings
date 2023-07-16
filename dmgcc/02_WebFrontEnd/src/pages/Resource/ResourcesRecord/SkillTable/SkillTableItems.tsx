import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const SkillTableItems = (props?: any) => {
    return (
        <TableRow
            key={props.indexValues}
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
            <>
                <TableCell sx={{ border: '1px solid #ccc' }}>{props.indexValues + 1}</TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>{props.data.secondaryskill}</TableCell>
            </>

        </TableRow>
    )
}

export default SkillTableItems;