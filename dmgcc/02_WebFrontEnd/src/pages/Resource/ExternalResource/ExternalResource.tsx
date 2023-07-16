import React, { useEffect } from 'react'
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import {  Box, Button, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from "react-router-dom";
import EditExternalResource from './EditExternalResource';
import AlertMessageDelete from './AlertMessageDelete';
import { connect } from "react-redux";
import {reqDeleteThirdpartyResource, reqRestInitialData, reqThirdpartyResource} from 'saga/Actions/resources.actions';
import { appConstants } from 'shared/constants/AppConst';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const ExternalResource = (props?:any) => {
  // const navigate = useNavigate();
  const classes = useStyles();
  const [getExternalResourceColumns, setExternalResourceColumns] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);  
  const [searchText, setSearchText] = React.useState("");
  const [SortItem, setSortItem] = React.useState('');
  const [pageNext, setPageNext] = React.useState(0);
  const [getUserInfo, setUserInfo] = React.useState(null);
  const [ShowUserEdit, setUserEdit] = React.useState(false);
  const [showDeleteResource, setDeleteResource] = React.useState(false);
  const [showResourceInfo, setResourceInfo] = React.useState({})
  const [showMultipleResourceInfo, setMultipleResourceInfo] = React.useState([])
  const [getThirdPartResourceInfo, setThirdPartResourceInfo] = React.useState([])
  

    
  useEffect(() => {
    getRoleBased()
    setPageNext(0);
    // getResourceExternalData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  React.useEffect(()=>{
if(props.getThirdPartResource && props.getThirdPartResource.content){
  setThirdPartResourceInfo(props.getThirdPartResource.content)
}

// eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.getThirdPartResource])
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
  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const postValues: any = {
      size: pageSize,
      page: pageNext,
      sort: '',
      Serachkeyword: searchValue
    }
    props.getThirdpartyResource(postValues)
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
      props.getThirdpartyResource(postValues)
    }

    setSortItem(sortField)
  }

  const getResourceExternalData = ()=>{
    const postValues: any = {
      size: pageSize,
      page: pageNext,
      sort: SortItem,
      Serachkeyword: searchText
    }
    props.getThirdpartyResource(postValues)
  }
  const generalPaging = (paging) => {
    const postValues: any = {
      size: pageSize,
      page: paging,
      sort: SortItem,
      Serachkeyword: searchText
    }
    setPageNext(paging)
    props.getThirdpartyResource(postValues)
  }

  const generalGridChange = (event) => {
  }
 const onEditUserDetails = (getUserInfo?:any) =>{
  setUserInfo(getUserInfo)
  setUserEdit(true)
 }
  // This is a function used to delete resource option
 const onDeleteUserDetails = (getDeleteData?:any) =>{
  setDeleteResource(true)
  setResourceInfo(getDeleteData)
 }
 
  // This is a function used to Close Delete Alter Box
 const closeResourceView = () =>{
  setDeleteResource(false)
 }
 const handleClose = () =>{
  setUserEdit(false)
 }

 const confirmDeleteResource = () => {
  const getResourceData:any = showResourceInfo;
   if(getResourceData){
    const postValues:any = {
      user_id:[getResourceData.id]
     }
    props.deleteThirdpartyResource(postValues)
    closeResourceView()
    getResourceExternalData()
   }

 }

 const confirmMulitpleDelete = () =>{
if(showMultipleResourceInfo){
  const postValues:any = {
    user_id:showMultipleResourceInfo
   }
  props.deleteThirdpartyResource(postValues)
  getResourceExternalData()
}
 }
//  This is a function used to multiple delete file
const multipleDeleteResource = (getResourceData?:any) =>{
  setMultipleResourceInfo(getResourceData)
 
}

  const getRoleBased = () => {
    const leadFilterColumns: any = [
      // { field: 'id', headerName: 'S.No.', headerClassName: appConstants.dataGridAppDataHeader, width: 90, filterable: false, align: "left" },
      {
        field: 'shortid',
        headerName: 'Short Id',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 130,
        roleTypes: "common"
      },
      {
        field: 'employee_code',
        headerName: 'HR Id',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 200,
        roleTypes: "common"
      },
      {
        field: 'emp_name',
        headerName: 'Employee Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 200,
        roleTypes: "common"
      },
      {
        field: 'email',
        headerName: 'Email',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 300,
        roleTypes: "common"
      },
      {
        field: 'date_of_join',
        headerName: 'DOJ',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 120,
        roleTypes: "common"
      },
      {
        field: 'category',
        headerName: 'Category',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 150,
        roleTypes: "common"
      },
      {
        field: 'action',
        headerName: 'Action',
        headerClassName: appConstants.dataGridAppDataHeader,
        type: 'actions',
        width: 100,
        className:'hideoption',
        getActions: (params) => [
          <React.Fragment>
              <GridActionsCellItem
                key={`${params.id}_edit`}
                icon={
                  <Tooltip title="Edit Resource">
                <EditIcon color={'primary'} />
                </Tooltip>}
                label='Toggle Admin'
                onClick={()=>onEditUserDetails(params.row)}
                className="hideoption"
              />
                    <GridActionsCellItem
                key={`${params.id}_delete`}
                icon={
                  <Tooltip title="Delete Resource">
                <DeleteIcon color={'primary'} />
                </Tooltip>}
                label='Toggle Admin'
                onClick={()=>onDeleteUserDetails(params.row)}
                className="hideoption"
              />
          </React.Fragment>
        ]
      }
      
    ];
    setExternalResourceColumns(leadFilterColumns)
  }
  
  return (
    <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
      {
  ShowUserEdit?
  <EditExternalResource showpage={ShowUserEdit} getUserInfo={getUserInfo} handleClose={handleClose}/>
  :null
}
{
  showDeleteResource?
  <AlertMessageDelete showDeleteResource={showDeleteResource} showResourceInfo={showResourceInfo} 
  closeResourceView={closeResourceView} confirmDeleteResource={confirmDeleteResource}/>  
  :null
}
<Box sx={{textAlign:'right', marginBottom:5}}>
      <Button sx={{
          position: "relative",
          minWidth: 100,
      }}
          variant="contained"
          color="primary"
          type="submit"
          onClick={()=>confirmMulitpleDelete()}
          disabled={showMultipleResourceInfo.length <= 0 ? true:false}
      >  Delete </Button>
      </Box>
    {getExternalResourceColumns  && getThirdPartResourceInfo ?
      <DataGrid
        autoHeight
        rowHeight={64}
        rows={getThirdPartResourceInfo ?getThirdPartResourceInfo:[]}
        columns={getExternalResourceColumns}
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
        rowCount={props.getThirdPartResource && props.getThirdPartResource.totalElements?props.getThirdPartResource.totalElements:0}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 25, 50]}
        checkboxSelection
        disableSelectionOnClick
        disableColumnMenu
        loading={props.loading}
        sortingMode='server'
        onSortModelChange={handleSortModelChange}
        onPageChange={(paging) => generalPaging(paging)}
        onPageSizeChange={(size) => generalPageSizing(size)}
        onStateChange={(event) => generalGridChange(event)}
        onSelectionModelChange={(itm:any) => multipleDeleteResource(itm)}
      />
      : null}
    
  

  </Box>
  )
}



const mapStateToProps = (state: any) => {
  return {
      loading: state.resourceProcess.loading,
      getThirdPartResource:state.resourceProcess.getThirdPartResource,
      resEditThirdpartData:state.resourceProcess.resEditThirdpartData,
      resAddThirdpartData:state.resourceProcess.resAddThirdpartData
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
      deleteThirdpartyResource: (postCostCentreId?: any) => dispatch(reqDeleteThirdpartyResource(postCostCentreId)),
      getThirdpartyResource: (postCostCentreId?: any) => dispatch(reqThirdpartyResource(postCostCentreId)),
      reqRestInitialData:()=>dispatch(reqRestInitialData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExternalResource);

// export default ExternalResource;