import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DataGrid, GridActionsCellItem, gridClasses, } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import { getAllRoleBasedUsersDetailsAction, initRoleManagementAction } from 'saga/Actions';
import { useNavigate } from 'react-router-dom';
import { appConstants } from 'shared/constants/AppConst';

const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

export const RoleManagementGrid = (props?: any) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { roleBasedGridData, roleBasedUsersResponseData } = props;
    const [roleBasedUsersGridColumns, setRoleBasedUsersGridColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [searchText, setSearchText] = React.useState("");
    const [pageNext, setPageNext] = React.useState(0);
    const [SortItem, setSortItem] = React.useState('');

    useEffect(() => {
        getRoleBasedColumns()
        const slaGridRequest: any = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            Searchkeyword: searchText
        }
        if (pageSize || pageNext) {
            props.getAllRoleBasedUsersDetails(slaGridRequest)
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
        props.getAllRoleBasedUsersDetails(slaGridRequest)
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
        props.getAllRoleBasedUsersDetails(postValues)
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
        props.getAllRoleBasedUsersDetails(slaGridRequest)
    }

    const generalPaging = (paging) => {
        const slaGridRequest: any = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            Searchkeyword: searchText
        }
        setPageNext(paging)
        props.getAllRoleBasedUsersDetails(slaGridRequest)
    }

    const generalGridChange = (event) => {
    }


    const getRoleBasedColumns = () => {
        const roleBasedUsersFilterColumns: any = [
            { field: 'hrid', headerName: 'HR ID', headerClassName: appConstants.dataGridAppDataHeader, width: 100, filterable: false, align: "center" },
            {
                field: 'shortid',
                headerName: 'Short ID',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                // width: 250,
                roleTypes: "common"
            },
            // {
            //     field: 'username',
            //     headerName: 'Username',
            //     headerClassName: appConstants.dataGridAppDataHeader,
            //     flex: 1,
            //     // width: 250,
            //     roleTypes: "common"
            // },
            {
                field: 'email',
                headerName: 'Email',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                // width: 250,
                roleTypes: "common"
            },
            {
                field: 'department',
                headerName: 'Department',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                // width: 250,
                roleTypes: "common"
            },
            {
                field: 'rolename',
                headerName: 'Role Name',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                // width: 250,
                roleTypes: "common"
            },
            // {
            //     field: 'status',
            //     headerName: 'Status',
            //     headerClassName: appConstants.dataGridAppDataHeader,
            //     flex: 1,
            //     // width: 200,
            //     sortable: false,
            //     roleTypes: RoutePermittedRole.Business,
            //     renderCell: (params) => {
            //         let statusIcon: any = <AutorenewIcon />;
            //         let statusColor: any = 'primary';
            //         if (params.row.status === 'Open') {
            //             statusIcon = <AutorenewIcon />;
            //             statusColor = 'warning';
            //         } else if (params.row.status === 'In Progress') {
            //             statusIcon = <AutorenewIcon />;
            //             statusColor = 'info';
            //         } else if (params.row.status === 'Approved') {
            //             statusIcon = <CheckIcon />;
            //             statusColor = 'success';
            //         } else {
            //             statusIcon = <AutorenewIcon />;
            //             statusColor = 'primary';
            //         }
            //         return <Stack direction='column' spacing={1}>
            //             <Chip icon={statusIcon} color={statusColor} label={params.row.status} variant='outlined' size='small' />
            //         </Stack>;
            //     }
            // },
            {
                field: 'action',
                headerName: 'Action',
                headerClassName: appConstants.dataGridAppDataHeader,
                flex: 1,
                // width: userDetails.roles === RoutePermittedRole.Business || userDetails.roles === RoutePermittedRole.Admin ? 450 : 200,
                type: 'actions',
                roleTypes: 'common',
                getActions: (params) => [
                    <GridActionsCellItem
                        key={`${params.id}_edit`}
                        icon={<EditIcon color={'primary'} />}
                        label='Toggle Edit'
                        onClick={() => {
                            navigate("/settings/createRoles", { state: { action: 'update', data: params.row } });
                        }}
                    />,
                ]
            }
        ];
        setRoleBasedUsersGridColumns(roleBasedUsersFilterColumns)
    }

    return (
        <Box sx={{ height: 'auto', width: 1, marginTop: 4 }} className={classes.root}>
            {((roleBasedUsersGridColumns && roleBasedUsersGridColumns.length > 0) && roleBasedUsersResponseData) &&
                <DataGrid
                    autoHeight
                    rowHeight={64}
                    rows={roleBasedUsersResponseData}
                    columns={roleBasedUsersGridColumns}
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
                    rowCount={roleBasedGridData.totalElements}
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
        isLoading: state.settingsProcess.isLoading,
        error: state.settingsProcess.errors,
        roleBasedUsersResponseData: state.settingsProcess.roleBasedUsersGridData,
        roleBasedGridData: state.settingsProcess
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        initRoleBasedUsers: () => {
            dispatch(initRoleManagementAction())
        },
        getAllRoleBasedUsersDetails: (data: any) => {
            dispatch(getAllRoleBasedUsersDetailsAction(data))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoleManagementGrid)