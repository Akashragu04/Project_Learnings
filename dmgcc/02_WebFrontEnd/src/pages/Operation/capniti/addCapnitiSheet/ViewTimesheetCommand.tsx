import React from 'react'
import { Box } from '@mui/material';
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";

const ViewTimesheetCommand = (props?: any) => {
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
            open={props.ShowTimesheetCommant}
            onClose={() => props.closeViewTimesheetDetails()}
            title={`View ${props.getTimesheet.statu}`}
        >
          <Box>
              {
                  props.getTimesheet.statu === 'Task'?
                  <Box>{props.getTimesheet.data.task_name}</Box>
                  :<Box>{ props.getTimesheet.data.comments}</Box>
              }
          </Box>
        </AppDialog>
    )
}

export default ViewTimesheetCommand;