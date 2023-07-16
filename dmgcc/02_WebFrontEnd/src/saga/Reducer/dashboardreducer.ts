import { Reducer } from 'redux';
import {AdminState, AdminActionTypes} from '../Types/admin.types';

// Type-safe initialState!
export const initialState: AdminState = {
    loading: false,
    items: [],
    errors:null,
    getResponseDashboard:null,
    getResponseBusinessCaseDashboard:null
}


const reducer: Reducer<AdminState> = (state = initialState, action) => {

    switch (action.type) {
      case AdminActionTypes.GET_DASHBOARD_DETAILS_REQUEST:
        {
            return {
              ...state,
              loading: true,
              isLoading:true,
              errors:null,
              getResponseDashboard:null
            }
          }
          case AdminActionTypes.GET_DASHBOARD_DETAILS_SUCCESS:
            {
                const { payload, getResponseDashboard } = action.payload;
                return {
                    ...state, loading: false,
                    items: payload,
                    isLoading: false,
                    getResponseDashboard:getResponseDashboard
                }
            }

            case AdminActionTypes.GET_DASHBOARD_DETAILS_ERROR:
              {
                  const { payload } = action;
                  return {
                      ...state,
                      loading: false,
                      errors: payload,
                      items: [],
                      getResponseDashboard:null
                  }
              }

              case AdminActionTypes.GET_BUSINESS_CASE_SETUP_DASHBOARD_REQUEST:
                {
                    return {
                      ...state,
                      loading: true,
                      isLoading:true,
                      errors:null,
                      getResponseBusinessCaseDashboard:null
                    }
                  }
                  case AdminActionTypes.GET_BUSINESS_CASE_SETUP_DASHBOARD_SUCCESS:
                    {
                        const { payload, getResponseBusinessCaseDashboard } = action.payload;
                        return {
                            ...state, loading: false,
                            items: payload,
                            isLoading: false,
                            getResponseBusinessCaseDashboard:getResponseBusinessCaseDashboard
                        }
                    }
        
                    case AdminActionTypes.GET_BUSINESS_CASE_SETUP_DASHBOARD_ERROR:
                      {
                          const { payload } = action;
                          return {
                              ...state,
                              loading: false,
                              errors: payload,
                              items: [],
                              getResponseBusinessCaseDashboard:null
                          }
                      }
                      case AdminActionTypes.CLEAR_STATUS_DSHBOARD_REQUEST:
        {
            return {
              ...state,
              loading: true,
              isLoading:true,
              getResponseDashboard:null,
              getResponseBusinessCaseDashboard:null,
              errors:null,
              items: []
            }
          }
          default: {
            return state
          }
        }
      }

      export { reducer as dashboardDetailsReducer }