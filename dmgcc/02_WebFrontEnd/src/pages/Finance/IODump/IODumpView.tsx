import React from 'react'
import { makeStyles } from '@mui/styles';
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Box, Button, Grid, Typography } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { connect } from "react-redux";
import AddIODump from './AddIODump';
import EditIODump from './EditIODump';
import CommonFileUpload from '../commonFileUpload';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { reqFinanceAddIODump, reqEditFinanceIODump, reqGetFinanceIODump, reqUploadFinanceIODump, reqIoCcChart, reqClearStatus } from '../../../saga/Actions'
import { appConstants, RoutePermittedRole } from 'shared/constants/AppConst';
import { ConfigAPI } from 'services/config';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useThemeContext } from '@crema/utility/AppContextProvider/ThemeContextProvider';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

const IODumpView = (props?: any) => {
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

    const { theme } = useThemeContext();

    React.useEffect(() => {
        getIODumpInfo()
        props.reqClearStatus()
        props.reqIoCcChart(ConfigAPI.getIOChartURL)
        setForexRateInfo({})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getIODumpInfo = () => {
        const postValues = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            SearchKeyword: searchText
        }
        props.getFinanceIODumpInfo(postValues)
    }

    // const onOpenAddForm = () => {
    //     setAddForm(true)
    // }
    const closeOpenAddForm = () => {
        setAddForm(false)
    }
    const closeOpenEditForm = () => {
        setEditForm(false)
    }
    // const onEditIODump = (getIODumpId?: any) => {
    //     setEditForm(true)
    //     setForexRateInfo(getIODumpId)

    // }

    // This is a function use add cost centre data 
    const onSubmitIODump = (getIODumpData?: any) => {
        props.reqFinanceAddIODumpData(getIODumpData)
        setAddForm(false)
        setTimeout(() => {
            getIODumpInfo()
        }, 1000);
    }

    // This is a function use add cost centre data 
    const onEditSubmitIODump = (getIODumpData?: any) => {
        props.reqEditFinanceIODumpData(getIODumpData)
        setEditForm(false)
        setTimeout(() => {
            getIODumpInfo()
        }, 1000);
    }

    // This is a function use Download 
    const onDownloadIODump = () => {
        window.open(`${process.env.REACT_APP_API_URL}${ConfigAPI.iodumpDownload}`, '_blank')
    }

    const closeOpenUploadFile = () => {
        setUploadFile(false)
    }

    const onUploadFileSubmit = (getUploadData?: any) => {
        props.reqUploadFinanceIODumpData(getUploadData)
        setUploadFile(false)
        setTimeout(() => {
            getIODumpInfo()
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
        props.getFinanceIODumpInfo(postValues)
    }

    const requestSearch = (searchValue: string) => {
        const postValues: any = {
            size: pageSize,
            page: pageNext,
            sort: '',
            SearchKeyword: searchValue
        }
        setSearchText(searchValue);
        props.getFinanceIODumpInfo(postValues)
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
        props.getFinanceIODumpInfo(postValues)
    }

    const generalPaging = (paging) => {
        const postValues: any = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            SearchKeyword: searchText
        }
        setPageNext(paging)
        props.getFinanceIODumpInfo(postValues)
    }

    const generalGridChange = (event) => {
    }

    React.useEffect(() => {
        getIODumpList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getIODumpList = () => {
        const leadFilterColumns: any = [
            // { field: 'id', headerName: 'S.No.', headerClassName: appConstants.dataGridAppDataHeader, width: 70, filterable: false, align: "left" },
            {
                field: 'fiscalyear',
                headerName: 'Fiscal Year',
                headerClassName: appConstants.dataGridAppDataHeader,
                minWidth: 150, flex: 1,
                roleTypes: "common",
                renderCell: (params) => {
                    return (
                        <React.Fragment>
                            <Box>{params.row.fiscalyear ? params.row.fiscalyear : '-'}</Box>
                        </React.Fragment>
                    )
                }
            },
            {
                field: 'period',
                headerName: 'Period',
                headerClassName: appConstants.dataGridAppDataHeader,
                minWidth: 150, flex: 1,
                roleTypes: "common"
            },
            {
                field: 'object_currency',
                headerName: 'Currency',
                headerClassName: appConstants.dataGridAppDataHeader,
                minWidth: 150, flex: 1,
                sortable: false,
                renderCell: (params) => {
                    return (
                        <React.Fragment>
                            <Box>{params.row.object_currency ? params.row.object_currency : '-'}</Box>
                        </React.Fragment>
                    )
                }
            },
            {
                field: 'costelement',
                headerName: 'Cost Element',
                headerClassName: appConstants.dataGridAppDataHeader,
                minWidth: 150, flex: 1,
                sortable: false,
                renderCell: (params) => {
                    return (
                        <React.Fragment>
                            <Box>{params.row.costelement ? params.row.costelement : '-'}</Box>
                        </React.Fragment>
                    )
                }
            },
            {
                field: 'cost_element_name',
                headerName: 'Cost element name',
                headerClassName: appConstants.dataGridAppDataHeader,
                minWidth: 150, flex: 1,
                sortable: false,
                renderCell: (params) => {
                    return (
                        <React.Fragment>
                            <Box>{params.row.cost_element_name ? params.row.cost_element_name : '-'}</Box>
                        </React.Fragment>
                    )
                }
            },
            {
                field: 'orders',
                headerName: 'Order',
                headerClassName: appConstants.dataGridAppDataHeader,
                minWidth: 150, flex: 1,
                sortable: false,
                renderCell: (params) => {
                    return (
                        <React.Fragment>
                            <Box>{params.row.orders ? params.row.orders : '-'}</Box>
                        </React.Fragment>
                    )
                }
            },
        ];
        setResourcesColumns(leadFilterColumns)
    }
    const onUploadFileIODump = () => {
        setUploadFile(true)
    }
    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
            <Box sx={{ textAlign: "right", marginBottom: 5 }}>
                {/* <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenAddForm}>
            Create New IO Dump
        </Button> */}
                {RoutePermittedRole.Finance === props.userInfo.roles ?
                
                    <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<ArrowCircleDownIcon />} onClick={onUploadFileIODump} className="hideoption">
                        Upload File
                    </Button>
                    : null}

                <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />} onClick={onDownloadIODump}>
                    Download
                </Button>
            </Box>

            {openAddForexRateForm ?
                <AddIODump openAddForexRateForm={openAddForexRateForm} closeIODump={closeOpenAddForm} onSubmitIODump={onSubmitIODump} />
                : null}
            {
                openEditForexRateForm && getForexRateInfo ?
                    <EditIODump openEditForexRateForm={openEditForexRateForm} resData={getForexRateInfo}
                        closeIODump={closeOpenEditForm} onEditSubmitIODump={onEditSubmitIODump} />
                    : null
            }

            {openUploadFile ?
                <CommonFileUpload openUploadFile={openUploadFile} closeOpenUploadFile={closeOpenUploadFile} onUploadFileSubmit={onUploadFileSubmit} />
                : null
            }

            {
                props.resIoCcChartData ?
                    <Box sx={{ textAlign: 'right', margin: 3, fontWeight: 'bolder', fontSize: 16 }}>
                        Total Expense: {props.resIoCcChartData ? props.resIoCcChartData.total_expense : 0}
                    </Box>
                    : null}

            <Grid container rowSpacing={5} spacing={{ xs: 2, md: 8 }} sx={{ marginBottom: 5 }} >
                <Grid item xs={12} md={12}>
                    <Box>
                        <Typography
                            component="h5"
                            variant="inherit"
                            color="inherit"
                            sx={{
                                fontSize: 16,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                width: "100%",
                                marginBottom: 3
                            }}
                        >
                           IO Month Wise Expenses
                        </Typography>
                        {
                            props.resIoCcChartData && props.resIoCcChartData.ioMonthwiseExpenses ?
                                <ResponsiveContainer width='100%' height={300}>
                                    <BarChart data={ props.resIoCcChartData ?  props.resIoCcChartData.ioMonthwiseExpenses : []} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                        <XAxis dataKey='month' />
                                        <YAxis 
                                         tickFormatter={(value) =>
                                            new Intl.NumberFormat("en-US", {
                                              notation: "compact",
                                              compactDisplay: "short",
                                            }).format(value)
                                          }
                                        />
                                        <CartesianGrid strokeDasharray='3 3' />
                                        <Tooltip />
                                        {/* <Legend content={RenderLegend} /> */}
                                        <Bar dataKey='monthwise_expense' barSize={25} fill={theme.palette.primary.main}>
                                            <Cell fill={`#00677F`} />
                                            {/* {
                                        props.data.invoice_status.map((entry, index) => {
                                            return (
                                                <Cell key={`cell-${index}`} fill={`${entry.colour}`} />
                                            )
                                        })
                                    } */}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                                : <Box>No Data</Box>}

                    </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box>
                        <Typography
                            component="h5"
                            variant="inherit"
                            color="inherit"
                            sx={{
                                fontSize: 16,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                width: "100%",
                                marginBottom: 3
                            }}
                        >
                            IO Description Wise Expenses
                        </Typography>
                        {
                            props.resIoCcChartData && props.resIoCcChartData.ioDescriptionwiseExpenses?
                            <ResponsiveContainer width={"100%"} height={50 * props.resIoCcChartData.ioDescriptionwiseExpenses.length} debounce={50}>
                            <BarChart
                                data={props.resIoCcChartData ?  props.resIoCcChartData.ioDescriptionwiseExpenses : []}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <XAxis hide axisLine={false} type="number" />
                                <YAxis
                                    yAxisId={0}
                                    dataKey={'description'}
                                    type="category"
                                    axisLine={true}
                                    tickLine={true}
                                //   tick={'YAxisLeftTick'}
                                />
                                <YAxis
                                    orientation="right"
                                    yAxisId={1}
                                    dataKey={'monthwise_expense'}
                                    type="category"
                                    axisLine={true}
                                    tickLine={true}
                                    tickFormatter={value => value.toLocaleString()}
                                    mirror
                                    tick={{
                                        // transform: `translate(${maxTextWidth + BAR_AXIS_SPACE}, 0)`
                                    }}
                                />
                                <CartesianGrid strokeDasharray='3 3' />
                                <Tooltip />
                                <Bar dataKey={'monthwise_expense'} minPointSize={2} barSize={32}>
                                    {/* <Cell  fill={`#00677F`} /> */}
                                    {props.resIoCcChartData.ioDescriptionwiseExpenses.map((items?: any, index?: any) => {
                                        return <Cell key={index} fill={`#00677F`} />;
                                    })}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                                : <Box>No Data</Box>}

                    </Box>
                </Grid>
            </Grid>


            {getResourcesColumns && getResourcesColumns !== undefined && getResourcesColumns.length > 0 && props.getForexRatesData ?
                <DataGrid
                    autoHeight
                    rowHeight={64}
                    rows={props.getForexRatesData}
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
                       py: 4,
                     },
                   }}
                    paginationMode="server"
                    page={pageNext}
                    rowCount={props.resIODumpData && props.resIODumpData.totalElements?props.resIODumpData.totalElements:0}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 25, 50]}
                    //   checkboxSelection
                    //   disableSelectionOnClick
                    //   disableColumnMenu
                    loading={props.loading}
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
        getForexRatesData: state.FinanceMaster.getIODumpData,
        userInfo: state.auth.profileDetails,
        resIoCcChartData: state.FinanceMaster.resIoCcChartData,
        resIODumpData:state.FinanceMaster.resIODumpData
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        getFinanceIODumpInfo: (getForexRatesId?: any) => dispatch(reqGetFinanceIODump(getForexRatesId)),
        reqFinanceAddIODumpData: (getForexRatesId?: any) => dispatch(reqFinanceAddIODump(getForexRatesId)),
        reqEditFinanceIODumpData: (editForexRatesId?: any) => dispatch(reqEditFinanceIODump(editForexRatesId)),
        reqUploadFinanceIODumpData: (uploadForexRates?: any) => dispatch(reqUploadFinanceIODump(uploadForexRates)),
        reqIoCcChart: (getChartUrl?: any) => dispatch(reqIoCcChart(getChartUrl)),
        reqClearStatus: () => dispatch(reqClearStatus()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IODumpView);
// export default IODumpView;