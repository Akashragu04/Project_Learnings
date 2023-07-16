import AppDialog from '@crema/core/AppDialog'
import React from 'react'
import { Fonts } from "shared/constants/AppEnums";
import SubContentHumanResource from './SubContentHumanResource';

 const EditSubContentHumanResources = (props:any) => {
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
    title={"Update Human Resources Main Content"}
>
    {
        props.getInitilValues?
        <SubContentHumanResource getInitilContentValues={ props.getInitilValues} handleClose={props.generalCloseEditAction} 
        onSubmit={props.onSubmit} showViewContent={false}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default EditSubContentHumanResources;