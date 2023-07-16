import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import EditVendorMasterForm from './EditVendorMasterForm';

const EditVendorMaster = (props?:any) => {
    const getFieldData:any = {
        vendorid:props.resData.vendorid,
        code:props.resData.code,
        name:props.resData.name
    }
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
    open={props.openEditForm}
    onClose={() => props.closeOpenEditForm()}
    title={"Edit Vendor"}
>
    <EditVendorMasterForm getFieldData={getFieldData} handleClose={props.closeOpenEditForm} onSubmit={props.onEditSubmitVendorMaster}/>
</AppDialog>
  )
}
 
export default EditVendorMaster;