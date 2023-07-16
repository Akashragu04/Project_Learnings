import AppDialog from '@crema/core/AppDialog'
import React from 'react'
import { Fonts } from "shared/constants/AppEnums";
import { VisionForm } from './VisionForm';

 const EditVission = (props:any) => {
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
    onClose={() => props.onCloseEditForm()}
    title={"Update Vision"}
>
    {
        props.getInitilValues?
        <VisionForm getInitilValues={ props.getInitilValues} handleClose={props.onCloseEditForm} 
        onSubmit={props.onSubmit}
        reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} showViewContent={false}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default EditVission;
