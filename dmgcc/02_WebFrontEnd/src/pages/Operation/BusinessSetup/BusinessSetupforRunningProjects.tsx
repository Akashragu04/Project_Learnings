import React, { useEffect } from 'react'
import { DataGrid, gridClasses, } from "@mui/x-data-grid";
import { Box, Chip, Stack, } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst";
import {projectData} from '@crema/commonservices/Types';
import CircularProgressWithLabel from '@crema/commonservices/CircularProgress';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const BusinessSetupforRunningProjects = (props?:any) => {
  const classes = useStyles();
  const [getProjectFilterColumns, setProjectFilterColumns] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);  
  const [searchText, setSearchText] = React.useState("");
  
  useEffect(() => {
    getRoleBased()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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

  const getRoleBased = () => {
    const leadFilterColumns: any = [
      { field: 'proj_id', headerName: 'S.No.', headerClassName: appConstants.dataGridAppDataHeader, width: 90, filterable: false, align: "left" },
      {
        field: 'project_code',
        headerName: 'Project Code',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 230,
        roleTypes: "common"
      },
      {
        field: 'project_name',
        headerName: 'Project Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 150,
        roleTypes: "common",
        renderCell:(parames) =>{
          return(<>
           <span  style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', fontSize: 12, marginRight:15 }}>{parames.row.project_name}</span>
          </>)
        }
      },
      {
        field: 'customer',
        headerName: 'Customer',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 230,
        roleTypes: "common"
      },
      {
        field: 'sla_values',
        headerName: 'SLA Values',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 150,
        roleTypes: "common"
      },
      {
        field: 'invoice_status',
        headerName: 'Invoice',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 230,
        roleTypes: "common",
        renderCell: (params) => {
          const statusIcon: any = <CurrencyRupeeRoundedIcon />;
          const statusColor: any = 'primary';
          return <Stack direction='column' spacing={1}>
            <Chip icon={statusIcon} color={statusColor} label={params.row.invoice_values} variant='outlined' size='small' />
            <span  style={{ display: 'flex', flexDirection: 'row', color: 'red', textAlign: 'center', fontSize: 12 }}>{params.row.invoice_status}</span>
          </Stack>
          ;
        }
      },
      {
        field: 'status',
        headerName: 'Status',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 100,
        sortable: false,
        roleTypes: RoutePermittedRole.Business,
        renderCell: (params) => {
          return <span  style={{ display: 'flex', flexDirection: 'row', color: 'default', textAlign: 'center', fontSize: 12 }}>{params.row.status}</span>;
        }
      },
      {
        field: 'payments',
        headerName: 'Payments',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 100,
        sortable: false,
        roleTypes: RoutePermittedRole.Business,
        renderCell: (params) => {
          return <CircularProgressWithLabel value={30}/>;
        }
      },
      
    ];
    setProjectFilterColumns(leadFilterColumns)
  }
  return (
    <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
      {getProjectFilterColumns && getProjectFilterColumns !== undefined && getProjectFilterColumns.length > 0 && projectData ?

        <DataGrid
          autoHeight
          rowHeight={64}
          rows={projectData}
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
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          disableColumnMenu
          // loading={loading}
          // sortingMode='server'
          onSortModelChange={handleSortModelChange}
          onPageChange={(paging) => generalPaging(paging)}
          onPageSizeChange={(size) => generalPageSizing(size)}
          onStateChange={(event) => generalGridChange(event)}
          onSelectionModelChange={itm => props.getSelectBusinessSetup(itm)}
        />
        : null}

    </Box>
  )
}

export default BusinessSetupforRunningProjects;