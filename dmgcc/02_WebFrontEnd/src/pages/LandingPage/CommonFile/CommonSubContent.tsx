import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import CommonSubContentForm from './CommonSubContentForm';

const CommonSubContent = (props:any) => {
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
    open={props.openSubContentForm}
    onClose={() => props.onCloseSubContentAction()}
    title={props.title}
>
    {
        props.getInitilValues?
        <CommonSubContentForm getInitilContentValues={ props.getInitilValues} handleClose={props.onCloseSubContentAction} 
        onSubmit={props.onSubmit} showViewContent={props.showViewContent}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default CommonSubContent