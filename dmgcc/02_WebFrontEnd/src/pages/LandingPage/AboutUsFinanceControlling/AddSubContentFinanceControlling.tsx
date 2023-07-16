import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import CommonSubContentForm from '../CommonFile/CommonSubContentForm';

const AddSubContentFinanceControlling = (props:any) => {
    const [getInitilContentValues, setInitilContentvalues] = React.useState<any>(null)
    React.useEffect(() => {
        const getFieldData: any = {
            title: '',
            sub_list: [
                {
                    content: ''
                }
            ]
        }
        setInitilContentvalues(getFieldData)
    }, [])    
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
        title={"Add Finance Controlling Sub Content"}
    >
        {
            getInitilContentValues?
            <CommonSubContentForm getInitilContentValues={getInitilContentValues} handleClose={props.closeOpenAddContentForm} 
            showViewContent={false} onSubmit={props.onSubmit}/>
            :null
        }
  
            </AppDialog>
            )
}

export default AddSubContentFinanceControlling;