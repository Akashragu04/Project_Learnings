import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import RateCardForm from './RateCardForm';

const AddRateCard = (props?: any) => {
  const getFieldData: any = {
    costcenter: '',
    team: '',
    department: '',
    ratecards: [
      {
        hourly_description: "",
        hourly_rate_inr:"",
        hourly_rate_usd:"",
        hourly_rate_ero:"",
        level: '',
        year: '',
      }
    ]
  }
  return (
    <AppDialog
      sxStyle={{
        "& .MuiDialog-paperWidthSm": {
          maxWidth: 1000,
          width: "100%"
        },
        "& .MuiTypography-h6": {
          fontWeight: Fonts.SEMI_BOLD,
          backgroundColor: "#00677F",
          color: "#ffffff"
        },
      }}
      dividers
      open={props.openRateCard}
      onClose={() => props.closeRateCard()}
      title={"Add Rate Card"}
    >
      <RateCardForm getFieldData={getFieldData} handleClose={props.closeRateCard} onSubmit={props.onSubmitRateCard} getCostCentreList={props.getCostCentreList} />
    </AppDialog>
  )
}

export default AddRateCard;