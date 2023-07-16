import React from 'react'
import { Grid, Box } from '@mui/material';
import ResourceButtonOption from './ResourceButtonOption';
import ApprovedPositions from './ApprovedPositions';
import OpenPositions from './OpenPositions';
import TotalPositions from './TotalPositions';
import Utilization from './Utilization';
import WithOutSLA from './WithOutSLA';
import WithSLA from './WithSLA';
import { approvedTable } from './Types';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AppGridContainer from "@crema/core/AppGridContainer";
import { connect } from "react-redux";
import { ResourcesActionTypes } from 'saga/Types/Resources.Types';
import { requestCostCentreResource } from '../../../saga/Actions/resources.actions';
import CommonCostCenter from '../commonComponent/CommonCostCenter';
import CommonTable from '../commonComponent/CommonTable';
import { RoutePermittedRole } from "../../../shared/constants/AppConst";

// import {ResourcesActionTypes} from '../'
const ResourcesOverviewTable = (props?: any) => {
    const [showTotalPositions, setShowTotalPositions] = React.useState(true);
    const [showApprovedPositions, setShowApprovedPositions] = React.useState(false);
    const [showOpenPositions, setShowOpenPositions] = React.useState(false);
    const [ShowWithSLA, setShowWithSLA] = React.useState(false);
    const [ShowWithOutSLA, setShowWithOutSLA] = React.useState(false);
    const [ShowUtilization, setShowUtilization] = React.useState(false);
    const [getDepartmentName, setDepartmentName] = React.useState('');
    const [getManagerName, setManagrName] = React.useState('');
    const [isPageSize, setPageSize] = React.useState(10)
    const [isPage, setPage] = React.useState(1)
    const [getCostCenterId, setCostCenterId] = React.useState('');
    const [getUtilizationStatus, setUtilizationStatus] = React.useState(false);
    const [isLastPage, setLastPage] = React.useState<any>(null)

    React.useEffect(() => {
        setPageSize(10)
        setPage(1)
        if( RoutePermittedRole.Admin === props.authRole.roles || RoutePermittedRole.AdminBusiness === props.authRole.roles){
            props.getconstcentreData()
        }
        inititalDataCalled()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const inititalDataCalled = () =>{
        const reqCostCentreData: any = {
            costcenter: getCostCenterId,
            size: isPageSize,
            page: isPage - 1
        }
        props.reqCostCenterResourceInfo(reqCostCentreData)
    }
    React.useEffect(()=>{
if(props.getCostCentreResourceData && getUtilizationStatus === false){
    getChangeTotalPositions()
}
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.getCostCentreResourceData])
    const getChangeTotalPositions = () => {
        setShowTotalPositions(true)
        setShowApprovedPositions(false)
        setShowOpenPositions(false)
        setShowWithSLA(false)
        setShowWithOutSLA(false)
        setShowUtilization(false)
        setUtilizationStatus(false)
        setLastPage(null)
    }

    const getChangeOpenPositions = () => {
        setShowTotalPositions(false)
        setShowApprovedPositions(false)
        setShowOpenPositions(true)
        setShowWithSLA(false)
        setShowWithOutSLA(false)
        setShowUtilization(false)
        setUtilizationStatus(false)
        setLastPage(null)
    }

    const getChangeApprovedPositions = () => {
        setShowTotalPositions(false)
        setShowApprovedPositions(true)
        setShowOpenPositions(false)
        setShowWithSLA(false)
        setShowWithOutSLA(false)
        setShowUtilization(false)
        setUtilizationStatus(false)
        setLastPage(null)
    }

    const getChangeWithSLA = () => {
        setShowTotalPositions(false)
        setShowApprovedPositions(false)
        setShowOpenPositions(false)
        setShowWithSLA(true)
        setShowWithOutSLA(false)
        setShowUtilization(false)
        setUtilizationStatus(false)
        setLastPage(null)
    }

    const getChangeWithOutSLA = () => {
        setShowTotalPositions(false)
        setShowApprovedPositions(false)
        setShowOpenPositions(false)
        setShowWithSLA(false)
        setShowWithOutSLA(true)
        setShowUtilization(false)
        setUtilizationStatus(false)
        setLastPage(null)
    }

    const getChangeUtilization = () => {
        setShowTotalPositions(false)
        setShowApprovedPositions(false)
        setShowOpenPositions(false)
        setShowWithSLA(false)
        setShowWithOutSLA(false)
        setShowUtilization(true)
        setUtilizationStatus(true)
    }

    // This is function used to change cost center Details
    const getCostCenterDetails = (getCostCenterData?: any) => {
        if (getCostCenterData) {
            setDepartmentName(getCostCenterData.department)
            setManagrName(getCostCenterData.manager)
            setCostCenterId(getCostCenterData.cost_center)
            const reqCostCentreData: any = {
                costcenter: getCostCenterData.cost_center,
                size: isPageSize,
                page: isPage - 1
            }
            props.reqCostCenterResourceInfo(reqCostCentreData)
        }
    }

// This is function used to change pagination services
    const onChangePagination = (value) =>{
        setLastPage(value)
        if(value){
            const reqCostCentreData: any = {
                costcenter: getCostCenterId,
                size: isPageSize,
                page: value - 1
            }
            props.reqCostCenterResourceInfo(reqCostCentreData)
            getChangeUtilization()
        }
    }
    
    return (
        <Box>
            <BreadcrumbsData menuList={breadCrumbValues} />
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'>
                Resources Overview
            </Typography> */}
            <AppGridContainer className="marginTop">
                <Grid item xs={12} style={{ marginTop: 0 }}>
                    <Card variant='outlined'>
                        <CardContent>
                            {
                                RoutePermittedRole.Admin === props.authRole.roles || RoutePermittedRole.AdminBusiness === props.authRole.roles ?
                                    <CommonCostCenter getCostCenterDetails={getCostCenterDetails} getDepartmentName={getDepartmentName}
                                        getManagerName={getManagerName} getCostCentreList={props.getCostCentreList} />
                                    : null
                            }
                            
                            {props.getCostCentreResourceData ?
                                <React.Fragment>
                                    <ResourceButtonOption
                                        showTotalPositions={showTotalPositions}
                                        showApprovedPositions={showApprovedPositions}
                                        showOpenPositions={showOpenPositions}
                                        ShowWithSLA={ShowWithSLA}
                                        ShowWithOutSLA={ShowWithOutSLA}
                                        ShowUtilization={ShowUtilization}
                                        getChangeTotalPositions={getChangeTotalPositions}
                                        getChangeOpenPositions={getChangeOpenPositions}
                                        getChangeApprovedPositions={getChangeApprovedPositions}
                                        getChangeWithSLA={getChangeWithSLA}
                                        getChangeWithOutSLA={getChangeWithOutSLA}
                                        getChangeUtilization={getChangeUtilization}
                                    />
                                </React.Fragment>
                                : null}
                            <Box sx={{ paddingTop: 5, paddingLeft: 3 }}>
                            {showApprovedPositions?
                                <CommonTable tableData={props.getCostCentreResourceData && props.getCostCentreResourceData.fullFTERequirement?props.getCostCentreResourceData.fullFTERequirement:[]} />
                                : null}
                                  { showOpenPositions?
                                <CommonTable tableData={props.getCostCentreResourceData && props.getCostCentreResourceData.open_positions_FTE?props.getCostCentreResourceData.open_positions_FTE:[]} />
                                : null}
                                {props.getCostCentreResourceData ?
                                    <React.Fragment>
                                        {
                                            showApprovedPositions && props.getCostCentreResourceData?
                                            <ApprovedPositions showApprovedPositions={showApprovedPositions} getApprovedResourceData={props.getCostCentreResourceData} />
                                            :null
                                        }

{
                                            showOpenPositions && props.getCostCentreResourceData?
                                            <OpenPositions showOpenPositions={showOpenPositions} approvedTable={approvedTable} getApprovedResourceData={props.getCostCentreResourceData} />
                                            :null
                                        }

{
                                            showTotalPositions && props.getCostCentreResourceData?
                                            <TotalPositions showTotalPositions={showTotalPositions} getApprovedResourceData={props.getCostCentreResourceData} />
                                            :null
                                        }

{
                                            ShowUtilization && props.getCostCentreResourceData?
                                            <Utilization ShowUtilization={ShowUtilization} getApprovedResourceData={props.getCostCentreResourceData} isPage={isPage} onChangePagination={onChangePagination} isLastPage={isLastPage}/>
                                            :null
                                        }
                                    
                                        
                                    {
                                            ShowWithOutSLA && props.getCostCentreResourceData?
                                            <WithOutSLA ShowWithOutSLA={ShowWithOutSLA} approvedTable={approvedTable} getApprovedResourceData={props.getCostCentreResourceData} />
                                            :null
                                        }
                                        {
                                            ShowWithSLA && props.getCostCentreResourceData?                                                  
                                        <WithSLA ShowWithSLA={ShowWithSLA} approvedTable={approvedTable} getApprovedResourceData={props.getCostCentreResourceData} />
                                            :null
                                        }
                                        
                                 
                                    </React.Fragment>
                                    : null}

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </AppGridContainer>
        </Box>
    )
}

const breadCrumbValues = {
    title: 'Resources Overview',
    subTitle: '',
    SubUrl: '',
    homeTitle: "Home",
    homeLink: '/dashboard',
    description: ''
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.resourceProcess.loading,
        getCostCentreList: state.resourceProcess.getCostCentreList,
        getCostCentreResourceData: state.resourceProcess.getCostCentreResourceData,
        authRole:state.auth.profileDetails
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        getconstcentreData: () => dispatch({ type: ResourcesActionTypes.COST_CENTRE_REQUEST }),
        reqCostCenterResourceInfo: (postCostCentreId?: any) => dispatch(requestCostCentreResource(postCostCentreId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesOverviewTable);

// export default ResourcesOverviewTable;