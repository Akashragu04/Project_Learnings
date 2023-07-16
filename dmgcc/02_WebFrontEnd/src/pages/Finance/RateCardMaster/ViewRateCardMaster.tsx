import React from 'react'
import { Grid, Box, Button, TextField, Autocomplete } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CommonFileUpload from '../commonFileUpload';
import { makeStyles } from '@mui/styles';
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import OpenRateCardView from './OpenRateCardView';
import { connect } from "react-redux";
import { reqAddFinanceRateCard, reqGetFinanceRateCard, reqUploadFinanceRateCard } from '../../../saga/Actions'
import { yearList } from '../../../services/Constants';
import { AddCircle } from '@mui/icons-material';
import AddRateCard from './Form/AddRateCard';
import { ResourcesActionTypes } from 'saga/Types/Resources.Types';
import { appConstants } from 'shared/constants/AppConst';
import { ConfigAPI } from 'services/config';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});
const ViewRateCardMaster = (props?: any) => {
    const { loading } = props;
    const classes = useStyles();
    const [getResourcesColumns, setResourcesColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageNext, setPageNext] = React.useState(0);
    const [searchText, setSearchText] = React.useState("");
    const [SortItem, setSortItem] = React.useState('');
    const [showUploadFile, senUploadFile] = React.useState(false)
    const [showRateCardPage, setRateCardPage] = React.useState(false)
    const [getRateCardInfo, setRateCardInfo] = React.useState({})
    const [showAddRateCard, setAddRateCard] = React.useState(false)
    const [getFilterKeyword, setFilterKeyword] = React.useState('')

    React.useEffect(() => {
        getRateCard()
        props.getconstcentreData()
        getRateCardMasterInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getRateCardMasterInfo = () => {
        const postValues = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            SearchKeyword: searchText,
            filterKeyword: getFilterKeyword
        }
        props.getFinanceRateCardInfo(postValues)
    }

    const onUploadFileCostCentre = () => {
        senUploadFile(true)
    }
    const closeUploadFileCostCentre = () => {
        senUploadFile(false)
    }
    const onDownloadCostCentre = () => {
        window.open(`${process.env.REACT_APP_API_URL}${ConfigAPI.rateCardMasterDownload}`, '_blank')

    }
    const onOpenAddForm = () => {
        setAddRateCard(true)
    }
    const onCloseAddForm = () => {
        setAddRateCard(false)
    }
    const onGetYear = (getYear) => {
        if(getYear === null){
            const postValues = {
                size: pageSize,
                page: pageNext,
                sort: SortItem,
                SearchKeyword: searchText,
                filterKeyword: ''
            }
            props.getFinanceRateCardInfo(postValues)
            setFilterKeyword('')
        }else{
            const postValues = {
                size: pageSize,
                page: pageNext,
                sort: SortItem,
                SearchKeyword: searchText,
                filterKeyword: getYear.year
            }
            props.getFinanceRateCardInfo(postValues)
            setFilterKeyword(getYear.year)
        }
      
    }

    const generalPageSizing = (showPageNo) => {
        const rateGridRequest: any = {
            size: showPageNo,
            page: pageNext,
            sort: SortItem,
            SearchKeyword: searchText,
            filterKeyword: getFilterKeyword
        }
        props.getFinanceRateCardInfo(rateGridRequest)
        setPageSize(showPageNo)
    }

    const requestSearch = (searchValue: string) => {
        if(searchValue && searchValue !==""){
            setSearchText(searchValue);
            const postValues: any = {
                size: pageSize,
                page: pageNext,
                sort: '',
                SearchKeyword: searchValue,
                filterKeyword: getFilterKeyword
            }
            props.getFinanceRateCardInfo(postValues)
        }else{
            setSearchText("");
            const postValues: any = {
                size: pageSize,
                page: pageNext,
                sort: '',
                SearchKeyword: "",
                filterKeyword: getFilterKeyword
            }
            props.getFinanceRateCardInfo(postValues)
        }
   
    };

    const handleSortModelChange = (sortField) => {
        let slaGridRequest: any = {};
        if (sortField.length) {
            slaGridRequest = {
                size: pageSize,
                page: pageNext,
                sort: `${sortField[0].field},${sortField[0].sort}`,
                SearchKeyword: searchText,
                filterKeyword: getFilterKeyword
            }
        } else {
            slaGridRequest = {
                size: pageSize,
                page: pageNext,
                sort: '',
                SearchKeyword: searchText,
                filterKeyword: getFilterKeyword
            }
        }
        props.getFinanceRateCardInfo(slaGridRequest)
        setSortItem(sortField)
    }

    const generalPaging = (paging) => {
        const rateGridRequest: any = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            SearchKeyword: searchText,
            filterKeyword: getFilterKeyword
        }
        setPageNext(paging)
        props.getFinanceRateCardInfo(rateGridRequest)
    }
    const onSubmitRateCard = (getRateCardValues?: any) => {
        props.reqAddFinanceRateCardData(getRateCardValues)
        onCloseAddForm()
        setTimeout(() => {
            getRateCardMasterInfo();
        }, 1000);
    }
    const generalGridChange = (event) => {
    }

    const onUploadFileSubmit = (getUploadData?: any) => {
        props.reqUploadFinanceRateCardData(getUploadData)
        getRateCardMasterInfo()
        senUploadFile(false)
    }

    const onViewRateCardView = (getForexRatesData?: any) => {
        setRateCardPage(true)
        setRateCardInfo(getForexRatesData)
    }
    const onCloseRateCardView = () => {
        setRateCardPage(false)
    }
    const getRateCard = () => {
        const leadFilterColumns: any = [
            // { field: 'id', headerName: 'S.No.', headerClassName: appConstants.dataGridAppDataHeader, width: 60, filterable: false, align: "left" },
            {
                field: 'costcenter',
                headerName: 'Cost Centre',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 200,
                roleTypes: "common"
            },
            {
                field: 'team',
                headerName: 'Team',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 220,
                roleTypes: "common"
            },
            {
                field: 'department',
                headerName: 'Department',
                headerClassName: appConstants.dataGridAppDataHeader,
                width: 220,
                roleTypes: "common"
            },
            {
                field: 'action',
                headerName: 'Action',
                headerClassName: appConstants.dataGridAppDataHeader,
                type: 'actions',
                width: 150,
                getActions: (params) => [
                    <React.Fragment>
                        <GridActionsCellItem
                            key={`${params.id}_edit`}
                            icon={<RemoveRedEyeIcon color={'primary'} />}
                            label='Toggle Admin'
                            onClick={() => onViewRateCardView(params.row)}
                        />
                    </React.Fragment>
                ]
            }

        ];
        setResourcesColumns(leadFilterColumns)
    }
    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
            <Grid item xs={12} sx={{ marginTop: 5 }}>
                {
                    showAddRateCard ?
                        <AddRateCard closeRateCard={onCloseAddForm} openRateCard={showAddRateCard} getCostCentreList={props.getCostCentreList} onSubmitRateCard={onSubmitRateCard} />
                        : null
                }

                {
                    showRateCardPage ?
                        <OpenRateCardView openRateCard={showRateCardPage} closeRateCard={onCloseRateCardView} RateCardMasterList={getRateCardInfo} />
                        : null
                }

                <CommonFileUpload openUploadFile={showUploadFile} closeOpenUploadFile={closeUploadFileCostCentre} onUploadFileSubmit={onUploadFileSubmit} />
                <Box sx={{ display: 'flex', marginBottom: 5 }}>
                    <Box sx={{ textAlign: "right", width: '100%' }}>
                        <Button variant="outlined" sx={{ marginRight: 2, padding: 3 }} startIcon={<AddCircle />} onClick={onOpenAddForm}  className="hideoption">
                            Create New Rate Card
                        </Button>
                        <Button variant="outlined" sx={{ marginRight: 2, padding: 3 }} startIcon={<ArrowCircleDownIcon />} onClick={onUploadFileCostCentre} className="hideoption">
                            Upload File
                        </Button>
                        <Button variant="outlined" sx={{ marginRight: 2, padding: 3 }} startIcon={<CloudDownloadIcon />} onClick={onDownloadCostCentre}>
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

                {getResourcesColumns && getResourcesColumns !== undefined && getResourcesColumns.length > 0 && props.getRateCardData ?
                    <DataGrid
                        autoHeight
                        rowHeight={64}
                        rows={props.getRateCardData}
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
                        rowCount={props.resRateCardMasterData && props.resRateCardMasterData.totalElements ?props.resRateCardMasterData.totalElements:0}
                        pageSize={pageSize}
                        rowsPerPageOptions={[10, 25, 50]}
                        loading={loading}
                        sortingMode='server'
                        onSortModelChange={handleSortModelChange}
                        onPageChange={(paging) => generalPaging(paging)}
                        onPageSizeChange={(size) => generalPageSizing(size)}
                        onStateChange={(event) => generalGridChange(event)}
                    />
                    : null}
            </Grid>
        </Box>

    )
}


const mapStateToProps = (state: any) => {
    return {
        loading: state.FinanceMaster.loading,        
        getCostCentreList: state.resourceProcess.getCostCentreList,
        getRateCardData: state.FinanceMaster.getRateCardMasterData,
        resRateCardMasterData:state.FinanceMaster.resRateCardMasterData
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        getFinanceRateCardInfo: (getRateCardId?: any) => dispatch(reqGetFinanceRateCard(getRateCardId)), 
        getconstcentreData: () => dispatch({ type: ResourcesActionTypes.COST_CENTRE_REQUEST }),
        reqUploadFinanceRateCardData: (uploadRateCard?: any) => dispatch(reqUploadFinanceRateCard(uploadRateCard)),
        reqAddFinanceRateCardData: (getRateCardData?: any) => dispatch(reqAddFinanceRateCard(getRateCardData))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRateCardMaster);
