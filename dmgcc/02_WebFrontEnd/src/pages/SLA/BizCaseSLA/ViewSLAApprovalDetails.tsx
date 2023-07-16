import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { TableContainer, Paper, Table, TableBody, TableCell, TableRow, Button } from '@mui/material';
import TableHeader from './SLAApprovalTable/TableHeader';
// import moment from 'moment';

const ViewSLAApprovalDetails = (props?:any) => {
  return (
<React.Fragment>
<AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: '60%',
                    width: "100%",
                    height: "auto"
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
            title={"View SLA Approval"}
        >
              <TableContainer component={Paper}>
                    <Table aria-label='simple table'>
                        <TableHeader/>
                    <TableBody>
{props.approvalInfo?
props.approvalInfo.map((items:any, index?:any)=>(
    <TableRow key={index}>
    <TableCell sx={{border:'1px solid #ccc'}}>{items.short_name}</TableCell>
    <TableCell sx={{border:'1px solid #ccc'}}>{items.name}</TableCell>
    <TableCell sx={{border:'1px solid #ccc'}}>{items.email}</TableCell>
    <TableCell sx={{border:'1px solid #ccc'}}>{items.sla_approve_date}</TableCell>
    <TableCell sx={{border:'1px solid #ccc'}} ><Button color={items.sla_approve?'success':'error'}>{items.sla_approve?'Approved':'Pending'}</Button></TableCell>
    </TableRow>
))
:null}
                        </TableBody>
                    </Table>
                    </TableContainer>
             </AppDialog>
</React.Fragment>
  )
}

export default ViewSLAApprovalDetails