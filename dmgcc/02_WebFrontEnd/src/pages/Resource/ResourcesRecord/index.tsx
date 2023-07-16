import React from 'react'
import { Grid, Box } from '@mui/material';
import { resourcerecordlist } from '../Types';
import ResourceRecordView from './ResourceRecordView';
import BreadcrumbsData from "@crema/core/Breadcrumbs";
import {Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import AppGridContainer from "@crema/core/AppGridContainer";
import CommonCostCenter from '../commonComponent/CommonCostCenter';
import { ResourcesActionTypes } from 'saga/Types/Resources.Types';
import { connect } from "react-redux";
import {reqResourceRecord} from 'saga/Actions/resources.actions';
import { RoutePermittedRole } from "../../../shared/constants/AppConst";

const ResourcesRecord = (props?: any) => {
    const [getDepartmentName, setDepartmentName] = React.useState('')
    const [getManagerName, setManagerName] = React.useState('')
    const [getCostCentreId, setCostCentreId] = React.useState('')

    React.useEffect(() => {
        if(RoutePermittedRole.Admin === props.authRole.roles || RoutePermittedRole.HR === props.authRole.roles || RoutePermittedRole.AdminBusiness === props.authRole.roles){
            props.getconstcentreData()
        }
 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getCostCenterDetails = (getCostCenterData?: any) => {
        if (getCostCenterData) {
            setDepartmentName(getCostCenterData.department)
            setManagerName(getCostCenterData.manager)
            const postValues = {
                size: 10,
                page: 0,
                sort: "",
                SearchKeyword: "",
                CostCenterId:getCostCenterData.cost_center
            }
            setCostCentreId(getCostCenterData.cost_center)
            props.reqCostCenterResourceInfo(postValues)
        }else{
            setDepartmentName('')
            setManagerName('')
            const postValues = {
                size: 10,
                page: 0,
                sort: "",
                SearchKeyword: "",
                CostCenterId:''
            }
            setCostCentreId('')
            props.reqCostCenterResourceInfo(postValues)  
        }
    }

    return (
        <Box>
            <BreadcrumbsData menuList={breadCrumbValues} />
            <AppGridContainer className="marginTop">
                <Grid item xs={12} style={{ marginTop: 0, paddingTop:15 }}>
                    <Card variant='outlined'>
                        <CardContent>
                        {
                                RoutePermittedRole.Admin === props.authRole.roles || RoutePermittedRole.HR === props.authRole.roles || RoutePermittedRole.AdminBusiness === props.authRole.roles?
                                <CommonCostCenter getCostCenterDetails={getCostCenterDetails} getDepartmentName={getDepartmentName} 
                                getManagerName={getManagerName} getCostCentreList={props.getCostCentreList}/>
                                :null
                            }
                            {/* {
                                props.getResourceRecordList? */}
                                <ResourceRecordView resourcerecordlist={resourcerecordlist}                                 
                                useProfile={props.authRole} getCostCentreId={getCostCentreId}/>                                
                            {/* //     :null
                            // } */}
                        </CardContent>
                    </Card>
                </Grid>
            </AppGridContainer>
        </Box>
    )
}

const breadCrumbValues = {
    title: 'Resource Records',
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
        getResourceRecordList: state.resourceProcess.getResourceRecordList,
        authRole:state.auth.profileDetails
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        getconstcentreData: () => dispatch({ type: ResourcesActionTypes.COST_CENTRE_REQUEST }),
        reqCostCenterResourceInfo: (postCostCentreId?: any) => dispatch(reqResourceRecord(postCostCentreId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesRecord);
// export default ResourcesRecord;