import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, GridActionsCellItem, gridClasses, } from "@mui/x-data-grid";
import { Box, Button, Chip, Grid, Stack, } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import { appConstants, RoutePermittedRole } from "shared/constants/AppConst";
import CommonFileUpload from '../commonFileUpload';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { AddCircle } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import MaterialMasterForm from './MaterialMasterForm';
import { ConfigAPI } from 'services/config';
import {
    createMaterialMasterRequestAction, getAllMaterialMasterDetailsAction,
    getAllSLAContractsDetailsAction,
    getAllSLACountryDetailsAction,
    initFinanceMaterialMasterAction, updateMaterialMasterRequestAction, uploadMaterialMasterFileAction
} from 'saga/Actions';
import { toast } from 'react-toastify';
import { ResourcesActionTypes } from 'saga/Types/Resources.Types';
import { BizCaseSLATypes } from 'saga/sagas/Types';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

export const MaterialMasterGrid = (props?: any) => {
    const classes = useStyles();
    const { materialMasterGridData, materialMasterResponseData, materialCreateResponse,
        materialUpdateResponse, materialUploadResponse, slaContractsList, slaCountrysList } = props;
    const [materialMasterGridColumns, setMaterialMasterGridColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [searchText, setSearchText] = React.useState("");
    const [pageNext, setPageNext] = React.useState(0);
    const [SortItem, setSortItem] = React.useState('');
    const [showUploadFile, senUploadFile] = React.useState(false)
    const [openAddForm, setAddForm] = React.useState(false)
    const [materialFormAction, setMaterialFormAction] = React.useState('Create')
    const [materialResponse, setMaterialResponse] = React.useState(null)

    useEffect(() => {
        props.initMaterialMaster();
        getRoleBasedColumns()
        props.getconstcentreData()
        props.getSLAContractListDetails()
        const materialGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        if (pageSize || pageNext) {
            props.getAllMaterialMasterDetails(materialGridRequest)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        props.getCostcenterList()
        props.getSLACountrysListDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if (materialCreateResponse && materialCreateResponse.status) {
            toast.success(materialCreateResponse.message, { position: 'bottom-right' });
            props.initMaterialMaster();
            setAddForm(false);
            refreshGrid();
        }
        if (materialUpdateResponse && materialUpdateResponse.status) {
            toast.success(materialUpdateResponse.message, { position: 'bottom-right' });
            props.initMaterialMaster();
            setAddForm(false);
            refreshGrid();
        }
        if (materialUploadResponse && materialUploadResponse.status) {
            toast.success(materialUploadResponse.message, { position: 'bottom-right' });
            props.initMaterialMaster();
            senUploadFile(false);
            refreshGrid();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [materialCreateResponse, materialUpdateResponse, materialUploadResponse])

    const refreshGrid = () => {
        const materialGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        if (pageSize || pageNext) {
            props.getAllMaterialMasterDetails(materialGridRequest)
        }
    }

    const onOpenAddForm = (action: any, rowData: any = null) => {
        setAddForm(true);
        setMaterialFormAction(action);
        setMaterialResponse(rowData)
    }
    const closeOpenAddForm = () => {
        setAddForm(false)
    }

    const onUploadFileSubmit = (uploadData?: any) => {
        props.uploadMaterialMaster({ data: uploadData })
    }

    const onUploadFileEntityMaster = () => {
        senUploadFile(true)
    }
    const closeUploadFileEntityMaster = () => {
        senUploadFile(false)
    }
    const onDownloadEntityMaster = () => {
        window.open(`${process.env.REACT_APP_API_URL}${ConfigAPI.getMaterialMasterDump}`, '_blank')
    }

    const generalPageSizing = (showPageNo) => {
        const materialGridRequest: any = {
            size: showPageNo,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        props.getAllMaterialMasterDetails(materialGridRequest)
        setPageSize(showPageNo)
    }

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const materialGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: '',
            Searchkeyword: searchValue
        }
        props.getAllMaterialMasterDetails(materialGridRequest)
    };

    const handleSortModelChange = (sortField) => {
        let materialGridRequest: any = {};
        if (sortField.length) {
            materialGridRequest = {
                size: pageSize,
                page: pageNext,
                sort: `${sortField[0].field},${sortField[0].sort}`,
                Searchkeyword: searchText
            }
        } else {
            materialGridRequest = {
                size: pageSize,
                page: pageNext,
                sort: '',
                Searchkeyword: searchText
            }
        }
        setSortItem(sortField)
        props.getAllMaterialMasterDetails(materialGridRequest)
    }

    const generalPaging = (paging) => {
        const materialGridRequest: any = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            Searchkeyword: searchText
        }
        setPageNext(paging)
        props.getAllMaterialMasterDetails(materialGridRequest)
    }

    const generalGridChange = (event) => {
    }

    const getRoleBasedColumns = () => {
        const materialMasterFilterColumns: any = [
            {
                field: 'code',
                headerName: 'Code/Costcenter',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common",
                renderCell: (params:any) => {
                    if(params){
                        return(
                            <React.Fragment>
                                <Box>{params.row?params.row.code:''} - {params.row?params.row.costcenter:''}</Box>
                            </React.Fragment>
                        )
                    }
                }
            },
            {
                field: 'materialname',
                headerName: 'Material Name',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'description',
                headerName: 'Description',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'has_markup',
                headerName: 'Markup',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                sortable: false,
                roleTypes: RoutePermittedRole.Finance,
                renderCell: (params) => {
                    let statusColor: any;
                    let statusLabel: any;
                    if (params.row.has_markup) {
                        statusColor = 'success';
                        statusLabel = 'True';
                    } else {
                        statusColor = 'primary';
                        statusLabel = 'False';
                    }
                    return <Stack direction='column' spacing={1}>
                        <Chip color={statusColor} label={statusLabel} variant='outlined' size='small' />
                    </Stack>;
                }
            },
            {
                field: 'is_taxable',
                headerName: 'Tax',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                sortable: false,
                roleTypes: RoutePermittedRole.Finance,
                renderCell: (params) => {
                    let statusColor: any;
                    let statusLabel: any;
                    if (params.row.is_taxable) {
                        statusColor = 'success';
                        statusLabel = 'True';
                    } else {
                        statusColor = 'primary';
                        statusLabel = 'False';
                    }
                    return <Stack direction='column' spacing={1}>
                        <Chip color={statusColor} label={statusLabel} variant='outlined' size='small' />
                    </Stack>;
                }
            },
            {
                field: 'has_wht',
                headerName: 'WHT',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                sortable: false,
                roleTypes: RoutePermittedRole.Finance,
                renderCell: (params) => {
                    let statusColor: any;
                    let statusLabel: any;
                    if (params.row.has_wht) {
                        statusColor = 'success';
                        statusLabel = 'True';
                    } else {
                        statusColor = 'primary';
                        statusLabel = 'False';
                    }
                    return <Stack direction='column' spacing={1}>
                        <Chip color={statusColor} label={statusLabel} variant='outlined' size='small' />
                    </Stack>;
                }
            },
            {
                field: 'has_fx',
                headerName: 'FX',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                sortable: false,
                roleTypes: RoutePermittedRole.Finance,
                renderCell: (params) => {
                    let statusColor: any;
                    let statusLabel: any;
                    if (params.row.has_fx) {
                        statusColor = 'success';
                        statusLabel = 'True';
                    } else {
                        statusColor = 'primary';
                        statusLabel = 'False';
                    }
                    return <Stack direction='column' spacing={1}>
                        <Chip color={statusColor} label={statusLabel} variant='outlined' size='small' />
                    </Stack>;
                }
            },
            {
                field: 'action',
                headerName: 'Action',
                headerClassName: appConstants.dataGridAppDataHeader,
                type: 'actions',
                flex: 1,
                getActions: (params) => [
                    <React.Fragment>
                        <GridActionsCellItem
                            key={`${params.id}_edit`}
                            icon={<EditIcon color={'primary'} />}
                            label='Toggle Admin'
                            onClick={() => onOpenAddForm('Update', params.row)} className="hideoption"
                        />
                    </React.Fragment>
                ]
            }
        ];
        setMaterialMasterGridColumns(materialMasterFilterColumns)
    }

    const onSubmitFormData = (materialDatas?: any) => {
        if (materialDatas.action === 'Create') {
            props.createMaterialMaster({ data: materialDatas })
        } else if (materialDatas.action === 'Update') {
            props.updateMaterialMaster({ material_id: materialDatas.id, data: materialDatas })
        }
    }
    
    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
            <Grid item xs={12} sx={{ marginTop: 5 }}>

                <CommonFileUpload openUploadFile={showUploadFile} closeOpenUploadFile={closeUploadFileEntityMaster} onUploadFileSubmit={onUploadFileSubmit} />
                <Box sx={{ textAlign: "right", marginBottom: 5 }}>
                    <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={() => onOpenAddForm('Create')} className="hideoption">
                        Create Material Code
                    </Button>
                    <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<ArrowCircleDownIcon />} onClick={onUploadFileEntityMaster} className="hideoption">
                        Upload File
                    </Button>
                    <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />} onClick={onDownloadEntityMaster}>
                        Download
                    </Button>
                </Box>

                {((materialMasterGridColumns && materialMasterGridColumns.length > 0) && materialMasterResponseData) &&
                    <DataGrid
                        autoHeight
                        rowHeight={64}
                        rows={materialMasterResponseData}
                        columns={materialMasterGridColumns}
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
                        rowCount={materialMasterGridData.totalElements}
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

                {openAddForm && slaCountrysList && props.getCostCenterListDetail && slaCountrysList.length?
                    <MaterialMasterForm action={materialFormAction} responseData={materialResponse} openAddForm={openAddForm}
                        closeOpenAddForm={closeOpenAddForm} onSubmitData={onSubmitFormData} getCostCentreList={props.getCostCentreList}
                        slaContractsList={slaContractsList} slaCountrysList={slaCountrysList?slaCountrysList:[]} costcenterList={props.getCostCenterListDetail}/>
                        :null
                }
            </Grid>

        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.materialMaster.isLoading,
        error: state.materialMaster.errors,
        materialMasterResponseData: state.materialMaster.materialMasterGridData,
        materialMasterGridData: state.materialMaster,
        materialCreateResponse: state.materialMaster.materialResponse,
        materialUpdateResponse: state.materialMaster.materialUpdateResponse,
        materialUploadResponse: state.materialMaster.materialUploadResponse,
        getCostCentreList: state.resourceProcess.getCostCentreList,
        slaContractsList: state.materialMaster.slaContractsResponse,
        slaCountrysList: state.materialMaster.slaCountrysResponse,
        getCostCenterListDetail: state.bizCaseSLAProcess.getCostcenterList,
    }
}
const mapDispatchToProps = (dispatch?: any) => {
    return {
        initMaterialMaster: () => {
            dispatch(initFinanceMaterialMasterAction())
        },
        getAllMaterialMasterDetails: (data: any) => {
            dispatch(getAllMaterialMasterDetailsAction(data))
        },
        createMaterialMaster: (data: any) => {
            dispatch(createMaterialMasterRequestAction(data))
        },
        updateMaterialMaster: (data: any) => {
            dispatch(updateMaterialMasterRequestAction(data))
        },
        uploadMaterialMaster: (data: any) => {
            dispatch(uploadMaterialMasterFileAction(data))
        },
        getconstcentreData: () => {
            dispatch({ type: ResourcesActionTypes.COST_CENTRE_REQUEST })
        },
        getSLAContractListDetails: (data) => {
            dispatch(getAllSLAContractsDetailsAction(data))
        },
        getSLACountrysListDetails: (data) => {
            dispatch(getAllSLACountryDetailsAction(data))
        },        
    getCostcenterList: () => dispatch({ type: BizCaseSLATypes.GET_BIZCASE_SLA_COSTCENTER_DETAILS }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MaterialMasterGrid)