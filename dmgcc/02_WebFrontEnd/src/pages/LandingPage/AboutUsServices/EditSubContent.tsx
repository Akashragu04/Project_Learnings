import AppDialog from '@crema/core/AppDialog'
import React from 'react'
import { Fonts } from "shared/constants/AppEnums";
import { SubContentForm } from './SubContentForm';

export const EditSubContent = (props:any) => {
    return (
        <AppDialog
        sxStyle={{
            "& .MuiDialog-paperWidthSm": {
                maxWidth: 900,
                width: "100%"
            },
            "& .MuiTypography-h6": {
                fontWeight: Fonts.SEMI_BOLD,
                backgroundColor: "#00677F",
                color: "#ffffff"
            },
        }}
        dividers
        open={props.openEditForm}
        onClose={() => props.generalCloseEditAction()}
        title={"Update Services - Sub Content"}
    >
        {
            props.getInitilValues?
            <SubContentForm getInitilValues={ props.getInitilValues} handleClose={props.generalCloseEditAction} 
            onSubmit={props.onSubmit} showViewContent={false} reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload}/>    
            :null
        }
        
        </AppDialog>
  )
}
