import React, {useEffect} from 'react'
import { DataGrid, gridClasses, } from "@mui/x-data-grid";
import { Box, Button, Chip, Stack, Grid} from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst";
import {projectData} from '../../../@crema/commonservices/Types';
import CircularProgressWithLabel from '../../../@crema/commonservices/CircularProgress';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import {resourceAllowcation} from '../Types';
import ResourceMapping from './ResourceMapping';
import { connect } from "react-redux";
import {OperationActionTypes} from '../../../saga/Types/OperationTypes';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const ResourceAllocation = (props?:any) => {  
  const classes = useStyles();
  const [getProjectFilterColumns, setProjectFilterColumns] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);  
  const [searchText, setSearchText] = React.useState("");
  const [SortItem, setSortItem] = React.useState("");
  const [pageNext, setPageNext] = React.useState(0);
  const [showResourceMap, setShowResourceMap] = React.useState(false);
  // const [progress, setProgress] = React.useState(30);
  const [resourceData, setResourceData] = React.useState([]);
  
  useEffect(() => {
    if(pageSize){
      const postValues: any = {
        size: pageSize,
        page: pageNext,
        sort: SortItem,
        Serachkeyword: searchText
      }
      props.getProjectDetails(postValues)
    }
    getRoleBased()
    filterNewResourceData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const filterNewResourceData = () => {
    const pushResourceData:any = [];
    projectData.forEach((resourceData:any, i:any)=>{
      if(resourceData.business_case === 'No'){
        pushResourceData.push(resourceData)
      }
    })
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

  const handleSortModelChange = (sortField:any) => {
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

  const generalPaging = (paging?:any) => {
    const postPaging: any = {
      size: pageSize,
      page: paging,
      sort: SortItem,
      Serachkeyword: searchText
    }
    setPageNext(paging)
    props.getProjectDetails(postPaging)
  }



  const generalGridChange = (event) => {
  }

  const getRoleBased = () => {
    const leadFilterColumns: any = [
      // { field: 'id', headerName: 'S.No.', headerClassName: appConstants.dataGridAppDataHeader, width: 70, filterable: false, align: "left" },
      {
        field: 'project_id',
        headerName: 'Project Code',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 120, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'project_name',
        headerName: 'Project Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell:(parames) =>{
          return(<>
           <span  style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', fontSize: 12, marginRight:15 }}>{parames.row.project_name}</span>
          </>)
        }
      },
      {
        field: 'sla_value',
        headerName: 'SLA Values',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 120, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'invoice_status',
        headerName: 'Invoice',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 230, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          const statusIcon: any = <CurrencyRupeeRoundedIcon />;
          const statusColor: any = 'primary';
          return (  
          <Grid container rowSpacing={5}>
            <Grid item xs={6} sm={6} md={6}>
            <Box sx={{ marginTop: 3 }}>
              <Stack direction='column' spacing={1}>
                <Chip icon={statusIcon} color={statusColor} label={params.row.invoice_value} variant='outlined' size='small' />
                <span style={{ display: 'flex', flexDirection: 'row', color: 'red', textAlign: 'center', fontSize: 12 }}>{params.row.invoice_status}</span>
              </Stack>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Box sx={{ marginLeft: 5, marginTop: 1  }}>
                <CircularProgressWithLabel value={params.row.invoice_persentage} />
              </Box>
            </Grid>
          </Grid>
          );
        }
      },
      {
        field: 'status',
        headerName: 'Status',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 120, flex: 1,
        sortable: false,
        roleTypes: RoutePermittedRole.Business,
        renderCell: (params) => {
          return <span  style={{ display: 'flex', flexDirection: 'row', color: 'default', textAlign: 'center', fontSize: 12 }}>{params.row.status}</span>;
        }
      },
      {
        field: 'allocatable_resource_progress',
        headerName: 'Allocation Progress',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        sortable: false,
        roleTypes: RoutePermittedRole.Business,
        renderCell: (params) => {
          return <span  style={{ display: 'flex', flexDirection: 'row', color: 'default', textAlign: 'center', fontSize: 12 }}>{params.row.allocatable_resource_progress}</span>;
        }
      },
      {
        field: 'allocatable_resource',
        headerName: 'Allocation Pending',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        sortable: false,
        roleTypes: RoutePermittedRole.Business,
        renderCell: (params) => {
          return(
            <React.Fragment>
              <Box>{params.row.allocatable_resource?params.row.allocatable_resource:0} %</Box>
            </React.Fragment>
          )
          
          
        }
      },
      {
        field: 'total_fte_count',
        headerName: 'Total FTE',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 100, flex: 1,
        sortable: false,
        roleTypes: RoutePermittedRole.Business,
        renderCell: (params) => {
          return(
            <React.Fragment>
              <Box>{params.row.total_fte_count?params.row.total_fte_count:0}</Box>
            </React.Fragment>
          )
          
          
        }
      },
      {
        field: 'payments',
        headerName: 'Payments',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 120, flex: 1,
        sortable: false,
        roleTypes: RoutePermittedRole.Business,
        renderCell: (params) => {
          return <CircularProgressWithLabel value={params.row.payment_persentage}/>;
        }
      },
      {
        field: 'action',
        headerName: 'Action',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        sortable: false,
        roleTypes: RoutePermittedRole.Business,
        renderCell: (parames) => {
          return (
            <React.Fragment>
                <Button variant='outlined' color={'primary'} 
                sx={{padding:1}} onClick={()=>openResourceMapping(parames)}>
                  {parames.row.is_new && parames.row.is_new !== null ? 'Allocate Resource': 'View Allocation'}</Button>
            </React.Fragment>
          );
        }
      },
      
    ];
    setProjectFilterColumns(leadFilterColumns)
  }
const openResourceMapping = (getResourceAllocationData?:any) =>{
  setResourceData(getResourceAllocationData.row);
  props.getSLAListRequest(getResourceAllocationData.id)
  setShowResourceMap(true)
}

const closeResourceMapping = () =>{
  setShowResourceMap(false)
}

  return (
    <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
      {resourceAllowcation && resourceData?
      <ResourceMapping show={showResourceMap} 
      resourceAllowcation={resourceAllowcation} 
      closeResourceMapping={closeResourceMapping} 
      resourceData={resourceData}/>      
      :null}
    {getProjectFilterColumns && getProjectFilterColumns !== undefined && getProjectFilterColumns.length > 0 && props.getProjectInfo ?
      <DataGrid
        autoHeight
        rowHeight={64}
        rows={props.getProjectInfo.content}
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
        rowCount={props.getProjectInfo.totalElements}
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
    loading: state.operationProcess.loading,
    getProjectInfo:state.operationProcess.getProjectDetails,
    getSLAList:state.operationProcess.getSLAList
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    getProjectDetails: (getProjectPageNo?:any) => dispatch({ type: OperationActionTypes.PROJECT_REQUEST, value:getProjectPageNo}),
    getSLAListRequest: (getResourceId?:any) => dispatch({ type: OperationActionTypes.GET_SLA_LIST_REQUEST, value:getResourceId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceAllocation);