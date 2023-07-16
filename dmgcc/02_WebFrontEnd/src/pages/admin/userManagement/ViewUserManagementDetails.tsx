import React from 'react';
import QuickSearchToolbar from '@crema/commonservices/SearchFieldsCommon';
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import { Box, Button } from '@mui/material';
import { AddCircle } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import AddUserManagement from './AddUserManagement';
import { EditUserManagement } from './EditUserManagement';
import { connect } from "react-redux";
import { reqAssignRole, reqClearStatus, reqRolee, reqUsersWithOutRole, reqUsersWithRole } from 'saga/Actions/admin.action';

const ViewUserManagementDetails = (props?: any) => {
    const [getResourcesColumns, setResourcesColumns] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageNext, setPageNext] = React.useState(0);
    const [searchText, setSearchText] = React.useState("");
    const [SortItem, setSortItem] = React.useState('');
    const [UserMng, setUserMng] = React.useState(false);
    const [editUserMng, setEditUserMng] = React.useState(false);
    const [userMngInfo, setUserMngInfo] = React.useState('');
    const { loading, postResUserDetails } = props;

    const getUserInfo = () => {
        let postValues: any;
        postValues = {
            size: pageSize,
            page: pageNext,
            sort: SortItem,
            searchKeyword: searchText
        }

        props.reqUsersWithRole(postValues)
    }
    const generalPageSizing = (showPageNo) => {
        let postValues: any;
        postValues = {
            size: showPageNo,
            page: pageNext,
            sort: SortItem,
            searchKeyword: searchText
        }
        setPageSize(showPageNo)
        props.getUserDetailsDetails(postValues)
    }

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        let postValues: any;
        postValues = {
            size: pageSize,
            page: pageNext,
            sort: '',
            searchKeyword: searchValue
        }
        setSearchText(searchValue);
        props.getUserDetailsDetails(postValues)
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
        props.getUserDetailsDetails(postValues)
    }

    const generalPaging = (paging) => {
        let postValues: any;
        postValues = {
            size: pageSize,
            page: paging,
            sort: SortItem,
            searchKeyword: searchText
        }
        setPageNext(paging)
        props.getUserDetailsDetails(postValues)
    }

    const generalGridChange = (event) => {
    }


    React.useEffect(() => {
       props.reqRolee()
       props.reqUsersWithOutRole()
       getUserInfo()
       getUserManagement()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    React.useEffect(() => {
        if (props.resAssignroleData) {
            if (props.resAssignroleData.status === true) {
                setUserMng(false)
                setEditUserMng(false)
                getUserInfo()
                props.reqClearStatus();
                props.reqRolee()
                props.reqUsersWithOutRole()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.resAssignroleData])
    const onEditUserManager = (getValues?: any) => {
        setEditUserMng(true)
        setUserMngInfo(getValues)
    }

    const closeOpenEditForm = () => {
        setEditUserMng(false)
    }

    const onSubmitEditUserManagement = (getValues?: any) => {
        props.reqAssignRole(getValues)
    }
    const getUserManagement = () => {
        let leadFilterColumns: any = [
            // { field: 'id', headerName: 'S.No.', headerClassName: 'app-data-grid--header', width: 90, filterable: false, align: "left" },  
            {
                field: 'shortid',
                headerName: 'Short Id',
                headerClassName: 'app-data-grid--header',
                width: 150,
                roleTypes: "common"
            },
            {
                field: 'email',
                headerName: 'Email',
                headerClassName: 'app-data-grid--header',
                width: 250,
                roleTypes: "common"
            },
            {
                field: 'department',
                headerName: 'Department',
                headerClassName: 'app-data-grid--header',
                width: 250,
                roleTypes: "common"
            },
            {
                field: 'rolename',
                headerName: 'Role Name',
                headerClassName: 'app-data-grid--header',
                width: 250,
                roleTypes: "common"
            },
            {
                field: 'action',
                headerName: 'Action',
                headerClassName: 'app-data-grid--header',
                type: 'actions',
                width: 100,
                getActions: (params) => [
                    <React.Fragment>
                        <GridActionsCellItem
                            key={`${params.id}_edit`}
                            icon={<EditIcon color={'primary'} />}
                            label='Toggle Admin'
                            onClick={() => onEditUserManager(params.row)}
                        />
                    </React.Fragment>
                ]
            }
        ];
        setResourcesColumns(leadFilterColumns)
    }
    const onOpenUserManagementForm = () => {
        setUserMng(true)
    }

    const closeOpenAddForm = () => {
        setUserMng(false)
    }

    const onSubmitUserManagement = (getValues?: any) => {
        props.reqAssignRole(getValues)
    }
    return (
        <Box>
            <Box sx={{ textAlign: "right", marginBottom: 5 }}>
                <Button variant="outlined" sx={{ marginRight: 2 }} startIcon={<AddCircle />} onClick={onOpenUserManagementForm}>
                    Map Role
                </Button>
            </Box>
            {
                UserMng ?
                    <AddUserManagement openAddForm={UserMng} closeOpenAddForm={closeOpenAddForm}
                        onSubmitUserManagement={onSubmitUserManagement} getNonUserList={props.resGetUsersWithOutrole} 
                        getUserRoleData={props.resGetRole} />
                    : null
            }
            {
                editUserMng ?
                    <EditUserManagement openEditForm={editUserMng} closeOpenEditForm={closeOpenEditForm}
                        onSubmitEditUserManagement={onSubmitEditUserManagement} userMngInfo={userMngInfo} getNonUserList={props.getNonUserList} 
                        getUserRoleData={props.resGetRole} getUserGridDetails={props.resGetUserWithRole?props.resGetUserWithRole.content:[]} />
                    : null
            }

            {getResourcesColumns && getResourcesColumns.length > 0 && props.resGetUserWithRole ?
                <DataGrid
                    autoHeight
                    rowHeight={64}
                    rows={props.resGetUserWithRole.content}
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
                    rowCount={props.resGetUserWithRole.totalElements}
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
        </Box>
    )
}



const mapStateToProps = (state: any) => {
    return {
        loading: state.adminRoleReducer.loading,
        resGetUserWithRole:state.adminRoleReducer.resGetUserWithRole,
        resGetRole:state.adminRoleReducer.resGetRole,
        resGetUsersWithOutrole:state.adminRoleReducer.resGetUsersWithOutrole,
        resAssignroleData:state.adminRoleReducer.resAssignroleData
        // getUserDetail: state.adminReducer.getUserDetail,
        // postResUserDetails: state.adminReducer.postResUserDetails,
        // getNonUserList: state.adminReducer.getNonUserList,
        // getUserRoleData: state.adminReducer.getUserRoleData
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
        reqAssignRole: (reqtUser?: any) => dispatch(reqAssignRole(reqtUser)),
        reqUsersWithOutRole: () => dispatch(reqUsersWithOutRole()),
        reqUsersWithRole: (reqtUser?: any) => dispatch(reqUsersWithRole(reqtUser)),
        reqRolee: () => dispatch(reqRolee()),
        reqClearStatus: () => dispatch(reqClearStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserManagementDetails);
// export default ViewUserManagementDetails;