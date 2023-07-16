import React, { useEffect } from 'react'
import { DataGrid, GridActionsCellItem, gridClasses, } from "@mui/x-data-grid";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/material";
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewTimesheetCommand from './ViewTimesheetCommand';
import { appConstants } from 'shared/constants/AppConst';


const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const ViewTimesheet = (props?: any) => {
  const classes = useStyles();
  const [getProjectFilterColumns, setProjectFilterColumns] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [pageNext, setPageNext] = React.useState(0);
  const [SortItem, setSortItem] = React.useState('');
  const [ShowTimesheetCommant, setShowTimesheetCommant] = React.useState(false);
  const [getTimesheet, seTimesheet] = React.useState({});

  useEffect(() => {
    getRoleBased()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const generalPageSizing = (showPageNo) => {
    const postPageSizing: any = {
      size: showPageNo,
      page: pageNext,
      sort: SortItem,
      Serachkeyword: searchText,
      project_id: props.getProjectInfo.id
    }
    props.getEmpTimeSheetDetails(postPageSizing)
    setPageSize(showPageNo)
  }

  const requestSearch = (searchValue: string) => {
    const postValues: any = {
      size: pageSize,
      page: pageNext,
      sort: '',
      Serachkeyword: searchValue,
      project_id: props.getProjectInfo.id
    }
    props.getEmpTimeSheetDetails(postValues)
    setSearchText(searchValue);
  };

  const handleSortModelChange = (sortField) => {
    let postSortValues: any;
    if (sortField.length) {
      postSortValues = {
        size: pageSize,
        page: pageNext,
        sort: `${sortField[0].field},${sortField[0].sort}`,
        Serachkeyword: searchText,
        project_id: props.getProjectInfo.id
      }
    } else {
      postSortValues = {
        size: pageSize,
        page: pageNext,
        sort: '',
        Serachkeyword: searchText,
        project_id: props.getProjectInfo.id
      }
    }
    props.getEmpTimeSheetDetails(postSortValues)
    setSortItem(sortField)
  }

  const generalPaging = (paging) => {
    const postPaging: any = {
      size: pageSize,
      page: paging,
      sort: SortItem,
      Serachkeyword: searchText,
      project_id: props.getProjectInfo.id
    }
    props.getEmpTimeSheetDetails(postPaging)
    setPageNext(paging)
  }


  const onViewTimesheetDetails = (getData?: any, getStatus?: any) => {
    setShowTimesheetCommant(true)
    const postValues: any = {
      statu: getStatus,
      data: getData
    }
    seTimesheet(postValues)
  }


  const closeViewTimesheetDetails = () => {
    setShowTimesheetCommant(false)
  }

  const generalGridChange = (event) => {
  }

  const getRoleBased = () => {
    const leadFilterColumns: any = [
      {
        field: 'name',
        headerName: 'User Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
            minWidth: 150,
        roleTypes: "common",
        renderCell: (params) => {
          return (
            <React.Fragment>
              {params.row.name ? <Box>{params.row.name}</Box> : '-'}
            </React.Fragment>
          )
        }
      },
      {
        field: 'project_name',
        headerName: 'Project',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
        minWidth: 150,
        roleTypes: "common"
      },
      {
        field: 'date',
        headerName: 'Date',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
            minWidth: 150,
        roleTypes: "common",
        renderCell: (params) => {
          return (
            <span>{moment(new Date(params.row.timesheet_date)).format('DD-MM-YYYY')}</span>
          )
        }
      },
      {
        field: 'start_time',
        headerName: 'Start Time',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
            minWidth: 150,
        roleTypes: "common"
      },
      {
        field: 'end_time',
        headerName: 'End Time',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
            minWidth: 150,
        roleTypes: "common"
      },
      {
        field: 'captinityleave',
        headerName: 'Working',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
            minWidth: 100,
        roleTypes: "common",
        renderCell: (params) => {
          return (
            <React.Fragment>
              {(params.row.captinityleave) ?
                <span>Working</span> :
                <span>Leave</span>}
            </React.Fragment>
          )
        }
      },
      {
        field: 'working_hours',
        headerName: 'Working Hours',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
            minWidth: 100,
        roleTypes: "common"
      },
      {
        field: 'slaid',
        headerName: 'SLA #',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
            minWidth: 150,
        roleTypes: "common"
      },
      {
        field: 'task_name',
        headerName: 'Task',
        headerClassName: appConstants.dataGridAppDataHeader,
        type: 'actions',
        flex: 1,
            minWidth: 150,
        roleTypes: "common",
        getActions: (params) => [
          <React.Fragment key={`${params.id}`}>
            <GridActionsCellItem
              icon={<VisibilityIcon color={'primary'} />}
              label='Duplicate User'
              onClick={() => onViewTimesheetDetails(params.row, 'Task')}
            />
          </React.Fragment>
        ]
      },
      {
        field: 'comments',
        headerName: 'Comments',
        headerClassName: appConstants.dataGridAppDataHeader,
        type: 'actions',
        flex: 1,
            minWidth: 150,
        roleTypes: "common",
        getActions: (params) => [
          <React.Fragment key={`${params.id}`}>
            <GridActionsCellItem
              icon={<VisibilityIcon color={'primary'} />}
              label='Duplicate User'
              onClick={() => onViewTimesheetDetails(params.row, 'Comment')}
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
        ShowTimesheetCommant ?
          <ViewTimesheetCommand ShowTimesheetCommant={ShowTimesheetCommant} closeViewTimesheetDetails={closeViewTimesheetDetails} getTimesheet={getTimesheet} />
          : null
      }

      {getProjectFilterColumns && getProjectFilterColumns !== undefined && getProjectFilterColumns.length > 0 && props.getEmployeeTimesheetList ?

        <DataGrid
          autoHeight
          rowHeight={64}
          rows={props.getEmployeeTimesheetList.content}
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
          rowCount={props.getEmployeeTimesheetList.totalElements}
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

export default ViewTimesheet;