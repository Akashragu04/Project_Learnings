import React from 'react'
import {  Box, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewResourceDetails from './ViewResourceDetails';
import EditIcon from '@mui/icons-material/Edit';
import ViewSkillUpdate from './ViewSkillUpdate';
import { connect } from "react-redux";
import {reqResourceDetails, reqResourceRecord, reqResourceRecordInfo} from 'saga/Actions/resources.actions';
import { appConstants, RoutePermittedRole } from "../../../shared/constants/AppConst";
import AddSkillData from './AddSkillData';

const useStyles = makeStyles({
    root: {
      '& .app-data-grid--header': {
        color: '#00677F'
      },
    },
  });
  

const ResourceRecordView = (props?:any) => {
  const {loading, getResourceRecordList, getResourceSkill, getResourceDetails } = props;
    const classes = useStyles();
    const [getResourcesColumns, setResourcesColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);  
    const [pageNext, setPageNext] = React.useState(0);
    const [searchText, setSearchText] = React.useState("");
    const [showResourceDetails, setShowResourceDetails] = React.useState(false)
    const [showSkillUpdate, setSkillUpdate] = React.useState(false)
    const [getEmployeeInfo, setEmployeeInfo] = React.useState({})
    const [SortItem, setSortItem] = React.useState('');

    React.useEffect(()=>{
      refreshTableCall()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const generalPageSizing = (showPageNo) => {
      const postPageSizing: any = {
        size: showPageNo,
        page: pageNext,
        sort: SortItem,
        SearchKeyword: searchText,
        CostCenterId:props.getCostCentreId
      }      
      props.reqCostCenterResourceInfo(postPageSizing)
      setPageSize(showPageNo)
      }

      const refreshTableCall = () =>{
        const postValues = {
          size: pageSize,
          page: pageNext,
          sort: SortItem,
          SearchKeyword: searchText,
          CostCenterId:props.getCostCentreId
        }
        props.reqCostCenterResourceInfo(postValues)
    }
    
      const requestSearch = (searchValue: string) => {
        const postValues: any = {
          size: pageSize,
          page: pageNext,
          sort: '',
          SearchKeyword: searchValue,
          CostCenterId:props.getCostCentreId
        }
        props.reqCostCenterResourceInfo(postValues)
        setSearchText(searchValue);
      };
    
      const handleSortModelChange = (sortField) => {
        let postSortValues: any;
        if (sortField.length) {
          postSortValues = {
            size: pageSize,
            page: pageNext,
            sort: `${sortField[0].field},${sortField[0].sort}`,
            SearchKeyword: searchText,
            CostCenterId:props.getCostCentreId
          }
        } else {
          postSortValues = {
            size: pageSize,
            page: pageNext,
            sort: '',
            SearchKeyword: searchText,
            CostCenterId:props.getCostCentreId
          }
        }
        props.reqCostCenterResourceInfo(postSortValues)
        setSortItem(`${sortField[0].field},${sortField[0].sort}`)
      }
    
      const generalPaging = (paging) => {
        const postPaging: any = {
          size: pageSize,
          page: paging,
          sort: SortItem,
          SearchKeyword: searchText,
          CostCenterId:props.getCostCentreId
        }
        props.reqCostCenterResourceInfo(postPaging)
        setPageNext(paging)
      }
    
      const generalGridChange = (event) => {
      }

  React.useEffect(() => {
    getResourceRecord()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
const viewResourceRecordDetails = (getValues?:any) => {
    setShowResourceDetails(true)
    props.reqResourceDetailData(getValues.id)
}

const handleResourceClose = () => {
    setShowResourceDetails(false)
}

const updateSkillData = (getRecordData?:any) => {
  setEmployeeInfo(getRecordData)
  setSkillUpdate(true)
  props.reqResourceDetailData(getRecordData.id)
}

const handleSkillUpdateClose = () => {  
  setSkillUpdate(false)
refreshTableCall()
}
  const getResourceRecord = () => {
    const leadFilterColumns: any = [
      // { field: 'id', headerName: 'S.No.', headerClassName: appConstants.dataGridAppDataHeader, width: 90, filterable: false, align: "left" },
      {
        field: 'hrid',
        headerName: 'HR Id',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return(
            <React.Fragment>
              <Box>{params.row.hr_id?params.row.hr_id:'-'}</Box>
            </React.Fragment>
          )
        }
      },
      {
        field: 'emp_name',
        headerName: 'Employee Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'email',
        headerName: 'Email',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
        sortable: false,
      },
      {
        field: 'category',
        headerName: 'Job Category',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
      },
      {
        field: 'date_of_join',
        headerName: 'DOJ',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
      },
      {
        field: 'employee_type',
        headerName: 'Employee Type',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return(
            <React.Fragment>
              <Box>{params.row.employee_type?params.row.employee_type:'-'}</Box>
            </React.Fragment>
          )
        }
      },
      {
        field: 'action',
          headerName: 'Action',
          headerClassName: appConstants.dataGridAppDataHeader,
          type: 'actions',
          minWidth: 150, flex: 1,       
      getActions: (params) => [
        <React.Fragment>
               <GridActionsCellItem
                key={`${params.id}_view`}
                icon={ 
                <Tooltip title="View Resource Details">
                  <VisibilityIcon color={'primary'} />
                  </Tooltip>}
                label='Duplicate User'
                onClick={() => viewResourceRecordDetails(params.row)}
              />
              {RoutePermittedRole.EMPLOYEE === props.useProfile.roles || RoutePermittedRole.Admin === props.useProfile.roles || RoutePermittedRole.HR === props.useProfile.roles || RoutePermittedRole.AdminBusiness === props.useProfile.roles || RoutePermittedRole.Business === props.useProfile.roles?
                 <GridActionsCellItem
                 key={`${params.id}_edit`}
                 icon={
                  <Tooltip title="Update Resource Skills">
                  <EditIcon color={'primary'} />
                  </Tooltip>}
                 label='Toggle Admin'
                 onClick={()=>updateSkillData(params.row)}
                 disabled={params.row.isasign ? true : false}
                 className="hideoption"
               />
              :null}
           
            </React.Fragment>
      ]
      },
      
    ];
    setResourcesColumns(leadFilterColumns)
  }
  return (
    <Box sx={{ height: 'auto', width: 1, marginTop: 4, paddingLeft:5 }} className={classes.root}>
      {showSkillUpdate && getResourceSkill?
       <ViewSkillUpdate handleSkillUpdateClose={handleSkillUpdateClose} showSkillUpdate={showSkillUpdate} 
       getEmployeeInfo={getEmployeeInfo} getResourceSkill={getResourceSkill} 
       postResourceSkill={props.postResourceSkill} useProfile={props.useProfile}/>
      :
      <AddSkillData handleSkillUpdateClose={handleSkillUpdateClose} showSkillUpdate={showSkillUpdate} getEmployeeInfo={getEmployeeInfo} 
      postResourceSkill={props.postResourceSkill} useProfile={props.useProfile} />}
     {
       getResourceDetails && showResourceDetails?
       <ViewResourceDetails showResourceDetails={showResourceDetails} handleResourceClose={((e)=>handleResourceClose())} resourceInfo={props.getResourceDetails}/>
       :null
     }
    {getResourcesColumns && getResourcesColumns !== undefined && getResourcesColumns.length > 0 && getResourceRecordList ?

      <DataGrid
        autoHeight
        rowHeight={64}
        rows={getResourceRecordList.content}
        columns={getResourcesColumns}
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
        rowCount={getResourceRecordList.totalElements}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 25, 50]}
      //   checkboxSelection
        disableSelectionOnClick
        disableColumnMenu
        loading={loading}
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
      loading: state.resourceProcess.loading,
      getResourceDetails:state.resourceProcess.getResourceDetails,
      getResourceSkill: state.resourceProcess.getResourceSkill,
      getResourceRecordList: state.resourceProcess.getResourceRecordList,
      getResourceRecordItems: state.resourceProcess.items
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    reqResourceDetailData: (getResourceId?:any) => dispatch(reqResourceDetails(getResourceId)),
    reqCostCenterResourceInfo: (postCostCentreId?: any) => dispatch(reqResourceRecord(postCostCentreId)),
    postResourceSkill: (postCostCentreId?: any) => dispatch(reqResourceRecordInfo(postCostCentreId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceRecordView);
// export default ResourceRecordView;