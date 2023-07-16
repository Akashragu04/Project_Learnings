import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import ContectsForm from './ContectsForm';

const ViewContacts = (props:any) => {
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
    open={props.openViewDetails}
    onClose={() => props.onClose()}
    title={"View Capabilitie"}
>
    {
        props.getInitilValues?
        <ContectsForm getInitilValues={ props.getInitilValues} handleClose={props.onClose} 
        onSubmit={props.onSubmit} showViewContent={true}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default ViewContacts