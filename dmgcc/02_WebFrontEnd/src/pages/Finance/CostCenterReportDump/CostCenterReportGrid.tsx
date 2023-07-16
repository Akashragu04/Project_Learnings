import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, GridActionsCellItem, gridClasses, } from "@mui/x-data-grid";
import { Box, Button, Grid, Typography } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CostCenterYTDForm from './CostCenterYTDForm';
import { getAllCostCenterYTDDetailsAction, initFinanceCostCenterYTDAction, reqClearStatus, reqIoCcChart, setCostCenterYTDUploadAction } from 'saga/Actions';
import { ConfigAPI } from "services/config";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CommonFileUpload from '../commonFileUpload';
import { appConstants, RoutePermittedRole } from 'shared/constants/AppConst';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useThemeContext } from '@crema/utility/AppContextProvider/ThemeContextProvider';
import { toast } from 'react-toastify';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

export const CostCenterReportGrid = (props?: any) => {
    const classes = useStyles();
    const { ccYTDResponseData, ccYTDGridData, costCenterYTDUploadResponse } = props;
    const [costCenterReportGridColumns, setCostCenterReportGridColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [searchText, setSearchText] = React.useState("");
    const [pageNext, setPageNext] = React.useState(0);
    const [SortItem, setSortItem] = React.useState('');
    const [openAddForm, setAddForm] = React.useState(false)
    const [costCenterFormAction, setCostCenterReportFormAction] = React.useState('Create')
    const [costCenterResponse, setCostCenterResponse] = React.useState(null)
    const [openUploadFile, setUploadFile] = React.useState(false)

    const { theme } = useThemeContext();

    useEffect(() => {
        getRoleBasedColumns()
        props.reqClearStatus()
        props.reqIoCcChart(ConfigAPI.getCCChartURL)
        const ccYTDGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        if (pageSize || pageNext) {
            props.getAllCostCenterYTDDetails(ccYTDGridRequest)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (costCenterYTDUploadResponse && costCenterYTDUploadResponse.status) {
            toast.success(costCenterYTDUploadResponse.message, { position: 'bottom-right' });
            props.initCostCenterYTD();
            setUploadFile(false)
            refreshGrid();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [costCenterYTDUploadResponse])

    const refreshGrid = () => {
        const ccYTDGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        if (pageSize || pageNext) {
            props.getAllCostCenterYTDDetails(ccYTDGridRequest)
        }
    }

    const onOpenAddForm = (action: any, rowData: any = null) => {
        setAddForm(true);
        setCostCenterReportFormAction(action);
        setCostCenterResponse(rowData)
    }
    const closeOpenAddForm = () => {
        setAddForm(false)
    }

    const onDownloadCostCenterReport = () => {
        window.open(`${process.env.REACT_APP_API_URL}${ConfigAPI.getCostCenterDump}`, '_blank')
    }

    const generalPageSizing = (showPageNo) => {
        const ccYTDGridRequest: any = {
            size: showPageNo,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        props.getAllCostCenterYTDDetails(ccYTDGridRequest)
        setPageSize(showPageNo)
    }

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const ccYTDGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: '',
            Searchkeyword: searchValue
        }
        props.getAllCostCenterYTDDetails(ccYTDGridRequest)
    };

    const handleSortModelChange = (sortField) => {
        let ccYTDGridRequest: any = {};
        if (sortField.length) {
            ccYTDGridRequest = {
                size: pageSize,
                page: pageNext,
                sort: `${sortField[0].field},${sortField[0].sort}`,
                Searchkeyword: searchText
            }
        } else {
            ccYTDGridRequest = {
                size: pageSize,
                page: pageNext,
                sort: '',
                Searchkeyword: searchText
            }
        }
        setSortItem(sortField)
        props.getAllCostCenterYTDDetails(ccYTDGridRequest)
    }

    const generalPaging = (paging) => {
        const ccYTDGridRequest: any = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            Searchkeyword: searchText
        }
        setPageNext(paging)
        props.getAllCostCenterYTDDetails(ccYTDGridRequest)
    }

    const generalGridChange = (event) => {
    }


    const getRoleBasedColumns = () => {
        const costCenterReportFilterColumns: any = [
            // { field: 'id', headerName: 'S.No', headerClassName: appConstants.dataGridAppDataHeader, width: 100, filterable: false, align: "center" },
            {
                field: 'costcenter',
                headerName: 'Cost Centre',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'costelement',
                headerName: 'Cost Name',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'value_obj_crcy',
                headerName: 'Object Currency',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'cost_element_name',
                headerName: 'Cost Element Name',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'document_number',
                headerName: 'Document No',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'document_date',
                headerName: 'Document Date',
                headerClassName: appConstants.dataGridAppDataHeader,
                // flex: 1,
                width: 150,
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
                            key={`${params.id}_view`}
                            icon={
                            <VisibilityIcon color={'primary'} />}
                            label='Toggle Admin'
                            onClick={() => onOpenAddForm('Update', params.row)}
                        />
                    </React.Fragment>
                ]
            }
        ];
        setCostCenterReportGridColumns(costCenterReportFilterColumns)
    }

    const onSubmitFormData = (costCenterDatas?: any) => {
    }

    const onUploadFileCostCentre = () => {
        setUploadFile(true)
    }

    const closeOpenUploadFile = () => {
        setUploadFile(false)
    }

    const onUploadFileSubmit = (uploadData?: any) => {
        props.uploadCostCenterYTD({ data: uploadData })
    }
    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
            {openUploadFile ?
                <CommonFileUpload openUploadFile={openUploadFile} closeOpenUploadFile={closeOpenUploadFile} onUploadFileSubmit={onUploadFileSubmit} />
                : null
            }
            <Grid item xs={12} sx={{ marginTop: 5 }}>
                <Box sx={{ textAlign: "right", marginBottom: 5 }}>
                {RoutePermittedRole.Finance === props.userInfo.roles?
                    <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<ArrowCircleDownIcon />} onClick={onUploadFileCostCentre} className="hideoption">
                        Upload File
                    </Button>
                    :null}
                    <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<CloudDownloadIcon />} onClick={onDownloadCostCenterReport}>
                        Download
                    </Button>
                </Box>

                {
                props.resIoCcChartData ?
                    <Box sx={{ textAlign: 'right', margin: 3, fontWeight: 'bolder', fontSize: 16 }}>
                        Total Expense: {props.resIoCcChartData  ? props.resIoCcChartData.total_expense : 0}
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
                           CC Month Wise Expenses
                        </Typography>
                        {
                            props.resIoCcChartData && props.resIoCcChartData.ccMonthwiseExpenses  ?
                                <ResponsiveContainer width='100%' height={300}>
                                    <BarChart data={props.resIoCcChartData  ? props.resIoCcChartData.ccMonthwiseExpenses : []} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
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
                          CC Description Wise Expenses
                        </Typography>
                        {
                            props.resIoCcChartData && props.resIoCcChartData.ccDescriptionwiseExpenses ?
                            <ResponsiveContainer width={"100%"} height={50 * props.resIoCcChartData.ccDescriptionwiseExpenses.length} debounce={50}>
                            <BarChart
                                data={props.resIoCcChartData ? props.resIoCcChartData.ccDescriptionwiseExpenses : []}
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
                                    {props.resIoCcChartData.ccDescriptionwiseExpenses.map((items?: any, index?: any) => {
                                        return <Cell key={index} fill={`#00677F`} />;
                                    })}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                                : <Box>No Data</Box>}

                    </Box>
                </Grid>
            </Grid>
                {((costCenterReportGridColumns && costCenterReportGridColumns.length > 0) && ccYTDResponseData) &&
                    <DataGrid
                        autoHeight
                        rowHeight={64}
                        rows={ccYTDResponseData}
                        columns={costCenterReportGridColumns}
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
                        rowCount={ccYTDGridData.totalElements}
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
                    <CostCenterYTDForm action={costCenterFormAction} responseData={costCenterResponse} openAddForm={openAddForm} closeOpenAddForm={closeOpenAddForm} onSubmitData={onSubmitFormData} />
                }
            </Grid>

        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.financeCCYTD.isLoading,
        error: state.financeCCYTD.errors,
        ccYTDResponseData: state.financeCCYTD.costCenterYTDGridData,
        ccYTDGridData: state.financeCCYTD,
        costCenterYTDUploadResponse: state.financeCCYTD.costCenterYTDUploadResponse,
        userInfo: state.auth.profileDetails,
        resIoCcChartData: state.FinanceMaster.resIoCcChartData
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        initCostCenterYTD: () => {
            dispatch(initFinanceCostCenterYTDAction())
        },
        getAllCostCenterYTDDetails: (data: any) => {
            dispatch(getAllCostCenterYTDDetailsAction(data))
        },
        uploadCostCenterYTD: (data: any) => {
            dispatch(setCostCenterYTDUploadAction(data))
        },
        reqIoCcChart: (getChartUrl?: any) => dispatch(reqIoCcChart(getChartUrl)),
        reqClearStatus: () => dispatch(reqClearStatus()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CostCenterReportGrid)  