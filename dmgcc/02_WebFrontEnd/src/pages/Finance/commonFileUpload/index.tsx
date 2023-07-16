import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import UploadFile from './UploadFile';

const CommonFileUpload = (props?:any) => {
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
    title={"Upload"}
>
    <UploadFile handleClose={props.closeOpenUploadFile} onSubmit={props.onUploadFileSubmit}/>
</AppDialog>
  )
}

export default CommonFileUpload;