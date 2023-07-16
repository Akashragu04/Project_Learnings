import React from 'react'
import ItDetailsAdd from '../ITView/ItDetailsAdd';
import FacilityGridView from '../Facility/FacilityGridView';
import {
    Typography, Accordion, AccordionSummary, AccordionDetails, Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import AppTableContainer from "@crema/core/AppTableContainer"; //NOSONAR
import UpdateBizSetupHead from './Facility/UpdateBizSetupHead';
import UpdateBizSetupItems from './Facility/UpdateBizSetupItems';
import ItTableHead from './IT/ItTableHead';
import ItTableItem from './IT/ItTableItem';
import UpdateManPower from '../ManPower/UpdateManPower';
import BizSystemAccessGrid from '../SystemAccess/SystemAccessInfo/BizSystemAccessGrid';
import BizSystemAccessDataGridView from '../SystemAccess/SystemAccessData/BizSystemAccessDataGridView';
import BizThirdPartyCostGridView from '../ThirdPartyCost/ThirdPartyCostInfo/BizThirdPartyCostGridView';
import BizThirdPartyServicesGrid from '../ThirdPartyServices/ThirdPartyServicesInfo/BizThirdPartyServicesGrid';
import ThirdPartyCostForm from '../ThirdPartyCost/ThirdPartyCostData/ThirdPartyCostForm';
import { connect } from "react-redux";
import { postBusinessSetupInfo, putBusinessSetupInfo, reqBusinessDashboardDetails, reqGetBizCaseSetupChart } from 'saga/Actions';
import { RoutePermittedRole } from "shared/constants/AppConst";
import CommonStore from '@crema/services/commonstore';
import moment from 'moment';
import ThirdPartyServiceForm from '../ThirdPartyServices/ThirdPartyServicesData/ThirdPartyServiceForm';

const BusinessSetupView = (props?: any) => {
    const { getBizCaseSetupChart } = props;
    // const [expanded, setExpanded] = React.useState(null);
    const [getSystemAccess, setSystemAccess] = React.useState({})
    // const [getBizSetupPage, setBizSetupPage] = React.useState([])
    const [getBizSetupData, setBizSetupData] = React.useState([])
    const [bizYearList, setBizYearList] = React.useState([]);
    const [getBizThirdPartyServicesData, setBizThirdPartyServicesData] = React.useState([])
    const [getBizThirdPartyServicesInfo, setBizThirdPartyServicesInfo] = React.useState([])
    const userRole = CommonStore().userRoleType;

    const handleAccordinChange = (panel) => (event, isExpanded) => {
        // setExpanded(isExpanded ? panel : null);
    };

    React.useEffect(() => { 
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
    },[])

    
    React.useEffect(() => {
        if (userRole === RoutePermittedRole.Business) {
            if (props.getBizCaseSetupChart && props.getBizCaseSetupChart.third_party_cost_data) {
                const pushFacilityList: any = [];
                props.getBizCaseSetupChart.third_party_cost_data.forEach((items: any, i: any) => {
                    const pushFacility: any = {
                        description: items.description,
                        remark: items.remark ? items.remark : '',
                        quantity: items.quantity ? items.quantity : '',
                        cost: items.cost ? items.cost : '',
                        cost_type: items.cost_type ? items.cost_type : '',
                        remaining_quantity: items.remaining_quantity,
                        target_date: items.target_date ? items.target_date : moment(new Date()).format('YYYY-MM-DD'),
                        status_color: items.status_color ? items.status_color : '',
                        remark_comment: items.remark_comment ? items.remark_comment : '',
                        business_year: items.business_year ? items.business_year : ''

                    }
                    pushFacilityList.push(pushFacility)
                })
                const businessCaseSetupValue: any = {
                    systemAceess: pushFacilityList
                }
                setSystemAccess(businessCaseSetupValue)
                // setBizSetupPage(props.getBizCaseSetupChart.third_party_cost_info)
                setBizSetupData(props.getBizCaseSetupChart.third_party_cost_data)
            } else {
                setBizSetupReset()
            }

            if (props.getBizCaseSetupChart && props.getBizCaseSetupChart.third_party_services_data) {
                const pushFacilityList: any = [];
                props.getBizCaseSetupChart.third_party_services_data.forEach((items: any, i: any) => {
                    const pushFacility: any = {
                        description: items.description,
                        remark: items.remark ? items.remark : '',
                        quantity: items.quantity ? items.quantity : '',
                        cost: items.cost ? items.cost : '',
                        cost_type: items.cost_type ? items.cost_type : '',
                        remaining_quantity: items.remaining_quantity,
                        target_date: items.target_date ? items.target_date : moment(new Date()).format('YYYY-MM-DD'),
                        status_color: items.status_color ? items.status_color : '',
                        remark_comment: items.remark_comment ? items.remark_comment : '',
                        business_year: items.business_year ? items.business_year : ''

                    }
                    pushFacilityList.push(pushFacility)
                })
                const businessCaseSetupValue: any = {
                    systemAceess: pushFacilityList
                }
                setBizThirdPartyServicesData(businessCaseSetupValue)
                setBizThirdPartyServicesInfo(props.getBizCaseSetupChart.third_party_services_data)
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
                    target_date: items.target_date?items.target_date:moment(new Date()).format('YYYY-MM-DD'),
                    status_color: '',
                    remark_comment: '',
                    business_year: items.business_year ? items.business_year : ''

                }
                pushFacilityList.push(pushFacility)
            })
        } else {
            if (userRole === RoutePermittedRole.Business) {
                if(props.getBizCaseSetupData && props.getBizCaseSetupData.third_party_cost_data){
                    props.getBizCaseSetupData.third_party_cost_data.forEach((items: any, i: any) => {
                        const pushFacility: any = {
                            description: items.description,
                            remark: '',
                            quantity: '',
                            cost: '',
                            cost_type: '',
                            remaining_quantity: '',
                            target_date: items.target_date?items.target_date:moment(new Date()).format('YYYY-MM-DD'),
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
            systemAceess: pushFacilityList
        }
        // setFacilityList(businessCaseSetupValue)
        setSystemAccess(businessCaseSetupValue)
        // setBizSetupPage(props.getBizCaseSetupData)
    }

    
    const putBusinessCaseSetup = (getBusinessCaseData?: any) => {
        const postBizCaseSetup: any = {
            bizId: props.getBizId,
            bizSetupDetails: getBusinessCaseData
        }
        if (props.getBizId.bizcasesetup === null) {
            props.postBusinessSetupInfoData(postBizCaseSetup)
            props.closeSetupBusiness()
        } else {
            props.putBusinessCaseSetupData(postBizCaseSetup)
            props.closeSetupBusiness()
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

    return (
        <Box sx={{ padding: 5 }}>
            {/* This is function used to view HR page */}
            <Accordion defaultExpanded={true} expanded={true} onChange={handleAccordinChange('hrInfo')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls='hr-content' id='hr-header' sx={{ backgroundColor: "#f5f3f3" }} >
                    <Typography variant={'h3'}>HR</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        props.getBizId?
                        <UpdateManPower getBizDetails={props.getBizId} onChangeCostDetails={onChangeCostDetails}/>                        
                        :null
                    }
                    {/* <Typography variant={'h5'}>No Data</Typography> */}
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={true} onChange={handleAccordinChange('itInfo')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls='it-content' id='it-header' sx={{ backgroundColor: "#f5f3f3" }} >
                    <Typography variant={'h3'}>IT</Typography>
                </AccordionSummary>
                {/* This is function used to view IT page */}
                <AccordionDetails>
                    <ItDetailsAdd setBizCaseSetupData={props.setBizCaseSetupData ? props.setBizCaseSetupData.it_info : []} />
                    <Box sx={{ marginTop: 5, padding: 5 }}>
                        <Typography sx={{ flex: 1, marginBottom: 3 }} variant='h4' component='div'>
                        Actual
                        </Typography>
                        <AppTableContainer>
                            <Table className="table" sx={{ border: "1px solid #ccc" }}>
                                <TableHead>
                                    <ItTableHead />
                                </TableHead>
                                <TableBody>
                                    {props.setBizCaseSetupData.it_data ?
                                        props.setBizCaseSetupData.it_data.map((data: any, index: any) => (
                                            <ItTableItem data={data} key={index} />
                                        )
                                        ) : null}
                                </TableBody>
                            </Table>
                        </AppTableContainer>
                    </Box>
                </AccordionDetails>
            </Accordion>
            {/* This is function used to view facility page */}
            <Accordion expanded={true} onChange={handleAccordinChange('facilityInfo')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls='facility-content' id='facility-header' sx={{ backgroundColor: "#f5f3f3" }} >
                    <Typography variant={'h3'}>Facility</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FacilityGridView setBizCaseSetupData={props.setBizCaseSetupData ? props.setBizCaseSetupData.facility_info : null} />
                    <Box sx={{ marginTop: 5, padding: 5 }}>
                        <Typography sx={{ flex: 1, marginBottom: 3 }} variant='h4' component='div'>
                        Actual
                        </Typography>
                        <AppTableContainer>
                            <Table className="table" sx={{ border: "1px solid #ccc" }}>
                                <TableHead>
                                    <UpdateBizSetupHead />
                                </TableHead>
                                <TableBody>
                                    {(props.setBizCaseSetupData.facility_data) && props.setBizCaseSetupData.facility_data.map((data: any, index: any) => (
                                        <UpdateBizSetupItems data={data} key={index} />
                                    )
                                    )}
                                </TableBody>
                            </Table>
                        </AppTableContainer>
                    </Box>
                </AccordionDetails>
            </Accordion>
            {/* This is function used to view System access data */}
            <Accordion expanded={true} onChange={handleAccordinChange('sytemAccessInfo')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls='system-access-content' id='system-access-header' sx={{ backgroundColor: "#f5f3f3" }} >
                    <Typography variant={'h3'}>System Accesss</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <BizSystemAccessGrid setBizCaseSetupData={props.setBizCaseSetupData ? props.setBizCaseSetupData.system_access_info : null} />
                    <BizSystemAccessDataGridView setBizCaseSetupData={props.setBizCaseSetupData ? props.setBizCaseSetupData.system_access_data : null} />
                </AccordionDetails>
            </Accordion>
            {/* This is function used to view Third Party cost */}
            <Accordion expanded={true} onChange={handleAccordinChange('thirdPartyInfo')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls='system-access-content' id='system-access-header' sx={{ backgroundColor: "#f5f3f3" }} >
                    <Typography variant={'h3'}>Third Party Cost</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <BizThirdPartyCostGridView setBizCaseSetupData={props.setBizCaseSetupData ? props.setBizCaseSetupData.third_party_cost_info : null} setThirdPartyCostData={props.setBizCaseSetupData ? props.setBizCaseSetupData.third_party_cost_data : null} />
                    <ThirdPartyCostForm getBizCaseSetupChart={props.getBizCaseSetupChart} bizYearList={bizYearList} getSystemAccess={getSystemAccess} setBizCaseSetupData={props.BizCaseSetup?props.BizCaseSetup.third_party_cost_info:[]} putBusinessCaseSetup={putBusinessCaseSetup} getBizId={props.getBizId} getBizSetupData={getBizSetupData}  />
                </AccordionDetails>
            </Accordion>
            {/* This is function used to view Third Party Services */}
            <Accordion expanded={true} onChange={handleAccordinChange('thirdPartyServicesInfo')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls='system-access-content' id='system-access-header' sx={{ backgroundColor: "#f5f3f3" }} >
                    <Typography variant={'h3'}>Third Party Services</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <BizThirdPartyServicesGrid setBizCaseSetupData={props.setBizCaseSetupData ? props.setBizCaseSetupData.third_party_services_info : null}  setThirdPartyServicesData={props.setBizCaseSetupData ? props.setBizCaseSetupData.third_party_services_data : null}/>
                    <ThirdPartyServiceForm getBizCaseSetupChart={props.getBizCaseSetupChart} bizYearList={bizYearList} getSystemAccess={getBizThirdPartyServicesData} setBizCaseSetupData={props.BizCaseSetup?props.BizCaseSetup.third_party_services_info:[]} putBusinessCaseSetup={putBusinessCaseSetup} getBizId={props.getBizId} getBizSetupData={getBizThirdPartyServicesInfo}  />
                </AccordionDetails>
            </Accordion>
        </Box>
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
export default connect(mapStateToProps, mapDispatchToProps)(BusinessSetupView);
// export default BusinessSetupView;
