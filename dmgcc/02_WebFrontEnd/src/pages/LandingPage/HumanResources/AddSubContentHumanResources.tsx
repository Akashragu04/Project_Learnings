import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import SubContentHumanResource from './SubContentHumanResource';

 const AddSubContentHumanResources = (props:any) => {
    const [getInitilContentValues, setInitilContentvalues] = React.useState<any>(null)

    React.useEffect(() => {
        const getFieldData: any = {
            sub_list: [
                {
                    content: ''
                }
            ]
        }
        setInitilContentvalues(getFieldData)
    }, [])

    const goBack = () =>{
props.closeOpenAddContentForm()
    } 
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
    open={props.openAddContentForm}
    onClose={() => props.closeOpenAddContentForm()}
    title={"Add Human Resources Sub Content"}
>
   <SubContentHumanResource getInitilContentValues={getInitilContentValues} goBack={goBack} showViewContent={false} onSubmit={props.onSubmit}/>
        </AppDialog>
  )
}

export default AddSubContentHumanResources;