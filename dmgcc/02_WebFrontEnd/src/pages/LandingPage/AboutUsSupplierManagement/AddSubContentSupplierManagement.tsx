import React from 'react'
import CommonSubContent from '../CommonFile/CommonSubContent';

const AddSubContentSupplierManagement = (props:any) => {
    const [getInitilValues, setInitilContentvalues] = React.useState<any>(null)
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
<React.Fragment>
    {
        getInitilValues?
        <CommonSubContent getInitilValues={getInitilValues} openSubContentForm={props.openSubContentForm} 
        onCloseSubContentAction={props.closeOpenAddContentForm} 
   showViewContent={props.showViewContent} title={props.title} onSubmit={props.onSubmit}/>
        :null
    }
   
        </React.Fragment>
  )
}

export default AddSubContentSupplierManagement