import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, Box } from "@mui/material";
import { connect } from 'react-redux'
import { ActionTypes } from "saga/sagas/Types"; //NOSONAR
import moment from 'moment';
import { RoutePermittedRole } from 'shared/constants/AppConst'; //NOSONAR

const TableItem = (props?: any) => {
  const resendMailUser = (getSendApproval?: any) => {
    props.resendMailUser(getSendApproval)
  }
  return (
    <TableRow
      key={props.data.approver_email}
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
      <TableCell align="left" className="tableCell boardLine">
        {props.data.approver_name}
      </TableCell>
      <TableCell align="left" className="tableCell boardLine">
        {props.data.approver_email}
      </TableCell>
      <TableCell align="left" className="tableCell boardLine">
        {props.data.sequence_level}
      </TableCell>

      <TableCell align="left" className="tableCell boardLine">
        {props.data.status ?
          <Box sx={{ marginTop: 2 }}>
            <Button color="success" variant="outlined" sx={{ padding: 1 }}>Approved</Button>
            <span
              style={{
                display: 'flex', flexDirection: 'row', textAlign: 'center', fontSize: 12, marginTop: 5, marginLeft: 2
              }}>{moment(new Date(props.data.approved_date)).format("MMM Do YY")}</span>
          </Box>
          : <>
            <Button color="secondary" variant="outlined" sx={{ padding: 1, marginRight: 2 }}>Pending</Button>
            {props.userDetails.roles === RoutePermittedRole.Admin
              || props.userDetails.roles === RoutePermittedRole.AdminBusiness
              || props.userDetails.roles === RoutePermittedRole.Business ?
              <Button color="info" variant="outlined" sx={{ padding: 1 }}
                onClick={() => resendMailUser(props.data)} disabled={props.data.email_status === 'Sent Email' ? false : true}>
                Resend Mail</Button>
              : null
            }

            {
              props.data.email_status === 'Sent Email' ?
                <Box sx={{ marginTop: 2 }}>
                  <span style={{ display: 'flex', flexDirection: 'row', color: 'red', textAlign: 'center', fontSize: 12 }}>{moment(new Date(props.data.request_date)).fromNow()}</span>
                </Box>
                : null
            }
          </>}
      </TableCell>
    </TableRow>
  )
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.profileDetails,
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    resendMailUser: (getResendMailValues?: any) => dispatch({ type: ActionTypes.RESEND_MAIL_REQUEST, value: getResendMailValues }),
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(TableItem) 
