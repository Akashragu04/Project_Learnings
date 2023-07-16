import React from 'react'
import { makeStyles } from '@mui/styles';
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import { Box, Button } from '@mui/material';
import { AddCircle } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { connect } from "react-redux";
import AddVendorMaster from './AddVendorMaster';
import EditVendorMaster from './EditVendorMaster';
import CommonFileUpload from '../commonFileUpload'
import { reqGetFinanceVendor, reqEditFinanceVendor, reqFinanceAddVendor, reqUploadFinanceVendor } from '../../../saga/Actions'
import { appConstants } from 'shared/constants/AppConst';
import { ConfigAPI } from 'services/config';
const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

const ViewVendorMaster = (props?: any) => {
    const { loading, getResVendorMasterData } = props;
    const classes = useStyles();
    const [getResourcesColumns, setResourcesColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageNext, setPageNext] = React.useState(0);
    const [searchText, setSearchText] = React.useState("");
    const [SortItem, setSortItem] = React.useState('');
    const [openAddForm, setAddForm] = React.useState(false)
    const [openEditForm, setEditForm] = React.useState(false)
    const [getVendorMasterInfo, setVendorMasterInfo] = React.useState<any>({})
    const [openUploadFile, setUploadFile] = React.useState(false)


    React.useEffect(() => {
        getCostCenterInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getCostCenterInfo = () => {
        const postValues = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            SearchKeyword: searchText
        }
        props.getFinanceVendorMasterInfo(postValues)
    }
    const onOpenAddForm = () => {
        setAddForm(true)
    }
    const closeOpenAddForm = () => {
        setAddForm(false)
        setTimeout(() => {
            getCostCenterInfo();
        }, 1000);

    }
    const closeOpenEditForm = () => {
        setEditForm(false)

        setTimeout(() => {
            getCostCenterInfo();
        }, 1000);
    }
    const onEditVendorMaster = (getVendorMasterId?: any) => {
        setEditForm(true)
        setVendorMasterInfo(getVendorMasterId)

    }

    // This is a function use add cost centre data 
    const onSubmitVendorMaster = (getVendorMasterData?: any) => {
        props.reqFinanceAddVendorMasterData(getVendorMasterData)
        setAddForm(false)
        setTimeout(() => {
            getCostCenterInfo()
        }, 1000);       
    }

    // This is a function use add cost centre data 
    const onEditSubmitVendorMaster = (getVendorMasterData?: any) => {
        if(getVendorMasterData){
            let postValues:any = {
                id:getVendorMasterInfo?.id,
                data:getVendorMasterData
            }
            props.reqEditFinanceVendorMasterData(postValues)
            setEditForm(false)
            setTimeout(() => {
                getCostCenterInfo()
            }, 1000);
        }
    
    }

    // This is a function use Upload File 
    const onUploadFileVendorMaster = () => {
        setUploadFile(true)
    }

    // This is a function use Download 
    const onDownloadVendorMaster = () => {
        window.open(`${process.env.REACT_APP_API_URL}${ConfigAPI.vendorMasterDownload}`, '_blank')
    }

    const closeOpenUploadFile = () => {
        setUploadFile(false)
    }

    const onUploadFileSubmit = (getUploadData?: any) => {
        props.reqUploadFinanceVendorMasterData(getUploadData)
        setUploadFile(false)
        setTimeout(() => {
            getCostCenterInfo();
        }, 1000);
    }

    const generalPageSizing = (showPageNo) => {
        const postValues: any = {
            size: showPageNo,
            page: pageNext,
            sort: SortItem,
            SearchKeyword: searchText
        }
        setPageSize(showPageNo)
        props.getFinanceVendorMasterInfo(postValues)
    }

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const postValues: any = {
            size: pageSize,
            page: pageNext,
            sort: '',
            SearchKeyword: searchValue
        }
        setSearchText(searchValue);
        props.getFinanceVendorMasterInfo(postValues)
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
        props.getFinanceVendorMasterInfo(postValues)
    }

    const generalPaging = (paging) => {
        const postValues: any = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            SearchKeyword: searchText
        }
        setPageNext(paging)
        props.getFinanceVendorMasterInfo(postValues)
    }

    const generalGridChange = (event) => {
    }

    React.useEffect(() => {
        getFinanceList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getFinanceList = () => {
        const leadFilterColumns: any = [
            // { field: 'id', headerName: 'S.No.', headerClassName: appConstants.dataGridAppDataHeader, width: 90, filterable: false, align: "left" },
            {
                field: 'vendorId',
                headerName: 'Vendor Id',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 150,
                roleTypes: "common",
                renderCell: (params) => {
                    return (
                        <React.Fragment>
                            <Box>{params.row.vendorid ? params.row.vendorid : '-'}</Box>
                        </React.Fragment>
                    )
                }
            },
            {
                field: 'code',
                headerName: 'Code',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'name',
                headerName: 'Name',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 250,
                sortable: false,
                renderCell: (params) => {
                    return (
                        <React.Fragment>
                            <Box>{params.row.name ? params.row.name : '-'}</Box>
                        </React.Fragment>
                    )
                }
            },
            {
                field: 'action',
                headerName: 'Action',
                headerClassName: appConstants.dataGridAppDataHeader,
                type: 'actions',
                width: 100,
                getActions: (params) => [
                    <React.Fragment>
                        <GridActionsCellItem
                            key={`${params.id}_edit`}
                            icon={<EditIcon color={'primary'} />}
                            label='Toggle Admin'
                            onClick={() => onEditVendorMaster(params.row)} className="hideoption"
                        />
                    </React.Fragment>
                ]
            }
        ];
        setResourcesColumns(leadFilterColumns)
    }

    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
            <Box sx={{ textAlign: "right", marginBottom: 5 }}>
                <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddForm} className="hideoption">
                    Create New Vendor Master
                </Button>
                <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<ArrowCircleDownIcon />} onClick={onUploadFileVendorMaster} className="hideoption">
                    Upload File
                </Button>
                <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />} onClick={onDownloadVendorMaster}>
                    Download
                </Button>
            </Box>

            {openAddForm ?
                <AddVendorMaster openAddForm={openAddForm} closeOpenAddForm={closeOpenAddForm} onSubmitVendorMaster={onSubmitVendorMaster} />
                : null}
            {
                openEditForm && getVendorMasterInfo ?
                    <EditVendorMaster openEditForm={openEditForm} resData={getVendorMasterInfo}
                        closeOpenEditForm={closeOpenEditForm} onEditSubmitVendorMaster={onEditSubmitVendorMaster} />
                    : null
            }
            {openUploadFile ?
                <CommonFileUpload openUploadFile={openUploadFile} closeOpenUploadFile={closeOpenUploadFile} onUploadFileSubmit={onUploadFileSubmit} />
                : null
            }
            {getResourcesColumns && getResourcesColumns !== undefined && getResourcesColumns.length > 0 && getResVendorMasterData ?
                <DataGrid
                    autoHeight
                    rowHeight={64}
                    rows={getResVendorMasterData}
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
                    rowCount={props.resVendorData && props.resVendorData.totalElements?props.resVendorData.totalElements:0}
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
        getResVendorMasterData: state.FinanceMaster.getvendorData,
        resVendorData:state.FinanceMaster.resVendorData
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        getFinanceVendorMasterInfo: (getVendorMasterId?: any) => dispatch(reqGetFinanceVendor(getVendorMasterId)),
        reqFinanceAddVendorMasterData: (getVendorMasterId?: any) => dispatch(reqFinanceAddVendor(getVendorMasterId)),
        reqEditFinanceVendorMasterData: (editVendorMasterId?: any) => dispatch(reqEditFinanceVendor(editVendorMasterId)),
        reqUploadFinanceVendorMasterData: (uploadVendorMaster?: any) => dispatch(reqUploadFinanceVendor(uploadVendorMaster))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewVendorMaster);