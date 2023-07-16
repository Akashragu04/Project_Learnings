import React from 'react'
import CommonMainContent from '../CommonFile/CommonMainContent';

const AddMainContentSupplierManagement = (props:any) => {
    const [getInitilValues, setInitilvalues] = React.useState<any>(null)

    React.useEffect(()=>{
        const getFieldData:any = {
            title:'',
            description:'',
        }
        setInitilvalues(getFieldData)
    },[])
    
    return (
        <React.Fragment>
      {
          getInitilValues?
          <CommonMainContent getInitilValues={getInitilValues} openAddForm={props.openAddForm} 
          handleClose={props.closeOpenAddForm} onSubmit={props.onSubmit}/>    
          :null
      }
      </React.Fragment>
      
  )
}

export default AddMainContentSupplierManagement