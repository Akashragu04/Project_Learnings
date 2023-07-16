import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import InformationForm from './InformationForm';

const AddInformationTech = (props:any) => {
    const [getInitilValues, setInitilvalues] = React.useState<any>(null)

    React.useEffect(()=>{
        const getFieldData:any = {
            title:'',
            description:'',
            sub_list:[
                {
                    content:''
                }
            ]
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
    title={"Information Technolory"}
>
    {
        getInitilValues?
        <InformationForm getInitilContentValues={getInitilValues} handleClose={props.closeOpenAddForm} onSubmit={props.onSubmit}/>    
        :null
    }
    
    </AppDialog>
  )
}

export default AddInformationTech;