import React from 'react'
import { Fonts } from "shared/constants/AppEnums"; //NOSONAR
import AppDialog from "@crema/core/AppDialog"; //NOSONAR
import ApprovalView from '@crema/commonservices/ApprovalView'; //NOSONAR

const ViewApprovalDetails = (props?:any) => {
  return (
    <AppDialog
    sxStyle={{
      "& .MuiDialog-paperWidthSm": {
        maxWidth: 800,
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
    open={props.showApprovalDetails}
    onClose={props.handleApprovalClose}
    title={"Business Case Approval Detail"}
  >
    {
      props.viewApproval?
      <ApprovalView viewApproval={props.viewApproval}/>
      :null
    }
  </AppDialog>
  )
}

export default ViewApprovalDetails;
