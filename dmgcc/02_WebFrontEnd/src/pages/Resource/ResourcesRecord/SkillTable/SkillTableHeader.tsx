import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fonts } from "../../../../shared/constants/AppEnums";

const SkillTableHeader = (props?: any) => {
    return (
        <TableRow
            sx={{
                "& th": {
                    fontSize: 13,
                    padding: 2,
                    fontWeight: Fonts.BOLD,
                    "&:first-of-type": {

                    },
                    "&:last-of-type": {

                    },
                },
            }}
        >
            <TableCell>S.No</TableCell>
            <TableCell>Secondary Skills</TableCell>
        </TableRow>
    )
}

export default SkillTableHeader;