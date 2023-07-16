import { BizJDMappingTypes } from '../sagas/Types';

/**
 * Biz.Case Requirement Actions
 */

export const initBizJDMappingsAction = () => ({
    type: BizJDMappingTypes.INIT_BIZ_JDMAPPINGS
})

export const getJDOptionsListAction = (data: any) => ({
    type: BizJDMappingTypes.GET_JDLIST_DETAILS_ACTION,
    data
})

export const getJDOptionsListSuccess = (data: any) => ({
    type: BizJDMappingTypes.GET_JDLIST_DETAILS_SUCCESS,
    data
})

export const getJDOptionsListFailure = (error: any) => ({
    type: BizJDMappingTypes.GET_JDLIST_DETAILS_FAILURE,
    error
})

export const getBizProjectAction = (data: any) => ({
    type: BizJDMappingTypes.GET_BIZ_PROJECT_DETAILS,
    data
})

export const getBizProjectSuccess = (data: any) => ({
    type: BizJDMappingTypes.GET_BIZ_PROJECT_SUCCESS,
    data
})

export const getBizProjectFailure = (error: any) => ({
    type: BizJDMappingTypes.GET_BIZ_PROJECT_FAILURE,
    error
})

export const getBizJDMappingAction = (data: any) => ({
    type: BizJDMappingTypes.GET_BIZ_JDMAPPINGS_DETAILS,
    data
})

export const getBizJDMappingSuccess = (data: any) => ({
    type: BizJDMappingTypes.GET_BIZ_JDMAPPINGS_SUCCESS,
    data
})

export const getBizJDMappingFailure = (error: any) => ({
    type: BizJDMappingTypes.GET_BIZ_JDMAPPINGS_FAILURE,
    error
})

export const createBizJDMappingAction = (data: any) => ({
    type: BizJDMappingTypes.CREATE_BIZ_JDMAPPINGS,
    data
})

export const createBizJDMappingSuccess = (data: any) => ({
    type: BizJDMappingTypes.CREATE_BIZ_JDMAPPINGS_SUCCESS,
    data
})

export const createBizJDMappingFailure = (error: any) => ({
    type: BizJDMappingTypes.CREATE_BIZ_JDMAPPINGS_SUCCESS,
    error
})

export const createJDAssignAndJDMappingAction = (data: any) => ({
    type: BizJDMappingTypes.CREATE_JDASSIGN_AND_MAPPINGS,
    data
})

export const createJDAssignAndJDMappingSuccess = (data: any) => ({
    type: BizJDMappingTypes.CREATE_JDASSIGN_AND_MAPPINGS_SUCCESS,
    data
})

export const createJDAssignAndJDMappingFailure = (error: any) => ({
    type: BizJDMappingTypes.CREATE_JDASSIGN_AND_MAPPINGS_FAILURE,
    error
})

export const setJDFileUploadResetAction = (data: any) => ({
    type: BizJDMappingTypes.SET_JDFILE_UPLOAD_RESET,
    data
})

export const setJDFileUploadAction = (data: any) => ({
    type: BizJDMappingTypes.SET_JDFILE_UPLOAD,
    data
})

export const setJDFileUploadSuccess = (data: any) => ({
    type: BizJDMappingTypes.SET_JDFILE_UPLOAD_SUCCESS,
    data
})

export const setJDFileUploadFailure = (error: any) => ({
    type: BizJDMappingTypes.SET_JDFILE_UPLOAD_FAILURE,
    error
})

export const setRemoveJDMapFilesAction = (data: any) => ({
    type: BizJDMappingTypes.SET_REMOVE_JDMAP_FILES,
    data
})

export const setRemoveJDMapFilesSuccess = (data: any) => ({
    type: BizJDMappingTypes.SET_REMOVE_JDMAP_FILES_SUCCESS,
    data
})

export const setRemoveJDMapFilesFailure = (error: any) => ({
    type: BizJDMappingTypes.SET_REMOVE_JDMAP_FILES_FAILURE,
    error
})