import React, { useEffect } from 'react'
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst";
import { projectData } from '@crema/commonservices/Types';
import { Box, Tooltip } from "@mui/material";
import AddCapniti from './addCapnitiSheet/AddCapniti';
import { connect } from "react-redux";
import { OperationActionTypes } from '../../../saga/Types/OperationTypes';
import ViewEmpTimesheetDetails from './addCapnitiSheet/ViewEmpTimesheetDetails';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { reqClearCapnitiDetails } from 'saga/Actions';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const Capniti = (props?: any) => {
  const classes = useStyles();
  const [getProjectFilterColumns, setProjectFilterColumns] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [showCapniti, setShowCapniti] = React.useState(false);
  const [showTimesheetDetails, setShowTimesheetDetails] = React.useState(false);
  const [getTimesheetDetails, setTimesheetDetails] = React.useState([]);
  const [pageNext, setPageNext] = React.useState(0);
  const [SortItem, setSortItem] = React.useState('');
  const [getProjectInfo, setProjectInfo] = React.useState({});

  React.useEffect(() => {
    if (props.resCapnitiDatas && props.resCapnitiDatas.status === true) {
      props.reqClearCapnitiDetails()
      getInitialValues()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resCapnitiDatas])

  useEffect(() => {
    getRoleBased()
    getInitialValues()
    filterNewResourceData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getInitialValues = () => {
    const getCapnitiData: any = {
      size: pageSize,
      page: pageNext,
      sort: SortItem,
      Serachkeyword: searchText
    }
    props.getCapnitiList(getCapnitiData)
  }
  const filterNewResourceData = () => {
    const pushResourceData: any = [];
    projectData.forEach((resourceData: any, i: any) => {
      if (resourceData.business_case === 'No') {
        pushResourceData.push(resourceData)
      }
    })
  }
  const generalPageSizing = (showPageNo) => {
    const pageSizingCapniti: any = {
      size: showPageNo,
      page: pageNext,
      sort: SortItem,
      Serachkeyword: searchText
    }
    setPageSize(showPageNo)
    props.getCapnitiList(pageSizingCapniti)
  }

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const postValues: any = {
      size: pageSize,
      page: pageNext,
      sort: '',
      Serachkeyword: searchValue
    }
    props.getCapnitiList(postValues)
  };

  const handleSortModelChange = (sortField) => {
    let sortCapniti: any;
    if (sortField.length) {
      sortCapniti = {
        size: pageSize,
        page: pageNext,
        sort: `${sortField[0].field},${sortField[0].sort}`,
        Serachkeyword: searchText
      }
    } else {
      sortCapniti = {
        size: pageSize,
        page: pageNext,
        sort: '',
        Serachkeyword: searchText
      }
    }
    props.getCapnitiList(sortCapniti)
    setSortItem(sortField)
  }

  const generalPaging = (paging) => {
    const pagingCapniti: any = {
      size: pageSize,
      page: paging,
      sort: SortItem,
      Serachkeyword: searchText
    }
    props.getCapnitiList(pagingCapniti)
    setPageNext(paging)
  }

  const onViewTimesheetDetails = (getData?: any) => {
    setShowTimesheetDetails(true)
    setTimesheetDetails(getData)
  }

  const closeViewTimesheetDetails = (getData?: any) => {
    setShowTimesheetDetails(false)
  }

  const generalGridChange = (event) => {
  }
  // This is function used to close Capniti box
  const closeCapniti = () => {
    setShowCapniti(false)
  }
  // This is function used to Open Capniti box
  const openCapniti = (getCapnitiData?: any) => {
    setProjectInfo(getCapnitiData)
    setShowCapniti(true)
  }
  const getRoleBased = () => {
    const leadFilterColumns: any = [
      {
        field: 'project_id',
        headerName: 'Project Code',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'project_name',
        headerName: 'Project Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'service_provider',
        headerName: 'Customer',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'workinghrs',
        headerName: 'Billable Hours',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params: any) => {
          <React.Fragment>
            <Box>{params.row.workinghrs ? params.row.workinghrs : '-'}</Box>
          </React.Fragment>
        }
      },
      {
        field: 'action',
        headerName: 'Action',
        headerClassName: appConstants.dataGridAppDataHeader,
        type: 'actions',
        minWidth: 150, flex: 1,
        roleTypes: RoutePermittedRole.Business,
        getActions: (params) => [
          <React.Fragment key={`${params.id}`}>
            {
              RoutePermittedRole.EMPLOYEE === props.authRole.roles || RoutePermittedRole.Business === props.authRole.roles ?
                <GridActionsCellItem
                  icon={
                    <Tooltip title="Add Capniti">
                      <AddCircleIcon color={'primary'} />
                    </Tooltip>}
                  label='Duplicate User'
                  onClick={() => openCapniti(params.row)}
                />
                : null
            }
            <GridActionsCellItem
              icon={
                <Tooltip title="View Capniti">
                  <VisibilityIcon color={'primary'} />
                </Tooltip>}
              label='Duplicate User'
              onClick={() => onViewTimesheetDetails(params.row)}
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
        showCapniti ?
          <AddCapniti closeCapniti={closeCapniti} showCapniti={showCapniti} getProjectInfo={getProjectInfo} />
          : null
      }

      {
        showTimesheetDetails ?
          <ViewEmpTimesheetDetails closeCapniti={closeViewTimesheetDetails} showCapniti={showTimesheetDetails} getProjectInfo={getTimesheetDetails} />
          : null
      }

      {getProjectFilterColumns && getProjectFilterColumns !== undefined && getProjectFilterColumns.length > 0 && props.getTimesheetProject ?

        <DataGrid
          autoHeight
          rowHeight={64}
          rows={props.getTimesheetProject.content}
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
          rowCount={props.getTimesheetProject.totalElements}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          disableColumnMenu
          // loading={props.loading}
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
    getTimesheetProject: state.operationProcess.getTimesheetProject,
    authRole: state.auth.profileDetails,
    resCapnitiDatas: state.operationProcess.resCapnitiDatas
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    getCapnitiList: (getCapnitiData?: any) => dispatch({ type: OperationActionTypes.GET_TIMESHEET_PROJECT_REQUEST, value: getCapnitiData }),
    reqClearCapnitiDetails: () => dispatch(reqClearCapnitiDetails())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Capniti);
// export default Capniti;