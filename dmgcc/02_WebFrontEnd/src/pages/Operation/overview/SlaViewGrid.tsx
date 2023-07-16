import React, { useEffect } from 'react'
import { DataGrid, gridClasses, } from "@mui/x-data-grid";
import { Box, Button, Chip, Stack, Typography, Grid } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst";
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import CircularProgressWithLabel from '../../../@crema/commonservices/CircularProgress';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});


const SlaViewGrid = (props?: any) => {
  const classes = useStyles();
  const [getProjectFilterColumns, setProjectFilterColumns] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);  
  const [searchText, setSearchText] = React.useState("");
  // const [SortItem, setSortItem] = React.useState("");
  // const [pageNext, setPageNext] = React.useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    getRoleBased()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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


  const openResourceAll = (getResourceDetails: any) => {
    navigate('/operation/resource-allocation')
  }

  const generalGridChange = (event) => {
  }

  const getRoleBased = () => {
    const leadFilterColumns: any = [
      // { field: 'id', headerName: 'S.No.', headerClassName: appConstants.dataGridAppDataHeader, width: 90, filterable: false, align: "left" },
      {
        field: 'project_code',
        headerName: 'Project Code',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'project_name',
        headerName: 'Project Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 230, flex: 1,
        roleTypes: "common",
        renderCell: (parames) => {
          return (<>
            <span style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', fontSize: 12, marginRight: 15 }}>{parames.row.project_name}</span>
            <Button variant='outlined' color={'primary'} sx={{ padding: 0 }} disabled={parames.row.business_case === 'No' ? false : true} onClick={(parames) => openResourceAll(parames)}>New</Button>
          </>)
        }
      },
      {
        field: 'customer_name',
        headerName: 'Customer',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
        roleTypes: "common"
      },
      {
        field: 'total_budget',
        headerName: 'SLA #',
        headerClassName: appConstants.dataGridAppDataHeader,
        width: 150,
        roleTypes: "common"
      },
      {
        field: 'invoice_status',
        headerName: 'Invoice',
        headerClassName: appConstants.dataGridAppDataHeader,
        minWidth: 150, flex: 1,
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
                <Box sx={{ marginLeft: 5 }}>
                  <CircularProgressWithLabel value={params.row.invoice_percentage} />
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
        width: 150,
        sortable: false,
        roleTypes: RoutePermittedRole.Business,
        renderCell: (params) => {
          return <span style={{ display: 'flex', flexDirection: 'row', color: 'default', textAlign: 'center', fontSize: 12 }}>{params.row.status}</span>;
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
          return <CircularProgressWithLabel value={params.row.payments_percentage} />;
        }
      },

    ];
    setProjectFilterColumns(leadFilterColumns)
  }

  return (
    <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root} style={{ display: props.showProjectDetails ? 'block' : 'none' }}>
      <Typography
        component="h5"
        variant="inherit"
        color="inherit"
        sx={{
          fontSize: 20,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: "100%",
          paddingBottom: 5
        }}
      >
        SLA Details
      </Typography>
      {getProjectFilterColumns && getProjectFilterColumns !== undefined && getProjectFilterColumns.length > 0 && props.getProjectOverview ?

        <DataGrid
          autoHeight
          rowHeight={64}
          rows={props.getProjectOverview.content}
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
          // checkboxSelection
          disableSelectionOnClick
          disableColumnMenu
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

export default SlaViewGrid;