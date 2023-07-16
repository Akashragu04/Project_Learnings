import AppDialog from '@crema/core/AppDialog'
import React from 'react'
import { Fonts } from "shared/constants/AppEnums";
import CommonMainContentForm from '../CommonFile/CommonMainContentForm';

const EditMainContentSupplierManagement = (props:any) => {
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
    onClose={() => props.onCloseEditAction()}
    title={"Update Supplier Management Main Content"}
>
    {
        props.getInitilValues?
        <CommonMainContentForm getInitilValues={ props.getInitilValues} handleClose={props.generalCloseEditAction} onSubmit={props.onSubmit}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default EditMainContentSupplierManagement