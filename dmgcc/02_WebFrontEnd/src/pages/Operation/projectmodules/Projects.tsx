import React, { useEffect } from 'react'
import { DataGrid, gridClasses, } from "@mui/x-data-grid";
import { Box, Button, Chip, Stack, Tooltip } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst";
import CircularProgressWithLabel from './CircularProgress';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { OperationActionTypes } from '../../../saga/Types/OperationTypes';
import { SlaConfirmationModule } from './SlaConfirmationModule';
import SlaUpload from './SlaUpload';
import { initBizCaseSLAAction, reqClearLoginDetails, setBizCaseC4DSLAAction, setCommonUploadResetAction } from 'saga/Actions';
import { toast } from 'react-toastify';
import ProjectFullViewDetails from './ProjectFullViewDetails';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const Projects = (props?: any) => {
  const navigate = useNavigate();
  const { getProjectInfo, setC4DSLAResponse } = props;
  const classes = useStyles();
  const [getProjectFilterColumns, setProjectFilterColumns] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [SortItem, setSortItem] = React.useState("");
  const [pageNext, setPageNext] = React.useState(0);
  const [showSLAPreview, setShowSLAPreview] = React.useState(false);
  const [showSLAUpload, setShowSLAUpload] = React.useState(false);
  const [projectId, setProjectId] = React.useState(null);
  const [slaAction, setSLAAction] = React.useState<any>(null);
  const { pathname } = useLocation(); 
  const [filterProject, setFilterProject] = React.useState(false)
  
  React.useEffect(()=>{
    if(props.checkTokenStatus){
      if(props.checkTokenStatus.message === 'Invalid Token'){
        // logout()
        // navigate("/signin");
        props.reqClearLoginDetails();
        // window.location.reload()
      }
    }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
      },[props.checkTokenStatus])

  useEffect(() => {
    props.initBizCaseSLA();
    if (pageSize) {
      const postValues: any = {
        size: pageSize,
        page: pageNext,
        sort: SortItem,
        Serachkeyword: searchText
      }
      props.getProjectDetails(postValues)
    }
    
    filterSLAUrl(); //SLA Create project action URL
    getRoleBased()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (setC4DSLAResponse && setC4DSLAResponse.status) {
      toast.success(setC4DSLAResponse.message, { position: 'bottom-right' });
      setShowSLAUpload(false);
      props.resetCommonFileUpload();
      navigate(`/SLA/sla-creation/${projectId}`, { state: { type: 'c4d', ProjectId: projectId, action: slaAction, data: setC4DSLAResponse.data } })
      props.initBizCaseSLA();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setC4DSLAResponse])

  const filterSLAUrl = () => {
    if (pathname) {
      if (pathname.includes('SLA')) {
        setSLAAction("/SLA/projects");
      } else if (pathname.includes('operation')) {
        setSLAAction("/operation/projects");
      }
    }
  }

  const generalPageSizing = (showPageNo) => {
    const postPageSizing: any = {
      size: showPageNo,
      page: pageNext,
      sort: SortItem,
      Serachkeyword: searchText
    }
    props.getLeadData(postPageSizing)
    setPageSize(showPageNo)
  }

  const requestSearch = (searchValue: string) => {
    const postValues: any = {
      size: pageSize,
      page: pageNext,
      sort: '',
      Serachkeyword: searchValue
    }
    props.getProjectDetails(postValues)
    setSearchText(searchValue);
  };

  const handleSortModelChange = (sortField: any) => {
    let postSortValues: any;
    if (sortField.length) {
      postSortValues = {
        size: pageSize,
        page: pageNext,
        sort: `${sortField[0].field},${sortField[0].sort}`,
        Serachkeyword: searchText
      }
    } else {
      postSortValues = {
        size: pageSize,
        page: pageNext,
        sort: '',
        Serachkeyword: searchText
      }
    }
    setSortItem(sortField)
    props.getProjectDetails(postSortValues)
  }

  const generalPaging = (paging?: any) => {
    const postPaging: any = {
      size: pageSize,
      page: paging,
      sort: SortItem,
      Serachkeyword: searchText
    }
    setPageNext(paging)
    props.getProjectDetails(postPaging)
  }


  const openResourceAll = (getResourceDetails: any) => {
    navigate('/operation/resource-allocation')
  }

  const onOpenProjectDetails = (getValues?:any) =>{
if(getValues){
  props.reqProjectOverview(getValues)
  setFilterProject(true)
}
  }

  const generalGridChange = (event) => {
  }

  const getRoleBased = () => {
    const leadFilterColumns: any = [

      {
        field: 'project_id',
        headerName: 'Project Code',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
        minWidth: 150,
        roleTypes: "common",
        renderCell: (params) => {
          return(
            <React.Fragment>
              <Tooltip title="View Project Details">
              <Box  sx={{cursor:"pointer", fontWeight:'bloder'}} onClick={()=>onOpenProjectDetails(params.row)}>
            {params && params.row ?params.row.project_id:'-'}
          </Box>
              </Tooltip>
                
            </React.Fragment>
          )
       
        }
      },
      {
        field: 'project_name',
        headerName: 'Project Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 200, flex: 1,
        roleTypes: "common",
        renderCell: (parames) => {
          let showNewProject: any = false;
          if (pathname.includes('SLA')) {
            showNewProject = false;
          } else if (pathname.includes('operation')) {
            showNewProject = true;
          }
          return (<>
            <span style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', fontSize: 12, marginRight: 15 }}>{parames.row.project_name}</span>
            {(showNewProject && parames.row.sla.length) ?
              <Button variant='outlined' color={'primary'} sx={{ padding: 0 }} disabled={parames.row.sla.length ? false : true} onClick={(parames) => openResourceAll(parames)}>New</Button> : null}

          </>)
        }
      },
      {
        field: 'service_receiver',
        headerName: 'Customer',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'sla_value',
        headerName: 'SLA Values',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'invoice_value',
        headerName: 'Invoiced',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          const statusIcon: any = <CurrencyRupeeRoundedIcon />;
          const statusColor: any = 'primary';
          return <Stack direction='column' spacing={1}>
            <Chip icon={statusIcon} color={statusColor} label={params.row.invoice_value} variant='outlined' size='small' />
            {params.row.invoice_status ?
              <span style={{ display: 'flex', flexDirection: 'row', color: 'red', textAlign: 'center', fontSize: 12 }}>{params.row.invoice_status}</span>
              : null}

          </Stack>
            ;
        }
      },
      {
        field: 'total_fte_count',
        headerName: 'Total FTE',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 100, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'status',
        headerName: 'Status',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        sortable: false,
        roleTypes: RoutePermittedRole.Business,
        renderCell: (params) => {
          return <span style={{ display: 'flex', flexDirection: 'row', color: 'default', textAlign: 'center', fontSize: 12 }}>{params.row.status}</span>;
        }
      },
      {
        field: 'payment_persentage',
        headerName: 'Payments',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 100, flex: 1,
        sortable: false,
        roleTypes: RoutePermittedRole.Business,
        renderCell: (params) => {
          return <CircularProgressWithLabel value={params.row.payment_persentage} />;
        }
      },
      {
        field: 'action',
        headerName: 'Action',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (parames) => {
          const onAddSLAClick = (e) => {
            e.stopPropagation();
            setShowSLAPreview(true)
            setProjectId(parames.row.id);
          };
          return (<>

            <Button variant='outlined' color={'primary'} onClick={onAddSLAClick} className="hideoption">Create SLA</Button>

          </>)
        }
      }

    ];
    setProjectFilterColumns(leadFilterColumns)
  }

  const postSLAStatus = (slaData: any) => {
    if (slaData.assign_sla === 'slaupload') {
      setShowSLAPreview(false);
      setShowSLAUpload(true);
    } else if (slaData.assign_sla === 'sla') {
      navigate(`/SLA/sla-creation/${projectId}`, { state: { type: 'sla', ProjectId: projectId, action: slaAction, data: {} } })
    }
  }

  const setCloseDialogBox = (condition: any) => {
    setShowSLAPreview(condition);
    setProjectId(null);
  }

  const slaUploadSubmit = (data) => {
    if (data) {
      props.setBizC4DSLADetail({ project_id: projectId, data: data })
    }
  }

  const onSLAUploadClose = (condition) => {
    setShowSLAUpload(false);
    setProjectId(null);
  }

  
  const closeProjectFilterData = (getValues?: any) => {
    setFilterProject(false)
  }

  return (
    <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
      {showSLAPreview && <SlaConfirmationModule show={showSLAPreview} onChange={postSLAStatus} closeDialogBox={setCloseDialogBox} />}
      {showSLAUpload && <SlaUpload show={showSLAUpload} projectId={projectId} onSLAUploadClose={onSLAUploadClose} slaUploadSubmit={slaUploadSubmit} />}
     {
      filterProject && props.getProjectOverview?
      <ProjectFullViewDetails getProjectOverview={props.getProjectOverview} show={filterProject} onClose={closeProjectFilterData}/>
      :null
     }
      

      {getProjectFilterColumns && getProjectFilterColumns !== undefined && getProjectFilterColumns.length > 0 && getProjectInfo ?

        <DataGrid
          autoHeight
          rowHeight={64}
          rows={getProjectInfo.content}
          columns={getProjectFilterColumns}
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
          rowCount={getProjectInfo.totalElements}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          // checkboxSelection
          disableSelectionOnClick
          disableColumnMenu
          loading={props.loading}
          sortingMode='server'
          onSortModelChange={handleSortModelChange}
          onPageChange={(paging) => generalPaging(paging)}
          onPageSizeChange={(size) => generalPageSizing(size)}
          onStateChange={(event) => generalGridChange(event)}

        />
        : null}
       
    </Box>
  )
}

const mapStateToProps = (state: any) => {
  return {
    checkTokenStatus: state.auth.tokenValidationStatus,
    loading: state.operationProcess.loading,
    getProjectInfo: state.operationProcess.getProjectDetails,
    setC4DSLAResponse: state.bizCaseSLAProcess.setC4DSLAResponse,
    getProjectOverview: state.operationProcess.getProjectOverview,
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    initBizCaseSLA: () => {
      dispatch(initBizCaseSLAAction())
    },
    setBizC4DSLADetail: (data: any) => {
      dispatch(setBizCaseC4DSLAAction(data))
    },
    resetCommonFileUpload: (data: any) => {
      dispatch(setCommonUploadResetAction(data))
    },
    reqClearLoginDetails: () => { dispatch(reqClearLoginDetails()) },
    getProjectDetails: (getProjectPageNo?: any) => dispatch({ type: OperationActionTypes.PROJECT_REQUEST, value: getProjectPageNo }),
    reqProjectOverview: (projectId?: any) => dispatch({ type: OperationActionTypes.PROJECT_OVERVIEW_REQUEST, value: projectId }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
// export default Projects;