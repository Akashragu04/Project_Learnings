import React from 'react'
import { makeStyles } from '@mui/styles';
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { DataGrid, gridClasses, } from "@mui/x-data-grid";
import {  Box } from '@mui/material';
import { appConstants } from 'shared/constants/AppConst';
import { escapeRegExp } from './CommonFun';

const useStyles = makeStyles({
    root: {
      '& .app-data-grid--header': {
        color: '#00677F'
      },
    },
  });

const CommonGridView = (props?:any) => {
    const classes = useStyles();
    const [getResourcesColumns, setResourcesColumns] = React.useState([]);
    const [searchText, setSearchText] = React.useState("");
    const [tableData, setTableData] = React.useState<any>([]);
         
    
  React.useEffect(() => {
    if (props.approvedTable) {
      setTableData(props.approvedTable)
    }
  }, [props.approvedTable])
      
  const requestSearch = (searchValue: string) => {
    if(searchValue && searchValue !==""){
      setSearchText(searchValue);
      const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
      const filteredRows = props.approvedTable.filter((row: any) => {
        return Object.keys(row).some((field: any) => {
  
          return searchRegex.test(row[field] ? row[field].toString() : "");
        });
      });
      setTableData(filteredRows);
    }else{
      setSearchText("");    
      setTableData(props.approvedTable);
    }
  };

  React.useEffect(() => {
    getRoleBased()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const getRoleBased = () => {
    const leadFilterColumns: any = [
      // { field: 'id', headerName: 'S.No.', headerClassName: appConstants.dataGridAppDataHeader, width: 90, filterable: false, align: "left" },
      {
        field: 'hr_id',
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
        field: 'employee',
        headerName: 'Employee',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common"
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
        field: 'slaid',
        headerName: 'SLA#',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        sortable: false,
        renderCell: (params) => {
          return(
            <React.Fragment>
              <Box>{params.row.slaid?params.row.slaid:'-'}</Box>
            </React.Fragment>
          )
        }
      },
      {
        field: 'project_code',
        headerName: 'Project Code',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return(
            <React.Fragment>
              <Box>{params.row.projectcode?params.row.projectcode:'-'}</Box>
            </React.Fragment>
          )
        }
      },
      {
        field: 'project_name',
        headerName: 'Project Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return(
            <React.Fragment>
              <Box>{params.row.projectname?params.row.projectname:'-'}</Box>
            </React.Fragment>
          )
        }
      },
      {
        field: 'utilization',
        headerName: 'Utilization',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return(
            <React.Fragment>
              <Box>{params.row.utilization?params.row.utilization:'-'}</Box>
            </React.Fragment>
          )
        }
      },
      {
        field: 'due_date',
        headerName: 'Date',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return(
            <React.Fragment>
              <Box>{params.row.due_date?params.row.due_date:'-'}</Box>
            </React.Fragment>
          )
        }
      },
      {
        field: 'positioncode',
        headerName: 'Position code',
        headerClassName: 'app-data-grid--header',
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return(
            <React.Fragment>
              <Box>{params.row.positioncode?params.row.positioncode:'-'}</Box>
            </React.Fragment>
          )
        }
      },
      {
        field: 'postion',
        headerName: 'Postion',
        headerClassName: 'app-data-grid--header',
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return(
            <React.Fragment>
              <Box>{params.row.postion?params.row.postion:'-'}</Box>
            </React.Fragment>
          )
        }
      },
      {
        field: 'remarks',
        headerName: 'Remarks',
        headerClassName: 'app-data-grid--header',
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return(
            <React.Fragment>
              <Box>{params.row.remarks?params.row.remarks:'-'}</Box>
            </React.Fragment>
          )
        }
      },
      {
        field: 'status',
        headerName: 'Status',
        headerClassName: 'app-data-grid--header',
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return(
            <React.Fragment>
              <Box>{params.row.status?params.row.status:'-'}</Box>
            </React.Fragment>
          )
        }
      },
      
    ];
    setResourcesColumns(leadFilterColumns)
  }
  return (
    <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
    {getResourcesColumns && getResourcesColumns !== undefined && getResourcesColumns.length > 0 && tableData ?                  
  <DataGrid
        autoHeight
        rowHeight={64}
        rows={tableData}
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
           py: 4,
         },
       }}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
      />
      : null}
  </Box>
  )
}

export default CommonGridView;