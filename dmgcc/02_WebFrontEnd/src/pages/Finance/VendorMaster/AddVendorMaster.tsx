import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import VendorMasterForm from './VendorMasterForm';

const AddVendorMaster = (props?:any) => {
    const getFieldData:any = {
        vendorMaster: [
            {
                vendorid: "",
                code:'',
                name:''
            }
        ]
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
    open={props.openAddForm}
    onClose={() => props.closeOpenAddForm()}
    title={"Add Vendor"}
>
    <VendorMasterForm getFieldData={getFieldData} handleClose={props.closeOpenAddForm} onSubmit={props.onSubmitVendorMaster}/>
</AppDialog>
  )
}

export default AddVendorMaster;