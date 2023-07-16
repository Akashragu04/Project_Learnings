import { ActionTypes } from "saga/sagas/Types";
import {
  CommonActionTypes,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  TOGGLE_APP_DRAWER,
} from "../../types/actions/Common.action";

export const fetchStart = (): CommonActionTypes => ({ type: FETCH_START });

export const fetchSuccess = (): CommonActionTypes => ({ type: FETCH_SUCCESS });

export const fetchError = (error: string): CommonActionTypes => ({
  type: FETCH_ERROR,
  error,
});

export const showMessage = (message: string): CommonActionTypes => ({
  type: SHOW_MESSAGE,
  message,
});

export const onToggleAppDrawer = (): CommonActionTypes => ({
  type: TOGGLE_APP_DRAWER,
});

export const hideMessage = (): CommonActionTypes => ({ type: HIDE_MESSAGE });


export const setCommonUploadResetAction = (data: any) => ({
  type: ActionTypes.SET_COMMON_FILEUPLOAD_RESET,
  data
})

export const setCommonFileUploadAction = (data: any) => ({
  type: ActionTypes.SET_COMMON_FILEUPLOAD_REQUEST,
  data
})

export const setCommonFileUploadSuccess = (data: any) => ({
  type: ActionTypes.SET_COMMON_FILEUPLOAD_SUCCESS,
  data
})

export const setCommonFileUploadFailure = (error: any) => ({
  type: ActionTypes.SET_COMMON_FILEUPLOAD_FAILURE,
  error
})

