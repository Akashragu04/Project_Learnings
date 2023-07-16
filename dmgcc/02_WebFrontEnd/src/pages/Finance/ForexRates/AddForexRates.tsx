import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import AddForexRatesForm from './AddForexRatesForm';
// import AddCostCenterForm from './AddCostCentreForm';

const AddForexRates = (props?:any) => {
    const getFieldData:any = {
        teams: [
            {
                currency: "",
                to_inr:'',
                year:''
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
    open={props.openForexRates}
    onClose={() => props.closeForexRates()}
    title={"Add Forex Rates"}
>
    <AddForexRatesForm getFieldData={getFieldData} handleClose={props.closeForexRates} onSubmit={props.onSubmitForexRates}/>
</AppDialog>
  )
}

export default AddForexRates;