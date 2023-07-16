import AppDialog from '@crema/core/AppDialog'
import React from 'react'
import { Fonts } from "shared/constants/AppEnums";
import TestimanicalForm from './TestimanicalForm';

const EditTestimonical = (props:any) => {
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
    title={"Update Testimonical"}
>
    {
        props.getInitilValues?
        <TestimanicalForm getInitilValues={ props.getInitilValues} handleClose={props.generalCloseEditAction} 
        reqCommonUpload={props.reqCommonUpload} resCommonUpload={props.resCommonUpload} onSubmit={props.onSubmit}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default EditTestimonical