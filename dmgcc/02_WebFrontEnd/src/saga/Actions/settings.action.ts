import { SettingsModuleTypes } from '../sagas/Types';

/**
 * Settings Management Actions
 */

export const initRoleManagementAction = () => ({
    type: SettingsModuleTypes.INIT_ROLEMANAGEMENT_ACTIONS
})

export const initProjectOwnershipAction = () => ({
    type: SettingsModuleTypes.INIT_PROJECTOWNERSHIP_ACTIONS
})

export const getAllRoleBasedUsersDetailsAction = (data: any) => ({
    type: SettingsModuleTypes.GET_ALL_ROLEBASED_USERS_DETAILS,
    data
})

export const getAllRoleBasedUsersDetailsSuccess = (data: any) => ({
    type: SettingsModuleTypes.GET_ALL_ROLEBASED_USERS_SUCCESS,
    data
})

export const getAllRoleBasedUsersDetailsFailure = (error: any) => ({
    type: SettingsModuleTypes.GET_ALL_ROLEBASED_USERS_FAILURE,
    error
})

export const getUnmappedUsersListAction = (data: any) => ({
    type: SettingsModuleTypes.GET_UNMAPPED_USERS_DETAILS,
    data
})

export const getUnmappedUsersListSuccess = (data: any) => ({
    type: SettingsModuleTypes.GET_UNMAPPED_USERS_DETAILS_SUCCESS,
    data
})

export const getUnmappedUsersListFailure = (error: any) => ({
    type: SettingsModuleTypes.GET_UNMAPPED_USERS_DETAILS_FAILURE,
    error
})

export const createAssignRoleAction = (data: any) => ({
    type: SettingsModuleTypes.CREATE_ASSIGN_ROLE_REQUEST,
    data
})

export const createAssignRoleSuccess = (data: any) => ({
    type: SettingsModuleTypes.CREATE_ASSIGN_ROLE_REQUEST_SUCCESS,
    data
})

export const createAssignRoleFailure = (error: any) => ({
    type: SettingsModuleTypes.CREATE_ASSIGN_ROLE_REQUEST_FAILURE,
    error
})

export const getAllUserRolesListAction = (data: any) => ({
    type: SettingsModuleTypes.GET_ALL_USERROLES_LIST_REQUEST,
    data
})

export const getAllUserRolesListSuccess = (data: any) => ({
    type: SettingsModuleTypes.GET_ALL_USERROLES_LIST_REQUEST_SUCCESS,
    data
})

export const getAllUserRolesListFailure = (error: any) => ({
    type: SettingsModuleTypes.GET_ALL_USERROLES_LIST_REQUEST_FAILURE,
    error
})

/** Project Owner Module */

export const getAllProjectOwnerDetailsAction = (data: any) => ({
    type: SettingsModuleTypes.GET_ALL_PROJECTOWNER_USERS_DETAILS,
    data
})

export const getAllProjectOwnerDetailsSuccess = (data: any) => ({
    type: SettingsModuleTypes.GET_ALL_PROJECTOWNER_USERS_SUCCESS,
    data
})

export const getAllProjectOwnerDetailsFailure = (error: any) => ({
    type: SettingsModuleTypes.GET_ALL_PROJECTOWNER_USERS_FAILURE,
    error
})

export const updateProjectOwnerDetailAction = (data: any) => ({
    type: SettingsModuleTypes.UPDATE_PROJECT_OWNER_REQUEST,
    data
})

export const updateProjectOwnerDetailSuccess = (data: any) => ({
    type: SettingsModuleTypes.UPDATE_PROJECT_OWNER_SUCCESS,
    data
})

export const updateProjectOwnerDetailFailure = (error: any) => ({
    type: SettingsModuleTypes.UPDATE_PROJECT_OWNER_FAILURE,
    error
})

export const getBusinessRoleUserListAction = (data: any) => ({
    type: SettingsModuleTypes.GET_BUSINESS_USERS_LIST_REQUEST,
    data
})

export const getBusinessRoleUserListSuccess = (data: any) => ({
    type: SettingsModuleTypes.GET_BUSINESS_USERS_LIST_SUCCESS,
    data
})

export const getBusinessRoleUserListFailure = (error: any) => ({
    type: SettingsModuleTypes.GET_BUSINESS_USERS_LIST_FAILURE,
    error
})