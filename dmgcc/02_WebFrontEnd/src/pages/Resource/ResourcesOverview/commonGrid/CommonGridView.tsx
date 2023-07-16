import React from 'react'
import { makeStyles } from '@mui/styles';
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { DataGrid, gridClasses, } from "@mui/x-data-grid";
import { Box } from '@mui/material';
import { appConstants } from 'shared/constants/AppConst';
import { escapeRegExp } from 'pages/Resource/commonComponent/CommonFun';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const CommonGridView = (props?: any) => {
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
  }, [])

  const getRoleBased = () => {
    const leadFilterColumns: any = [     
      {
        field: 'positioncode',
        headerName: 'Position Code',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return (
            <React.Fragment>
              <Box>{params.row.positioncode ? params.row.positioncode : '-'}</Box>
            </React.Fragment>
          )
        }
      }, {
        field: 'due_date',
        headerName: 'Date',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return (
            <React.Fragment>
              <Box>{params.row.due_date ? params.row.due_date : '-'}</Box>
            </React.Fragment>
          )
        }
      },
      {
        field: 'postion',
        headerName: 'Position',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
      }, {
        field: 'status',
        headerName: 'Status',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return (
            <React.Fragment>
              <Box>{params.row.status ? params.row.status : '-'}</Box>
            </React.Fragment>
          )
        }
      }, {
        field: 'remarks',
        headerName: 'Remarks',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common",
        renderCell: (params) => {
          return (
            <React.Fragment>
              <Box>{params.row.remarks ? params.row.remarks : '-'}</Box>
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
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => requestSearch(event.target.value),
              clearSearch: () => requestSearch("")
            }
          }}
          getRowHeight={() => 'auto'}
         sx={{
           [`& .${gridClasses.cell}`]: {
             py: 4,
           },
         }}
          pageSize={10}
          components={{ Toolbar: QuickSearchToolbar }}
          rowsPerPageOptions={[10, 25, 50]}
        />
        : null}
    </Box>
  )
}

export default CommonGridView;