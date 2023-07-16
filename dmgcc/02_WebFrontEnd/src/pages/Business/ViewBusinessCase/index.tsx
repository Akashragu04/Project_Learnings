import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, gridClasses, } from "@mui/x-data-grid";
import { Box, Button, Chip, Grid, Stack, } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon'; //NOSONAR
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst"; //NOSONAR
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
// import { getBusinessSetupInfo, reqBusinessDashboardDetails, reqClearState, reqCommonPut } from 'saga/Actions';
import { ActionTypes } from 'saga/sagas/Types';
import BreadcrumbsData from "@crema/core/Breadcrumbs"; //NOSONAR
import AppGridContainer from "@crema/core/AppGridContainer"; //NOSONAR
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BizCaseAddIOMapping from './BizCaseAddIOMapping';
import { ConfigAPI } from 'services/config';
import SetBizCaseSetup from '../BusinessSetup/setBizCaseSetup/SetBizCaseSetup';
import { getBusinessSetupInfo, reqBusinessDashboardDetails } from 'saga/Actions';
import { reqCommonPut, reqClearState } from 'saga/Actions/aboutus.action';

const useStyles = makeStyles({
    root: {
      '& .app-data-grid--header': {
        color: '#00677F'
      },
    },
  });

const ViewBusinessCase = (props:any) => {
  const classes = useStyles();
  const { getBusinessCaseReqData, businessGridData, businessApprovalStatus, userDetails } = props;
  const [getleadFilterColumns, setLeadFilterColumns] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [pageNext, setPageNext] = React.useState(0);
  const [SortItem, setSortItem] = React.useState('');
  const [showBizSetup, setShowBizSetup] = React.useState(false);
  const [bizSetRowResponse, setBizSetRowResponse] = React.useState(null);
  const [getBizId, setBizId] = React.useState('');
  const [getIOMapping, setIOMapping] = React.useState(null);
  const [getOpenIOMapping, setOpenIOMapping] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getInitiliData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessApprovalStatus])

  React.useEffect(()=>{
if(props.resCommonPut && props.resCommonPut.status === true){
    props.reqClearState()
    setOpenIOMapping(false)
    getInitiliData()
}
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.resCommonPut])

  const getInitiliData = () =>{
    getRoleBased()
    props.getUserDateList()
    const postValues: any = {
      size: pageSize,
      page: pageNext,
      sort: SortItem,
      Serachkeyword: searchText
    }
    if (pageSize || pageNext) {
      props.getBusinessCaseData(postValues)
    }
    if (businessGridData.items) {
      if (businessGridData.items.status) {
        navigate('/view-business-case')
      }
    }

    if (businessApprovalStatus === true) {
      const postValues: any = {
        size: pageSize,
        page: pageNext,
        sort: SortItem,
        Serachkeyword: searchText
      }
      if (pageSize || pageNext) {
        props.getBusinessCaseData(postValues)
      }
    }
  }
  const generalPageSizing = (showPageNo) => {
    const postValues: any = {
      size: showPageNo,
      page: pageNext,
      sort: SortItem,
      Serachkeyword: searchText
    }
    props.getBusinessCaseData(postValues)
    setPageSize(showPageNo)
  }

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const postValues: any = {
      size: pageSize,
      page: pageNext,
      sort: '',
      Serachkeyword: searchValue
    }
    props.getBusinessCaseData(postValues)
  };

  const handleSortModelChange = (sortField) => {
    let postValues: any;
    if (sortField.length) {
      postValues = {
        size: pageSize,
        page: pageNext,
        sort: `${sortField[0].field},${sortField[0].sort}`,
        Serachkeyword: searchText
      }
    } else {
      postValues = {
        size: pageSize,
        page: pageNext,
        sort: '',
        Serachkeyword: searchText
      }
    }

    setSortItem(sortField)
    props.getBusinessCaseData(postValues)
  }

  const generalPaging = (paging) => {
    const postValues: any = {
      size: pageSize,
      page: paging,
      sort: SortItem,
      Serachkeyword: searchText
    }
    setPageNext(paging)
    props.getBusinessCaseData(postValues)
  }

  const generalGridChange = (event) => {
  }

  // const getIOMappingDetails = (getValues:any) =>{
  //     setIOMapping(getValues)
  //     setOpenIOMapping(true)
  // }

  const onSubmitIOMapping = (getValues:any) =>{
      if(getValues){
          let postValues:any = {
              url:`${ConfigAPI.ioMappingBizRequest}${getValues.id}`,
              data:getValues
          }
        props.reqCommonPut(postValues)
      }
  }
  
  const onCloseIOMappingDetails = () =>{
    setIOMapping(null)
    setOpenIOMapping(false)
}


const onSetupBusinessMapping = (getSetupValue?: any) => {
  setBizSetRowResponse(getSetupValue);
  props.getBusinessCaseSetup(getSetupValue.id)
  setShowBizSetup(true)
  setBizId(getSetupValue)
  if(getSetupValue && getSetupValue.project){
    let postValue:any = {
      projectId:getSetupValue.project.id,
      reportType:'cost'
    }
    props.reqBusinessDashboardDetails(postValue)
  }
}



const closeSetupBusinessMapping = () => {
  setShowBizSetup(false);
  setBizSetRowResponse(null);
  const postValues: any = {
    size: pageSize,
    page: pageNext,
    sort: SortItem,
    Serachkeyword: searchText
  }
  if (pageSize || pageNext) {
    props.getBusinessCaseData(postValues)
  }
}

  // This is a function used to view approval details
  const getRoleBased = () => {
    const leadFilterColumns: any = [
      {
        field: 'project_name',
        headerName: 'Project Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
        minWidth: 150,
        roleTypes: "common"
      },
      {
        field: 'business_case_start_date',
        headerName: 'Biz Start Date',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
        minWidth: 150,
        roleTypes: "common"
      },
      {
        field: 'business_case_end_date',
        headerName: 'Biz End Date',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
        minWidth: 150,
        roleTypes: "common"
      },
      {
        field: 'activeIoNumber',
        headerName: 'IO Number',
        headerClassName: appConstants.dataGridAppDataHeader,
         flex: 1,
        minWidth: 150,
        roleTypes: "common",
        renderCell: (params) => {
            return(
                <React.Fragment>
                    <Box>{params.row && params.row.activeIoNumber?params.row.activeIoNumber:'-'}</Box>
                </React.Fragment>
            )
        }
      },
      {
        field: 'status',
        headerName: 'Status',
        headerClassName: appConstants.dataGridAppDataHeader,        
        flex: 1,
        minWidth: 200,
        sortable: false,
        roleTypes: RoutePermittedRole.Business,
        renderCell: (params) => {
          let statusIcon: any;
          let statusColor: any;
          if (params.row.status === 'Open') {
            statusIcon = <AutorenewIcon />;
            statusColor = 'warning';
          } else if (params.row.status === 'In Progress') {
            statusIcon = <AutorenewIcon />;
            statusColor = 'info';
          } else if (params.row.status === 'Approved') {
            statusIcon = <CheckIcon />;
            statusColor = 'success';
          } else {
            statusIcon = <AutorenewIcon />;
            statusColor = 'primary';
          }
          return <Stack direction='column' spacing={1}>
            {params.row.status &&
              <Chip icon={statusIcon} color={params.row.status && params.row.status === 'IO Number Not Mapped' ?'error':statusColor} label={params.row.status} variant='outlined' size='small' />}
          </Stack>;
        }
      },
      {
        field: 'action',
        headerName: 'Action',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
        minWidth: 350,
        type: 'actions',
        roleTypes: RoutePermittedRole.Business,
        renderCell: (params) => {

          return (
            <>
              {
                params.row.approvals <= 0 ?
                  <React.Fragment>
      <Button sx={{ position: "relative", minWidth: 150, marginRight: 2 }} variant="outlined"
                      color="inherit" type="button"
                      onClick={() => onSetupBusinessMapping(params.row)}
                      disabled={params.row.overall_status ? false : true}
                      style={{
                        display: userDetails.roles === RoutePermittedRole.Facility
                          || userDetails.roles === RoutePermittedRole.IT || userDetails.roles === RoutePermittedRole.HR ? 'block' : 'none'
                      }}
                    >
                      {params.row.isbizcasesetup ? 'View Biz. Setup Status' : 'Create Biz. Setup Status'}
                    </Button>
                    <Button sx={{ position: "relative", minWidth: 150, marginRight: 2 }} variant="outlined"
                      color="inherit" type="button"
                      onClick={() => onSetupBusinessMapping(params.row)}
                      disabled={params.row.approve_enable ? false : true}
                      style={{ display: userDetails.roles === RoutePermittedRole.Business || userDetails.roles === RoutePermittedRole.Admin ? 'block' : 'none' }}
                    > View Biz. Setup
                    </Button>
                  </React.Fragment>
                  :
                  <React.Fragment>
                         <Button sx={{ position: "relative", minWidth: 150, marginRight: 2 }} variant="outlined"
                      color="inherit" type="button"
                      onClick={() => onSetupBusinessMapping(params.row)}
                      disabled={params.row.overall_status ? false : true}
                      style={{
                        display: userDetails.roles === RoutePermittedRole.Facility
                          || userDetails.roles === RoutePermittedRole.IT || userDetails.roles === RoutePermittedRole.HR ? 'block' : 'none'
                      }}
                    >
                      {params.row.isbizcasesetup ? 'View Biz. Setup Status' : 'Create Biz. Setup Status'}
                    </Button>
                    <Button sx={{ position: "relative", minWidth: 150, marginRight: 2 }} variant="outlined"
                      color="inherit" type="button"
                      onClick={() => onSetupBusinessMapping(params.row)}
                      disabled={params.row.approve_enable ? false : true}
                      style={{ display: userDetails.roles === RoutePermittedRole.Business || userDetails.roles === RoutePermittedRole.Admin ? 'block' : 'none' }}
                    > View Biz. Setup
                    </Button>
                  </React.Fragment>
              }
            </>
          )


        }
      }
    ];
    setLeadFilterColumns(leadFilterColumns)
  }

  return (
    <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
 <BreadcrumbsData menuList={breadCrumbValues} />
 {
        props.getBizCaseSetupData && getBizId ?
          <SetBizCaseSetup bizSetupResponse={bizSetRowResponse} show={showBizSetup} closeSetupBusinessMapping={closeSetupBusinessMapping} 
          getBizCaseSetupData={props.getBizCaseSetupData} getBizId={getBizId} dashboardDetails={props.dashboardDetails} />
          : null
      }
 {
     getOpenIOMapping && getIOMapping?
     <BizCaseAddIOMapping resData={getIOMapping} handleClose={onCloseIOMappingDetails} onSubmitIOMapping={onSubmitIOMapping} onOpen={getOpenIOMapping}/>
     :null
 }
            
      <AppGridContainer>
        <Grid item xs={12}  className="marginTop">
          <Card variant='outlined'>
            <CardContent>
      {getleadFilterColumns && getleadFilterColumns !== undefined && getleadFilterColumns.length > 0 && getBusinessCaseReqData ?

        <DataGrid
          autoHeight
          rowHeight={64}
          rows={getBusinessCaseReqData}
          columns={getleadFilterColumns}
          components={{ Toolbar: QuickSearchToolbar }}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                requestSearch(event.target.value),
              clearSearch: () => requestSearch(""),
            },
          }}
           getRowHeight={() => 'auto'}
                    sx={{
                      [`& .${gridClasses.cell}`]: {
                        py: 2,
                      },
                    }}
          paginationMode="server"
          page={pageNext}
          rowCount={businessGridData.totalElements}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          // checkboxSelection
          disableSelectionOnClick
          disableColumnMenu
          // loading={loading}
          sortingMode='server'
          onSortModelChange={handleSortModelChange}
          onPageChange={(paging) => generalPaging(paging)}
          onPageSizeChange={(size) => generalPageSizing(size)}
          onStateChange={(event) => generalGridChange(event)}

        />
        : null}
                
        </CardContent>
      </Card>
    </Grid>
  </AppGridContainer>
    </Box>
  )
}

const breadCrumbValues = {
  title: 'View Business Case',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: ''
}

const mapStateToProps = (state) => {
  return {
    checkTokenStatus: state.auth.tokenValidationStatus,
    userDetails: state.auth.profileDetails,
    getUserDateListRes: state.businessProcess.getUserDateList,
    getBusinessCaseReqData: state.businessProcess.businessCasedReqData,
    businessGridData: state.businessProcess,
    businessApprovalStatus: state.businessProcess.approvalBizProcessStatus,
    loading: state.businessProcess.loading,
    getBizCaseSetupData: state.BizCaseSetup.getBizCaseData,
    dashboardDetails: state.dashboardDetails.getResponseBusinessCaseDashboard,
    resCommonPut:state.aboutUsDetails.resCommonPut,
    errorsCheckToken: state.businessProcess.errors
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    getUserDateList: () => dispatch({ type: ActionTypes.GET_USERDETAILS_REQUEST }),
    getBusinessCaseData: (getValues?: any) => dispatch({ type: ActionTypes.GET_BUSINESS_CASE_REQUEST, value: getValues }),
    getBusinessCaseSetup: (getBizId?: any) => dispatch(getBusinessSetupInfo(getBizId)),
    reqBusinessDashboardDetails: (getBizCaseReport?: any) => dispatch(reqBusinessDashboardDetails(getBizCaseReport)),
    reqCommonPut:(postURL:any)=> dispatch(reqCommonPut(postURL)),
    reqClearState: () => dispatch(reqClearState()),
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(ViewBusinessCase);