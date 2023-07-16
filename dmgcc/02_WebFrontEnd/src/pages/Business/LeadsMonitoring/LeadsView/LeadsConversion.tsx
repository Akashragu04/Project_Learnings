import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import LeadConversionView from './LeadConversionView';

const LeadsConversion = (props?: any) => {
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
            onClose={() => props.closeLeadsCon(false)}
            title={"Leads Conversion"}
        >
            {props.getleadConversion && props.getleadConversion !== null?
            <LeadConversionView getleadConversion={props.getleadConversion}/>
                : null}

        </AppDialog>
    )
}

export default LeadsConversion;