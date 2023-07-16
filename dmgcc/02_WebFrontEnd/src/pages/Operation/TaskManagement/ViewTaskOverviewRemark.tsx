import React from 'react'
import { Box } from '@mui/material';
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";

const ViewTaskOverviewRemark = (props?:any) => {
  return (
    <AppDialog
    sxStyle={{
        "& .MuiDialog-paperWidthSm": {
            maxWidth: 800,
            width: "100%",
            height:200
        },
        "& .MuiTypography-h6": {
            fontWeight: Fonts.SEMI_BOLD,
            backgroundColor: "#00677F",
            color: "#ffffff"
        },
    }}
    dividers
    open={props.openTaskOverview}
    onClose={() => props.closeViewTaskOverview()}
    title={props.getTaskStatus ==='view'?'View Task Description':'Reopen Comments'}
>
{/* reopenComments */}
{
  props.getTaskStatus ==='view'?
  <Box>
     {props.getTaskOverviewInfo.taskdescription?props.getTaskOverviewInfo.taskdescription:'No Data'}
  </Box>
  :
  <Box>
     {props.getTaskOverviewInfo.reopenComments?props.getTaskOverviewInfo.reopenComments:'No Data'}
  </Box>
}
  
</AppDialog>
  )
}

export default ViewTaskOverviewRemark;