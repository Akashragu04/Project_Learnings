import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import CommonMainContentForm from '../CommonFile/CommonMainContentForm';

export const EditMainContentCustomerServices = (props:any) => {
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
    onClose={() => props.closeOpenEditForm()}
    title={"Update Customer Services Main Content"}
>
    {
        props.getInitilValues?
        <CommonMainContentForm getInitilValues={props.getInitilValues} handleClose={props.closeOpenEditForm} 
        onSubmit={props.onSubmit}/>    
        :null
    }
    
    </AppDialog>
  )
}
