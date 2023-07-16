import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, GridActionsCellItem, gridClasses, } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import { getAllProjectOwnerDetailsAction, initProjectOwnershipAction } from 'saga/Actions';
import { useNavigate } from 'react-router-dom';
import { appConstants } from 'shared/constants/AppConst';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

export const ProjectOwnershipGrid = (props?: any) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { projectOwnersGridData, projectOwnersResponseData } = props;
    const [projectOwnershipGridColumns, setProjectOwnershipGridColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [searchText, setSearchText] = React.useState("");
    const [pageNext, setPageNext] = React.useState(0);
    const [SortItem, setSortItem] = React.useState('');

    useEffect(() => {
        getRoleBasedColumns()
        const projectOwnerRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        if (pageSize || pageNext) {
            props.getAllProjectOwnerDetails(projectOwnerRequest)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const generalPageSizing = (showPageNo) => {
        const projectOwnerRequest: any = {
            size: showPageNo,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        props.getAllProjectOwnerDetails(projectOwnerRequest)
        setPageSize(showPageNo)
    }

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const projectOwnerRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: '',
            Searchkeyword: searchValue
        }
        props.getAllProjectOwnerDetails(projectOwnerRequest)
    };

    const handleSortModelChange = (sortField) => {
        let projectOwnerRequest: any = {};
        if (sortField.length) {
            projectOwnerRequest = {
                size: pageSize,
                page: pageNext,
                sort: `${sortField[0].field},${sortField[0].sort}`,
                Searchkeyword: searchText
            }
        } else {
            projectOwnerRequest = {
                size: pageSize,
                page: pageNext,
                sort: '',
                Searchkeyword: searchText
            }
        }
        setSortItem(sortField)
        props.getAllProjectOwnerDetails(projectOwnerRequest)
    }

    const generalPaging = (paging) => {
        const projectOwnerRequest: any = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            Searchkeyword: searchText
        }
        setPageNext(paging)
        props.getAllProjectOwnerDetails(projectOwnerRequest)
    }

    const generalGridChange = (event) => {
    }


    const getRoleBasedColumns = () => {
        const projectOwnerUsersFilterColumns: any = [
            { field: 'hrid', headerName: 'HR ID', headerClassName: appConstants.dataGridAppDataHeader, width: 100, filterable: false, align: "center" },
            {
                field: 'shortid',
                headerName: 'Short ID',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                roleTypes: "common"
            },
            {
                field: 'email',
                headerName: 'Email',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                roleTypes: "common"
            },
            {
                field: 'department',
                headerName: 'Department',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                roleTypes: "common"
            },
            {
                field: 'cost_center',
                headerName: 'Cost Centre',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                roleTypes: "common"
            },
            {
                field: 'action',
                headerName: 'Action',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                type: 'actions',
                roleTypes: 'common',
                getActions: (params) => [
                    <GridActionsCellItem
                        key={`${params.id}_edit`}
                        icon={<EditIcon color={'primary'} />}
                        label='Toggle Edit'
                        onClick={() => {
                            navigate("/settings/update-project-owner", { state: { data: params.row } });
                        }}
                    />,
                ]
            }
        ];
        setProjectOwnershipGridColumns(projectOwnerUsersFilterColumns)
    }

    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
            {((projectOwnershipGridColumns && projectOwnershipGridColumns.length > 0) && projectOwnersResponseData) &&
                <DataGrid
                    autoHeight
                    rowHeight={64}
                    rows={projectOwnersResponseData}
                    columns={projectOwnershipGridColumns}
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
                    rowCount={projectOwnersGridData.totalElements}
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
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.projectSettings.isLoading,
        error: state.projectSettings.errors,
        projectOwnersResponseData: state.projectSettings.projectOwnersGridData,
        projectOwnersGridData: state.projectSettings
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        initProjectOwnership: () => {
            dispatch(initProjectOwnershipAction())
        },
        getAllProjectOwnerDetails: (data: any) => {
            dispatch(getAllProjectOwnerDetailsAction(data))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectOwnershipGrid)