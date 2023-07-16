import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, gridClasses, } from "@mui/x-data-grid";
import { Box, Button, Chip, Stack, } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon'; //NOSONAR
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst"; //NOSONAR
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckIcon from '@mui/icons-material/Check';
import BizApprovePage from "./BizApprovePage";
import { ActionTypes } from "saga/sagas/Types"; //NOSONAR
import { useNavigate } from 'react-router-dom';
import ViewApprovalDetails from './ViewApprovalDetails';
import SetBizCaseSetup from './setBizCaseSetup/SetBizCaseSetup'; //NOSONAR
import { getBusinessSetupInfo } from '../../../saga/Actions/BusinessSetup.actions'; //NOSONAR
import CommonStore from '@crema/services/commonstore'; //NOSONAR
import { reqBusinessDashboardDetails } from 'saga/Actions';
import AppLoader from '@crema/core/AppLoader'

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

export const BusinessCaseRequirement = (props?: any) => {
  const userRole = CommonStore().userRoleType;
  const classes = useStyles();
  const { getUserDateListRes, getBusinessCaseReqData, businessGridData, businessApprovalStatus, userDetails } = props;
  const [getleadFilterColumns, setLeadFilterColumns] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [showApprovelBox, setApprovelBox] = React.useState(false);
  const [pageNext, setPageNext] = React.useState(0);
  const [SortItem, setSortItem] = React.useState('');
  const [getApprovalKey, setApprovalKey] = React.useState('');
  const [viewApproval, setApprovalData] = React.useState({})
  const [showApprovalDetails, setApprovalDetails] = React.useState(false);
  const [showBizSetup, setShowBizSetup] = React.useState(false);
  const [bizSetRowResponse, setBizSetRowResponse] = React.useState(null);
  const [getBizId, setBizId] = React.useState('');
  const navigate = useNavigate();

   useEffect(() => {
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
        navigate('/business/business-setup')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessApprovalStatus])

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

  const closeBusinessApprovel = (getValues?: any) => {
    setApprovelBox(getValues)
    setApprovelBox(false);
  }

  const handleApprovalClose = (e?: any) => {
    setApprovalDetails(false)
  }

  const openApprovelBox = (getValue?: any) => {
    if (getValue) {
      setApprovelBox(true)
      setApprovalKey(getValue.id)
    }
  }

  const onJDMappingSet = (rowParams: any) => {
    navigate(`/business/jdmapping`, { state: { requirementId: rowParams.row.id, requirementData: rowParams.row } })
  }

  const onViewBusinessCase = (params: any) => {
    navigate(`/business/view-businesscase`, { state: { bizId: params.row.id } })
  }

  const onSetupBusinessMapping = (getSetupValue?: any) => {
    setBizSetRowResponse(getSetupValue);
    props.getBusinessCaseSetup(getSetupValue.id)
    setShowBizSetup(true)
    setBizId(getSetupValue)
    if(getSetupValue){
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
  const viewApprovelBox = (getApprovalData?: any) => {
    setApprovalDetails(true)
    setApprovalData(getApprovalData.row)
  }
  const getRoleBased = () => {
    const leadFilterColumns: any = [
      {
        field: 'project_name',
        headerName: 'Project Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 250,
        roleTypes: "common"
      },
      {
        field: 'business_case_start_date',
        headerName: 'Biz Start Date',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 150,
        roleTypes: "common"
      },
      {
        field: 'business_case_end_date',
        headerName: 'Biz End Date',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 150,
        roleTypes: "common"
      },
      {
        field: 'status',
        headerName: 'Status',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 200,
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
          } else if (params.row.status === "IO Number Not Mapped") {
            statusIcon = <CheckIcon />;
            statusColor = 'error';
          } else {
            statusIcon = <AutorenewIcon />;
            statusColor = 'primary';
          }
          return <Stack direction='column'>
            {params.row.status &&
              <Chip icon={statusIcon} color={statusColor} label={params.row.status} variant='outlined' size='small' />}
          </Stack>;
        }
      },
      {
        field: 'action',
        headerName: 'Action',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: userDetails.roles === RoutePermittedRole.Business || userDetails.roles === RoutePermittedRole.Admin ? 550 : 400,
        type: 'actions',
        roleTypes: RoutePermittedRole.Business,
        renderCell: (params) => {
          return (
            <>
              {
                params.row.approvals <= 0 ?
                  <React.Fragment>
                    {(((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business)|| (userRole === RoutePermittedRole.Finance)) &&
                      params.row.business_availability === 'with_rate') ?
                      <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined"
                        color="inherit" type="button"
                        onClick={() => onViewBusinessCase(params)}
                        // disabled={params.row.status ==="Approved" ?false:true}
                      >View Biz.Case</Button> :
                      (((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business)) && params.row.business_availability === 'without_rate' && params.row.newratecard) ? <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined"
                        color="inherit" type="button"
                        onClick={() => onViewBusinessCase(params)}
                        // disabled={params.row.status ==="Approved" ?false:true}
                      >View Biz.Case</Button> : null}
                    {
                      (params.row.approve_enable && (userDetails.roles === RoutePermittedRole.Business || userDetails.roles === RoutePermittedRole.Admin)) ?
                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined"
                          color="info" type="button"
                          onClick={() => openApprovelBox(params)}
                          disabled={params.row.approvals <= 0 ? false : true}> Approve
                        </Button>
                        : null
                    }

                    {params.row.overall_status && <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined"
                      color="inherit" type="button"
                      onClick={() => onJDMappingSet(params)}
                      disabled={params.row.overall_status ? false : true}
                      className="hideoption"
                    > Create JD
                    </Button>}
                    <Button sx={{ position: "relative", minWidth: 150, marginRight: 2,  display: userDetails.roles === RoutePermittedRole.Facility
                          || userDetails.roles === RoutePermittedRole.IT || userDetails.roles === RoutePermittedRole.HR ? 'block' : 'none' }} variant="outlined"
                      color="inherit" type="button"
                      onClick={() => onSetupBusinessMapping(params.row)}
                      disabled={params.row.overall_status ? false : true}> Create Biz. Setup Status
                    </Button>
                  </React.Fragment>
                  :
                  <React.Fragment>
                    {(((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business)|| (userRole === RoutePermittedRole.Facility) ) &&
                      params.row.business_availability === 'with_rate') ?
                      <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined"
                        color="inherit" type="button"
                        onClick={() => onViewBusinessCase(params)}
                        // disabled={params.row.status ==="Approved" ?false:true}
                      >View Biz.Case</Button> :
                      (((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business)) && params.row.business_availability === 'without_rate' && params.row.newratecard) ? <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined"
                        color="inherit" type="button"
                        onClick={() => onViewBusinessCase(params)}
                        // disabled={params.row.status ==="Approved" ?false:true}
                      >View Biz.Case</Button> : null}
                    {(params.row.approve_enable) && <Button sx={{ position: "relative", minWidth: 120, marginRight: 2 }} variant="outlined"
                      color="inherit" type="button"
                      onClick={() => viewApprovelBox(params)}
                      style={{
                        display: userDetails.roles === RoutePermittedRole.Business
                          || userDetails.roles === RoutePermittedRole.Admin
                          || userDetails.roles === RoutePermittedRole.Customer ? 'block' : 'none'
                      }}>
                      View Approve
                    </Button>}
                    {params.row.overall_status &&<Box className="hideoption">
                      <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined"
                      color="inherit" type="button"
                      onClick={() => onJDMappingSet(params)}
                      disabled={params.row.overall_status ? false : true}
                      style={{
                        display: userDetails.roles === RoutePermittedRole.Business
                          || userDetails.roles === RoutePermittedRole.Admin ? 'block' : 'none'
                      }}
                    
                    > Create JD
                    </Button>
                    </Box> }
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
      {
        props.getBizCaseSetupData && getBizId ?
          <SetBizCaseSetup bizSetupResponse={bizSetRowResponse} show={showBizSetup} closeSetupBusinessMapping={closeSetupBusinessMapping} 
          getBizCaseSetupData={props.getBizCaseSetupData} getBizId={getBizId} dashboardDetails={props.dashboardDetails} />
          : null
      }

      {showApprovalDetails ?
        <ViewApprovalDetails showApprovalDetails={showApprovalDetails} handleApprovalClose={(e) => handleApprovalClose(e)} viewApproval={viewApproval} />
        : null}

      {getUserDateListRes && getApprovalKey ?
        <BizApprovePage showpage={showApprovelBox} closeBusinessApprovel={(e) => closeBusinessApprovel(e)} approvalId={getApprovalKey} />
        : null}

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
        :  <AppLoader />}

    </Box>
  )
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
    errorsCheckToken: state.businessProcess.errors
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    getUserDateList: () => dispatch({ type: ActionTypes.GET_USERDETAILS_REQUEST }),
    getBusinessCaseData: (getValues?: any) => dispatch({ type: ActionTypes.GET_BUSINESS_CASE_REQUEST, value: getValues }),
    getBusinessCaseSetup: (getBizId?: any) => dispatch(getBusinessSetupInfo(getBizId)),
    reqBusinessDashboardDetails: (getBizCaseReport?: any) => dispatch(reqBusinessDashboardDetails(getBizCaseReport)),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessCaseRequirement)  
