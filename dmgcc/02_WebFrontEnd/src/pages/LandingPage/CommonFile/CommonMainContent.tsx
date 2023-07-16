import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import CommonMainContentForm from './CommonMainContentForm';

const CommonMainContent = (props:any) => {
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
    open={props.openAddForm}
    onClose={() => props.handleClose()}
    title={"Update Main Content"}
>
    {
        props.getInitilValues?
        <CommonMainContentForm getInitilValues={props.getInitilValues} handleClose={props.handleClose} onSubmit={props.onSubmit}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default CommonMainContent