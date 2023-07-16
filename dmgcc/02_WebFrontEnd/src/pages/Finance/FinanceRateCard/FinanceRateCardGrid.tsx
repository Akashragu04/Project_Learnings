import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, GridActionsCellItem, gridClasses, } from "@mui/x-data-grid";
import { Box, Chip, Stack, } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst";
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AddCardIcon from '@mui/icons-material/AddCard';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { getAllRateCardDetailsAction, getRateCardDetailsAction, initFinanceProcessAction, reqClearFinanceStatus } from 'saga/Actions/finance.action';
// import { useNavigate } from "react-router-dom";
import CommonStore from '@crema/services/commonstore';
// import { fi } from 'date-fns/locale';
import RateCardCalculationPreview from './RateCardCalculationPreview';
import AppLoader from '@crema/core/AppLoader';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

export const FinanceRateCardGrid = (props?: any) => {
    const userRole = CommonStore().userRoleType;
    const classes = useStyles();
    // const navigate = useNavigate();
    const { rateCardResponseData } = props;
    const [rateCardGridColumns, setRateCardGridColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [searchText, setSearchText] = React.useState("");
    const [pageNext, setPageNext] = React.useState(0);
    const [SortItem, setSortItem] = React.useState('');
    const [getFinanceRateCardInfo, setFinanceRateCardInfo] = React.useState<any>(null);
    const [openRateCardPreview, setOpenRateCardPreview] = React.useState(false);

    useEffect(() => {
        onClearRateCard()
        getRoleBasedColumns()
        initialData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const initialData = () =>{
        const slaGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        if (pageSize || pageNext) {
            props.getAllRateCardDetails(slaGridRequest)
        }
    }
    React.useEffect(() => {
        if(props.getBizRateCardInfo && props.getBizRateCardInfo.status){
            setFinanceRateCardInfo(props.getBizRateCardInfo.data)
            setOpenRateCardPreview(true);
        }else{
            setFinanceRateCardInfo(null)
            setOpenRateCardPreview(false);
        }
    }, [props.getBizRateCardInfo])

    //This is function used to clear Rate card old data
    const onClearRateCard = () => {
        setOpenRateCardPreview(false)
        props.reqClearFinanceStatus()
    }

    const generalPageSizing = (showPageNo) => {
        const slaGridRequest: any = {
            size: showPageNo,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        props.getAllRateCardDetails(slaGridRequest)
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
        props.getAllRateCardDetails(postValues)
    };

    const handleSortModelChange = (sortField) => {
        let slaGridRequest: any = {};
        if (sortField.length) {
            slaGridRequest = {
                size: pageSize,
                page: pageNext,
                sort: `${sortField[0].field},${sortField[0].sort}`,
                Searchkeyword: searchText
            }
        } else {
            slaGridRequest = {
                size: pageSize,
                page: pageNext,
                sort: '',
                Searchkeyword: searchText
            }
        }
        setSortItem(sortField)
        props.getAllRateCardDetails(slaGridRequest)
    }

    const generalPaging = (paging) => {
        const slaGridRequest: any = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            Searchkeyword: searchText
        }
        setPageNext(paging)
        props.getAllRateCardDetails(slaGridRequest)
    }

    const generalGridChange = (event) => {
    }

    const toRateCard = (action, rowData) => {
        if (rowData && rowData.biz_id) {
            setFinanceRateCardInfo(null)
            props.getBizRateCardDetail({ bizcase_id: rowData.biz_id.id })
        }
        // navigate('/finance/addratecard', { state: { action: action, info: rowData, key: 'rateCard' } });
    }

    const setRateCardPreviewAction = (dialog) => (event) => {
        if (dialog) {
            setOpenRateCardPreview(event ? dialog : false);
        } else {
            setOpenRateCardPreview(event ? dialog : false);
            onClearRateCard()
            initialData()
        }
    }

    const getRoleBasedColumns = () => {
        const rateCardFilterColumns: any = [
            // { field: 'id', headerName: 'Lead Id', headerClassName: appConstants.dataGridAppDataHeader, width: 100, filterable: false, align: "center" },
            {
                field: 'service_receiver_entity',
                headerName: 'Entity',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 200,
                roleTypes: "common"
            },
            {
                field: 'service_receiver_contact_name',
                headerName: 'Customer Name',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 200,
                roleTypes: "common"
            },
            {
                field: 'project_name',
                headerName: 'Project Name',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 200,
                roleTypes: "common"
            },
            {
                field: 'service_provider_department',
                headerName: 'Responsible',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 200,
                roleTypes: "common"
            },
            {
                field: 'status',
                headerName: 'Status',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 200,
                sortable: false,
                roleTypes: "common",
                renderCell: (params) => {
                    let statusIcon: any;
                    let statusColor: any;
                    let statusLabel: any;
                    if (params.row.biz_id.newratecard) {
                        statusIcon = <CheckIcon />;
                        statusColor = 'success';
                        statusLabel = 'Rate Card Available';
                    } else {
                        statusIcon = <HourglassBottomIcon />;
                        statusColor = 'primary';
                        statusLabel = 'Rate Card Not Available';
                    }
                    return <Stack direction='column' spacing={1}>
                        <Chip icon={statusIcon} color={statusColor} label={statusLabel} variant='outlined' size='small' />
                    </Stack>;
                }
            },
            {
                field: 'action',
                headerName: 'Action',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 150,
                type: 'actions',
                roleTypes: RoutePermittedRole.Finance,
                getActions: (params) => (
                    params.row.biz_id.newratecard ? [
                        <GridActionsCellItem
                            key={params.id}
                            icon={<PriceChangeIcon />}
                            label='View Rate Card'
                            onClick={() => toRateCard('update', params.row)}
                            showInMenu
                        />,
                    ]
                        :
                        [
                            <GridActionsCellItem
                                key={params.id}
                                icon={<AddCardIcon />}
                                label='Create Rate Card'
                                onClick={() => toRateCard('create', params.row)}
                                showInMenu
                                disabled={(userRole === RoutePermittedRole.Business) ? true : false}
                            />,
                        ]
                )
            }
        ];
        setRateCardGridColumns(rateCardFilterColumns)
    }

    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
            {openRateCardPreview && getFinanceRateCardInfo ? <RateCardCalculationPreview show={openRateCardPreview} setRateCardPreviewAction={setRateCardPreviewAction} bizRateCardDetails={getFinanceRateCardInfo}
                action={'rateCard'} /> : null}

            {(rateCardGridColumns && rateCardResponseData) ?
                <DataGrid
                    autoHeight
                    rowHeight={64}
                    rows={rateCardResponseData && rateCardResponseData.content?rateCardResponseData.content:[]}
                    columns={rateCardGridColumns}
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
                    rowCount={rateCardResponseData.totalElements}
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
                />:<AppLoader />}

        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.finance.isLoading,
        error: state.finance.errors,
        rateCardResponseData: state.finance.rateCardListResponse,
        getBizRateCardInfo: state.finance.getRateCard,
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        initFinanceRateCard: () => {
            dispatch(initFinanceProcessAction())
        },
        getAllRateCardDetails: (data: any) => {
            dispatch(getAllRateCardDetailsAction(data))
        },
        getBizRateCardDetail: (data: any) => {
            dispatch(getRateCardDetailsAction(data))
        },
        reqClearFinanceStatus: () => {
            dispatch(reqClearFinanceStatus())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FinanceRateCardGrid)  