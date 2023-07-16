import AppDialog from '@crema/core/AppDialog'
import React from 'react'
import { Fonts } from "shared/constants/AppEnums";
import SubContentForm from './SubContentForm';

 const EditSubContentForm = (props?:any) => {
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
    title={"Update Product Engineering Sub Content"}
>
    {
        props.getInitilValues?
        <SubContentForm getInitilContentValues={ props.getInitilValues} handleClose={props.generalCloseEditAction} onSubmit={props.onSubmit} showViewContent={false}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default EditSubContentForm;