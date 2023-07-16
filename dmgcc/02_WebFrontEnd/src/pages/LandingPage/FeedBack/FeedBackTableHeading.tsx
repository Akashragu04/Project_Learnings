import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fonts } from 'shared/constants/AppEnums';

const FeedBackTableHeading = (props?:any) => {
  return (
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
  <TableCell className="headerTitle">Please highlight your ratings (1 to 5)</TableCell>
    <TableCell className="headerTitle" sx={{textAlign:"center"}}>5 - Very satisfled</TableCell>
    <TableCell className="headerTitle" sx={{textAlign:"center"}}>4 - Satisfled</TableCell>
    <TableCell className="headerTitle" sx={{textAlign:"center"}}>3 - Neutral</TableCell>
    <TableCell className="headerTitle" sx={{textAlign:"center"}}>2 - Unsatisfled</TableCell>
    <TableCell className="headerTitle" sx={{textAlign:"center"}}>1 - Very Unsatisfled</TableCell>
    <TableCell className="headerTitle" sx={{textAlign:"center"}}>Remarks/Suggestions</TableCell>
  </TableRow>
  )
}

export default FeedBackTableHeading