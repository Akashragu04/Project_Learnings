import { Reducer } from 'redux'
import { BusinessSetupActionTypes, BusinessSetupState } from '../Types/BusinessSetup.Types'


// Type-safe initialState!
export const initialState: BusinessSetupState = {
    items: [],
    loading: false,
    errors: {},
    getBizCaseData: null
}

const reducer: Reducer<BusinessSetupState> = (state = initialState, action) => {
    switch (action.type) {
        case BusinessSetupActionTypes.GET_BUSINESS_SETUP_REQUEST: {
            return { ...state, loading: true, getBizCaseData: null, errors: {} }
        }
        case BusinessSetupActionTypes.POST_SLA_REQUEST:
        case BusinessSetupActionTypes.PUT_SLA_REQUEST:
            {
                return { ...state, loading: true }
            }
        case BusinessSetupActionTypes.GET_BUSINESS_SETUP_SUCCESS:
            {
                const { payload, getBizData } = action.payload;
                return { ...state, loading: false, items: payload, getBizCaseData: getBizData }
            }
        case BusinessSetupActionTypes.POST_SLA_SUCCESS:
        case BusinessSetupActionTypes.PUT_SLA_SUCCESS:
            {
                const { payload } = action.payload;
                return { ...state, loading: false, items: payload }
            }
        case BusinessSetupActionTypes.GET_BUSINESS_SETUP_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    items: [],
                    getBizCaseData: null
                }
            }

        case BusinessSetupActionTypes.POST_SLA_ERROR:
        case BusinessSetupActionTypes.PUT_SLA_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    items: []
                }
            }
        default: {
            return state
        }
    }

}



export { reducer as BizCaseSetup }