import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Box, Button, Grid } from '@mui/material';
import FacilityDetailsAdd from './Facility/FacilityDetailsAdd';
import FacilityGridView from './Facility/FacilityGridView';
import ItDetailsAdd from './ITView/ItDetailsAdd';
import ItAddFormQuantity from './ITView/ItAddFormQuantity';
import { RoutePermittedRole } from "shared/constants/AppConst";
import { connect } from "react-redux";
import BusinessSetupView from './BusinessSetupView/BusinessSetupView';
import { putBusinessSetupInfo, postBusinessSetupInfo } from '../../../../saga/Actions/BusinessSetup.actions';
import BizCaseChartView from './BizCaseSetupChart/index'
import { reqBusinessDashboardDetails, reqGetBizCaseSetupChart } from '../../../../saga/Actions';
import UpdateManPower from './ManPower/UpdateManPower';
import moment from 'moment';
import CommonStore from '@crema/services/commonstore';
import SystemAccessInfo from './ITView/SystemAccessInfo';
import SystemAccessForm from './ITView/SystemAccessInfo/SystemAccessForm';

const SetBizCaseSetup = (props?: any) => {
    const [facilityList, setFacilityList] = React.useState({})
    const [getSystemAccess, setSystemAccess] = React.useState({})
    const [getBizSetupPage, setBizSetupPage] = React.useState([])
    const [getBizSetupData, setBizSetupData] = React.useState([])
    const [bizYearList, setBizYearList] = React.useState([]);
    const { userDetails, getBizCaseSetupChart } = props;
    const userRole = CommonStore().userRoleType;
    
    useEffect(() => {       
        if (props.getBizId) {
            if (props.getBizId.project) {
                props.reqBusinessSetupChartData(props.getBizId.project.id)
            }
            if (props.getBizId.bizcasesetup === null) {
                if (props.getBizCaseSetupData) {
                    setBizSetupReset()
                }
            }
        }
        if (props.bizSetupResponse) {
            onGetRampupRange(props.bizSetupResponse.business_case_start_date, props.bizSetupResponse.business_case_end_date)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (userRole === RoutePermittedRole.IT) {
            if (props.getBizCaseSetupChart && props.getBizCaseSetupChart.it_data) {
                const pushFacilityList: any = [];
                props.getBizCaseSetupChart.it_data.forEach((items: any, i: any) => {
                    const pushFacility: any = {
                        description: items.description,
                        remark: items.remark ? items.remark : '',
                        quantity: items.quantity ? items.quantity : '',
                        cost: items.cost ? items.cost : '',
                        cost_type: items.cost_type ? items.cost_type : '',
                        remaining_quantity: items.remaining_quantity,
                        target_date: items.target_date ? items.target_date : '',
                        status_color: items.status_color ? items.status_color : '',
                        remark_comment: items.remark_comment ? items.remark_comment : '',
                        business_year: items.business_year ? items.business_year : ''

                    }
                    pushFacilityList.push(pushFacility)
                })
                const businessCaseSetupValue: any = {
                    facility: pushFacilityList
                }
                setFacilityList(businessCaseSetupValue)
                setBizSetupPage(props.getBizCaseSetupChart.it_info)
                setBizSetupData(props.getBizCaseSetupChart.it_data)
            } else {
                setBizSetupReset()
            }
            if(props.BizCaseSetup && props.BizCaseSetup.system_access_data){
                let pushSystemAccessData: any = [];
                props.BizCaseSetup.system_access_data.forEach((items: any, i: any) => {
                    const pushSystemAccess: any = {
                        description: items.description,
                        remark: items.remark ? items.remark : '',
                        quantity: items.quantity ? items.quantity : '',
                        cost: items.cost ? items.cost : '',
                        cost_type: items.cost_type ? items.cost_type : '',
                        remaining_quantity: items.remaining_quantity?items.remaining_quantity:"",
                        target_date: items.target_date ? items.target_date : '',
                        status_color: items.status_color ? items.status_color : '',
                        remark_comment: items.remark_comment ? items.remark_comment : '',
                        business_year: items.business_year ? items.business_year : ''

                    }
                    pushSystemAccessData.push(pushSystemAccess)
                })
                const businessCaseSetupValue: any = {
                    systemAceess: pushSystemAccessData
                }
                setSystemAccess(businessCaseSetupValue)
            }
        }
        if (userRole === RoutePermittedRole.Facility) {
            if (props.getBizCaseSetupChart && props.getBizCaseSetupChart.facility_data) {
                const pushFacilityList: any = [];
                props.getBizCaseSetupChart.facility_data.forEach((items: any, i: any) => {
                    const pushFacility: any = {
                        description: items.description,
                        remark: items.remark ? items.remark : '',
                        quantity: items.quantity ? items.quantity : '',
                        cost: items.cost ? items.cost : '',
                        cost_type: items.cost_type ? items.cost_type : '',
                        remaining_quantity: items.remaining_quantity,
                        target_date: items.target_date ? items.target_date : '',
                        status_color: items.status_color ? items.status_color : '',
                        remark_comment: items.remark_comment ? items.remark_comment : '',
                        business_year: items.business_year ? items.business_year : ''

                    }
                    pushFacilityList.push(pushFacility)
                })
                const businessCaseSetupValue: any = {
                    facility: pushFacilityList
                }
                setFacilityList(businessCaseSetupValue)
                setBizSetupPage(props.getBizCaseSetupChart.facility_info)
                setBizSetupData(props.getBizCaseSetupChart.facility_data)
            } else {
                setBizSetupReset()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getBizCaseSetupChart])

    const setBizSetupReset = () => {
        const pushFacilityList: any = [];
        if (props.getBizCaseSetupData && props.getBizCaseSetupData.length) {
            props.getBizCaseSetupData.forEach((items: any, i: any) => {
                const pushFacility: any = {
                    description: items.description,
                    remark: '',
                    quantity: '',
                    cost: '',
                    cost_type: '',
                    remaining_quantity: '',
                    target_date: items.target_date,
                    status_color: '',
                    remark_comment: '',
                    business_year: items.business_year ? items.business_year : ''

                }
                pushFacilityList.push(pushFacility)
            })
        } else {
            if (userRole === RoutePermittedRole.IT) {
                if(props.getBizCaseSetupData && props.getBizCaseSetupData.it_data){
                    props.getBizCaseSetupData.it_data.forEach((items: any, i: any) => {
                        const pushFacility: any = {
                            description: items.description,
                            remark: '',
                            quantity: '',
                            cost: '',
                            cost_type: '',
                            remaining_quantity: '',
                            target_date: items.target_date,
                            status_color: '',
                            remark_comment: '',
                            business_year: items.business_year ? items.business_year : ''
    
                        }
                        pushFacilityList.push(pushFacility)
                    })
                }              
            } else if (userRole === RoutePermittedRole.Facility) {
                if(props.getBizCaseSetupData && props.getBizCaseSetupData.facility_data){
                    props.getBizCaseSetupData.facility_data.forEach((items: any, i: any) => {
                        const pushFacility: any = {
                            description: items.description,
                            remark: '',
                            quantity: '',
                            cost: '',
                            cost_type: '',
                            remaining_quantity: '',
                            target_date: items.target_date,
                            status_color: '',
                            remark_comment: '',
                            business_year: items.business_year ? items.business_year : ''
    
                        }
                        pushFacilityList.push(pushFacility)
                    })
                }           
            }
        }
        const businessCaseSetupValue: any = {
            facility: pushFacilityList
        }
        setFacilityList(businessCaseSetupValue)
        setBizSetupPage(props.getBizCaseSetupData)
    }

    const putBusinessCaseSetup = (getBusinessCaseData?: any) => {
        const postBizCaseSetup: any = {
            bizId: props.getBizId,
            bizSetupDetails: getBusinessCaseData
        }
        if (props.getBizId.bizcasesetup === null) {
            props.postBusinessSetupInfoData(postBizCaseSetup)
            props.closeSetupBusinessMapping()
        } else {
            props.putBusinessCaseSetupData(postBizCaseSetup)
            props.closeSetupBusinessMapping()
        }

    }

    const onGetRampupRange = (startDate, endDate) => {
        if (startDate && endDate) {
            const bizStartDate = moment(startDate);
            const bizEndDate = moment(endDate);

            const bizYearsList: any = [];
            while (bizStartDate.isSameOrBefore(bizEndDate)) {
                bizStartDate.add(1, 'month');
                const yearFind = bizYearsList.some((item) => item === bizStartDate.format("YYYY"));
                if (!yearFind) {
                    bizYearsList.push(bizStartDate.format("YYYY"));
                }
            }
            const bizYearRangeList = bizYearsList;
            if (bizYearRangeList.length) {
                if (bizEndDate.format("YYYY") !== bizYearRangeList[bizYearRangeList.length - 1]) {
                    bizYearsList.pop();
                }
            }
            setBizYearList(bizYearsList)
        }
    };

    const onChangeCostDetails = (getCostInfo?:any) =>{
if(props.bizSetupResponse){
    if(getCostInfo === true){
            let postValue:any = {
                projectId:props.bizSetupResponse.project.id,
                reportType:'Cost'
              }
              props.reqBusinessDashboardDetails(postValue)
        }else{
            let postValue:any = {
                projectId:props.bizSetupResponse.project.id,
                reportType:'Quantity'
              }
              props.reqBusinessDashboardDetails(postValue)
        }
}

    }

    const handleGeneratePdf = () => {
        window.print() 
      };

    return (
        <Dialog
            fullScreen
            open={props.show}
            onClose={props.closeResourceMapping}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'>
                    Business Case Setup
                    </Typography>
                    <IconButton
                        edge='start'
                        color='inherit'
                        onClick={props.closeSetupBusinessMapping}
                        aria-label='close'
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2}> 
            <Grid item xs={12} md={12}>
            <Button 
            onClick={()=>handleGeneratePdf()} 
            sx={{
                position: "relative",
                minWidth: 75,
                marginRight: 2,
                marginTop:2,
                float:'right'
            }}
                variant="contained"
                color="info">Print</Button>
            </Grid>
            </Grid>
          
            <Box sx={{ padding: 2 }}>
                {((userDetails.roles === RoutePermittedRole.Business || userDetails.roles === RoutePermittedRole.Admin) && props.getBizCaseSetupChart) ?
                    <Box sx={{ padding: 5, marginTop: 0 }}>
                        <BizCaseChartView data={props.getBizCaseSetupChart ? props.dashboardDetails : []} onChangeCostDetails={onChangeCostDetails}/>
                    </Box>
                    : null}

                {
                    userDetails.roles === RoutePermittedRole.Business || userDetails.roles === RoutePermittedRole.Admin ?
                        <BusinessSetupView setBizCaseSetupData={props.getBizCaseSetupData} getBizId={props.getBizId} getBizCaseSetupChart={props.getBizCaseSetupChart} bizYearList={bizYearList} getSystemAccess={getSystemAccess} setBizCaseSetupDataInfo={props.BizCaseSetup?props.BizCaseSetup.third_party_cost_data:[]} putBusinessCaseSetup={putBusinessCaseSetup} getBizSetupData={getBizSetupData} closeSetupBusiness={props.closeSetupBusinessMapping}/> : null

                }
                {
                    userDetails.roles === RoutePermittedRole.IT && getBizSetupPage.length ?
                        <>
                            <ItDetailsAdd setBizCaseSetupData={getBizSetupPage} getBizId={props.getBizId} getBizSetupData={getBizSetupData} />
                            <ItAddFormQuantity getBizCaseSetupChart={props.getBizCaseSetupChart} bizYearList={bizYearList} facilityList={facilityList} setBizCaseSetupData={getBizSetupPage.length ? getBizSetupPage : []} putBusinessCaseSetup={putBusinessCaseSetup} getBizId={props.getBizId} getBizSetupData={getBizSetupData} />
                            
                            <SystemAccessInfo setBizCaseSetupData={props.BizCaseSetup?props.BizCaseSetup.system_access_info:[]}/>
                            <SystemAccessForm getBizCaseSetupChart={props.getBizCaseSetupChart} bizYearList={bizYearList} getSystemAccess={getSystemAccess} setBizCaseSetupData={props.BizCaseSetup?props.BizCaseSetup.system_access_data:[]} putBusinessCaseSetup={putBusinessCaseSetup} getBizId={props.getBizId} getBizSetupData={getBizSetupData} />
                        </>
                        : null
                }
                {
                    userDetails.roles === RoutePermittedRole.Facility && getBizSetupPage.length ?
                        <>
                            <FacilityGridView setBizCaseSetupData={getBizSetupPage} getBizId={props.getBizId} getBizSetupData={getBizSetupData} />
                            <FacilityDetailsAdd getBizCaseSetupChart={props.getBizCaseSetupChart} bizYearList={bizYearList} facilityList={facilityList} setBizCaseSetupData={getBizSetupPage} getBizId={props.getBizId} putBusinessCaseSetup={putBusinessCaseSetup} getBizSetupData={getBizSetupData} />
                        </>
                        : null
                }
                {
                    userDetails.roles === RoutePermittedRole.HR ?
                        <>
                            <UpdateManPower getBizDetails={props.getBizId} data={props.dashboardDetails} onChangeCostDetails={onChangeCostDetails}/>
                        </>
                        : null
                }
            </Box>

        </Dialog>
    )
}
const mapStateToProps = (state: any) => {
    return {
        userDetails: state.auth.profileDetails,
        getBizCaseSetupChart: state.businessProcess.getBizCaseSetupChart,
        BizCaseSetup:state.BizCaseSetup.getBizCaseData,
        errorsCheckToken: state.businessProcess.errors
    }
}
const mapDispatchToProps = (dispatch?: any) => {
    return {
        putBusinessCaseSetupData: (putBizCase?: any) => dispatch(putBusinessSetupInfo(putBizCase)),
        postBusinessSetupInfoData: (postBizCase?: any) => dispatch(postBusinessSetupInfo(postBizCase)),
        reqBusinessSetupChartData: (postBizCase?: any) => dispatch(reqGetBizCaseSetupChart(postBizCase)),
        reqBusinessDashboardDetails: (getBizCaseReport?: any) => dispatch(reqBusinessDashboardDetails(getBizCaseReport)),
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(SetBizCaseSetup);