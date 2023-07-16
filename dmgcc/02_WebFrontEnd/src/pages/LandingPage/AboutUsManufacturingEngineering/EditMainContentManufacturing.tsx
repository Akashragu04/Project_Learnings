import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import ManufacturingMainContentForm from './ManufacturingMainContentForm';

const EditMainContentManufacturing = (props:any) => {
   
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
    open={props.onOpenEditForm}
    onClose={() => props.closeOpenEditForm()}
    title={"Update Manufacturing - Main Content"}
>
    {
        props.getInitilValues?
        <ManufacturingMainContentForm getInitilValues={props.getInitilValues} handleClose={props.closeOpenEditForm} onSubmit={props.onSubmit}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default EditMainContentManufacturing;