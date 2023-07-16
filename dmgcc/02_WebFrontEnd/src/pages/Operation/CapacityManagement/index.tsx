import React from 'react';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import CapacityManagement from './CapacityManagement';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { connect } from "react-redux";
import { OperationActionTypes } from '../../../saga/Types/OperationTypes';
import ResourceView from './ResourceView';
import SLAView from './SLAView';
import { Grid, Box } from "@mui/material";
import { reqAllocateResource, reqUpdateAllocateResource } from '../../../saga/Actions/operation.action';
import AppsContainer from '@crema/core/AppsContainer';
import AppsContent from '@crema/core/AppsContainer/AppsContent';
import messages from '@crema/services/db/messages';
import AllocateSidebar from './AllocateSidebar';

export const CapacityManagementView = (props?: any) => {
  const [projectView, setProjectView] = React.useState(true);
  const [resourceView, setResourceView] = React.useState(false);
  const [slaView, setSlaView] = React.useState(false);
  React.useEffect(() => {
    props.getCapacityManagementList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showProjectView = () => {
    props.getCapacityManagementList()
    setProjectView(true)
    setResourceView(false)
    setSlaView(false)
  }

  const showResourceView = () => {
    props.getCapacityResourceView()
    setProjectView(false)
    setResourceView(true)
    setSlaView(false)
  }

  const showSlaView = () => {
    props.getCapacitySLAView()
    setProjectView(false)
    setResourceView(false)
    setSlaView(true)
  }
  const postMapAllocateResource = (getPostRes?: any) => {
    props.reqAllocateResourceData(getPostRes)
    setTimeout(() => {
      props.getCapacityManagementList()
    }, 1000);
  }

  const postMapSLAResourceAllocate = (getPostRes?: any) => {
    props.reqAllocateResourceData(getPostRes)
    setTimeout(() => {
      props.getCapacitySLAView()
    }, 1000);
  }

  const updateCapacityData = (getCapacity?: any) => {
    props.reqUpdateAllocateResourceData(getCapacity)
    props.getCapacityManagementList()
  }

  const updateSLAResourceAllocate = (getCapacity?: any) => {
    props.reqUpdateAllocateResourceData(getCapacity)
    props.getCapacitySLAView()
  }

  return (
    <>
      <BreadcrumbsData menuList={breadCrumbValues} />
      <Box sx={{ marginBottom: 5 }} className="marginTop">
        <ButtonGroup variant='outlined' aria-label='outlined button group'>
          <Button variant={projectView ? "contained" : "outlined"} onClick={() => showProjectView()}>Project View</Button>
          <Button variant={resourceView ? "contained" : "outlined"} onClick={() => showResourceView()}>Resource View</Button>
          <Button variant={slaView ? "contained" : "outlined"} onClick={() => showSlaView()}>SLA View</Button>
        </ButtonGroup>
      </Box>


      <Grid container spacing={3}>
        {
          props.getCapacityResource && resourceView ?
            <ResourceView showResourceView={resourceView} getCapacityResource={props.getCapacityResource} />
            : null
        }
      </Grid>

      {/* This is used to project view start*/}
      {props.getCapacityManagement && projectView ?
        <AppsContainer
          title={messages["Project view"]}
          sidebarContent={
            props.getCapacityManagement && projectView && props.getCapacityManagement ?
              <React.Fragment>
                {
                  props.getCapacityManagement && projectView && props.getCapacityManagement ?
                    <AllocateSidebar getCapacityResource={props.getCapacityManagement}
                      getCapacityManagement={props.getCapacityManagement}
                      postMapAllocateResource={postMapAllocateResource} useInfo={props.authRole} />
                    : null
                }
                {
                  props.getCapacitySLA && slaView ?
                    <AllocateSidebar getCapacityResource={props.getCapacitySLA}
                      postMapAllocateResource={postMapSLAResourceAllocate} useInfo={props.authRole} />
                    : null
                }
              </React.Fragment>
              : null}
        >
          <AppsContent>
            <Box sx={{ padding: 2 }}>
              <Grid container spacing={3}>
                {props.getCapacityManagement && projectView ?
                  <CapacityManagement getCapacityManagement={props.getCapacityManagement}
                    showProjectView={projectView} reqUpdateAllocateResourceData={updateCapacityData} useInfo={props.authRole} />
                  : null}
              </Grid>
            </Box>
          </AppsContent>
        </AppsContainer>
        : null}
      {/* This is used to project view end*/}

        {/* This is used to SLA view start*/}
        {props.getCapacitySLA && slaView  ?
        <AppsContainer
          title={messages["Project view"]}
          sidebarContent={
            props.getCapacitySLA && slaView ?
              <React.Fragment>              
                {
                   props.getCapacitySLA && slaView?
                    <AllocateSidebar getCapacityResource={props.getCapacitySLA}
                    postMapAllocateResource={postMapSLAResourceAllocate} useInfo={props.authRole} />
                    : null
                }
              </React.Fragment>
              : null}
        >
          <AppsContent>
            <Box sx={{ padding: 2 }}>
              <Grid container spacing={3}>
              {
              props.getCapacitySLA && slaView ?
                <SLAView showSLAView={slaView} getCapacitySLA={props.getCapacitySLA}
                  reqUpdateAllocateResourceData={updateSLAResourceAllocate} useInfo={props.authRole} />
                : null
            }
              </Grid>
            </Box>
          </AppsContent>
        </AppsContainer>
        : null}
      {/* This is used to SLA view end*/}

    </>
  )
}

const breadCrumbValues = {
  title: 'Capacity Management',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: ''
}


const mapStateToProps = (state: any) => {
  return {
    loading: state.operationProcess.loading,
    getCapacityManagement: state.operationProcess.getCapacityManagement,
    getCapacitySLA: state.operationProcess.getCapacitySLA,
    getCapacityResource: state.operationProcess.getCapacityResource,
    authRole: state.auth.profileDetails
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    getCapacityManagementList: () => dispatch({ type: OperationActionTypes.GET_CAPACITY_MANAGEMENT_REQUEST }),
    getCapacityResourceView: () => dispatch({ type: OperationActionTypes.CAPACITY_RESOURCE_REQUEST }),
    getCapacitySLAView: () => dispatch({ type: OperationActionTypes.CAPACITY_SLA_REQUEST }),
    reqAllocateResourceData: (getPostValues?: any) => dispatch(reqAllocateResource(getPostValues)),
    reqUpdateAllocateResourceData: (getPostValues?: any) => dispatch(reqUpdateAllocateResource(getPostValues)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapacityManagementView);