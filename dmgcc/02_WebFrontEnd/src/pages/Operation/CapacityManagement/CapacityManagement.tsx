import React from 'react'
import ViewProjectSLADetails from './ViewProjectSLADetails';
import ResourceProjectView from './ResourceProjectView';

const CapacityManagement = (props?: any) => {
  const [getCapacityUpdate, setCapacityUpdate] = React.useState(null)
  const [openSLADetails, setOpenSLADetails] = React.useState(false)
  const getProjectData = (getValues?: any) => {
    setCapacityUpdate(getValues)
    setOpenSLADetails(true)
  }
  const closeDialogBox = () => {
    setOpenSLADetails(false)
  }

  return (
    <React.Fragment>
      {
        getCapacityUpdate && openSLADetails?
        <ViewProjectSLADetails openSLADetails={openSLADetails} closeDialogBox={closeDialogBox} 
        getCapacityUpdate={getCapacityUpdate} reqUpdateAllocateResourceData={props.reqUpdateAllocateResourceData}  useInfo={props.useInfo}/>
        :null
      }
      
      {
        props.getCapacityManagement && props.showProjectView ?
          props.getCapacityManagement.projectview.map((projectItem?: any, i?: any) => {
            return (<React.Fragment key={i}>
              
              <ResourceProjectView projectItem={projectItem} getProjectData={getProjectData} useInfo={props.useInfo}/>
            </React.Fragment>)
          })
          : null
      }
    </React.Fragment>

  )
}

export default CapacityManagement;