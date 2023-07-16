import React from 'react'
import { makeStyles } from '@mui/styles';
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch, Tooltip } from '@mui/material';
import { AddCircle } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import AddCostCentreMaster from './AddCostCentreMaster';
import EditCostCenterMaster from './EditCostCenterMaster';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import UploadFileData from './UploadFileData'
import { connect } from "react-redux";
import { reqGetFinanceCostCentre, reqFinanceAddCostCentre, reqEditFinanceCostCentre, reqUploadFinanceCostCentre, reqDownloadFileObjectCommon, reqClearStatus, reqChangeCostCenterStatus } from '../../../saga/Actions'
import { ConfigAPI } from '../../../services/config';
import { appConstants } from 'shared/constants/AppConst';
// import { constants } from 'buffer';
import { saveAs } from 'file-saver';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});
const CostCentreMasterTable = (props?: any) => {
    const { loading } = props;
    const classes = useStyles();
    const [getResourcesColumns, setResourcesColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageNext, setPageNext] = React.useState(0);
    const [searchText, setSearchText] = React.useState("");
    const [SortItem, setSortItem] = React.useState('');
    const [openAddForm, setAddForm] = React.useState(false)
    const [openEditForm, setEditForm] = React.useState(false)
    const [getCostCentreInfo, setCostCentreInfo] = React.useState({})
    const [openUploadFile, setUploadFile] = React.useState(false)

    React.useEffect(() => {
        getCostCenterInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (props.resFileObject) {
            // resFileObject
            var blob = new Blob([props.resFileObject], { type: "text/csv" });
            saveAs.saveAs(blob, "CostCentreMaster.csv");
            props.reqClearStatus()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.resFileObject])

    React.useEffect(()=>{
if(props.resCostCenterBlock && props.resCostCenterBlock.status === true){
    getCostCenterInfo()
    props.reqClearStatus()

}
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.resCostCenterBlock])
    const onChangeResourcesStatus = (getValues?: any) => {
        if(getValues){
            let postURL:any = `${ConfigAPI.deleteCostCenter}${getValues.id}?is_active=${!getValues.is_active}`
            props.reqChangeCostCenterStatus(postURL)
        }
    }

    const getCostCenterInfo = () => {
        const postValues = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            searchKeyword: searchText
        }
        props.getFinanceCostCentreInfo(postValues)
    }
    const onOpenAddForm = () => {
        setAddForm(true)
    }
    const closeOpenAddForm = () => {
        setAddForm(false)
    }
    const closeOpenEditForm = () => {
        setEditForm(false)
    }
    const onEditCostCentre = (getCostCentreId?: any) => {
        setEditForm(true)
        setCostCentreInfo(getCostCentreId)

    }

    // This is a function use add cost centre data 
    const onSubmitCostCentre = (getCostCentreData?: any) => {
        props.reqFinanceAddCostCentreData(getCostCentreData)
        setAddForm(false)
        getCostCenterInfo()
    }

    // This is a function use add cost centre data 
    const onEditSubmitCostCentre = (getCostCentreData?: any) => {
        props.reqEditFinanceCostCentreData(getCostCentreData)
        setEditForm(false)
        getCostCenterInfo()
    }

    // This is a function use Upload File 
    const onUploadFileCostCentre = () => {
        setUploadFile(true)
    }

    // This is a function use Download 
    const onDownloadCostCentre = () => {
        // window.open(`${process.env.REACT_APP_API_URL}${ConfigAPI.costCenterDownload}`,'_blank')
        props.reqDownloadFileObjectCommon(ConfigAPI.costCenterDownload)
    }

    const closeOpenUploadFile = () => {
        setUploadFile(false)
    }

    const onUploadFileSubmit = (getUploadData?: any) => {
        let postValues: any;
        if (getUploadData) {
            if (getUploadData.types === 'oldFileUpload') {
                postValues = {
                    url: ConfigAPI.financeUploadOldCostCenter,
                    file: getUploadData.file
                }
                props.reqUploadFinanceCostCentreData(postValues)
                setUploadFile(false)
                getCostCenterInfo()
            } else {
                postValues = {
                    url: ConfigAPI.financeNewUploadCostCenter,
                    file: getUploadData.file
                }
                props.reqUploadFinanceCostCentreData(postValues)
                setUploadFile(false)
                getCostCenterInfo()
            }
        }
    }

    const generalPageSizing = (showPageNo) => {
        const postValues: any = {
            size: showPageNo,
            page: pageNext,
            sort: SortItem,
            searchKeyword: searchText
        }
        setPageSize(showPageNo)
        props.getFinanceCostCentreInfo(postValues)
    }

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const postValues: any = {
            size: pageSize,
            page: pageNext,
            sort: '',
            searchKeyword: searchValue
        }
        setSearchText(searchValue);
        props.getFinanceCostCentreInfo(postValues)
    };

    const handleSortModelChange = (sortField) => {
        let postValues: any;
        if (sortField.length) {
            postValues = {
                size: pageSize,
                page: pageNext,
                sort: `${sortField[0].field},${sortField[0].sort}`,
                searchKeyword: searchText
            }
        } else {
            postValues = {
                size: pageSize,
                page: pageNext,
                sort: '',
                searchKeyword: searchText
            }
        }

        setSortItem(sortField)
        props.getFinanceCostCentreInfo(postValues)
    }

    const generalPaging = (paging) => {
        const postValues: any = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            searchKeyword: searchText
        }
        setPageNext(paging)
        props.getFinanceCostCentreInfo(postValues)
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
                field: 'costcenter',
                headerName: 'Cost Centre',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 230,
                roleTypes: "common",
                renderCell: (params) => {
                    return (
                        <React.Fragment>
                            <Box>{params.row.costcenter ? params.row.costcenter : '-'}</Box>
                        </React.Fragment>
                    )
                }
            },
            {
                field: 'team',
                headerName: 'Team',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 300,
                roleTypes: "common"
            },
            {
                field: 'team_group',
                headerName: 'Department',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 300,
                sortable: false,
                renderCell: (params) => {
                    return (
                        <React.Fragment>
                            <Box>{params.row.team_group ? params.row.team_group : '-'}</Box>
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
                            onClick={() => onEditCostCentre(params.row)}
                            className="hideoption"
                        />
                        <FormControl component='fieldset' variant='standard'>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Tooltip title={params.row.is_active ===true?"Active":"Inactive"}>
                                        <Switch
                                        color='success'
                                            checked={params.row && params.row.is_active !==null && params.row.is_active ===true?true:false}
                                            onChange={() => onChangeResourcesStatus(params.row)}
                                            name='captinityleave'
                                        />
                                        </Tooltip>
                                    }
                                    label=''
                                />
                            </FormGroup>
                        </FormControl>
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
                    Create New Cost Centre
                </Button>
                <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<ArrowCircleDownIcon />} onClick={onUploadFileCostCentre} className="hideoption">
                    Upload File
                </Button>
                <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />} onClick={onDownloadCostCentre}>
                    Download
                </Button>
            </Box>

            {openAddForm ?
                <AddCostCentreMaster openAddForm={openAddForm} closeOpenAddForm={closeOpenAddForm} onSubmitCostCentre={onSubmitCostCentre} />
                : null}
            {
                openEditForm && getCostCentreInfo ?
                    <EditCostCenterMaster openEditForm={openEditForm} resData={getCostCentreInfo}
                        closeOpenEditForm={closeOpenEditForm} onEditSubmitCostCentre={onEditSubmitCostCentre} />
                    : null
            }

            {openUploadFile ?
                <UploadFileData openUploadFile={openUploadFile} closeOpenUploadFile={closeOpenUploadFile} onUploadFileSubmit={onUploadFileSubmit} />
                : null
            }
            {getResourcesColumns && getResourcesColumns !== undefined && getResourcesColumns.length > 0 && props.getCostCentreData ?
                <DataGrid
                    autoHeight
                    rowHeight={64}
                    rows={props.getCostCentreData}
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
                    rowCount={props.resCostCentreData && props.resCostCentreData.totalElements ? props.resCostCentreData.totalElements : 0}
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
        getCostCentreData: state.FinanceMaster.getCostCentreData,
        resFileObject: state.FinanceMaster.resFileObject,
        resCostCentreData: state.FinanceMaster.resCostCentreData,
        resCostCenterBlock:state.FinanceMaster.resCostCenterBlock
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        getFinanceCostCentreInfo: (getCostCentreId?: any) => dispatch(reqGetFinanceCostCentre(getCostCentreId)),
        reqFinanceAddCostCentreData: (getCostCentreId?: any) => dispatch(reqFinanceAddCostCentre(getCostCentreId)),
        reqEditFinanceCostCentreData: (editCostCentreId?: any) => dispatch(reqEditFinanceCostCentre(editCostCentreId)),
        reqUploadFinanceCostCentreData: (uploadCostCentre?: any) => dispatch(reqUploadFinanceCostCentre(uploadCostCentre)),
        reqDownloadFileObjectCommon: (downloadURL?: any) => dispatch(reqDownloadFileObjectCommon(downloadURL)),
        reqClearStatus: () => dispatch(reqClearStatus()),
        reqChangeCostCenterStatus:(postValues:any)=>dispatch(reqChangeCostCenterStatus(postValues))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CostCentreMasterTable);
