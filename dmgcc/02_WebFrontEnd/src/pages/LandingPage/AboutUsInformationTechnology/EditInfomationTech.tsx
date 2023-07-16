import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import InformationForm from './InformationForm';

export const EditInfomationTech = (props:any) => {
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
    onClose={() => props.closeOpenAddForm()}
    title={"Information Technolory"}
>
    {
        props.getInitilValues?
        <InformationForm getInitilContentValues={props.getInitilValues} handleClose={props.closeOpenAddForm} 
        onSubmit={props.onSubmit} onDeleteSubLine={props.onDeleteSubLine}/>    
        :null
    }
    
    </AppDialog>
  )
}
