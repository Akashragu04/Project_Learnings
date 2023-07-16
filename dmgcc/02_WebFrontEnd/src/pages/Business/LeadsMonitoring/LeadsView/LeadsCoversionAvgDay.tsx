import React from 'react';
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import LeadConversionRollBased from './LeadConversionRollBased';

const LeadsCoversionAvgDay = (props?:any) => {
  return (
    <AppDialog
    sxStyle={{
        "& .MuiDialog-paperWidthSm": {
            maxWidth: '60%',
            width: "100%",
            height: "auto"
        },
        "& .MuiTypography-h6": {
            fontWeight: Fonts.SEMI_BOLD,
            backgroundColor: "#00677F",
            color: "#ffffff"
        },
    }}
    dividers
    open={props.show}
    onClose={() => props.closeLeadsConAvg(false)}
    title={"Leads Conversion Avg. Days"}
>
<LeadConversionRollBased leadConversion={props.leadConversion} leadsData={props.leadsData}/>
</AppDialog>
  )
}

export default LeadsCoversionAvgDay;