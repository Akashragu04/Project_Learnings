import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, GridActionsCellItem, gridClasses, } from "@mui/x-data-grid";
import { Box, Chip, Stack, Tooltip, } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckIcon from '@mui/icons-material/Check';
import { getAllInvoiceDetailsAction, initPreInvoiceAction } from 'saga/Actions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewInvoiceDetails from './ViewInvoiceDetails';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

export const InvoiceGrid = (props?: any) => {
    const classes = useStyles();
    const { invoiceGridData, getInvoiceReqData } = props;
    const [InvoiceColumns, setInvoiceColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [searchText, setSearchText] = React.useState("");
    const [pageNext, setPageNext] = React.useState(0);
    const [SortItem, setSortItem] = React.useState('');
    const [getInvoiceInfoStatus, setInvoiceInfoStatus] = React.useState(false);
    const [getInvoiceInfo, setInvoiceInfo] = React.useState<any>(null);

    useEffect(() => {
        getRoleBasedColumns()
        const InvoiceGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        if (pageSize || pageNext) {
            props.getAllInvoiceDetails(InvoiceGridRequest)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const generalPageSizing = (showPageNo) => {
        const InvoiceGridRequest: any = {
            size: showPageNo,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        props.getAllInvoiceDetails(InvoiceGridRequest)
        setPageSize(showPageNo)
    }

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const postValues: any = {
            size: pageSize,
            page: pageNext,
            sort: '',
            Searchkeyword: searchValue
        }
        props.getAllInvoiceDetails(postValues)
    };

    const handleSortModelChange = (sortField) => {
        let InvoiceGridRequest: any = {};
        if (sortField.length) {
            InvoiceGridRequest = {
                size: pageSize,
                page: pageNext,
                sort: `${sortField[0].field},${sortField[0].sort}`,
                Searchkeyword: searchText
            }
        } else {
            InvoiceGridRequest = {
                size: pageSize,
                page: pageNext,
                sort: '',
                Searchkeyword: searchText
            }
        }
        setSortItem(sortField)
        props.getAllInvoiceDetails(InvoiceGridRequest)
    }

    const generalPaging = (paging) => {
        const InvoiceGridRequest: any = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            Searchkeyword: searchText
        }
        setPageNext(paging)
        props.getAllInvoiceDetails(InvoiceGridRequest)
    }

    const generalGridChange = (event) => {
    }

const onViewInvoice = (getValues?:any) =>{
if(getValues){
    setInvoiceInfoStatus(true)
    setInvoiceInfo(getValues)
}
}


const onColseViewInvoice = () =>{
        setInvoiceInfoStatus(false)
        setInvoiceInfo(null)
    }

    const getRoleBasedColumns = () => {
        const InvoiceFilterColumns: any = [
            {
                field: 'invoice_date', headerName: 'Date', headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 100,
                filterable: false
            },
            {
                field: 'date_of_service',
                headerName: 'Service Period',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'preinvoice_id',
                headerName: 'Pre-Invoice',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'slaid',
                headerName: 'SLA #',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 100,
                roleTypes: "common"
            },
            {
                field: 'team',
                headerName: 'Team',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 100,
                roleTypes: "common"
            },
            {
                field: 'customer',
                headerName: 'Customer Name',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'project_name',
                headerName: 'Project',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 100,
                roleTypes: "common"
            },
            {
                field: 'total_cost',
                headerName: 'Amount',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 100,
                roleTypes: "common"
            },
            {
                field: 'status',
                headerName: 'Status',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 200,
                sortable: false,
                roleTypes: RoutePermittedRole.Business,
                renderCell: (params) => {
                    let statusIcon: any = <AutorenewIcon />;
                    let statusColor: any = 'primary';
                    if (params.row.status === 'Open') {
                        statusIcon = <AutorenewIcon />;
                        statusColor = 'warning';
                    } else if (params.row.status === 'In Progress') {
                        statusIcon = <AutorenewIcon />;
                        statusColor = 'info';
                    } else if (params.row.status === 'Approved') {
                        statusIcon = <CheckIcon />;
                        statusColor = 'success';
                    } else {
                        statusIcon = <AutorenewIcon />;
                        statusColor = 'primary';
                    }
                    return <Stack direction='column' spacing={1}>
                        <Chip icon={statusIcon} color={statusColor} label={params.row.status} variant='outlined' size='small' />
                    </Stack>;
                }
            },
            {
                field: 'action',
                headerName: 'Action',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 200,
                sortable: false,
                roleTypes: RoutePermittedRole.Business,
                renderCell: (params) => {
                    return(
                        <React.Fragment>
                               <GridActionsCellItem
                      key={`${params.id}_invoicepreview`}
                      icon={<Tooltip title="Preview Invoice">
                     <VisibilityIcon color={'primary'} />
                      </Tooltip>}
                      label='Preview ratecard'
                      onClick={() => onViewInvoice(params.row)}
                     
                    />
                        </React.Fragment>
                    )
                }}
        ];
        setInvoiceColumns(InvoiceFilterColumns)
    }
    
    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>

            {
                getInvoiceInfoStatus && getInvoiceInfo?
                <ViewInvoiceDetails onOpen={getInvoiceInfoStatus} onClose={onColseViewInvoice} getInvoiceInfo={getInvoiceInfo}/>                
                :null
            }

            {((InvoiceColumns && InvoiceColumns.length > 0) && getInvoiceReqData) &&

                <DataGrid
                    autoHeight
                    rowHeight={64}
                    rows={getInvoiceReqData}
                    columns={InvoiceColumns}
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
                    rowCount={invoiceGridData.totalElements}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 25, 50]}
                    // checkboxSelection
                    disableSelectionOnClick
                    disableColumnMenu
                    // loading={loading}
                    sortingMode='server'
                    onSortModelChange={handleSortModelChange}
                    onPageChange={(paging) => generalPaging(paging)}
                    onPageSizeChange={(size) => generalPageSizing(size)}
                    onStateChange={(event) => generalGridChange(event)}

                />}

        </Box>
    )
}

const mapStateToProps = (state) => {
    return {

        isLoading: state.preInvoiceProcess.isLoading,
        statuscode: state.auth.profileDetails,
        error: state.preInvoiceProcess.errors,
        getInvoiceReqData: state.preInvoiceProcess.invoiceGridData,
        invoiceGridData: state.preInvoiceProcess
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        initPreInvoice: () => {
            dispatch(initPreInvoiceAction())
        },
        getAllInvoiceDetails: (data: any) => {
            dispatch(getAllInvoiceDetailsAction(data))
        },
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceGrid)


