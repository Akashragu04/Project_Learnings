import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, GridActionsCellItem, gridClasses, } from "@mui/x-data-grid";
import { Box, Button, Grid } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import CommonFileUpload from '../commonFileUpload';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { AddCircle } from "@mui/icons-material";
import EntityMasterForm from './EntityMasterForm';
import EditIcon from '@mui/icons-material/Edit';
import { createEntityMasterRequestAction, getAllEntityMasterDetailsAction, initFinanceEntityMasterAction, updateEntityMasterRequestAction,
     uploadEntityMasterFileAction } from 'saga/Actions';
import { ConfigAPI } from 'services/config';
import { toast } from 'react-toastify';
import { appConstants } from 'shared/constants/AppConst';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

export const EntityMasterGrid = (props?: any) => {
    const classes = useStyles();
    const { entityMasterGridData, entityMasterResponseData, entityCreateResponse, entityUpdateResponse, entityUploadResponse }: any = props;
    const [entityMasterGridColumns, setEntityMasterGridColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [searchText, setSearchText] = React.useState("");
    const [pageNext, setPageNext] = React.useState(0);
    const [SortItem, setSortItem] = React.useState('');
    const [showUploadFile, senUploadFile] = React.useState(false)
    const [openAddForm, setAddForm] = React.useState(false)
    const [entityFormAction, setEntityFormAction] = React.useState('Create')
    const [entityResponse, setEntityResponse] = React.useState(null)

    useEffect(() => {
        props.initEntityMaster();
        getRoleBasedColumns()
        const entityGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        if (pageSize || pageNext) {
            props.getAllEntityMasterDetails(entityGridRequest)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (entityCreateResponse && entityCreateResponse.status) {
            toast.success(entityCreateResponse.message, { position: 'bottom-right' });
            props.initEntityMaster();
            setAddForm(false);
            refreshGrid();
        }
        if (entityUpdateResponse && entityUpdateResponse.status) {
            toast.success(entityUpdateResponse.message, { position: 'bottom-right' });
            props.initEntityMaster();
            setAddForm(false);
            refreshGrid();
        }
        if (entityUploadResponse && entityUploadResponse.status) {
            toast.success(entityUploadResponse.message, { position: 'bottom-right' });
            props.initEntityMaster();
            senUploadFile(false);
            refreshGrid();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entityCreateResponse, entityUpdateResponse, entityUploadResponse])

    const refreshGrid = () => {
        const entityGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        if (pageSize || pageNext) {
            props.getAllEntityMasterDetails(entityGridRequest)
        }
    }

    const onOpenAddForm = (action: any, rowData: any = null) => {
        setAddForm(true);
        setEntityFormAction(action);
        setEntityResponse(rowData)
    }
    const closeOpenAddForm = () => {
        setAddForm(false)
    }
    const onUploadFileSubmit = (uploadData?: any) => {
        props.uploadEntityMaster({ data: uploadData })
    }

    const onUploadFileEntityMaster = () => {
        senUploadFile(true)
    }
    const closeUploadFileEntityMaster = () => {
        senUploadFile(false)
    }
    const onDownloadEntityMaster = () => {
        window.open(`${process.env.REACT_APP_API_URL}${ConfigAPI.getEntityMasterDump}`, '_blank')
    }

    const generalPageSizing = (showPageNo) => {
        const entityGridRequest: any = {
            size: showPageNo,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        props.getAllEntityMasterDetails(entityGridRequest)
        setPageSize(showPageNo)
    }

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const entityGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: '',
            Searchkeyword: searchValue
        }
        props.getAllEntityMasterDetails(entityGridRequest)
    };

    const handleSortModelChange = (sortField) => {
        let entityGridRequest: any = {};
        if (sortField.length) {
            entityGridRequest = {
                size: pageSize,
                page: pageNext,
                sort: `${sortField[0].field},${sortField[0].sort}`,
                Searchkeyword: searchText
            }
        } else {
            entityGridRequest = {
                size: pageSize,
                page: pageNext,
                sort: '',
                Searchkeyword: searchText
            }
        }
        setSortItem(sortField)
        props.getAllEntityMasterDetails(entityGridRequest)
    }

    const generalPaging = (paging) => {
        const entityGridRequest: any = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            Searchkeyword: searchText
        }
        setPageNext(paging)
        props.getAllEntityMasterDetails(entityGridRequest)
    }

    const generalGridChange = (event) => {
    }


    const getRoleBasedColumns = () => {
        const accuralsFilterColumns: any = [
            // { field: 'id', headerName: 'S.No', headerClassName: appConstants.dataGridAppDataHeader, width: 100, filterable: false, align: "center" },
            {
                field: 'customerid',
                headerName: 'Customer ID',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                // width: 250,
                roleTypes: "common"
            },
            {
                field: 'customername',
                headerName: 'Customer Name',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                // width: 250,
                roleTypes: "common"
            },
            {
                field: 'state',
                headerName: 'State',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                // width: 250,
                roleTypes: "common"
            },
            {
                field: 'telephone',
                headerName: 'Telephone',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                // width: 250,
                roleTypes: "common"
            },
            {
                field: 'address',
                headerName: 'Address',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                // width: 250,
                roleTypes: "common"
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
        setEntityMasterGridColumns(accuralsFilterColumns)
    }

    const onSubmitEntityData = (entityDatas?: any) => {
        if (entityDatas.action === 'Create') {
            props.createEntityMaster({ data: entityDatas })
        } else if (entityDatas.action === 'Update') {
            props.updateEntityMaster({ entity_id: entityDatas.id, data: entityDatas })
        }
    }

    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
            <Grid item xs={12} sx={{ marginTop: 5 }}>

                <CommonFileUpload openUploadFile={showUploadFile} closeOpenUploadFile={closeUploadFileEntityMaster} onUploadFileSubmit={onUploadFileSubmit} />
                <Box sx={{ textAlign: "right", marginBottom: 5 }}>
                    <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={() => onOpenAddForm('Create')} className="hideoption">
                        Create New Entity
                    </Button>
                    <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<ArrowCircleDownIcon />} onClick={onUploadFileEntityMaster} className="hideoption">
                        Upload File
                    </Button>
                    <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />} onClick={onDownloadEntityMaster}>
                        Download
                    </Button>
                </Box>

                {((entityMasterGridColumns && entityMasterGridColumns.length > 0) && entityMasterResponseData) &&
                    <DataGrid
                        autoHeight
                        rowHeight={64}
                        rows={entityMasterResponseData}
                        columns={entityMasterGridColumns}
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
                        rowCount={entityMasterGridData.totalElements}
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

                {openAddForm &&
                    <EntityMasterForm action={entityFormAction} entityResponseData={entityResponse} openAddForm={openAddForm} closeOpenAddForm={closeOpenAddForm} onSubmitEntityData={onSubmitEntityData} />
                }
            </Grid>

        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.entityMaster.isLoading,
        error: state.entityMaster.errors,
        entityMasterResponseData: state.entityMaster.entityMasterGridData,
        entityMasterGridData: state.entityMaster,
        entityCreateResponse: state.entityMaster.entityResponse,
        entityUpdateResponse: state.entityMaster.entityUpdateResponse,
        entityUploadResponse: state.entityMaster.entityUploadResponse,
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        initEntityMaster: () => {
            dispatch(initFinanceEntityMasterAction())
        },
        getAllEntityMasterDetails: (data: any) => {
            dispatch(getAllEntityMasterDetailsAction(data))
        },
        createEntityMaster: (data: any) => {
            dispatch(createEntityMasterRequestAction(data))
        },
        updateEntityMaster: (data: any) => {
            dispatch(updateEntityMasterRequestAction(data))
        },
        uploadEntityMaster: (data: any) => {
            dispatch(uploadEntityMasterFileAction(data))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EntityMasterGrid)  