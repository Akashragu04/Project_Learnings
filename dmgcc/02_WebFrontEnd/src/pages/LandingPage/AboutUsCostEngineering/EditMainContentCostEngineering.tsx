import AppDialog from '@crema/core/AppDialog'
import React from 'react'
import { Fonts } from "shared/constants/AppEnums";
import CommonMainContentForm from '../CommonFile/CommonMainContentForm';

const EditMainContentCostEngineering = (props:any) => {
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
    title={"Update Cost Engineering Main Content"}
>
    {
        props.getInitilValues?
        <CommonMainContentForm getInitilValues={ props.getInitilValues} handleClose={props.onCloseEditAction} onSubmit={props.onSubmit}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default EditMainContentCostEngineering;