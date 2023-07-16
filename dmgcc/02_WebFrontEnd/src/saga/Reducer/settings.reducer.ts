import { SettingsModuleTypes } from '../sagas/Types';

// Type-safe initialState!
const defaultObj: any = {}
export const initialState: any = {
    items: [],
    loading: false,
    isLoading: false,
    errors: {},
    roleBasedUsersResponse: [],
    roleBasedUsersGridData: [],
    usersList: [],
    usersRolesList: [],
    totalElements: 0,
    totalPages: 10,
    pageSize: 10,
    response: {},
    projectResponse: {},
    projectOwnersResponse: [],
    projectOwnersGridData: [],
    businessUserList: [],
}

export const settingsModule: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case SettingsModuleTypes.INIT_ROLEMANAGEMENT_ACTIONS:
            return {
                ...state, loading: false, isLoading: false, items: [],
                response: defaultObj, usersList: [], usersRolesList: []
            }
        case SettingsModuleTypes.CREATE_ASSIGN_ROLE_REQUEST:
            return { ...state, loading: true, response: defaultObj }
        case SettingsModuleTypes.CREATE_ASSIGN_ROLE_REQUEST_SUCCESS:
            return { ...state, loading: false, response: response }
        case SettingsModuleTypes.CREATE_ASSIGN_ROLE_REQUEST_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case SettingsModuleTypes.GET_UNMAPPED_USERS_DETAILS:
            return { ...state, loading: true, usersList: [] }
        case SettingsModuleTypes.GET_UNMAPPED_USERS_DETAILS_SUCCESS:
            return { ...state, loading: false, usersList: response.data }
        case SettingsModuleTypes.GET_UNMAPPED_USERS_DETAILS_FAILURE:
            return { ...state, loading: false, usersList: [], errors: action.error }
        case SettingsModuleTypes.GET_ALL_USERROLES_LIST_REQUEST:
            return { ...state, loading: true, usersRolesList: [] }
        case SettingsModuleTypes.GET_ALL_USERROLES_LIST_REQUEST_SUCCESS:
            return { ...state, loading: false, usersRolesList: response.data }
        case SettingsModuleTypes.GET_ALL_USERROLES_LIST_REQUEST_FAILURE:
            return { ...state, loading: false, usersRolesList: [], errors: action.error }
        case SettingsModuleTypes.GET_ALL_ROLEBASED_USERS_DETAILS:
            return { ...state, isLoading: true, items: [] }
        case SettingsModuleTypes.GET_ALL_ROLEBASED_USERS_SUCCESS:
            {
                const { payload, responseData, tableData } = action.data;
                return {
                    ...state, loading: false,
                    items: payload,
                    isLoading: false,
                    roleBasedUsersResponse: responseData,
                    roleBasedUsersGridData: tableData,
                    totalElements: responseData.totalElements,
                    totalPages: responseData.totalPages,
                    pageSize: responseData.size,
                }
            }
        case SettingsModuleTypes.GET_ALL_ROLEBASED_USERS_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        default: {
            return state
        }
    }
}

export const projectOwnerSettings: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case SettingsModuleTypes.INIT_PROJECTOWNERSHIP_ACTIONS:
            return {
                ...state, loading: false, isLoading: false, items: [],
                projectResponse: defaultObj, businessUserList: []
            }
        case SettingsModuleTypes.UPDATE_PROJECT_OWNER_REQUEST:
            return { ...state, loading: true, projectResponse: defaultObj }
        case SettingsModuleTypes.UPDATE_PROJECT_OWNER_SUCCESS:
            return { ...state, loading: false, projectResponse: response }
        case SettingsModuleTypes.UPDATE_PROJECT_OWNER_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case SettingsModuleTypes.GET_BUSINESS_USERS_LIST_REQUEST:
            return { ...state, loading: true, businessUserList: [] }
        case SettingsModuleTypes.GET_BUSINESS_USERS_LIST_SUCCESS:
            return { ...state, loading: false, businessUserList: response.data }
        case SettingsModuleTypes.GET_BUSINESS_USERS_LIST_FAILURE:
            return { ...state, loading: false, businessUserList: [], errors: action.error }
        case SettingsModuleTypes.GET_ALL_PROJECTOWNER_USERS_DETAILS:
            return { ...state, isLoading: true, items: [] }
        case SettingsModuleTypes.GET_ALL_PROJECTOWNER_USERS_SUCCESS:
            {
                const { payload, responseData, tableData } = action.data;
                return {
                    ...state, loading: false,
                    items: payload,
                    isLoading: false,
                    projectOwnersResponse: responseData,
                    projectOwnersGridData: tableData,
                    totalElements: responseData.totalElements,
                    totalPages: responseData.totalPages,
                    pageSize: responseData.size,
                }
            }
        case SettingsModuleTypes.GET_ALL_PROJECTOWNER_USERS_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        default: {
            return state
        }
    }
}