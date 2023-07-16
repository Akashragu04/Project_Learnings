import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { TableBody, TableHead, Table } from '@mui/material';
import AppTableContainer from "@crema/core/AppTableContainer";
import RateCardTableHeader from './Table/TableHeader';
import RateCardTableItems from './Table/RateCardTableItems';

const OpenRateCardView = (props?:any) => {
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
    open={props.openRateCard}
    onClose={() => props.closeRateCard()}
    title={"Hourly Rate"}
>
<AppTableContainer>
                <Table className="table" sx={{ border: '1px solid #ccc' }}>
                    <TableHead>
                        <RateCardTableHeader />
                    </TableHead>
                    <TableBody>
                        {
                            props.RateCardMasterList ?
                            props.RateCardMasterList.ratecards.map((data?: any, index?:any) => (
                                    <RateCardTableItems data={data} key={index} getKey={index}/>
                                ))
                                : null
                        }
                    </TableBody>
                </Table>
            </AppTableContainer>
</AppDialog>
  )
}

export default OpenRateCardView;