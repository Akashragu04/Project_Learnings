import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, GridActionsCellItem, gridClasses, } from "@mui/x-data-grid";
import { Box, Chip, Grid, Stack, } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst";
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccuralsDetailView from './AccuralsDetailView';
import { getAllAccuralsDetailsAction, initFinanceAccuralsAction } from 'saga/Actions';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

export const AccuralsGrid = (props?: any) => {
    const classes = useStyles();
    const { accuralsGridData, accuralsResponseData } = props;
    const [accuralsGridColumns, setAccuralsGridColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [searchText, setSearchText] = React.useState("");
    const [pageNext, setPageNext] = React.useState(0);
    const [SortItem, setSortItem] = React.useState('');
    const [showAccuralDetails, setShowAccuralDetails] = React.useState(false)
    const [accuralResponse, setAccuralResponse] = React.useState(null)

    useEffect(() => {
        getRoleBasedColumns()
        const accuralGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        if (pageSize || pageNext) {
            props.getAllAccuralsDetails(accuralGridRequest)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const openAccutalDetail = () => {
        setShowAccuralDetails(true);
    }

    const closeAccutalDetail = () => {
        setShowAccuralDetails(false);
    }

    const generalPageSizing = (showPageNo) => {
        const accuralGridRequest: any = {
            size: showPageNo,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        props.getAllAccuralsDetails(accuralGridRequest)
        setPageSize(showPageNo)
    }

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const accuralGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: '',
            Searchkeyword: searchValue
        }
        props.getAllAccuralsDetails(accuralGridRequest)
    };

    const handleSortModelChange = (sortField) => {
        let accuralGridRequest: any = {};
        if (sortField.length) {
            accuralGridRequest = {
                size: pageSize,
                page: pageNext,
                sort: `${sortField[0].field},${sortField[0].sort}`,
                Searchkeyword: searchText
            }
        } else {
            accuralGridRequest = {
                size: pageSize,
                page: pageNext,
                sort: '',
                Searchkeyword: searchText
            }
        }
        setSortItem(sortField)
        props.getAllAccuralsDetails(accuralGridRequest)
    }

    const generalPaging = (paging) => {
        const accuralGridRequest: any = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            Searchkeyword: searchText
        }
        setPageNext(paging)
        props.getAllAccuralsDetails(accuralGridRequest)
    }

    const generalGridChange = (event) => {
    }

    const toAccuralView = (rowData) => {
        openAccutalDetail();
        setAccuralResponse(rowData);
    }


    const getRoleBasedColumns = () => {
        const accuralsFilterColumns: any = [
            // { field: 'id', headerName: 'S.No', headerClassName: appConstants.dataGridAppDataHeader, width: 100, filterable: false, align: "center" },
            {
                field: 'project_code',
                headerName: 'Project Code',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'project_name',
                headerName: 'Project Name',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'customer',
                headerName: 'Customer',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'status',
                headerName: 'Project Status',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                sortable: false,
                roleTypes: RoutePermittedRole.Finance,
                renderCell: (params) => {
                    let statusIcon: any;
                    let statusColor: any;
                    let statusLabel: any;
                    if (params.row.status) {
                        statusIcon = <CheckIcon />;
                        statusColor = 'success';
                        statusLabel = 'Active';
                    } else {
                        statusIcon = <HourglassBottomIcon />;
                        statusColor = 'primary';
                        statusLabel = 'In-Active';
                    }
                    return <Stack direction='column' spacing={1}>
                        <Chip icon={statusIcon} color={statusColor} label={statusLabel} variant='outlined' size='small' />
                    </Stack>;
                }
            },
            {
                field: 'sla_value',
                headerName: 'SLA Value',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'revenue_so_far',
                headerName: 'Revenue So Far',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'action',
                headerName: 'Action',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 150,
                type: 'actions',
                roleTypes: RoutePermittedRole.Finance,
                getActions: (params) => (
                    [
                        <GridActionsCellItem
                            key={params.id}
                            icon={<VisibilityIcon color={'primary'} />}
                            label='View Accruals'
                            onClick={() => toAccuralView(params.row)}
                        />,
                    ]
                )
            }
        ];
        setAccuralsGridColumns(accuralsFilterColumns)
    }

    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
            <Grid item xs={12} sx={{ marginTop: 5 }}>

                {((accuralsGridColumns && accuralsGridColumns.length > 0) && accuralsResponseData) &&
                    <DataGrid
                        autoHeight
                        rowHeight={64}
                        rows={accuralsResponseData}
                        columns={accuralsGridColumns}
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
                        rowCount={accuralsGridData.totalElements}
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
            </Grid>
            { showAccuralDetails && <AccuralsDetailView show={showAccuralDetails} close={closeAccutalDetail} accuralDetail={accuralResponse}/>}
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.financeAccurals.isLoading,
        error: state.financeAccurals.errors,
        accuralsResponseData: state.financeAccurals.accuralsGridData,
        accuralsGridData: state.financeAccurals
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        initAccurals: () => {
            dispatch(initFinanceAccuralsAction())
        },
        getAllAccuralsDetails: (data:any) => {
            dispatch(getAllAccuralsDetailsAction(data))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccuralsGrid)  