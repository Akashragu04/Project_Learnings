import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, GridActionsCellItem, gridClasses, } from "@mui/x-data-grid";
import { Box, Button, Chip, Stack, Tooltip, } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import { getAllBizCaseSLADetailsAction, initBizCaseSLAAction, reqBillingCycleList, reqGetApprovalSla, reqPerinvoice } from 'saga/Actions';
import CircularProgressWithLabel from './CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import BillingInvoiceOption from './BillingInvoiceOption';
import DownloadIcon from '@mui/icons-material/Download';
import AppLoader from '@crema/core/AppLoader';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { ConfigAPI } from 'services/config';
import ViewSLAApprovalDetails from './ViewSLAApprovalDetails';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

export const BizCaseSLAGrid = (props?: any) => {
    const classes = useStyles();
    const { statuscode, bizCaseSLAGridData, getBizCaseSLAReqData } = props;
    const [bizCaseSLAColumns, setBizCaseSLAColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [searchText, setSearchText] = React.useState("");
    const [pageNext, setPageNext] = React.useState(0);
    const [SortItem, setSortItem] = React.useState('');
    const navigate = useNavigate();
    const [openBillingInvoice, setBillingInvoice] = React.useState(false)
    const [getSLAInfo, setSLAInfo] = React.useState<any>(null)
    const [getSLAApprovalDetails, setSLAApprovalDetails] = React.useState(false)

    useEffect(() => {
        getRoleBasedColumns()
        const slaGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        if (pageSize || pageNext) {
            props.getAllBizCaseSLADetails(slaGridRequest)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const generalPageSizing = (showPageNo) => {
        const slaGridRequest: any = {
            size: showPageNo,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        props.getAllBizCaseSLADetails(slaGridRequest)
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
        props.getAllBizCaseSLADetails(postValues)
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
        props.getAllBizCaseSLADetails(slaGridRequest)
    }

    const generalPaging = (paging) => {
        const slaGridRequest: any = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            Searchkeyword: searchText
        }
        setPageNext(paging)
        props.getAllBizCaseSLADetails(slaGridRequest)
    }

    const generalGridChange = (event) => {
    }
    const openUpdateSLA = (id) => {
        navigate(`/SLA/sla-update/${id}`, { state: { slaid: id, viewStatus:'Update SLA' } })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    const openViewSLA = (id) => {
        navigate(`/SLA/sla-update/${id}`, { state: { slaid: id, viewStatus:'View SLA' } })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    const onDownloadSLAAgreement = (data: any) => {
        if (data.sla_argeement_document && data.sla_argeement_document.supporting_files_url) {
            window.open(`${data.sla_argeement_document.supporting_files_url}`, '_blank')
        }
    }
    
    const onDownloadSignedSLAAgreement = (data: any) => {
        if (data.sla_signed_argeement_document && data.sla_signed_argeement_document.supporting_files_url) {
            window.open(`${data.sla_signed_argeement_document.supporting_files_url}`, '_blank')
        }
    }

    const openCreatePreinvoice = (slaid?: any) => {
        setBillingInvoice(true)
        props.getBillingCycleList(slaid.id)
        setSLAInfo(slaid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    const closeBillingInvoice = () => {
        setBillingInvoice(false)
    }

    // This is function used to get Perinvoice data
    const onSubmitData = (getSLAValue?: any) => {
        props.postPerinvoice(getSLAValue)
        navigate(`/Preinvoice/PreInvoice-creation/${getSLAInfo.id}`, { state: { action: 'create', slainfoId: getSLAInfo.slaid, slaid: getSLAInfo.id, preinvoiceId: getSLAValue.pre_id, pagestatus:'PreInvoice-creation' } })
    }

    // This is function used to get approval Details
const onSLAApprovalDetails = (getValues?:any) =>{
    if(getValues){
        let postValues:any = {
            url:ConfigAPI.getSLAApproval,
            slaId:getValues            
        }
        props.reqGetApprovalSla(postValues)
    }
    setSLAApprovalDetails(true)
}

const onSLAApprovalClose = (getValues?:any) =>{
    setSLAApprovalDetails(false)

}
    const getRoleBasedColumns = () => {
        const slaFilterColumns: any = [
            {
                field: 'slaid', headerName: 'SLA #', headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                minWidth: 150,
                filterable: false
            },
            {
                field: 'slaname',
                headerName: 'SLA Name',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                minWidth: 100,
                roleTypes: "common"
            },
            {
                field: 'start_date',
                headerName: 'Start Date',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                minWidth: 100,
                roleTypes: "common"
            },
            {
                field: 'team',
                headerName: 'Team',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                minWidth: 120,
                roleTypes: "common"
            },
            {
                field: 'customer_company',
                headerName: 'Customer Name',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                minWidth: 180,
                roleTypes: "common"
            },
            {
                field: 'project_name',
                headerName: 'Project Name',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                minWidth: 150,
                roleTypes: "common"
            },
            {
                field: 'total_budget',
                headerName: 'Value',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                minWidth: 150,
                roleTypes: "common"
            },

            {
                field: 'status',
                headerName: 'Status',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                minWidth: 150,
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
                field: 'invoice_percentage',
                headerName: 'Bill Status',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 100,
                sortable: false,
                roleTypes: RoutePermittedRole.Business,
                renderCell: (params) => {
                    return <CircularProgressWithLabel value={params.row.invoice_percentage} />;
                }
            },
            {
                field: 'action',
                headerName: 'Action',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 350,
                type: 'actions',
                roleTypes: RoutePermittedRole.Business,
                getActions: (params) => [
                    <React.Fragment>
                        {
                            params.row.status === "Approved" &&
                            <GridActionsCellItem
                                key={`${params.id}_view`}
                                icon={
                                    <Tooltip title="View SLA">
                                <SummarizeIcon color={'primary'} />
                                </Tooltip>}
                                label='View SLA Details'
                                onClick={() => openViewSLA(params.id)}
                                className="hideoption"
                            />
                        }
                        {
                            params.row.status !== "Approved"&&
                            <GridActionsCellItem
                            disabled={params.row.status === "Approved"?true:false}
                                key={`${params.id}_view`}
                                icon={
                                    <Tooltip title="Edit SLA">
                                <EditIcon color={params.row.status === "Approved"?'disabled':'primary'} />
                                </Tooltip>}
                                label='Duplicate User'
                                onClick={() => openUpdateSLA(params.id)}
                                className="hideoption"
                            />
                        }
                        {
                            params.row.status === "Approved"&&
                            <GridActionsCellItem
                            disabled={params.row.status === "Approved"?false:true}
                                key={`${params.id}_approval_view`}
                                icon={
                                    <Tooltip title="SLA Approval">
                                <AssignmentIcon color={'primary'} />
                                </Tooltip>}
                                label='SLA Approval'
                                onClick={() => onSLAApprovalDetails(params.id)}
                                className="hideoption"
                            />
                        }
                      
                        <GridActionsCellItem
                            key={`${params.id}_signeddownload`} 
                            disabled={params.row.status === "Approved"?false:true}
                            icon={
                                <Tooltip title="Download signed document agreement">
                                    <DownloadForOfflineIcon color={params.row.status === "Approved"?'primary':'disabled'} />
                                    </Tooltip>}
                            label='Download Agreement'
                            onClick={() => onDownloadSignedSLAAgreement(params.row)}
                        />
                           <GridActionsCellItem
                            key={`${params.id}_download`}
                            icon={
                                <Tooltip title="Download Service Agreement">
                                    <DownloadIcon color={'primary'} />
                                    </Tooltip>}
                            label='Download Agreement'
                            onClick={() => onDownloadSLAAgreement(params.row)}
                        />

                        {(RoutePermittedRole.Business === statuscode.roles || RoutePermittedRole.Admin === statuscode.roles || RoutePermittedRole.Superadmin === statuscode.roles) ?
                            <Button disabled={(params.row.status === 'Approved') ? false : true} variant={'outlined'} color="primary" onClick={() => openCreatePreinvoice(params.row)} className="hideoption">Create Pre-Invoice</Button>
                            : null
                        }
                    </React.Fragment>
                ]

            }
        ];
        setBizCaseSLAColumns(slaFilterColumns)
    }

    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
            {
                getSLAApprovalDetails && props.resSLAApproval?
                <ViewSLAApprovalDetails onOpen={getSLAApprovalDetails} approvalInfo={props.resSLAApproval} onClose={onSLAApprovalClose}/>
                
                :null
            }
            {
                openBillingInvoice ?
                    <BillingInvoiceOption openBillingInvoice={openBillingInvoice}
                        closeBillingInvoice={closeBillingInvoice}
                        slaBillingCycleList={props.slaBillingCycleList} onSubmitData={onSubmitData} getSLAInfo={getSLAInfo} />
                    : null
            }

            {((bizCaseSLAColumns && bizCaseSLAColumns.length > 0) && getBizCaseSLAReqData) ?
                <DataGrid
                    autoHeight
                    rowHeight={64}
                    rows={getBizCaseSLAReqData}
                    columns={bizCaseSLAColumns}
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
                    rowCount={bizCaseSLAGridData.totalElements}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 25, 50]}
                    //checkboxSelection
                    disableSelectionOnClick
                    disableColumnMenu
                    // loading={props.isLoading}
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

        isLoading: state.bizCaseSLAProcess.isLoading,
        statuscode: state.auth.profileDetails,
        error: state.bizCaseSLAProcess.errors,
        getBizCaseSLAReqData: state.bizCaseSLAProcess.bizCaseSLAGridData,
        bizCaseSLAGridData: state.bizCaseSLAProcess,
        slaBillingCycleList: state.bizCaseSLAProcess.slaBillingCycleList,
        getPerinvoiceData: state.bizCaseSLAProcess.getPerinvoiceData,
        slaApprovalSuccess: state.bizCaseSLAProcess.slaApprovalSuccess,
        resSLAApproval:state.bizCaseSLAProcess.resSLAApproval
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        initBizCaseSLA: () => {
            dispatch(initBizCaseSLAAction())
        },
        getAllBizCaseSLADetails: (data: any) => {
            dispatch(getAllBizCaseSLADetailsAction(data))
        },
        getBillingCycleList: (getSLAId?: any) => { dispatch(reqBillingCycleList(getSLAId)) },
        postPerinvoice: (getSLAId?: any) => { dispatch(reqPerinvoice(getSLAId)) },
        reqGetApprovalSla:(getValues?:any)=>{dispatch(reqGetApprovalSla(getValues))}

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(BizCaseSLAGrid)  
