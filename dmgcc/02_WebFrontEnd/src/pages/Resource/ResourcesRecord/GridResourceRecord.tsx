import React from 'react'
import { makeStyles } from '@mui/styles';
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { DataGrid, gridClasses, } from "@mui/x-data-grid";
import { Box } from '@mui/material';
import { appConstants } from 'shared/constants/AppConst';
// import CircularProgressWithLabel from '../../invoice/invoiceGrid/CircularProgress';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const GridResourceRecord = (props?: any) => {
  const classes = useStyles();
  const [getResourcesColumns, setResourcesColumns] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");

  const generalPageSizing = (showPageNo) => {
    setPageSize(showPageNo)
  }

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
  };

  const handleSortModelChange = (sortField) => {

  }

  const generalPaging = (paging) => {
  }

  const generalGridChange = (event) => {
  }

  React.useEffect(() => {
    getResourceRecord()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const getResourceRecord = () => {
    const leadFilterColumns: any = [
      // { field: 'id', headerName: 'S.No.', headerClassName: appConstants.dataGridAppDataHeader, width: 90, filterable: false, align: "left" },
      {
        field: 'current_project_name',
        headerName: 'Project Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 350,
        roleTypes: "common"
      },
      {
        field: 'billing_rate',
        headerName: 'Working Hours',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 200,
        roleTypes: "common"
      },
      {
        field: 'employee_leave_taken',
        headerName: 'Leave Hours',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 200,
        sortable: false,
      },
      {
        field: 'loss_of_billing_days',
        headerName: 'Loss Of Billing Days',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 200,
        roleTypes: "common",
      },
      {
        field: 'sla_start_date',
        headerName: 'SLA Start Date',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 200,
        roleTypes: "common",
      },
      {
        field: 'sla_end_date',
        headerName: 'SLA End Date',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 200,
        roleTypes: "common",
      },
      {
        field: 'total_loss_of_billing',
        headerName: 'Total loss of billing',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 200,
        roleTypes: "common",
        renderCell: (params) => {
          return (
            <Box>{params.row.total_loss_of_billing ? params.row.total_loss_of_billing : '-'}</Box>
          )
        }
      },
      {
        field: 'sla_status',
        headerName: 'Status',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 200,
        roleTypes: "common",
      },

    ];
    setResourcesColumns(leadFilterColumns)
  }

  return (
    <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
      {getResourcesColumns && getResourcesColumns !== undefined && getResourcesColumns.length > 0 && props.resourceRecordList ?

        <DataGrid
          autoHeight
          rowHeight={64}
          rows={props.resourceRecordList}
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
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          //   checkboxSelection
          //   disableSelectionOnClick
          //   disableColumnMenu
          // loading={loading}
          // sortingMode='server'
          onSortModelChange={handleSortModelChange}
          onPageChange={(paging) => generalPaging(paging)}
          onPageSizeChange={(size) => generalPageSizing(size)}
          onStateChange={(event) => generalGridChange(event)}
        />
        : null}

    </Box>
  )
}

export default GridResourceRecord;