import React, { useEffect } from "react";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import { Box, Button, Chip, Stack, Grid, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { AddCircle } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import * as yup from "yup";
import { connect } from "react-redux";
import { ActionTypes } from "saga/sagas/Types";
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst";
import TableNav from './TableNav';
import { AddSlaModule } from './AddSlaModule';
import QuickSearchToolbar from '../../../../@crema/commonservices/SearchFieldsCommon';
import ViewBusinessLeadDetails from './LeadFullDetails/ViewBusinessLeadDetails';
import LeadsConversion from './LeadsConversion';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LeadsCoversionAvgDay from './LeadsCoversionAvgDay';
import CheckIcon from '@mui/icons-material/Check';
import AssignBusinessCase from './AssignBusinessCase';
import { initBizRequirementAction, initFinanceProcessAction, reqCustomerAndBusiness, setRequirementWOBizCaseAction } from "saga/Actions";
import { toast } from "react-toastify";
import CommonStore from '@crema/services/commonstore';
import AddCardIcon from '@mui/icons-material/AddCard';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import RateCardCalculationPreview from "pages/Finance/FinanceRateCard/RateCardCalculationPreview";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AppLoader from '@crema/core/AppLoader'
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import ViewBusinessDetails from "./ViewBusinessDetails";

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});


const assignValidationSchema = yup.object({
  service_provider_short_id: yup
    .string()
    .required(String("Short Id is required")),
});


// This is quick Filtering Service data
const QuickFilteringGrid = (props?: any) => {
  const userRole = CommonStore().userRoleType;
  const { statuscode, getLeadDetails, loading, assignSuccess, getLeadDetailsList, leadsConversionList, getDepartmentList,
    requirementWithoutBizCase, getCustomerandBusiness } = props;
  const { leadFilterColumnsList } = TableNav();
  // const [getNavList, setNavData] = useState();
  const navigate = useNavigate();
  // const history = useHistory();
  const classes = useStyles();
  const [pageSize, setPageSize] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  // const [loader, setLoading] = React.useState(true);
  const [assignEnable, setAssignEnable] = React.useState(false);
  const [pageNext, setPageNext] = React.useState(0);
  const [SortItem, setSortItem] = React.useState('');
  const [getleadFilterColumns, setLeadFilterColumns] = React.useState([]);
  const [SLAProcess, setSLAProcess] = React.useState(false);
  const [addReqirementId, setReqirementId] = React.useState('')
  const [openLeadDetails, setOpenLeadDetails] = React.useState(false)
  const [idLeadDetails, setIdLeadDetails] = React.useState('')
  const [assignId, setAssignId] = React.useState('')
  const [showLeadsCon, setShowLeadsCon] = React.useState(false)
  const [getleadConversion, setleadConversion] = React.useState([]);
  const [showLeadsConFull, setShowLeadsConFull] = React.useState(false)
  const [openRateCardPreview, setOpenRateCardPreview] = React.useState(false);
  const [bizRateCardDetails, setBizRateCardDetails] = React.useState(null);
  const [openAddRequest, setAddRequest] = React.useState(false);
  const [onViewBusinessDetails, setViewBusinessDetails] = React.useState(false);
  const [onLeadInfo, setLeadInfo] = React.useState<any>(null);


  const { businessGridData } = props;
  React.useEffect(() => {
    if (requirementWithoutBizCase && requirementWithoutBizCase.status) {
      toast.success(requirementWithoutBizCase.message, { position: 'bottom-right' });
      props.initBizRequirement();
      gotoSLAProjects();
    }
    setAddRequest(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, requirementWithoutBizCase])

  useEffect(() => {
    if (props.checkTokenStatus) {
      if (props.checkTokenStatus.message === 'Invalid Token') {
        // logout()
        reqLeadDetails()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.checkTokenStatus])

  useEffect(() => {
    props.reqCustomerAndBusiness()
    // props.checkTokenValidation()
    props.getDepartmentDetails()
    getTableNavBarHeader()
    getRoleBased()
    getLeadDeta()
    props.getUserDateList()
    reqLeadDetails()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignSuccess])

  const reqLeadDetails = () => {
    if (assignSuccess === true) {
      const postValues: any = {
        size: pageSize,
        page: pageNext,
        sort: SortItem,
        Serachkeyword: searchText
      }
      props.getLeadData(postValues)
    }
  }
  const closeBusinessLeadBox = (getValues?: any) => {
    setOpenLeadDetails(false);
    getLeadDeta()
  };

  const getLeadDeta = () => {
    const postValues: any = {
      size: pageSize,
      page: pageNext,
      sort: SortItem,
      Serachkeyword: searchText
    }
    if (pageSize || pageNext) {
      props.getLeadData(postValues)
    }
  }
  // This is a function used to pass lead conversion page in values and open box
  const onOpenleadConversion = (getValues?: any) => {
    setleadConversion([])
    if (getValues) {
      setleadConversion(getValues.row)
      setShowLeadsCon(true)
    }
  }

  const viewFullLeadDetails = (getDetails: any) => {
    if (getDetails) {
      setViewBusinessDetails(true)
      setLeadInfo(getDetails)
    }
  }

  const onCloseViewLeadDetails = () => {
    setViewBusinessDetails(false)
  }
  const viewLeactDetails = (getLeadId: any) => {
    setOpenLeadDetails(true)
    props.getLeadDetails(getLeadId)
    props.getstepperList(getLeadId)
    setIdLeadDetails(getLeadId)
  }

  const gotoSLAProjects = () => {
    navigate('/SLA/projects', { state: { leadId: addReqirementId } })
  }

  const postSLAStatus = (getValues: any) => {
    if (getValues.assign_sla === 'caseWithSLA') {
      navigate('/business/business-request', { state: { leadId: addReqirementId } })
      setAddRequest(true)
    } else if (getValues.assign_sla === 'casewithoutSLA') {
      props.setRequirmentWithOutBizCaseRequest({ lead_id: addReqirementId, data: getValues })
      setAddRequest(true)
    }
  }

  const setCloseDialogBox = (getValues: any) => {
    setSLAProcess(getValues)
    setReqirementId('')
  }

  const getTableNavBarHeader = () => {
    if (leadFilterColumnsList && leadFilterColumnsList.length > 0) {
      const pushTableNavBar: any = [];
      leadFilterColumnsList.forEach((menuName: any) => {
        if (menuName.roleTypes === "common" || menuName.roleTypes === statuscode.roles) {
          pushTableNavBar.push(menuName)
        }
      })
      // setNavData(pushTableNavBar)
    }
  }

  const toRateCard = (action, rowData) => {
    navigate('/finance/addratecard', { state: { action: action, info: rowData, key: 'leads' } });
  }

  const toRateCardCalculation = (rowData) => {
    props.initBizRateCardProcess();
    setBizRateCardDetails(rowData);
    setOpenRateCardPreview(true);
  }

  const getRoleBased = () => {
    if (statuscode !== null && statuscode && RoutePermittedRole.Customer === statuscode.roles) {
      const leadFilterColumns: any = [
        // { field: 'id', headerName: 'Lead Id', headerClassName: 'app-data-grid--header', width: 90, filterable: false, align: "center" },
        {
          field: 'service_receiver_entity',
          headerName: 'Entity',
          headerClassName: appConstants.dataGridAppDataHeader,          
        flex: 1,
        minWidth: 200,
          roleTypes: "common"
        },
        {
          field: 'service_receiver_contact_name',
          headerName: 'Customer Name',
          headerClassName: appConstants.dataGridAppDataHeader,
          flex: 1,
          minWidth: 200,
          roleTypes: "common"
        },
        {
          field: 'project_name',
          headerName: 'Project Name',
          headerClassName: appConstants.dataGridAppDataHeader,
          flex: 1,
          minWidth: 200,
          roleTypes: "common"
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
            let statusIcon: any = <AssistantPhotoIcon />;
            let statusColor: any = 'primary';
            if (params.row.category_status === 'approved') {
              statusIcon = <AssistantPhotoIcon />;
              statusColor = 'success';
            } else if (params.row.category_status === 'in progress') {
              statusIcon = <AssistantPhotoIcon />;
              statusColor = 'default';
            } else if (params.row.category_status === 'Rate Card Not Available') {
              statusIcon = <HourglassBottomIcon />;
              statusColor = 'primary';
            } else if (params.row.category_status === 'Rate Card Created') {
              statusIcon = <CheckIcon />;
              statusColor = 'success';
            } else {
              statusIcon = <AssistantPhotoIcon />;
              statusColor = 'primary';
            }
            return <Stack direction='column' spacing={1}>
              {params.row.category_status &&
                <Chip icon={statusIcon} color={statusColor} label={params.row.category_status} variant='outlined' size='small' />
              }
            </Stack>;
          }
        },
        {
          field: 'action',
          headerName: 'Action',
          headerClassName: appConstants.dataGridAppDataHeader,
          type: 'actions',
          roleTypes: RoutePermittedRole.Business,
          getActions: (params) => [
        <React.Fragment>
            <GridActionsCellItem
            key={`${params.id}_view_lead`}
            icon={<Tooltip title="View Lead Details">
              <ViewTimelineIcon color={'primary'} />
            </Tooltip>
            }
            label='View Lead Details'
            onClick={() => viewFullLeadDetails(params.row)}
          />
            <GridActionsCellItem
              key={`${params.id}_edit`}
              icon={
                <Tooltip title="Edit Lead">
                  <EditIcon color={params.row.category_status !== 'not initiated' ? 'disabled' : 'primary'} />
                </Tooltip>}
              label='Toggle Admin'
              onClick={generalAction(params.id)}
              disabled={params.row.category_status !== 'not initiated' ? true : false}
            />
         {   
         //View Rate Card
            (params.row.biz_id && params.row.biz_id?.newratecard) &&
              <GridActionsCellItem
                key={params.id}
                icon={
                  <Tooltip title="View Rate Card">
                    <PriceChangeIcon />
                  </Tooltip>}
                label='View Rate Card'
                onClick={() => toRateCard('update', params.row)}
                showInMenu
                disabled={(userRole === RoutePermittedRole.Finance) ? false : true}
              />          
          }
          {
                (userRole === RoutePermittedRole.Finance)&&
                <GridActionsCellItem
                  key={params.id}
                  icon={
                    <Tooltip title="Create Rate Card">
                      <AddCardIcon />
                    </Tooltip>}
                  label='Create Rate Card'
                  onClick={() => toRateCard('create', params.row)}
                  showInMenu
                  disabled={(userRole === RoutePermittedRole.Finance) ? false : true}
                />
          }
            </React.Fragment>
            
          ]
          
        // }
        }
      ];
      setLeadFilterColumns(leadFilterColumns)

    } else {
      const leadFilterColumns: any = [
        // { field: 'id', headerName: 'Lead Id', headerClassName: 'app-data-grid--header', width: 90, filterable: false, align: "left" },
        {
          field: 'service_receiver_entity',
          headerName: 'Entity',
          headerClassName: appConstants.dataGridAppDataHeader,
          flex: 1,
          minWidth: 150,
          roleTypes: "common"
        },
        {
          field: 'service_receiver_contact_name',
          headerName: 'Customer Name',
          headerClassName: appConstants.dataGridAppDataHeader,
          flex: 1,
          minWidth: 150,
          roleTypes: "common"
        },
        {
          field: 'project_name',
          headerName: 'Project Name',
          headerClassName: appConstants.dataGridAppDataHeader,
          flex: 1,
          minWidth: 150,
          roleTypes: "common"
        },
        {
          field: 'responsible',
          headerName: 'Responsible',
          headerClassName: appConstants.dataGridAppDataHeader,
          flex: 1,
          minWidth: 200,
          sortable: false,
          roleTypes: RoutePermittedRole.Business,
          renderCell: (params) => {
            const onClick = (e) => {
              e.stopPropagation(); // don't select this row after clicking
              setAssignEnable(true);
              setAssignId(params.row.id)
            };
            // return <Button color={'primary'} size={'small'} variant={'outlined'} onClick={onClick}>Approve</Button>;
            return (
              <>
                {
                  params.row.isasign ? <span color={'success'}>{params.row.service_provider_department}</span> :
                    (RoutePermittedRole.Admin === statuscode.roles || RoutePermittedRole.Superadmin === statuscode.roles) ? <Button color={'primary'} size={'small'} variant={'outlined'} onClick={onClick}>Assign</Button> : <span color={'success'}>{params.row.service_provider_department || '-'} </span>
                }
              </>)
          }
        },
        {
          field: 'status',
          headerName: 'Status',
          headerClassName: appConstants.dataGridAppDataHeader,
          flex: 1,
          minWidth: 250,
          sortable: false,
          roleTypes: RoutePermittedRole.Business,
          renderCell: (params) => {
            let statusIcon: any = <AssistantPhotoIcon />;
            let statusColor: any = 'primary';
            if (params.row.category_status === 'approved') {
              statusIcon = <CheckIcon />;
              statusColor = 'success';
            } else if (params.row.category_status === 'in progress') {
              statusIcon = <AssistantPhotoIcon />;
              statusColor = 'default';
            } else if (params.row.category_status === 'Rate Card Not Available') {
              statusIcon = <HourglassBottomIcon />;
              statusColor = 'primary';
            } else if (params.row.category_status === 'Rate Card Created') {
              statusIcon = <CheckIcon />;
              statusColor = 'success';
            } else {
              statusIcon = <AssistantPhotoIcon />;
              statusColor = 'primary';
            }
            return <Stack direction='column' spacing={1}>
              {params.row.category_status === 'not initiated' || params.row.isasign === true ?
                <>
                  <Chip icon={statusIcon} color={statusColor} label={`${params.row.category_status}`} variant='outlined' size='small' sx={{ textTransform: 'capitalize' }} />
                  {/* {
                    params.row.category_status !== 'approved' ? <span style={{ display: 'flex', flexDirection: 'row', color: 'red', textAlign: 'center', fontSize: 12 }}> {moment.utc(new Date(params.row.create_date)).fromNow()}</span> : null
                  } */}
                </>
                :
                <>
                  <Chip icon={statusIcon} color={statusColor} label={`${params.row.category_name} ${params.row.category_status}`} variant='outlined' size='small' />
                </>
              }
            </Stack>;
          }
        },
        {
          field: 'requirement',
          headerName: 'Business Requirement',
          headerClassName: appConstants.dataGridAppDataHeader,
          flex: 1,
          minWidth: 150,
          sortable: false,
          roleTypes: RoutePermittedRole.Business,
          renderCell: (params) => {
            const onViewRequirementClick = (e) => {
              e.stopPropagation();
              props.initBizRequirement();
              navigate('/business/update-business-request', { state: { leadId: params.row.id, bizId: params.row.biz_id.id } })
              // e.stopPropagation(); // don't select this row after clicking
            };
            const onAddRequirementClick = (e) => {
              e.stopPropagation(); // don't select this row after clicking
              setSLAProcess(true)
              setReqirementId(params.row.id)
              // navigate('/business/business-request')
            };
            
            return (
              <React.Fragment>
                <Box className="hideoption">
                  {params.row.biz_id ?
                    ((RoutePermittedRole.Admin === statuscode.roles || RoutePermittedRole.Business === statuscode.roles || RoutePermittedRole.Superadmin === statuscode.roles
                      || RoutePermittedRole.HR === statuscode.roles || RoutePermittedRole.IT === statuscode.roles || RoutePermittedRole.Facility === statuscode.roles || RoutePermittedRole.Finance === statuscode.roles) && params.row.biz_id.sla_business_case) ? <Button color={'inherit'} size={'small'} variant={'outlined'} onClick={onViewRequirementClick}>View Requirement</Button>
                      : null
                    : ((RoutePermittedRole.Admin === statuscode.roles || RoutePermittedRole.Business === statuscode.roles || RoutePermittedRole.Superadmin === statuscode.roles))
                    &&
                    <Button color={'primary'} size={'small'} variant={'contained'} disabled={params.row.category_status === "not assigned" ? true : false} onClick={onAddRequirementClick}>Add Requirement</Button>

                  }
                </Box>
              </React.Fragment>
            )
          }
        },
        {
          field: 'action',
          headerName: 'Action',
          headerClassName: appConstants.dataGridAppDataHeader,
          type: 'actions',
          flex: 1,
          minWidth: 250,
          roleTypes: RoutePermittedRole.Business,
          getActions: (params) => [
            <React.Fragment>
              <React.Fragment>
                <GridActionsCellItem
                  key={`${params.id}_view_lead`}
                  icon={<Tooltip title="View Lead Details">
                    <ViewTimelineIcon color={'primary'} />
                  </Tooltip>
                  }
                  label='View Lead Details'
                  onClick={() => viewFullLeadDetails(params.row)}
                />
                {params.row.biz_id && params.row.biz_id?.newratecard ?
                  <React.Fragment>

                   {/* //Add rete care button  */}
                    {
                      (((userRole === RoutePermittedRole.Finance)))&&
                      <React.Fragment>
                         <GridActionsCellItem
                      key={params.id}
                      icon={<Tooltip title={params.row.biz_id.business_availability ==="with_rate"?"View Rate Card":"Update Requirement"}>
                        <PriceChangeIcon color={(userRole !== RoutePermittedRole.Finance) ? 'disabled' : 'primary'} />
                      </Tooltip>}
                      label='Update Requirement'
                      onClick={() => toRateCard('update', params.row)}
                      disabled={(userRole === RoutePermittedRole.Finance) ? false : true}
                    />
                      <GridActionsCellItem
                      key={`${params.id}_ratepreview`}
                      icon={<Tooltip title="Preview Rate Card">
                        <CurrencyExchangeIcon color={(userRole === RoutePermittedRole.Finance && params.row.biz_id && params.row.biz_id.business_availability !=="with_rate") ? 'primary' : 'disabled'} />
                      </Tooltip>}
                      label='Preview ratecard'
                      onClick={() => toRateCardCalculation(params.row)}
                      disabled={(userRole === RoutePermittedRole.Finance && params.row.biz_id && params.row.biz_id.business_availability !=="with_rate") ? false : true}
                    />
                    </React.Fragment>
                    }
                    
                  </React.Fragment> : 
                  //add rete card finance
                  ((userRole === RoutePermittedRole.Finance))&& <GridActionsCellItem
                    key={params.id}
                    icon={<Tooltip title="Create Rate Card">
                      <AddCardIcon color={(userRole !== RoutePermittedRole.Finance) ? 'disabled' : 'primary'} />
                    </Tooltip>}
                    label='Create Rate Card'
                    onClick={() => toRateCard('create', params.row)}
                    disabled={(userRole === RoutePermittedRole.Finance) ? false : true}
                  />
                }
              </React.Fragment>
              <React.Fragment>
                {
                  userRole !== RoutePermittedRole.Finance ?
                    <GridActionsCellItem
                      key={`${params.id}_view`}
                      icon={<Tooltip title="View Lead Processing Details">
                        <VisibilityIcon color={'primary'} />
                      </Tooltip>
                      }
                      label='Duplicate User'
                      onClick={() => viewLeactDetails(params.id)}
                    />
                    : null
                }


                {RoutePermittedRole.Business === statuscode.roles || RoutePermittedRole.Admin === statuscode.roles || RoutePermittedRole.Superadmin === statuscode.roles ?
                  <React.Fragment>                
                    <GridActionsCellItem
                      key={`${params.id}_chart`}
                      icon={
                        <Tooltip title="Lead Conversion (Avg. Days)">
                          <LeaderboardIcon color={params.row.leadconversionreport.length !== 0 ? 'primary' : 'disabled'} />
                        </Tooltip>
                      }
                      label='Lead Conversion'
                      onClick={() => onOpenleadConversion(params)}
                      disabled={params.row.leadconversionreport.length !== 0 ? false : true}
                    />
                        <GridActionsCellItem
                      key={`${params.id}_edit`}
                      icon={
                        <Tooltip title="Edit Lead">
                          <EditIcon color={params.row.category_status !== 'not initiated' ? 'disabled' : 'primary'} />
                        </Tooltip>}
                      label='Toggle Admin'
                      onClick={generalAction(params.id)}
                      disabled={params.row.category_status !== 'not initiated' ? true : false}
                    />
                      <GridActionsCellItem
                      key={`${params.id}_ratepreview`}
                      icon={<Tooltip title="Preview Rate Card">
                        <CurrencyExchangeIcon color={(userRole === RoutePermittedRole.Business && params.row.biz_id && params.row.biz_id.business_availability !=="with_rate") ? 'primary' : 'disabled'} />
                      </Tooltip>}
                      label='Preview ratecard'
                      onClick={() => toRateCardCalculation(params.row)}
                      disabled={(userRole === RoutePermittedRole.Business && params.row.biz_id && params.row.biz_id.business_availability !=="with_rate") ? false : true}
                    />
                  </React.Fragment>
                  : null
                }
              </React.Fragment>
            </React.Fragment>
          ]
        }
      ];

      setLeadFilterColumns(leadFilterColumns)
    }
  }

  /**
   * Grid search component onChange function
   */
  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const postValues: any = {
      size: pageSize,
      page: pageNext,
      sort: '',
      Serachkeyword: searchValue
    }
    props.getLeadData(postValues)
  };


  const generalAction = React.useCallback((id) => () => {
    if (id) {
      props.getLeadDetails(id)
      navigate(`/business/edit-leads/${id}`, { state: { leadId: id } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);


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
    props.getLeadData(postValues)
  };

  const generalPaging = (paging) => {
    const postValues: any = {
      size: pageSize,
      page: paging,
      sort: SortItem,
      Serachkeyword: searchText
    }
    setPageNext(paging)
    props.getLeadData(postValues)

  }
  const generalPageSizing = (showPageNo) => {
    const postValues: any = {
      size: showPageNo,
      page: pageNext,
      sort: SortItem,
      Serachkeyword: searchText
    }
    props.getLeadData(postValues)
    setPageSize(showPageNo)
  }
  const generalGridChange = (event) => {
  }
  const onAddNewLead = () => {
    navigate("/business/leads");
  }


  // This is a function used to close leads conversion box
  const closeLeadsCon = () => {
    setShowLeadsCon(false)
  }

  const putAssignData = (getValues?: any, getAssignId?: any) => {
    const postValue: any = {
      assignId: getAssignId,
      postData: getValues
    }
    if (getAssignId) {
      props.pullAssignUser(postValue)
      const postValues: any = {
        size: pageSize,
        page: pageNext,
        sort: SortItem,
        Serachkeyword: searchText
      }
      props.getLeadData(postValues)
    }
  }
  // This is function used to view lead conversion 
  const getLeadsConversion = (getSelectValues?: any) => {
    if(getSelectValues){
      let postValues = {
        department:getSelectValues
      }
      props.leadsConversionAvg(postValues)
      setShowLeadsConFull(true)
    }  
  }
  const closeLeadsConAvg = () => {
    setShowLeadsConFull(false)
  }

  const setRateCardPreviewAction = (dialog) => (event) => {
    setOpenRateCardPreview(event ? dialog : false);
  }

  return (
    <React.Fragment>
      {
        openAddRequest ?
          <AppLoader />
          : null
      }
      {
        onViewBusinessDetails && onLeadInfo ?
          <ViewBusinessDetails onOpen={onViewBusinessDetails} OnClose={onCloseViewLeadDetails} onLeadInfo={onLeadInfo} />
          : null
      }


      <Box style={{ width: "100%" }}>
        {
          openLeadDetails && getLeadDetails && props.getStepperInfo ?
            <ViewBusinessLeadDetails showpage={openLeadDetails} viewIdDetails={idLeadDetails} closeBusinessLeadDetails={(e) => closeBusinessLeadBox(e)} LeadDetails={getLeadDetails} getLeadDetailsList={getLeadDetailsList} />
            : null
        }
        {
          SLAProcess ?
            <AddSlaModule onChange={(e) => postSLAStatus(e)} closeDialogBox={(e) => setCloseDialogBox(e)} show={SLAProcess} />
            : null
        }

        <Grid container spacing={2}>
          <Grid item xs></Grid>
          {/* <Grid item xs={12} md={4}>
    
        </Grid> */}
          <Grid item xs={12} md={6}>

            {RoutePermittedRole.Business === statuscode.roles || RoutePermittedRole.Admin === statuscode.roles || RoutePermittedRole.Customer === statuscode.roles || RoutePermittedRole.Superadmin === statuscode.roles ?

              <Box className="flexcolumbox" sx={{ justifyContent: 'right' }}>
                <Autocomplete
                  onChange={(event: any, newValue: any) => {
                  }}
                  getOptionLabel={(option: any) => (option ? option : "")}
                  onInputChange={(event, newInputValue) => {
                    getLeadsConversion(newInputValue)
                  }}
                  id='controllable-states-demo'
                  options={getDepartmentList ? getDepartmentList : []}
                  className="createLeadConversion"
                  renderInput={(params) => <TextField {...params} label='Leads Conversion (avg. days)' />}
                  sx={{ marginRight: 3 }}
                />
                <Button variant="outlined" startIcon={<AddCircle />} onClick={onAddNewLead}>
                  Add New Business
                </Button>
              </Box>
              : null
            }
          </Grid>
        </Grid>


        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
          {getleadFilterColumns && getleadFilterColumns !== undefined && getleadFilterColumns.length > 0 && businessGridData.businessGridData ?

            <DataGrid
              autoHeight
              rowHeight={64}
              rows={businessGridData.businessGridData}
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
            : <AppLoader />}

        </Box>
        {leadsConversionList ?
          <LeadsCoversionAvgDay show={showLeadsConFull} leadConversion={leadsConversionList.average_report} leadsData={leadsConversionList.leads_data} closeLeadsConAvg={closeLeadsConAvg} />
          : null}
        {getleadConversion ?
          <LeadsConversion show={showLeadsCon} closeLeadsCon={closeLeadsCon} getleadConversion={getleadConversion} />
          : null}
        {
          assignEnable ?
            <AssignBusinessCase assignEnable={assignEnable} setAssignEnable={setAssignEnable}
              assignValidationSchema={assignValidationSchema} putAssignEnable={setAssignEnable}
              putAssignData={putAssignData} putAssignId={assignId} businessGridData={businessGridData} getCustomerandBusiness={getCustomerandBusiness} />
            : null
        }

        {openRateCardPreview && <RateCardCalculationPreview show={openRateCardPreview}
          setRateCardPreviewAction={setRateCardPreviewAction} bizRateCardDetails={bizRateCardDetails} action={'leads'} />}
      </Box>
    </React.Fragment>
  );
}

const mapStateToProps = (state: any) => {
  return {
    statuscode: state.auth.profileDetails,
    businessGridData: state.businessProcess,
    getLeadDetailsList: state.businessProcess.getLeadsEditResponse,
    loading: state.businessProcess.loading,
    assignSuccess: state.businessProcess.assignSuccessStatus,
    checkTokenStatus: state.auth.tokenValidationStatus,
    getUserDate: state.businessProcess.getUserDateList,
    leadsConversionList: state.businessProcess.leadsConversion,
    getDepartmentList: state.businessProcess.getDepartmentList,
    getStepperInfo: state.businessProcess.getStepperData,
    bizLoading: state.businessRequirement.loading,
    requirementWithoutBizCase: state.businessRequirement.requirementWithoutBizCase,
    getCustomerandBusiness: state.businessProcess.getCustomerandBusiness,
    errorsCheckToken: state.businessProcess.errors
  }
}
const mapDispatchToProps = (dispatch?: any) => {
  return {
    checkTokenValidation: () => dispatch({ type: ActionTypes.TOKEN_VALIDATION_REQUEST }),
    getLeadData: (getValues?: any) => dispatch({ type: ActionTypes.GET_LEADS_REQUEST, value: getValues }),
    getUserDateList: () => dispatch({ type: ActionTypes.GET_USERDETAILS_REQUEST }),
    pullAssignUser: (postValue?: any) => dispatch({ type: ActionTypes.ASSIGN_PROJECT_REQUEST, value: postValue }),
    getLeadDetails: (getValues?: any) => dispatch({ type: ActionTypes.GET_LEADS_DATA_REQUEST, getValues }),
    leadsConversionAvg: (leadsCon: any) => dispatch({ type: ActionTypes.LEADS_CONVERSION_REQUEST, value: leadsCon }),
    getDepartmentDetails: (getDept: any) => dispatch({ type: ActionTypes.GET_DEPARTMENT_REQUEST, value: getDept }),
    getstepperList: (getLeadId: any) => dispatch({ type: ActionTypes.GET_STEPPER_REQUEST, value: getLeadId }),
    logout: () => dispatch({ type: ActionTypes.GET_USERDETAILS_REQUEST }),
    initBizRequirement: () => {
      dispatch(initBizRequirementAction())
    },
    setRequirmentWithOutBizCaseRequest: (data: any) => {
      dispatch(setRequirementWOBizCaseAction(data))
    },
    reqCustomerAndBusiness: () => dispatch(reqCustomerAndBusiness()),
    initBizRateCardProcess: () => {
      dispatch(initFinanceProcessAction())
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuickFilteringGrid);