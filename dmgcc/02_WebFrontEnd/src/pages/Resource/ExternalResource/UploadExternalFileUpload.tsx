import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import ExternalFileUpload from './ExternalFileUpload';

const UploadExternalFileUpload = (props:any) => {
  return (
    <AppDialog
    sxStyle={{
        "& .MuiDialog-paperWidthSm": {
            maxWidth: 800,
            width: "100%"
        },
        "& .MuiTypography-h6": {
            fontWeight: Fonts.SEMI_BOLD,
            backgroundColor: "#00677F",
            color: "#ffffff"
        },
    }}
    dividers
    open={props.openUploadFile}
    onClose={() => props.closeOpenUploadFile()}
    title={"Upload Resource"}
>
    <ExternalFileUpload handleClose={props.closeOpenUploadFile} onSubmit={props.onUploadFileSubmit}/>
</AppDialog>
  )
}

export default UploadExternalFileUpload;
