import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, GridActionsCellItem, gridClasses, } from "@mui/x-data-grid";
import { Box, Chip, Stack, } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckIcon from '@mui/icons-material/Check';
import { getAllPreInvoiceDetailsAction, getPreInvoiceDetailAction, initPreInvoiceAction } from 'saga/Actions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router';
import AppLoader from '@crema/core/AppLoader';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

export const PreInvoiceGrid = (props?: any) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { preInvoiceGridData, getPreInvoiceReqData } = props;
    const [preInvoiceColumns, setPreInvoiceColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [searchText, setSearchText] = React.useState("");
    const [pageNext, setPageNext] = React.useState(0);
    const [SortItem, setSortItem] = React.useState('');

    useEffect(() => {
        getRoleBasedColumns()
        const PreInvoiceGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        if (pageSize || pageNext) {
            props.getAllPreInvoiceDetails(PreInvoiceGridRequest)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
    }, [preInvoiceGridData])

    const generalPageSizing = (showPageNo) => {
        const PreInvoiceGridRequest: any = {
            size: showPageNo,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        props.getAllPreInvoiceDetails(PreInvoiceGridRequest)
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
        props.getAllPreInvoiceDetails(postValues)
    };

    const handleSortModelChange = (sortField) => {
        // let PreInvoiceGridRequest: any = {};
        if (sortField.length) {
            // PreInvoiceGridRequest = {
            //     size: pageSize,
            //     page: pageNext,
            //     sort: `${sortField[0].field},${sortField[0].sort}`,
            //     Searchkeyword: searchText
            // }
        } else {
            // PreInvoiceGridRequest = {
            //     size: pageSize,
            //     page: pageNext,
            //     sort: '',
            //     Searchkeyword: searchText
            // }
        }
        setSortItem(sortField)
        props.getAllPreInvoiceDetails(preInvoiceGridData)
    }

    const generalPaging = (paging) => {
        // const PreInvoiceGridRequest: any = {
        //     size: pageSize,
        //     page: paging,
        //     sort: SortItem,
        //     Searchkeyword: searchText
        // }
        setPageNext(paging)
        // props.getAllPreInvoiceDetails(preInvoiceGridData)
    }

    const generalGridChange = (event) => {
    }


    const getRoleBasedColumns = () => {
        const preInvoiceFilterColumns: any = [
            {
                field: 'preinvoice_date', headerName: 'Date', headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 100,
                filterable: false
            },
            {
                field: 'preinvoice_period',
                headerName: 'Service Period',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'preinvoiceid',
                headerName: 'Pre-Invoice',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'slaname',
                headerName: 'SLA',
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
                field: 'total_budget',
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
                width: 150,
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
                type: 'actions',
                roleTypes: RoutePermittedRole.Business,
                getActions: (params) => [
                    <React.Fragment>
                        <GridActionsCellItem
                            key={`${params.id}_view`}
                            icon={<VisibilityIcon color={'primary'} />}
                            label='Duplicate User'
                            onClick={(event) => {
                                navigate(`/Preinvoice/PreInvoice-creation/${params.id}`, { state: { action: 'view', slaid: '', preinvoiceId: params.id } })
                            }}
                        />
                    </React.Fragment>
                ]

            }
        ];
        setPreInvoiceColumns(preInvoiceFilterColumns)
    }
    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>

            {((preInvoiceColumns && preInvoiceColumns.length > 0) && getPreInvoiceReqData)? //  && getPreInvoiceReqData
                <DataGrid
                    autoHeight
                    rowHeight={64}
                    rows={getPreInvoiceReqData}
                    columns={preInvoiceColumns}
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
                    rowCount={preInvoiceGridData.totalElements} //preInvoiceGridData.totalElements
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

                />:<AppLoader/>}

        </Box>
    )
}

const mapStateToProps = (state) => {
    return {

        isLoading: state.preInvoiceProcess.isLoading,
        statuscode: state.auth.profileDetails,
        error: state.preInvoiceProcess.errors,
        getPreInvoiceReqData: state.preInvoiceProcess.preInvoiceGridData,
        preInvoiceGridData: state.preInvoiceProcess
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        initPreInvoice: () => {
            dispatch(initPreInvoiceAction())
        },
        getAllPreInvoiceDetails: (data: any) => {
            dispatch(getAllPreInvoiceDetailsAction(data))
        },
        getPreInvoiceDetail: (data: any) => {
            dispatch(getPreInvoiceDetailAction(data))
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PreInvoiceGrid)


