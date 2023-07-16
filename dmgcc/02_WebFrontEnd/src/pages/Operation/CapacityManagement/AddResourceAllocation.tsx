import React from 'react'
import { Box } from '@mui/material';
import { Fonts } from "shared/constants/AppEnums";
import AppDialog from "@crema/core/AppDialog";
import MapResourceForm from './MapResourceForm';
import {fieldAllocateKey} from './Types';
import { connect } from "react-redux";
import { OperationActionTypes } from 'saga/Types/OperationTypes';
import {reqTaskSLASuccess} from '../../../saga/Actions'

const AddResourceAllocation = (props?:any) => {
  const [getFieldAllocate, setFieldAllocate] = React.useState({})

  React.useEffect(()=>{
    props.getTaskProject()
  if(props.getEmployeeDetails && props.getEmployeeDetails !== null){
    const fieldAllocateList:fieldAllocateKey = {
      userid: props.getEmployeeDetails.id,
      hrid:  props.getEmployeeDetails.hrid,
      resource_name:  props.getEmployeeDetails.emp_name,
      resource_email:  props.getEmployeeDetails.email,
      resource_shortid:  props.getEmployeeDetails.shortid,
      level:  props.getEmployeeDetails.level,
      capcity:'',
      project_code:'',
      sla_code:''
  }
  setFieldAllocate(fieldAllocateList)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
const getTaskSLAListData = (getProjectId?:any) =>{
  props.getTaskSLAList(getProjectId)
}
  return (
    <AppDialog
    sxStyle={{
      "& .MuiDialog-paperWidthSm": {
        maxWidth: 800,
        Width: 800,
        // width: "100%",
        height: "auto"
      },
      "& .MuiTypography-h6": {
        fontWeight: Fonts.SEMI_BOLD,
        backgroundColor: "#00677F",
        color: "#ffffff"
      },
    }}
    dividers
    open={props.showResourceAllocate}
    onClose={props.closeAvailableResource}
    title={"Allocate Capacity"}
  >
        <Box sx={{ marginTop: 1 }}>
          {
            getFieldAllocate?
            <MapResourceForm getFieldAllocate={getFieldAllocate} getProjectList={props.getProjectList} getTaskSLAListData={getTaskSLAListData} 
            getTaskSlaByProject={props.getTaskSlaByProject} postMapAllocateResource={props.postMapAllocateResource} 
            closeAvailableResource={props.closeAvailableResource}/>            
            :null
          }
        {/* <UpdateSkillData handleSkillUpdateClose={props.handleSkillUpdateClose} getEmployeeInfo={props.getEmployeeInfo}/> */}
        </Box>
</AppDialog>
  )
}



const mapStateToProps = (state: any) => {
  return {
      loading: state.operationProcess.loading,
      getProjectList: state.operationProcess.getTaskProjectList,
      getTaskSlaByProject: state.operationProcess.getTaskSlaByProject,
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {     
    getTaskProject: () => dispatch({ type: OperationActionTypes.GET_TASK_GETPROJECT_REQUEST }),
    getTaskSLAList: (getProjectId?: any) => dispatch(reqTaskSLASuccess(getProjectId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddResourceAllocation);

// export default AddResourceAllocation;