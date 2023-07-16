import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import CommonMainContentForm from '../CommonFile/CommonMainContentForm';

export const AddMainContentCustomerServices = (props:any) => {
    const [getInitilValues, setInitilvalues] = React.useState<any>(null)

    React.useEffect(()=>{
        const getFieldData:any = {
            title:'',
            description:'',
        }
        setInitilvalues(getFieldData)
    },[])
   
  return (
    <AppDialog
    sxStyle={{
        "& .MuiDialog-paperWidthSm": {
            maxWidth: 900,
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
    title={"Add Customer Services Main Content"}
>
    {
        getInitilValues?
        <CommonMainContentForm getInitilValues={getInitilValues} handleClose={props.closeOpenAddForm} 
        onSubmit={props.onSubmit}/>    
        :null
    }
    
    </AppDialog>
  )
}
