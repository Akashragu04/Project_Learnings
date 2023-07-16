import React, { useEffect } from 'react'
import { DataGrid, GridActionsCellItem, gridClasses, } from "@mui/x-data-grid";
import { Box, Button, ButtonGroup, Grid, Tooltip } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { useStyles } from '../../../@crema/commonservices/Types';
import { connect } from "react-redux";
import { OperationActionTypes } from '../../../saga/Types/OperationTypes';
import AppLoader from '@crema/core/AppLoader'
import AddNewTask from './AddNewTask';
import { appConstants, RoutePermittedRole } from 'shared/constants/AppConst';
import ViewTaskOverviewRemark from './ViewTaskOverviewRemark';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppGridContainer from "@crema/core/AppGridContainer";
import UpdateStatus from './UpdateStatus';
import { reqClearCapnitiDetails, reqPostReopenTask, reqUpdateStatusTaskOverview} from '../../../saga/Actions';
import TaskReopenComments from './TaskReopenComments';
import ArticleIcon from '@mui/icons-material/Article';

const TaskManagement = (props?: any) => {
  const classes = useStyles();
  const { getTaskData } = props;
  const [getProjectFilterColumns, setProjectFilterColumns] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [pageNext, setPageNext] = React.useState(0);
  const [SortItem, setSortItem] = React.useState('');
  const [openAddTask, setOpenAddTask] = React.useState(false)
  const [openTaskOverview, setTaskOverview] = React.useState(false)
  const [getTaskOverviewInfo, setTaskOverviewInfo] = React.useState({})
  const [openUpdateState, setUpdateState] = React.useState(false)
  const [getUpdateStateInfo, setUpdateStateInfo] = React.useState<any>({})
  const [openTaskReopen, setTaskReopen] = React.useState(false)
  const [getInitialFields, setInitialFiels] = React.useState<any>(null)
  const [getTaskStatus, setTaskStatus] = React.useState<any>(null)

  React.useEffect(()=>{
      const getInitialValues:any = {
          reopenComments:''
      }
      setInitialFiels(getInitialValues)
  },[])

  useEffect(() => {
    getRoleBased()
    getTasksOverview()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(()=>{
if(props.resReopenTask && props.resReopenTask.status === true){  
  setTaskReopen(false)
  props.reqClearCapnitiDetails()
  getTasksOverview()
}
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.resReopenTask])

  const generalPageSizing = (showPageNo) => {
    const postPageSizing: any = {
      size: showPageNo,
      page: pageNext,
      sort: SortItem,
      Serachkeyword: searchText
    }
    props.getTaskDetails(postPageSizing)
    setPageSize(showPageNo)
  }

  const requestSearch = (searchValue: string) => {
    const postValues: any = {
      size: pageSize,
      page: pageNext,
      sort: '',
      Serachkeyword: searchValue
    }
    props.getTaskDetails(postValues)
    setSearchText(searchValue);
  };

  const handleSortModelChange = (sortField) => {
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
    props.getTaskDetails(postSortValues)
    setSortItem(sortField)
  }

  const generalPaging = (paging) => {
    const postPaging: any = {
      size: pageSize,
      page: paging,
      sort: SortItem,
      Serachkeyword: searchText
    }
    props.getTaskDetails(postPaging)
    setPageNext(paging)
  }
const onSubmitUpdateStatu = (getValues?:any) =>{
  props.reqUpdateStatusTask(getValues)
  closeUpdateStatus()  
  setTimeout(() => {
    getTasksOverview()
  }, 1000);
}
  const generalGridChange = (event) => {
  }
const onViewTaskOverview = (getData?:any, getStatus?:any)=>{
  setTaskOverview(true)
  setTaskOverviewInfo(getData)
  setTaskStatus(getStatus)
}
const closeViewTaskOverview = (getData?:any)=>{
  setTaskOverview(false)
}
  const closeAddNewTask = (closeAddTask?: any) => {
    setOpenAddTask(false)
    setTimeout(() => {
      getTasksOverview()
    }, 1000);

  }
  const getTasksOverview = () => {
    const getTaskData: any = {
      size: pageSize,
      page: pageNext,
      sort: SortItem,
      Serachkeyword: searchText
    }
    props.getTaskDetails(getTaskData)
  }
  const OpenAddNewTask = (closeAddTask?: any) => {
    setOpenAddTask(true)
  }

  const onUpdateStatus = (getTaskInfo?:any, getStatus?:any) =>{
    if(getTaskInfo && getStatus === 'Closed'){
      setTaskReopen(true)
      setUpdateStateInfo(getTaskInfo)
    }else{
      setUpdateState(true)
      setUpdateStateInfo(getTaskInfo) 
    }
  }

  const closeUpdateStatus = () =>{
    setUpdateState(false)
  }

  const closeTaskReopen = () =>{
    setTaskReopen(false)
  }

  const onSubmitTaskReopen = (getValues?:any) =>{
   
    if(getUpdateStateInfo){
      let postValues:any = {
        taskid:getUpdateStateInfo.id,
        reopenstatus:'Re-Open',
        reCommentPost:getValues
      }
      props.reqPostReopenTask(postValues)
      setTaskReopen(false)
    }
  }

  const getRoleBased = () => {
    const leadFilterColumns: any = [
      // { field: 'id', headerName: 'S.No.', headerClassName: appConstants.dataGridAppDataHeader, width: 70, filterable: false, align: "left" },
      
      // {
      //   field: 'project_id',
      //   headerName: 'Project Code',
      //   headerClassName: appConstants.dataGridAppDataHeader,
      //   minWidth: 120, flex: 1,
      //   roleTypes: "common",
      //   renderCell: (params) => {
      //     return (
      //       <React.Fragment>             
      //         <Box>{params.row.projectId ? params.row.projectId.project_id : '-'} </Box>
      //       </React.Fragment>)
      //   }
      // },
      {
        field: 'project_name',
        headerName: 'Project Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return (
            <React.Fragment>
              <Box>{params.row.projectId ? params.row.projectId.project_name : '-'} </Box>
            </React.Fragment>)
        }
      },
      {
        field: 'tasktarget',
        headerName: 'Target Date',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 100, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'slaid',
        headerName: 'SLA',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 120, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return (
            <React.Fragment>
              <Box>{params.row.slaId ? params.row.slaId.slaid : '-'} </Box>
            </React.Fragment>)
        }
      },
      {
        field: 'taskid',
        headerName: 'Task No',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'taskname',
        headerName: 'Task Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 120, flex: 1,
        roleTypes: "common",
      },
      {
        field: 'assigned_name',
        headerName: 'Assigned To',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 120, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'task_status',
        headerName: 'Status',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 200, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return (
            <React.Fragment>
            <AppGridContainer>
            <Grid item xs={7}>
            <Box>{params.row ? params.row.task_status : '-'} </Box>
              </Grid>
              <Grid item xs={5}>
              <Box><Button variant='contained' color={params.row.task_status ==="Closed"?'info':'primary'} size='small' onClick={()=>onUpdateStatus(params.row,  params.row.task_status)}>{ params.row.task_status ==="Closed"?"Reopen":"Update"}</Button></Box>
              </Grid>
            </AppGridContainer>
          </React.Fragment>)
        }
      },
      {
        field: 'taskdescription',
        headerName: 'Task Description',
        headerClassName: appConstants.dataGridAppDataHeader,
        type: 'actions',
        minWidth: 150, flex: 1,
        roleTypes: "common",
        getActions: (params) => [
          <React.Fragment key={`${params.id}`}>
              <GridActionsCellItem
              icon={
                <Tooltip title="View Task Description">
              <VisibilityIcon color={'primary'} />
              </Tooltip>}
              label='Duplicate User'
              onClick={() => onViewTaskOverview(params.row, 'view')}
            />
                  <GridActionsCellItem
                  disabled={params.row.reopenComments !== null?false:true}
              icon={
                <Tooltip title="View Reopen Comment">
              <ArticleIcon color={params.row.reopenComments !== null?'primary':'disabled'} />
              </Tooltip>}
              label='Duplicate User'
              onClick={() => onViewTaskOverview(params.row, 'reopen')}
            />
          </React.Fragment>
        ]
      },
    ];
    setProjectFilterColumns(leadFilterColumns)
  }
  
  return (
    <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
      {
        openTaskReopen && getInitialFields?
        <TaskReopenComments onOpen={openTaskReopen} onClose={closeTaskReopen} onSubmit={onSubmitTaskReopen} getInitialFields={getInitialFields}/>
        :null
      }
      
      {
        openUpdateState?
        <UpdateStatus openUpdateState={openUpdateState} getUpdateStateInfo={getUpdateStateInfo} 
        closeUpdateStatus={closeUpdateStatus}  onSubmitUpdateStatu={onSubmitUpdateStatu}/>
        :null
      }
      
      {
        openTaskOverview && getTaskStatus?
        <ViewTaskOverviewRemark closeViewTaskOverview={closeViewTaskOverview} openTaskOverview={openTaskOverview} getTaskStatus={getTaskStatus} getTaskOverviewInfo={getTaskOverviewInfo}/>
        :null
      }
      
      {
        RoutePermittedRole.Business === props.authRole.roles ?
          <Box sx={{ marginBottom: 5, textAlign: 'right' }}>
            <ButtonGroup variant='outlined' aria-label='outlined button group'>
              <Button onClick={OpenAddNewTask}>Add New Task</Button>
              {/* <Button>Send Reminder</Button> */}
            </ButtonGroup>
          </Box>
          : null
      }
      {
        openAddTask?
        <AddNewTask openAddTask={openAddTask} closeAddNewTask={closeAddNewTask} />
        :null
      }
      
      {getProjectFilterColumns && getProjectFilterColumns !== undefined && getProjectFilterColumns.length > 0 && getTaskData ?
        <DataGrid
          autoHeight
          rowHeight={64}
          rows={getTaskData.content}
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
          rowCount={getTaskData.totalElements}
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
  )
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.operationProcess.loading,
    getTaskData: state.operationProcess.getTaskDetails,
    authRole: state.auth.profileDetails,
    resReopenTask:state.operationProcess.resReopenTask
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    getTaskDetails: (getTaskRequest?: any) => dispatch({ type: OperationActionTypes.GET_TASK_REQUEST, value: getTaskRequest }),
    reqUpdateStatusTask: (getUpdateTask?: any) => dispatch(reqUpdateStatusTaskOverview(getUpdateTask)),
    reqPostReopenTask:(getValues?:any) =>dispatch(reqPostReopenTask(getValues)),
    reqClearCapnitiDetails:()=>dispatch(reqClearCapnitiDetails())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskManagement);
// export default TaskManagement;