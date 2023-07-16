import { call, put } from "redux-saga/effects";
import { ConfigAPI } from "../../services/config";
import baseAPI from "../../services/Service";
import { getCapabilitiesDataFailure, getCapabilitiesDataSuccess, getCostEngineeringDataFailure, 
    getCostEngineeringDataSuccess, getCostEngineeringSubCntDataFailure, getCostEngineeringSubCntDataSuccess, 
    getCustomerServicesDataFailure, getCustomerServicesDataSubCntFailure, getCustomerServicesDataSubCntSuccess, 
    getCustomerServicesDataSuccess, getFinanceControllingDataFailure, getFinanceControllingDataSubCntFailure, 
    getFinanceControllingDataSubCntSuccess, getFinanceControllingDataSuccess, getHumanResourcesDataFailure, 
    getHumanResourcesDataSubCntFailure, getHumanResourcesDataSubCntSuccess, getHumanResourcesDataSuccess, 
    getInformationRechnologyFailure, getInformationRechnologySuccess, getLeanProcessFailure, getLeanProcessSubCntFailure, 
    getLeanProcessSubCntSuccess, getLeanProcessSuccess, getManufacturingEngineerFailure, getManufacturingEngineerSubCntFailure, 
    getManufacturingEngineerSubCntSuccess, getManufacturingEngineerSuccess, getProductEngineerFailure, getProductEngineerSubCntFailure, 
    getProductEngineerSubCntSuccess, getProductEngineerSuccess, getQualityManagementFailure, getQualityManagementSubCntFailure, 
    getQualityManagementSubCntSuccess, getQualityManagementSuccess, getSupplierManagementFailure, getSupplierManagementSubCntFailure, 
    getSupplierManagementSubCntSuccess, getSupplierManagementSuccess } from "../actions/gccvertical.action";


export function* capabilitiesDetails() {
    try {
        const uri = ConfigAPI.getOurCapabilitiesURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getCapabilitiesDataSuccess({
                    payload: data,
                    resCapabilitiesData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getCapabilitiesDataFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getCapabilitiesDataFailure({
                errors: e.message,
            })
        );
    }
}


export function* costEngineeringDetails() {
    try {
        const uri = ConfigAPI.getCostEngineeringMainContentURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getCostEngineeringDataSuccess({
                    payload: data,
                    resCostEngineering: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getCostEngineeringDataFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getCostEngineeringDataFailure({
                errors: e.message,
            })
        );
    }
}

export function* costEngineeringSubCntDetails() {
    try {
        const uri = ConfigAPI.getCostSubContentURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getCostEngineeringSubCntDataSuccess({
                    payload: data,
                    resSubCntCostEngineering: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getCostEngineeringSubCntDataFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getCostEngineeringSubCntDataFailure({
                errors: e.message,
            })
        );
    }
}

export function* customerServicesDetails() {
    try {
        const uri = ConfigAPI.getCustomerServicesDetailURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getCustomerServicesDataSuccess({
                    payload: data,
                    resCustomerServicesData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getCustomerServicesDataFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getCustomerServicesDataFailure({
                errors: e.message,
            })
        );
    }
}

export function* customerServicesSubCntDetails() {
    try {
        const uri = ConfigAPI.getCustomerServicesSubContentURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getCustomerServicesDataSubCntSuccess({
                    payload: data,
                    resSubContentCustomerServicesData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getCustomerServicesDataSubCntFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getCustomerServicesDataSubCntFailure({
                errors: e.message,
            })
        );
    }
}



export function* financeControllingDetails() {
    try {
        const uri = ConfigAPI.getMainContentFinanceURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getFinanceControllingDataSuccess({
                    payload: data,
                    resFinanceControlling: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getFinanceControllingDataFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getFinanceControllingDataFailure({
                errors: e.message,
            })
        );
    }
}


export function* financeControllingSubCntDetails() {
    try {
        const uri = ConfigAPI.getFinanceSubContentDetaisURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getFinanceControllingDataSubCntSuccess({
                    payload: data,
                    resSubCntFinanceControlling: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getFinanceControllingDataSubCntFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getFinanceControllingDataSubCntFailure({
                errors: e.message,
            })
        );
    }
}

export function* humanResourcesDetails() {
    try {
        const uri = ConfigAPI.getHumanreSourceMainCntURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getHumanResourcesDataSuccess({
                    payload: data,
                    resHumanResourcesData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getHumanResourcesDataFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getHumanResourcesDataFailure({
                errors: e.message,
            })
        );
    }
}

export function* humanResourcesSubCntDetails() {
    try {
        const uri = ConfigAPI.getHumanreSourceSubCntURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getHumanResourcesDataSubCntSuccess({
                    payload: data,
                    resHumanResourcesSubCntData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getHumanResourcesDataSubCntFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getHumanResourcesDataSubCntFailure({
                errors: e.message,
            })
        );
    }
}

export function* informationRechnologyDetails() {
    try {
        const uri = ConfigAPI.getITMainContentURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getInformationRechnologySuccess({
                    payload: data,
                    resInformationTechnology: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getInformationRechnologyFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getInformationRechnologyFailure({
                errors: e.message,
            })
        );
    }
}

export function* leanProcessDetails() {
    try {
        const uri = ConfigAPI.getLeadProcessURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getLeanProcessSuccess({
                    payload: data,
                    resLeanProcessData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getLeanProcessFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getLeanProcessFailure({
                errors: e.message,
            })
        );
    }
}

export function* leanProcessSubCntDetails() {
    try {
        const uri = ConfigAPI.getLeadProcessSubCntURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getLeanProcessSubCntSuccess({
                    payload: data,
                    resLeanProcessSubCntData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getLeanProcessSubCntFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getLeanProcessSubCntFailure({
                errors: e.message,
            })
        );
    }
}


export function* manufacturingEngineerDetails() {
    try {
        const uri = ConfigAPI.getManufacturingURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getManufacturingEngineerSuccess({
                    payload: data,
                    resManufacturingEngineerData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getManufacturingEngineerFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getManufacturingEngineerFailure({
                errors: e.message,
            })
        );
    }
}

export function* manufacturingEngineerSubCntDetails() {
    try {
        const uri = ConfigAPI.getManufacturingSubContentURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getManufacturingEngineerSubCntSuccess({
                    payload: data,
                    resManufacturingEngineerSubCntData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getManufacturingEngineerSubCntFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getManufacturingEngineerSubCntFailure({
                errors: e.message,
            })
        );
    }
}

export function* qualityManagementDetails() {
    try {
        const uri = ConfigAPI.getQualityManagementDetailsURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getQualityManagementSuccess({
                    payload: data,
                    resQualityManagementData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getQualityManagementFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getQualityManagementFailure({
                errors: e.message,
            })
        );
    }
}

export function* qualityManagementSubCntDetails() {
    try {
        const uri = ConfigAPI.getSubCntQualityManagementURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getQualityManagementSubCntSuccess({
                    payload: data,
                    resQualityManagementSubCntData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getQualityManagementSubCntFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getQualityManagementSubCntFailure({
                errors: e.message,
            })
        );
    }
}

export function* supplierManagementDetails() {
    try {
        const uri = ConfigAPI.getSupplierDetailsURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getSupplierManagementSuccess({
                    payload: data,
                    resSupplierManagementData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getSupplierManagementFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getSupplierManagementFailure({
                errors: e.message,
            })
        );
    }
}

export function* supplierManagementSubCntDetails() {
    try {
        const uri = ConfigAPI.getSubCntSupplier;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getSupplierManagementSubCntSuccess({
                    payload: data,
                    resSupplierManagementSubCntData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getSupplierManagementSubCntFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getSupplierManagementSubCntFailure({
                errors: e.message,
            })
        );
    }
}

export function* productEngineerDetails() {
    try {
        const uri = ConfigAPI.getProductMaincontentURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getProductEngineerSuccess({
                    payload: data,
                    resProductEngineeringData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getProductEngineerFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getProductEngineerFailure({
                errors: e.message,
            })
        );
    }
}

export function* productEngineerSubCntDetails() {
    try {
        const uri = ConfigAPI.getProductSubContentURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getProductEngineerSubCntSuccess({
                    payload: data,
                    resProductEngineeringSubCntData: data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getProductEngineerSubCntFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getProductEngineerSubCntFailure({
                errors: e.message,
            })
        );
    }
}
