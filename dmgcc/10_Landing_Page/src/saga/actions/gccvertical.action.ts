import { takeEvery } from "redux-saga/effects";
import { capabilitiesDetails, costEngineeringDetails, costEngineeringSubCntDetails, customerServicesDetails, customerServicesSubCntDetails, financeControllingDetails, 
    financeControllingSubCntDetails, 
    humanResourcesDetails, humanResourcesSubCntDetails, informationRechnologyDetails, 
    leanProcessDetails, leanProcessSubCntDetails, manufacturingEngineerDetails, manufacturingEngineerSubCntDetails, 
    productEngineerDetails, productEngineerSubCntDetails, qualityManagementDetails, qualityManagementSubCntDetails, supplierManagementDetails, 
    supplierManagementSubCntDetails } from "../sagas/gccvertical.saga";
import { GccVerticalTypes } from "../Types/gccvertical.types";

/**
 * capabilities Requirement Actions
 */

 export const getCapabilitiesData = function* () {
    yield takeEvery(GccVerticalTypes.GET_CAPABILITIES_REQUEST, capabilitiesDetails);
}
export const reqCapabilitiesData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_CAPABILITIES_REQUEST,
        payload: postValue
    }
}

export const getCapabilitiesDataSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_CAPABILITIES_SUCCESS,
        payload: postValue
    }
}

export const getCapabilitiesDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_CAPABILITIES_ERROR,
        payload: errors
    }
}

/**
 * Cost Engineering Requirement Actions
 */

 export const getCostEngineeringData = function* () {
    yield takeEvery(GccVerticalTypes.GET_COST_ENGINEERING_REQUEST, costEngineeringDetails);
}
export const reqCostEngineeringData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_COST_ENGINEERING_REQUEST,
        payload: postValue
    }
}

export const getCostEngineeringDataSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_COST_ENGINEERING_SUCCESS,
        payload: postValue
    }
}

export const getCostEngineeringDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_COST_ENGINEERING_ERROR,
        payload: errors
    }
}

export const getCostEngineeringSubCntData = function* () {
    yield takeEvery(GccVerticalTypes.GET_COST_ENGINEERING_SUB_CONTENT_REQUEST, costEngineeringSubCntDetails);
}
export const reqCostEngineeringSubCntData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_COST_ENGINEERING_SUB_CONTENT_REQUEST,
        payload: postValue
    }
}

export const getCostEngineeringSubCntDataSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_COST_ENGINEERING_SUB_CONTENT_SUCCESS,
        payload: postValue
    }
}

export const getCostEngineeringSubCntDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_COST_ENGINEERING_SUB_CONTENT_ERROR,
        payload: errors
    }
}

/*** customer Services Requirement Actions */

 export const getCustomerServicesData = function* () {
    yield takeEvery(GccVerticalTypes.GET_CUSTOMER_SERVICES_REQUEST, customerServicesDetails);
}
export const reqCustomerServicesData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_CUSTOMER_SERVICES_REQUEST,
        payload: postValue
    }
}

export const getCustomerServicesDataSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_CUSTOMER_SERVICES_SUCCESS,
        payload: postValue
    }
}

export const getCustomerServicesDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_CUSTOMER_SERVICES_ERROR,
        payload: errors
    }
}

export const getCustomerServicesSubCntData = function* () {
    yield takeEvery(GccVerticalTypes.GET_CUSTOMER_SERVICES_SUB_CONTENT_REQUEST, customerServicesSubCntDetails);
}
export const reqCustomerServicesSubCntData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_CUSTOMER_SERVICES_SUB_CONTENT_REQUEST,
        payload: postValue
    }
}

export const getCustomerServicesDataSubCntSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_CUSTOMER_SERVICES_SUB_CONTENT_SUCCESS,
        payload: postValue
    }
}

export const getCustomerServicesDataSubCntFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_CUSTOMER_SERVICES_SUB_CONTENT_ERROR,
        payload: errors
    }
}
/*** finance Controlling Requirement Actions */

 export const getFinanceControllingData = function* () {
    yield takeEvery(GccVerticalTypes.GET_FINANCE_CONTROLLING_REQUEST, financeControllingDetails);
}
export const reqFinanceControllingData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_FINANCE_CONTROLLING_REQUEST,
        payload: postValue
    }
}

export const getFinanceControllingDataSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_FINANCE_CONTROLLING_SUCCESS,
        payload: postValue
    }
}

export const getFinanceControllingDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_FINANCE_CONTROLLING_ERROR,
        payload: errors
    }
}

export const getFinanceControllingSubCntData = function* () {
    yield takeEvery(GccVerticalTypes.GET_FINANCE_CONTROLLING_SUB_CONTENT_REQUEST, financeControllingSubCntDetails);
}
export const reqFinanceControllingSubCntData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_FINANCE_CONTROLLING_SUB_CONTENT_REQUEST,
        payload: postValue
    }
}

export const getFinanceControllingDataSubCntSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_FINANCE_CONTROLLING_SUB_CONTENT_SUCCESS,
        payload: postValue
    }
}

export const getFinanceControllingDataSubCntFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_FINANCE_CONTROLLING_SUB_CONTENT_ERROR,
        payload: errors
    }
}

/*** finance Controlling Requirement Actions */

 export const getHumanResourcesData = function* () {
    yield takeEvery(GccVerticalTypes.GET_HUMAN_RESOURCES_REQUEST, humanResourcesDetails);
}
export const reqHumanResourcesData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_HUMAN_RESOURCES_REQUEST,
        payload: postValue
    }
}

export const getHumanResourcesDataSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_HUMAN_RESOURCES_SUCCESS,
        payload: postValue
    }
}

export const getHumanResourcesDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_HUMAN_RESOURCES_ERROR,
        payload: errors
    }
}

export const getHumanResourcesSubCntData = function* () {
    yield takeEvery(GccVerticalTypes.GET_HUMAN_RESOURCES_SUB_CONTENT_REQUEST, humanResourcesSubCntDetails);
}
export const reqHumanResourcesSubCntData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_HUMAN_RESOURCES_SUB_CONTENT_REQUEST,
        payload: postValue
    }
}

export const getHumanResourcesDataSubCntSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_HUMAN_RESOURCES_SUB_CONTENT_SUCCESS,
        payload: postValue
    }
}

export const getHumanResourcesDataSubCntFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_HUMAN_RESOURCES_SUB_CONTENT_ERROR,
        payload: errors
    }
}
/*** finance Controlling Requirement Actions */

 export const getInformationRechnologyData = function* () {
    yield takeEvery(GccVerticalTypes.GET_INFORMATION_RECHNOLOGY_REQUEST, informationRechnologyDetails);
}
export const reqInformationRechnologyData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_INFORMATION_RECHNOLOGY_REQUEST,
        payload: postValue
    }
}

export const getInformationRechnologySuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_INFORMATION_RECHNOLOGY_SUCCESS,
        payload: postValue
    }
}

export const getInformationRechnologyFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_INFORMATION_RECHNOLOGY_ERROR,
        payload: errors
    }
}


/*** finance Controlling Requirement Actions */

 export const getLeanProcessData = function* () {
    yield takeEvery(GccVerticalTypes.GET_LEAN_PROCESS_REQUEST, leanProcessDetails);
}
export const reqLeanProcessData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_LEAN_PROCESS_REQUEST,
        payload: postValue
    }
}

export const getLeanProcessSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_LEAN_PROCESS_SUCCESS,
        payload: postValue
    }
}

export const getLeanProcessFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_LEAN_PROCESS_ERROR,
        payload: errors
    }
}

export const getLeanProcessSubCntData = function* () {
    yield takeEvery(GccVerticalTypes.GET_LEAN_PROCESS_SUB_CONTENT_REQUEST, leanProcessSubCntDetails);
}
export const reqLeanProcessSubCntData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_LEAN_PROCESS_SUB_CONTENT_REQUEST,
        payload: postValue
    }
}

export const getLeanProcessSubCntSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_LEAN_PROCESS_SUB_CONTENT_SUCCESS,
        payload: postValue
    }
}

export const getLeanProcessSubCntFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_LEAN_PROCESS_SUB_CONTENT_ERROR,
        payload: errors
    }
}

/*** Manufacturing Engineer Requirement Actions */

 export const getManufacturingEngineerData = function* () {
    yield takeEvery(GccVerticalTypes.GET_MANUFACTURING_ENGINEER_REQUEST, manufacturingEngineerDetails);
}
export const reqManufacturingEngineerData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_MANUFACTURING_ENGINEER_REQUEST,
        payload: postValue
    }
}

export const getManufacturingEngineerSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_MANUFACTURING_ENGINEER_SUCCESS,
        payload: postValue
    }
}

export const getManufacturingEngineerFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_MANUFACTURING_ENGINEER_ERROR,
        payload: errors
    }
}

export const getManufacturingEngineerSubCntData = function* () {
    yield takeEvery(GccVerticalTypes.GET_MANUFACTURING_ENGINEER_SUB_CONTENT_REQUEST, manufacturingEngineerSubCntDetails);
}
export const reqManufacturingEngineerSubCntData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_MANUFACTURING_ENGINEER_SUB_CONTENT_REQUEST,
        payload: postValue
    }
}

export const getManufacturingEngineerSubCntSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_MANUFACTURING_ENGINEER_SUB_CONTENT_SUCCESS,
        payload: postValue
    }
}

export const getManufacturingEngineerSubCntFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_MANUFACTURING_ENGINEER_SUB_CONTENT_ERROR,
        payload: errors
    }
}

/*** Quality Managements Requirement Actions */

 export const getQualityManagementData = function* () {
    yield takeEvery(GccVerticalTypes.GET_QUALITY_MANAGEMENT_REQUEST, qualityManagementDetails);
}
export const reqQualityManagementData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_QUALITY_MANAGEMENT_REQUEST,
        payload: postValue
    }
}

export const getQualityManagementSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_QUALITY_MANAGEMENT_SUCCESS,
        payload: postValue
    }
}

export const getQualityManagementFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_QUALITY_MANAGEMENT_ERROR,
        payload: errors
    }
}

export const getQualityManagementSubCntData = function* () {
    yield takeEvery(GccVerticalTypes.GET_QUALITY_MANAGEMENT_SUB_CONTENT_REQUEST, qualityManagementSubCntDetails);
}
export const reqQualityManagementSubCntData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_QUALITY_MANAGEMENT_SUB_CONTENT_REQUEST,
        payload: postValue
    }
}

export const getQualityManagementSubCntSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_QUALITY_MANAGEMENT_SUB_CONTENT_SUCCESS,
        payload: postValue
    }
}

export const getQualityManagementSubCntFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_QUALITY_MANAGEMENT_SUB_CONTENT_ERROR,
        payload: errors
    }
}

/*** Quality Managements Requirement Actions */

 export const getSupplierManagementData = function* () {
    yield takeEvery(GccVerticalTypes.GET_SUPPLIER_MANAGEMENT_REQUEST, supplierManagementDetails);
}
export const reqSupplierManagementData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_SUPPLIER_MANAGEMENT_REQUEST,
        payload: postValue
    }
}

export const getSupplierManagementSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_SUPPLIER_MANAGEMENT_SUCCESS,
        payload: postValue
    }
}

export const getSupplierManagementFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_SUPPLIER_MANAGEMENT_ERROR,
        payload: errors
    }
}

export const getSupplierManagementSubCntData = function* () {
    yield takeEvery(GccVerticalTypes.GET_SUPPLIER_MANAGEMENT_SUB_CONTENT_REQUEST, supplierManagementSubCntDetails);
}
export const reqSupplierManagementSubCntData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_SUPPLIER_MANAGEMENT_SUB_CONTENT_REQUEST,
        payload: postValue
    }
}

export const getSupplierManagementSubCntSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_SUPPLIER_MANAGEMENT_SUB_CONTENT_SUCCESS,
        payload: postValue
    }
}

export const getSupplierManagementSubCntFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_SUPPLIER_MANAGEMENT_SUB_CONTENT_ERROR,
        payload: errors
    }
}

/*** Quality Managements Requirement Actions */

 export const getProductEngineerData = function* () {
    yield takeEvery(GccVerticalTypes.GET_PRODUCT_ENGINEER_REQUEST, productEngineerDetails);
}
export const reqProductEngineerData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_PRODUCT_ENGINEER_REQUEST,
        payload: postValue
    }
}

export const getProductEngineerSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_PRODUCT_ENGINEER_SUCCESS,
        payload: postValue
    }
}

export const getProductEngineerFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_QUALITY_MANAGEMENT_ERROR,
        payload: errors
    }
}

export const getProductEngineerSubCntData = function* () {
    yield takeEvery(GccVerticalTypes.GET_PRODUCT_ENGINEER_SUB_CONTENT_REQUEST, productEngineerSubCntDetails);
}
export const reqProductEngineerSubCntData = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_PRODUCT_ENGINEER_SUB_CONTENT_REQUEST,
        payload: postValue
    }
}

export const getProductEngineerSubCntSuccess = (postValue?: any) => {
    return {
        type: GccVerticalTypes.GET_PRODUCT_ENGINEER_SUB_CONTENT_SUCCESS,
        payload: postValue
    }
}

export const getProductEngineerSubCntFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: GccVerticalTypes.GET_QUALITY_MANAGEMENT_SUB_CONTENT_ERROR,
        payload: errors
    }
}