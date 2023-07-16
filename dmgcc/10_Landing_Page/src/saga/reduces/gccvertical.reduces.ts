import { Reducer } from 'redux'
import { GccVerticalState, GccVerticalTypes } from '../Types/gccvertical.types'

export const initialState: GccVerticalState = {
    loading: false,
    items: [],
    errors: {},
    resCapabilitiesData: null,
    resSupplierManagementData: null,
    resLeanProcessData: null,
    resQualityManagementData: null,
    resHumanResourcesData: null,
    resCostEngineering: null,
    resFinanceControlling: null,
    resInformationTechnology: null,
    resCustomerServicesData: null,
    resProductEngineeringData: null,
    resManufacturingEngineerData: null,
    resManufacturingEngineerSubCntData: null,
    resManufacturingMainCnt: null,
    resManufacturingSubCnt: null
}

const reducer: Reducer<GccVerticalState> = (state = initialState, action) => {

    switch (action.type) {

        //capabilities
        case GccVerticalTypes.GET_CAPABILITIES_REQUEST:
            {
                return {
                    ...state, loading: true, resCapabilitiesData: null
                }
            }

        case GccVerticalTypes.GET_CAPABILITIES_SUCCESS:
            {
                const { payload, resCapabilitiesData } = action.payload
                return {
                    ...state, items: payload, loading: false, resCapabilitiesData: resCapabilitiesData,
                };
            }

        case GccVerticalTypes.GET_CAPABILITIES_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resCapabilitiesData: null,
                }
            }

        //cost engineering
        case GccVerticalTypes.GET_COST_ENGINEERING_REQUEST:
            {
                return {
                    ...state, loading: true, resCostEngineering: null
                }
            }

        case GccVerticalTypes.GET_COST_ENGINEERING_SUCCESS:
            {
                const { payload, resCostEngineering } = action.payload
                return {
                    ...state, items: payload, loading: false, resCostEngineering: resCostEngineering,
                };
            }

        case GccVerticalTypes.GET_COST_ENGINEERING_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resCostEngineering: null,
                }
            }

        case GccVerticalTypes.GET_COST_ENGINEERING_SUB_CONTENT_REQUEST:
            {
                return {
                    ...state, loading: true, resSubCntCostEngineering: null
                }
            }

        case GccVerticalTypes.GET_COST_ENGINEERING_SUB_CONTENT_SUCCESS:
            {
                const { payload, resSubCntCostEngineering } = action.payload
                return {
                    ...state, items: payload, loading: false, resSubCntCostEngineering: resSubCntCostEngineering,
                };
            }

        case GccVerticalTypes.GET_COST_ENGINEERING_SUB_CONTENT_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resSubCntCostEngineering: null,
                }
            }

        //Customer Services
        case GccVerticalTypes.GET_CUSTOMER_SERVICES_REQUEST:
            {
                return {
                    ...state, loading: true, resCustomerServicesData: null
                }
            }

        case GccVerticalTypes.GET_CUSTOMER_SERVICES_SUCCESS:
            {
                const { payload, resCustomerServicesData } = action.payload
                return {
                    ...state, items: payload, loading: false, resCustomerServicesData: resCustomerServicesData,
                };
            }

        case GccVerticalTypes.GET_CUSTOMER_SERVICES_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resCustomerServicesData: null,
                }
            }

        case GccVerticalTypes.GET_CUSTOMER_SERVICES_SUB_CONTENT_REQUEST:
            {
                return {
                    ...state, loading: true, resSubContentCustomerServicesData: null
                }
            }

        case GccVerticalTypes.GET_CUSTOMER_SERVICES_SUB_CONTENT_SUCCESS:
            {
                const { payload, resSubContentCustomerServicesData } = action.payload
                return {
                    ...state, items: payload, loading: false, resSubContentCustomerServicesData: resSubContentCustomerServicesData,
                };
            }

        case GccVerticalTypes.GET_CUSTOMER_SERVICES_SUB_CONTENT_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resSubContentCustomerServicesData: null,
                }
            }

        //resFinance Controlling
        case GccVerticalTypes.GET_FINANCE_CONTROLLING_REQUEST:
            {
                return {
                    ...state, loading: true, resFinanceControlling: null
                }
            }

        case GccVerticalTypes.GET_FINANCE_CONTROLLING_SUCCESS:
            {
                const { payload, resFinanceControlling } = action.payload
                return {
                    ...state, items: payload, loading: false, resFinanceControlling: resFinanceControlling,
                };
            }

        case GccVerticalTypes.GET_FINANCE_CONTROLLING_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resFinanceControlling: null,
                }
            }

        case GccVerticalTypes.GET_FINANCE_CONTROLLING_SUB_CONTENT_REQUEST:
            {
                return {
                    ...state, loading: true, resSubCntFinanceControlling: null
                }
            }

        case GccVerticalTypes.GET_FINANCE_CONTROLLING_SUB_CONTENT_SUCCESS:
            {
                const { payload, resSubCntFinanceControlling } = action.payload
                return {
                    ...state, items: payload, loading: false, resSubCntFinanceControlling: resSubCntFinanceControlling,
                };
            }

        case GccVerticalTypes.GET_FINANCE_CONTROLLING_SUB_CONTENT_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resSubCntFinanceControlling: null,
                }
            }

        //res Human Resources Data
        case GccVerticalTypes.GET_HUMAN_RESOURCES_REQUEST:
            {
                return {
                    ...state, loading: true, resHumanResourcesData: null
                }
            }

        case GccVerticalTypes.GET_HUMAN_RESOURCES_SUCCESS:
            {
                const { payload, resHumanResourcesData } = action.payload
                return {
                    ...state, items: payload, loading: false, resHumanResourcesData: resHumanResourcesData,
                };
            }

        case GccVerticalTypes.GET_HUMAN_RESOURCES_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resHumanResourcesData: null,
                }
            }

        case GccVerticalTypes.GET_HUMAN_RESOURCES_SUB_CONTENT_REQUEST:
            {
                return {
                    ...state, loading: true, resHumanResourcesSubCntData: null
                }
            }

        case GccVerticalTypes.GET_HUMAN_RESOURCES_SUB_CONTENT_SUCCESS:
            {
                const { payload, resHumanResourcesSubCntData } = action.payload
                return {
                    ...state, items: payload, loading: false, resHumanResourcesSubCntData: resHumanResourcesSubCntData,
                };
            }

        case GccVerticalTypes.GET_HUMAN_RESOURCES_SUB_CONTENT_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resHumanResourcesSubCntData: null,
                }
            }
        //res Information Technology
        case GccVerticalTypes.GET_INFORMATION_RECHNOLOGY_REQUEST:
            {
                return {
                    ...state, loading: true, resInformationTechnology: null
                }
            }

        case GccVerticalTypes.GET_INFORMATION_RECHNOLOGY_SUCCESS:
            {
                const { payload, resInformationTechnology } = action.payload
                return {
                    ...state, items: payload, loading: false, resInformationTechnology: resInformationTechnology,
                };
            }

        case GccVerticalTypes.GET_INFORMATION_RECHNOLOGY_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resInformationTechnology: null,
                }
            }

        //res Lean Process Data
        case GccVerticalTypes.GET_LEAN_PROCESS_REQUEST:
            {
                return {
                    ...state, loading: true, resLeanProcessData: null
                }
            }

        case GccVerticalTypes.GET_LEAN_PROCESS_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state, items: payload, loading: false, resLeanProcessData: payload.data,
                };
            }

        case GccVerticalTypes.GET_LEAN_PROCESS_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resLeanProcessData: null,
                }
            }

        case GccVerticalTypes.GET_LEAN_PROCESS_SUB_CONTENT_REQUEST:
            {
                return {
                    ...state, loading: true, resLeanProcessSubCntData: null
                }
            }

        case GccVerticalTypes.GET_LEAN_PROCESS_SUB_CONTENT_SUCCESS:
            {
                const { payload, resLeanProcessSubCntData } = action.payload
                return {
                    ...state, items: payload, loading: false, resLeanProcessSubCntData: resLeanProcessSubCntData,
                };
            }

        case GccVerticalTypes.GET_LEAN_PROCESS_SUB_CONTENT_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resLeanProcessSubCntData: null,
                }
            }

        //res Lean Process Data
        case GccVerticalTypes.GET_MANUFACTURING_ENGINEER_REQUEST:
            {
                return {
                    ...state, loading: true, resManufacturingEngineerData: null
                }
            }

        case GccVerticalTypes.GET_MANUFACTURING_ENGINEER_SUCCESS:
            {
                const { payload, resManufacturingEngineerData } = action.payload
                return {
                    ...state, items: payload, loading: false, resManufacturingEngineerData: resManufacturingEngineerData,
                };
            }

        case GccVerticalTypes.GET_MANUFACTURING_ENGINEER_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resManufacturingEngineerData: null,
                }
            }

        case GccVerticalTypes.GET_MANUFACTURING_ENGINEER_SUB_CONTENT_REQUEST:
            {
                return {
                    ...state, loading: true, resManufacturingSubCnt: null
                }
            }

        case GccVerticalTypes.GET_MANUFACTURING_ENGINEER_SUB_CONTENT_SUCCESS:
            {
                const { payload, resManufacturingEngineerSubCntData } = action.payload
                return {
                    ...state, items: payload, loading: false, resManufacturingEngineerSubCntData: resManufacturingEngineerSubCntData,
                };
            }

        case GccVerticalTypes.GET_MANUFACTURING_ENGINEER_SUB_CONTENT_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resManufacturingEngineerSubCntData: null,
                }
            }

        //res Lean Process Data
        case GccVerticalTypes.GET_PRODUCT_ENGINEER_REQUEST:
            {
                return {
                    ...state, loading: true, resProductEngineeringData: null
                }
            }

        case GccVerticalTypes.GET_PRODUCT_ENGINEER_SUCCESS:
            {
                const { payload, resProductEngineeringData } = action.payload
                return {
                    ...state, items: payload, loading: false, resProductEngineeringData: resProductEngineeringData,
                };
            }

        case GccVerticalTypes.GET_PRODUCT_ENGINEER_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resProductEngineeringData: null,
                }
            }

        case GccVerticalTypes.GET_PRODUCT_ENGINEER_SUB_CONTENT_REQUEST:
            {
                return {
                    ...state, loading: true, resProductEngineeringSubCntData: null
                }
            }

        case GccVerticalTypes.GET_PRODUCT_ENGINEER_SUB_CONTENT_SUCCESS:
            {
                const { payload, resProductEngineeringSubCntData } = action.payload
                return {
                    ...state, items: payload, loading: false, resProductEngineeringSubCntData: resProductEngineeringSubCntData,
                };
            }

        case GccVerticalTypes.GET_PRODUCT_ENGINEER_SUB_CONTENT_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resProductEngineeringSubCntData: null,
                }
            }

        //res Lean Process Data
        case GccVerticalTypes.GET_QUALITY_MANAGEMENT_REQUEST:
            {
                return {
                    ...state, loading: true, resQualityManagementData: null
                }
            }

        case GccVerticalTypes.GET_QUALITY_MANAGEMENT_SUCCESS:
            {
                const { payload, resQualityManagementData } = action.payload
                return {
                    ...state, items: payload, loading: false, resQualityManagementData: resQualityManagementData,
                };
            }

        case GccVerticalTypes.GET_QUALITY_MANAGEMENT_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resQualityManagementData: null,
                }
            }

        case GccVerticalTypes.GET_QUALITY_MANAGEMENT_SUB_CONTENT_REQUEST:
            {
                return {
                    ...state, loading: true, resQualityManagementSubCntData: null
                }
            }

        case GccVerticalTypes.GET_QUALITY_MANAGEMENT_SUB_CONTENT_SUCCESS:
            {
                const { payload, resQualityManagementSubCntData } = action.payload
                return {
                    ...state, items: payload, loading: false, resQualityManagementSubCntData: resQualityManagementSubCntData,
                };
            }

        case GccVerticalTypes.GET_QUALITY_MANAGEMENT_SUB_CONTENT_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resQualityManagementSubCntData: null,
                }
            }
        //res Lean Process Data
        case GccVerticalTypes.GET_SUPPLIER_MANAGEMENT_REQUEST:
            {
                return {
                    ...state, loading: true, resSupplierManagementData: null
                }
            }

        case GccVerticalTypes.GET_SUPPLIER_MANAGEMENT_SUCCESS:
            {
                const { payload, resSupplierManagementData } = action.payload
                return {
                    ...state, items: payload, loading: false, resSupplierManagementData: resSupplierManagementData,
                };
            }

        case GccVerticalTypes.GET_SUPPLIER_MANAGEMENT_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resSupplierManagementData: null,
                }
            }


        case GccVerticalTypes.GET_SUPPLIER_MANAGEMENT_SUB_CONTENT_REQUEST:
            {
                return {
                    ...state, loading: true, resSupplierManagementSubCntData: null
                }
            }

        case GccVerticalTypes.GET_SUPPLIER_MANAGEMENT_SUB_CONTENT_SUCCESS:
            {
                const { payload, resSupplierManagementSubCntData } = action.payload
                return {
                    ...state, items: payload, loading: false, resSupplierManagementSubCntData: resSupplierManagementSubCntData,
                };
            }

        case GccVerticalTypes.GET_SUPPLIER_MANAGEMENT_SUB_CONTENT_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resSupplierManagementSubCntData: null,
                }
            }

        default: {
            return state
        }
    }
}

export { reducer as GccVerticalReducer }