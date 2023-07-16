import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import FormForexRates from './FormForexRates';

const EditForexRates = (props?:any) => {
  const [getFiledDataList, setFiledDataList] = React.useState(null)
  React.useEffect(()=>{
    getField();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const getField = () => {
    if(props.resData){
      const getFieldData:any =   {
        id: props.resData.id,
        currency: props.resData.currency,
        to_inr: props.resData.to_inr,
        year:props.resData.year
    }
    setFiledDataList(getFieldData)
    } 
  }

  return (
    <AppDialog
    sxStyle={{
        "& .MuiDialog-paperWidthSm": {
            maxWidth: 800,
            width: "100%",
            height:300
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
    title={"Edit Forex Rates"}
>
  {getFiledDataList?
  <FormForexRates getFieldData={getFiledDataList} handleClose={props.closeForexRates} onSubmit={props.onEditSubmitForexRates}/>
  :null}
    
</AppDialog>
  )
}

export default EditForexRates;