import { Reducer } from 'redux'
import { AdminState, AdminActionTypes } from 'saga/Types/admin.types'

export const initialState: AdminState = {
    loading: false,
    items: [],
    errors: {},
    resAssignroleData: null,
    resGetUsersWithOutrole: null,
    resGetUserWithRole: null,
    resGetRole: null
}

const reducer: Reducer<AdminState> = (state = initialState, action) => {

    switch (action.type) {
        //get role
        case AdminActionTypes.GET_ROLE_REQUEST:
            {
                return {
                    ...state, loading: true, resGetRole: null
                }
            }

        case AdminActionTypes.GET_ROLE_SUCCESS: {
            const { payload, resGetRole } = action.payload
            return {
                ...state, loading: false, errors: {}, items: payload, resGetRole: resGetRole,
            }
        }

        case AdminActionTypes.GET_ROLE_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [],
                }
            }
//users with out role
        case AdminActionTypes.GET_USERS_WITH_OUTROLE_REQUEST:
            {
                return {
                    ...state, loading: true, resGetUsersWithOutrole: null
                }
            }

        case AdminActionTypes.GET_USERS_WITH_OUTROLE_SUCCESS: {
            const { payload, resGetUsersWithOutrole } = action.payload
            return {
                ...state, loading: false, errors: {}, items: payload, resGetUsersWithOutrole: resGetUsersWithOutrole,
            }
        }

        case AdminActionTypes.GET_USERS_WITH_OUTROLE_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [],
                }
            }
//users with role
        case AdminActionTypes.GET_USERS_WITH_ROLE_REQUEST:
            {
                return {
                    ...state, loading: true, resGetUserWithRole: null
                }
            }

        case AdminActionTypes.GET_USERS_WITH_ROLE_SUCCESS: {
            const { payload, resGetUserWithRole } = action.payload
            return {
                ...state, loading: false, errors: {}, items: payload, resGetUserWithRole: resGetUserWithRole,
            }
        }

        case AdminActionTypes.GET_USERS_WITH_ROLE_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [],
                }
            }
//Assign role
        case AdminActionTypes.GET_ASSIGN_ROLE_REQUEST:
            {
                return {
                    ...state, loading: true, resAssignroleData: null
                }
            }

        case AdminActionTypes.GET_ASSIGN_ROLE_SUCCESS: {
            const { payload, resAssignroleData } = action.payload
            return {
                ...state, loading: false, errors: {}, items: payload, resAssignroleData: resAssignroleData,
            }
        }

        case AdminActionTypes.GET_ASSIGN_ROLE_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [],
                }
            }

            case AdminActionTypes.CLEAR_STATUS_REQUEST: {
                return { ...state, loading: false, resAssignroleData:null };
            }

        default: {
            return state
        }
    }
}

export { reducer as adminRoleReducer }