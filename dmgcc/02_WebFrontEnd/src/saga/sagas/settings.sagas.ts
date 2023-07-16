import { takeEvery, call, put } from "redux-saga/effects";
import { SettingsModuleTypes } from "./Types";
import { createAssignRoleFailure, createAssignRoleSuccess, getAllProjectOwnerDetailsFailure, getAllProjectOwnerDetailsSuccess, getAllRoleBasedUsersDetailsFailure,
   getAllRoleBasedUsersDetailsSuccess, getAllUserRolesListFailure, getAllUserRolesListSuccess, getBusinessRoleUserListFailure, getBusinessRoleUserListSuccess,
    getErrorTokenResponseSuccess,
    getUnmappedUsersListFailure, getUnmappedUsersListSuccess, updateProjectOwnerDetailFailure, updateProjectOwnerDetailSuccess } from "saga/Actions";
import { ConfigAPI } from "services/config";
import { baseAPI } from "services/Service";
import { toast } from 'react-toastify';
import { appConstants } from "shared/constants/AppConst";


export const watchGetAllRoleBasedUsersDetails = function* () {
  yield takeEvery(SettingsModuleTypes.GET_ALL_ROLEBASED_USERS_DETAILS, workerGetAllRoleBasedUsersDetails)
}

export const watchGetUserRolesList = function* () {
  yield takeEvery(SettingsModuleTypes.GET_UNMAPPED_USERS_DETAILS, workerGetUserRolesList)
}

export const watchGetUnmappedUsersList = function* () {
  yield takeEvery(SettingsModuleTypes.GET_ALL_USERROLES_LIST_REQUEST, workerGetUnmappedUsersList)
}

export const watchCreateUserRoleMapping = function* () {
  yield takeEvery(SettingsModuleTypes.CREATE_ASSIGN_ROLE_REQUEST, workerCreateUserRoleMapping)
}

export const watchGetAllProjectOnwerDetails = function* () {
  yield takeEvery(SettingsModuleTypes.GET_ALL_PROJECTOWNER_USERS_DETAILS, workerGetAllProjectOnwerDetails)
}

export const watchGetBusinessRolesList = function* () {
  yield takeEvery(SettingsModuleTypes.GET_BUSINESS_USERS_LIST_REQUEST, workerGetBusinessRolesList)
}

export const watchUpdateProjectOwner = function* () {
  yield takeEvery(SettingsModuleTypes.UPDATE_PROJECT_OWNER_REQUEST, workerUpdateProjectOwner)
}

function* workerGetAllRoleBasedUsersDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getAllRoleMappedUsers;
    const { data } = yield call(baseAPI.get, `${uri}?size=${request.size}&page=${request.page}&sort=${request.sort}&Searchkeyword=${request.Searchkeyword}`);
    if (data.status) {
      yield put(getAllRoleBasedUsersDetailsSuccess({
        payload: data,
        responseData: data.data,
        tableData: data.data.content
      }))
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warn(data.message, { position: 'bottom-right' });
      yield put(getAllRoleBasedUsersDetailsFailure(data))
    }
  } catch (error: any) {
    yield put(getAllRoleBasedUsersDetailsFailure(error))
  }
}

function* workerGetAllProjectOnwerDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getAllProjectOwnerDetails;
    const { data } = yield call(baseAPI.get, `${uri}?size=${request.size}&page=${request.page}&sort=${request.sort}&Searchkeyword=${request.Searchkeyword}`);
    if (data.status) {
      yield put(getAllProjectOwnerDetailsSuccess({
        payload: data,
        responseData: data.data,
        tableData: data.data.content
      }))
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warn(data.message, { position: 'bottom-right' });
      yield put(getAllProjectOwnerDetailsFailure(data))
    }
  } catch (error: any) {
    yield put(getAllProjectOwnerDetailsFailure(error))
  }
}

function* workerGetUnmappedUsersList(action: any) {
  try {
    const uri = ConfigAPI.getUsersWoRole;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status) {
      yield put(getUnmappedUsersListSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getUnmappedUsersListFailure(response.data))
    }
  } catch (error: any) {
    yield put(getUnmappedUsersListFailure(error))
  }
}

function* workerGetUserRolesList(action: any) {
  try {
    const uri = ConfigAPI.getAllRolesList;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status) {
      yield put(getAllUserRolesListSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getAllUserRolesListFailure(response.data))
    }
  } catch (error: any) {
    yield put(getAllUserRolesListFailure(error))
  }
}

function* workerGetBusinessRolesList(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getBusinessUsersList;
    const response = yield call(baseAPI.get, `${uri}${request.user_id}`);
    if (response.data.status) {
      yield put(getBusinessRoleUserListSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getBusinessRoleUserListFailure(response.data))
    }
  } catch (error: any) {
    yield put(getBusinessRoleUserListFailure(error))
  }
}

function* workerCreateUserRoleMapping(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.createUserRoleMapping;
    const response = yield call(baseAPI.put, `${uri}`, request.data);
    if (response.data.status) {
      yield put(createAssignRoleSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(createAssignRoleFailure(response.data))
    }
  } catch (error: any) {
    yield put(createAssignRoleFailure(error))
  }
}

function* workerUpdateProjectOwner(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getProjectOwnerDetail;
    const response = yield call(baseAPI.get, `${uri}${request.ex_userid}/${request.user_id}`);
    if (response.data.status) {
      yield put(updateProjectOwnerDetailSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(updateProjectOwnerDetailFailure(response.data))
    }
  } catch (error: any) {
    yield put(updateProjectOwnerDetailFailure(error))
  }
}
