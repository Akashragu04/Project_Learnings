import React from 'react'
import { makeStyles } from '@mui/styles';
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { AddCircle } from "@mui/icons-material";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CommonFileUpload from '../commonFileUpload'
import EditForexRates from './EditForexRates';
import AddForexRates from './AddForexRates';
import { connect } from "react-redux";
import { reqFinanceAddForoxRate, reqEditFinanceForoxRate, reqGetFinanceForoxRate, reqUploadFinanceForoxRate } from '../../../saga/Actions'
import { yearList } from 'services/Constants';
import { appConstants, RoutePermittedRole } from "../../../shared/constants/AppConst";
import { ConfigAPI } from 'services/config';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});
const ForerRatesView = (props?: any) => {
    const { getForexRatesData, loading } = props;
    const classes = useStyles();
    const [getResourcesColumns, setResourcesColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageNext, setPageNext] = React.useState(0);
    const [searchText, setSearchText] = React.useState("");
    const [SortItem, setSortItem] = React.useState('');
    const [openAddForexRateForm, setAddForm] = React.useState(false)
    const [openEditForexRateForm, setEditForm] = React.useState(false)
    const [getForexRateInfo, setForexRateInfo] = React.useState({})
    const [openUploadFile, setUploadFile] = React.useState(false)
    const [getFilterKeyword, setFilterKeyword] = React.useState('')


    React.useEffect(() => {
        getForoxRateInfo()
        setForexRateInfo({})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getForoxRateInfo = () => {
        const postValues = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            SearchKeyword: searchText,
            filterKeyword: getFilterKeyword
        }
        props.getFinanceForoxRateInfo(postValues)
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
    // const onEditForexRates = (getForexRatesId?: any) => {
    //     setEditForm(true)
    //     setForexRateInfo(getForexRatesId)

    // }

    // This is a function use add cost centre data 
    const onSubmitForexRates = (getForexRatesData?: any) => {
        props.reqFinanceAddForoxRateData(getForexRatesData)
        setAddForm(false)
        setTimeout(() => {
            getForoxRateInfo();
        }, 1000);
    }

    // This is a function use add cost centre data 
    const onEditSubmitForexRates = (getForexRatesData?: any) => {
        props.reqEditFinanceForoxRateData(getForexRatesData)
        setEditForm(false)
        setTimeout(() => {
            getForoxRateInfo();
        }, 1000);
    }

    // This is a function use Upload File 
    const onUploadFileForexRates = () => {
        setUploadFile(true)
    }

    // This is a function use Download 
    const onDownloadForexRates = () => {
        window.open(`${process.env.REACT_APP_API_URL}${ConfigAPI.forexRatesDownload}`, '_blank')
    }

    const closeOpenUploadFile = () => {
        setUploadFile(false)
    }

    const onUploadFileSubmit = (getUploadData?: any) => {
        props.reqUploadFinanceForoxRateData(getUploadData)
        setUploadFile(false)
        setTimeout(() => {
            getForoxRateInfo();
        }, 1000);
    }


    const generalPageSizing = (showPageNo) => {
        const postValues: any = {
            size: showPageNo,
            page: pageNext,
            sort: SortItem,
            SearchKeyword: searchText,
            filterKeyword: getFilterKeyword
        }
        setPageSize(showPageNo)
        props.getFinanceForoxRateInfo(postValues)
    }

    const requestSearch = (searchValue: string) => {
        const postValues: any = {
            size: pageSize,
            page: pageNext,
            sort: '',
            SearchKeyword: searchValue,
            filterKeyword: getFilterKeyword
        }
        setSearchText(searchValue);
        props.getFinanceForoxRateInfo(postValues)
    };

    const handleSortModelChange = (sortField) => {
        let postValues: any;
        if (sortField.length) {
            postValues = {
                size: pageSize,
                page: pageNext,
                sort: `${sortField[0].field},${sortField[0].sort}`,
                SearchKeyword: searchText,
                filterKeyword: getFilterKeyword
            }
        } else {
            postValues = {
                size: pageSize,
                page: pageNext,
                sort: '',
                SearchKeyword: searchText,
                filterKeyword: getFilterKeyword
            }
        }

        setSortItem(sortField)
        props.getFinanceForoxRateInfo(postValues)
    }

    const onGetYear = (getYear) => {
        let postValues: any;
        if (getYear === null) {
            postValues = {
                size: pageSize,
                page: pageNext,
                sort: SortItem,
                SearchKeyword: searchText,
                filterKeyword: ''
            }
            setFilterKeyword('')
            props.getFinanceForoxRateInfo(postValues)
        } else {
            postValues = {
                size: pageSize,
                page: pageNext,
                sort: SortItem,
                SearchKeyword: searchText,
                filterKeyword: getYear.year
            }
            setFilterKeyword(getYear.year)
            props.getFinanceForoxRateInfo(postValues)
        }
    }

    const generalPaging = (paging) => {
        const postValues: any = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            SearchKeyword: searchText,
            filterKeyword: getFilterKeyword
        }
        setPageNext(paging)
        props.getFinanceForoxRateInfo(postValues)
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
                field: 'currency',
                headerName: 'Currency',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 250,
                roleTypes: "common"
            },
            {
                field: 'to_inr',
                headerName: 'to INR',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 220,
                roleTypes: "common"
            },
            {
                field: 'year',
                headerName: 'Year',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 220,
                roleTypes: "common",
                renderCell: (params) => {
                    return (
                        <React.Fragment>
                            <Box>{params.row.year ? params.row.year : '-'}</Box>
                        </React.Fragment>
                    )
                }
            },
            // {
            //     field: 'action',
            //     headerName: 'Action',
            //     headerClassName: appConstants.dataGridAppDataHeader,
            //     type: 'actions',
            //     width: 150,
            //     getActions: (params) => [
            //         <React.Fragment>
            //             <GridActionsCellItem
            //                 key={`${params.id}_edit`}
            //                 icon={
            //                     <Tooltip title="Edit Forex Rate">
            //                 <EditIcon color={'primary'} />
            //                 </Tooltip>}
            //                 label='Toggle Admin'
            //                 onClick={() => onEditForexRates(params.row)} 
            //                 className="hideoption"
            //             />
            //         </React.Fragment>
            //     ]
            // }

        ];
        setResourcesColumns(leadFilterColumns)
    }

    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
            <Box sx={{ textAlign: "right", display: 'flex', marginBottom: 5 }}>
                <Box sx={{ textAlign: "right", width: '100%',  display:RoutePermittedRole.Finance === props.authRole.roles? 'block':'none' }}>
                    <Button variant="outlined" sx={{ marginRight: 2, padding:3, }} startIcon={<AddCircle />} onClick={onOpenAddForm} className="hideoption">
                        Create New Forex Rates
                    </Button>
                    <Button variant="outlined" sx={{ marginRight: 2, padding:3 }} startIcon={<ArrowCircleDownIcon />} onClick={onUploadFileForexRates} className="hideoption">
                        Upload File
                    </Button>
                    <Button variant="outlined" sx={{ marginRight: 2, padding:3 }} startIcon={<CloudDownloadIcon />} onClick={onDownloadForexRates}>
                        Download
                    </Button>
                </Box>
                <Box>
                    <Autocomplete
                        onChange={(event: any, newValue: any) => {
                            onGetYear(newValue)
                        }}
                        getOptionLabel={(option: any) => (option ? option.year : "")}
                        id='controllable-states-demo'
                        options={yearList ? yearList : []}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} label='Year' />}
                    />
                </Box>
            </Box>

            {openAddForexRateForm ?
                <AddForexRates openForexRates={openAddForexRateForm} closeForexRates={closeOpenAddForm} onSubmitForexRates={onSubmitForexRates} />
                : null}
            {
                openEditForexRateForm && getForexRateInfo ?
                    <EditForexRates openForexRates={openEditForexRateForm} resData={getForexRateInfo}
                        closeForexRates={closeOpenEditForm} onEditSubmitForexRates={onEditSubmitForexRates} />
                    : null
            }

            {openUploadFile ?
                <CommonFileUpload openUploadFile={openUploadFile} closeOpenUploadFile={closeOpenUploadFile} onUploadFileSubmit={onUploadFileSubmit} />
                : null
            }
            {getResourcesColumns && getResourcesColumns !== undefined && getResourcesColumns.length > 0 && getForexRatesData ?
                <DataGrid
                    autoHeight
                    rowHeight={64}
                    rows={getForexRatesData}
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
                    rowCount={props.resForoxRateData && props.resForoxRateData.totalElements?props.resForoxRateData.totalElements:0}
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
        getForexRatesData: state.FinanceMaster.getForoxRateData,
        authRole:state.auth.profileDetails,
        resForoxRateData:state.FinanceMaster.resForoxRateData
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        getFinanceForoxRateInfo: (getForexRatesId?: any) => dispatch(reqGetFinanceForoxRate(getForexRatesId)),
        reqFinanceAddForoxRateData: (getForexRatesId?: any) => dispatch(reqFinanceAddForoxRate(getForexRatesId)),
        reqEditFinanceForoxRateData: (editForexRatesId?: any) => dispatch(reqEditFinanceForoxRate(editForexRatesId)),
        reqUploadFinanceForoxRateData: (uploadForexRates?: any) => dispatch(reqUploadFinanceForoxRate(uploadForexRates))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForerRatesView);
