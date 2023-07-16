import AppDialog from '@crema/core/AppDialog'
import React from 'react'
import { Fonts } from "shared/constants/AppEnums";
import UpdateProductForm from './UpdateProductForm';

export const EditMainContent = (props?:any) => {
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
    onClose={() => props.onCloseForm()}
    title={"Update Main Content"}
>
    {
        props.getInitilValues?
        <UpdateProductForm getInitilValues={ props.getInitilValues} handleClose={props.onCloseForm} onSubmit={props.onSubmit}/>    
        :null
    }
    
    </AppDialog>
  )
}
