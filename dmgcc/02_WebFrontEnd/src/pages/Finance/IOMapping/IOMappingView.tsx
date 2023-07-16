import React from 'react'
import { makeStyles } from '@mui/styles';
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import { Box, Button, Chip, Stack, Grid, Tooltip } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CircularProgressWithLabel from '@crema/commonservices/CircularProgress';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import CommonFileUpload from '../commonFileUpload'
import EditIOMapping from './EditIOMapping';
import { connect } from "react-redux";
import { reqGetFinanceIOMapping, reqUploadFinanceIOMapping, reqAddFinanceIOMapping, reqClearStatus } from '../../../saga/Actions'
import { appConstants } from 'shared/constants/AppConst';
import { ConfigAPI } from 'services/config';
import IOMappingHistoryView from './IOMappingHistoryView';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ViewIOMappingDetails from './ViewIOMappingDetails';
import { reqAboutUsCommonGet } from 'saga/Actions/aboutus.action';

const useStyles = makeStyles({
  root: {
    '& .app-data-grid--header': {
      color: '#00677F'
    },
  },
});

const IOMappingView = (props?: any) => {
  const { getResIOMapping, loading } = props;
  const classes = useStyles();
  const [getResourcesColumns, setResourcesColumns] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [pageNext, setPageNext] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");
  const [SortItem, setSortItem] = React.useState('');
  const [openEditIOMappingForm, setEditForm] = React.useState(false)
  const [getIOMappingInfo, setIOMappingInfo] = React.useState<any>({})
  const [openUploadFile, setUploadFile] = React.useState(false)
  const [openIOMapHistory, setIOMapHistory] = React.useState(false)
  const [showExpensesAgainst, setExpensesAgainst] = React.useState(false)
  const [showExpensesAgainstInfo, setExpensesAgainstInfo] = React.useState<any>(null)

  React.useEffect(() => {
    getIOMappingData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(()=>{
    if(props.resIONumber){
      setEditForm(false)
      props.reqClearStatus()
      getIOMappingData()

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.resIONumber])
  const getIOMappingData = () => {
    const postValues = {
      size: pageSize,
      page: pageNext,
      sort: SortItem,
      SearchKeyword: searchText
    }
    props.getFinanceIOMappingInfo(postValues)
  }

  const closeIOMapHistory = () => {
    setIOMapHistory(false)
  }

  const closeOpenEditForm = () => {
    setEditForm(false)
  }

  const onViewIOMappingHisory = (getIOMappingId?: any) => {
    setIOMapHistory(true)
    setIOMappingInfo(getIOMappingId)
  }

  const onEditIOMapping = (getIOMappingId?: any) => {
    setEditForm(true)
    setIOMappingInfo(getIOMappingId)
  }


  // This is a function use add cost centre data 
  const onEditSubmitIOMapping = (getIOMappingData?: any) => {
    if(getIOMappingData){
      let postValues:any = {
        id:getIOMappingInfo.id,
        body:getIOMappingData.ionumbermapped
      }
      props.reqFinanceAddIOMappingData(postValues)
    }
    // getIOMappingData()
  }

  // This is a function use Upload File 
  const onUploadFileIOMapping = () => {
    setUploadFile(true)
  }

  // This is a function use Download 
  const onDownloadIOMapping = () => {
    window.open(`${process.env.REACT_APP_API_URL}${ConfigAPI.ioMappingdumpDownload}`, '_blank')
  }

  const closeOpenUploadFile = () => {
    setUploadFile(false)
  }

  const onUploadFileSubmit = (getUploadData?: any) => {
    props.reqUploadFinanceIOMappingData(getUploadData)
    getIOMappingData()
    setUploadFile(false)
  }


  const generalPageSizing = (showPageNo) => {
    const postValues: any = {
      size: showPageNo,
      page: pageNext,
      sort: SortItem,
      SearchKeyword: searchText
    }
    setPageSize(showPageNo)
    props.getFinanceIOMappingInfo(postValues)
  }

  const requestSearch = (searchValue: string) => {
    const postValues: any = {
      size: pageSize,
      page: pageNext,
      sort: '',
      SearchKeyword: searchValue
    }
    setSearchText(searchValue);
    props.getFinanceIOMappingInfo(postValues)
  };

  const handleSortModelChange = (sortField) => {
    let postValues: any;
    if (sortField.length) {
      postValues = {
        size: pageSize,
        page: pageNext,
        sort: `${sortField[0].field},${sortField[0].sort}`,
        SearchKeyword: searchText
      }
    } else {
      postValues = {
        size: pageSize,
        page: pageNext,
        sort: '',
        SearchKeyword: searchText
      }
    }

    setSortItem(sortField)
    props.getFinanceIOMappingInfo(postValues)
  }

  const generalPaging = (paging) => {
    const postValues: any = {
      size: pageSize,
      page: paging,
      sort: SortItem,
      SearchKeyword: searchText
    }
    setPageNext(paging)
    props.getFinanceIOMappingInfo(postValues)
  }

  const generalGridChange = (event) => {
  }

  React.useEffect(() => {
    getIOMapping()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getIOMapping = () => {
    const leadFilterColumns: any = [
      // { field: 'id', headerName: 'S.No.', headerClassName: appConstants.dataGridAppDataHeader, width: 60, filterable: false, align: "left" },
      {
        field: 'project_id',
        headerName: 'Project Code',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
        minWidth: 150,
        roleTypes: "common"
      },
      {
        field: 'project_name',
        headerName: 'Project Name',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
        minWidth: 150,
        roleTypes: "common",
        renderCell: (parames) => {
          return (<>
            <span style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', fontSize: 12, marginRight: 15 }}>{parames.row.project_name}</span>
            {/* <Button variant='outlined' color={'primary'} sx={{padding:1}} onClick={()=>openResourceMapping(parames)}>{parames.row.is_new && parames.row.is_new !== null ? 'View Allocation': 'Allocate Resource'}</Button> */}
          </>)
        }
      },
      {
        field: 'service_provider',
        headerName: 'Customer',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
        minWidth: 150,
        roleTypes: "common"
      },
      {
        field: 'sla_value',
        headerName: 'SLA Values',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
        minWidth: 150,
        roleTypes: "common"
      },
      {
        field: 'activeIoNumber',
        headerName: 'Io Number',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
        minWidth: 150,
        roleTypes: "common"
      },
      {
        field: 'invoice_value',
        headerName: 'Invoice',
        headerClassName: appConstants.dataGridAppDataHeader,
        flex: 1,
        minWidth: 250,
        roleTypes: "common",
        renderCell: (params) => {
          const statusIcon: any = <CurrencyRupeeRoundedIcon />;
          const statusColor: any = 'primary';
          return (
            <Grid container rowSpacing={5}>
              <Grid item xs={12} sm={6} md={6}>
                <Box sx={{ marginTop: 3 }}>
                  <Stack direction='column' spacing={1}>
                    <Chip icon={statusIcon} color={statusColor} label={params.row.invoice_value} variant='outlined' size='small' />
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box sx={{ marginLeft: 5, marginTop: 1 }}>
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
        flex: 1,
        minWidth: 100,
        sortable: false,
        renderCell: (params) => {
          return <span style={{ display: 'flex', flexDirection: 'row', color: 'default', textAlign: 'center', fontSize: 12 }}>{params.row.status}</span>;
        }
      },
      {
        field: 'action',
        headerName: 'Update IO Number',
        headerClassName: appConstants.dataGridAppDataHeader,
        type: 'actions',
        flex: 1,
        minWidth: 150,
        getActions: (params) => [
          <React.Fragment>
            <GridActionsCellItem
              key={`${params.id}_edit`}
              icon={
                <Tooltip title="Add IO Numbers">
                  <ControlPointIcon color={'primary'} />
                </Tooltip>}
              label='Toggle Admin'
              onClick={() => onEditIOMapping(params.row)}
            />
            <GridActionsCellItem
              key={`${params.id}_view`}
              icon={
                <Tooltip title="View IO Numbers">
                  <VisibilityIcon color={'primary'} />
                </Tooltip>}
              label='Toggle Admin'
              onClick={() => onViewIOMappingHisory(params.row)}
            />
            <GridActionsCellItem
              key={`${params.id}_expenses_against`}
              icon={
                <Tooltip title="Expenses Against IO Numbers">
                  <CurrencyExchangeIcon color={'primary'} />
                </Tooltip>}
              label='Toggle Admin'
              onClick={() => onExpensesAgainstIONumbers(params.row)}
            />
          </React.Fragment>
        ]
      }

    ];
    setResourcesColumns(leadFilterColumns)
  }

  const onExpensesAgainstIONumbers = (getValues?: any) => {
    if (getValues) {
      props.reqAboutUsCommonGet(`${ConfigAPI.expensereportAPI}${getValues.id}`)
      setExpensesAgainstInfo(getValues)
      setExpensesAgainst(true)
    }
  }


  const onCloseExpensesAgainstIONumbers = () => {
    setExpensesAgainst(false)
  }
  
  return (
    <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
      <Box sx={{ textAlign: "right", marginBottom: 5 }}>
        <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<ArrowCircleDownIcon />} onClick={onUploadFileIOMapping}>
          Upload File
        </Button>
        <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />} onClick={onDownloadIOMapping}>
          Download
        </Button>
      </Box>

      {
        openIOMapHistory &&
        <IOMappingHistoryView openIOMapHistory={openIOMapHistory} projectResponse={getIOMappingInfo} closeIOMapHistory={closeIOMapHistory} />
      }
      {
        openEditIOMappingForm ?
          <EditIOMapping openEditForm={openEditIOMappingForm} resData={getIOMappingInfo}
            closeOpenEditForm={closeOpenEditForm} onEditSubmitIOMapping={onEditSubmitIOMapping} />
          : null
      }

      {/* This is component use to expenses against */}
      {
        showExpensesAgainst && props.restCommonGet ?
          <ViewIOMappingDetails onOpen={showExpensesAgainst} onClose={onCloseExpensesAgainstIONumbers} data={props.restCommonGet} IOinfo={showExpensesAgainstInfo}/>
          : null
      }

      {openUploadFile ?
        <CommonFileUpload openUploadFile={openUploadFile} closeOpenUploadFile={closeOpenUploadFile} onUploadFileSubmit={onUploadFileSubmit} />
        : null
      }

      {getResourcesColumns && getResourcesColumns !== undefined && getResourcesColumns.length > 0 && getResIOMapping ?
        <DataGrid
          autoHeight
          rowHeight={64}
          rows={getResIOMapping}
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
          rowCount={props.resIOMappingData && props.resIOMappingData.totalElements ? props.resIOMappingData.totalElements : 0}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          //   checkboxSelection
          //   disableSelectionOnClick
          //   disableColumnMenu
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
    loading: state.FinanceMaster.loading,
    getResIOMapping: state.FinanceMaster.getIOMappingData,
    resIOMappingData: state.FinanceMaster.resIOMappingData,
    restCommonGet: state.aboutUsDetails.restCommonGet,
    resIONumber:state.FinanceMaster.resIONumber
  }
}

const mapDispatchToProps = (dispatch?: any) => {
  return {
    getFinanceIOMappingInfo: (getIOMappingId?: any) => dispatch(reqGetFinanceIOMapping(getIOMappingId)),
    reqFinanceAddIOMappingData: (getIOMappingData?: any) => dispatch(reqAddFinanceIOMapping(getIOMappingData)),
    reqUploadFinanceIOMappingData: (uploadIOMapping?: any) => dispatch(reqUploadFinanceIOMapping(uploadIOMapping)),
    reqAboutUsCommonGet: (postValue?: any) => dispatch(reqAboutUsCommonGet(postValue)),
    reqClearStatus:()=>dispatch(reqClearStatus())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IOMappingView);
