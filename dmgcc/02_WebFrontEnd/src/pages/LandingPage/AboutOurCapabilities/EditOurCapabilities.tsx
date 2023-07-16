import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import OurCapabilitiesForm from './OurCapabilitiesForm';

const EditOurCapabilities = (props:any) => {
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
    onClose={() => props.onClose()}
    title={"Update Capabilities"}
>
    {
        props.getInitilValues?
        <OurCapabilitiesForm getInitilValues={ props.getInitilValues} handleClose={props.onClose} 
        onSubmit={props.onSubmit} showViewContent={false} resCommonUpload={props.resCommonUpload} reqCommonUpload={props.reqCommonUpload}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default EditOurCapabilities;
