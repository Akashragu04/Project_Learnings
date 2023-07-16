import { takeEvery } from 'redux-saga/effects';
import { PreInvoiceTypes } from '../sagas/Types';
import { createPreInvoiceDetails, deleteProvisionsDetails, getPreInvoiceDetails, projectProvisionsDetails, slaProvisionsDetails } from '../sagas/preInvoice.sagas'
/**
 * Biz.Case Requirement Actions
 */
  

export const initPreInvoiceAction = () => ({
    type: PreInvoiceTypes.INIT_PREINVOICE
})

export const getAllPreInvoiceDetailsAction = (data: any) => ({
    type: PreInvoiceTypes.GET_ALL_PREINVOICE_DETAILS,
    data
})

export const getAllPreInvoiceDetailsSuccess = (data: any) => ({
    type: PreInvoiceTypes.GET_ALL_PREINVOICE_DETAILS_SUCCESS,
    data
})

export const getAllPreInvoiceDetailsFailure = (error: any) => ({
    type: PreInvoiceTypes.GET_ALL_PREINVOICE_DETAILS_FAILURE,
    error
})

export const getPreInvoiceDetailAction = (data: any) => ({
    type: PreInvoiceTypes.GET_PREINVOICE_DETAIL_REQUEST,
    data
})

export const getPreInvoiceDetailSuccess = (data: any) => ({
    type: PreInvoiceTypes.GET_PREINVOICE_DETAIL_SUCCESS,
    data
})

export const getPreInvoiceDetailFailure = (error: any) => ({
    type: PreInvoiceTypes.GET_PREINVOICE_DETAIL_FAILURE,
    error
})

export const getAllInvoiceDetailsAction = (data: any) => ({
    type: PreInvoiceTypes.GET_ALL_INVOICE_DETAILS,
    data
})

export const getAllInvoiceDetailsSuccess = (data: any) => ({
    type: PreInvoiceTypes.GET_ALL_INVOICE_DETAILS_SUCCESS,
    data
})

export const getAllInvoiceDetailsFailure = (error: any) => ({
    type: PreInvoiceTypes.GET_ALL_INVOICE_DETAILS_FAILURE,
    error
})


export const createPreInvoice = function* () {
    yield takeEvery(PreInvoiceTypes.CREATE_PREINVOICE_REQUEST, createPreInvoiceDetails);
}
export const  createPreInvoiceReq = (postValue?: any) => {
    return {
        type: PreInvoiceTypes.CREATE_PREINVOICE_REQUEST,
        payload: postValue
    }
}

export const  createPreInvoiceSuccess = (postValue?: any) => {
    return {
        type: PreInvoiceTypes.CREATE_PREINVOICE_REQUEST_SUCCESS,
        payload: postValue
    }
}

export const  createPreInvoiceFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: PreInvoiceTypes.CREATE_PREINVOICE_REQUEST_FAILURE,
        payload: errors
    }
}

export const getPreInvoiceSLAEditDetails = function* () {
    yield takeEvery(PreInvoiceTypes.GET_ALL_PREINVOICE_EDIT_DETAILS, getPreInvoiceDetails);
}
export const  getPreInvoiceEditBizCaseSLA = (postValue?: any) => {
    return {
        type: PreInvoiceTypes.GET_ALL_PREINVOICE_EDIT_DETAILS,
        payload: postValue
    }
}
export const getPreInvoiceSLAEditSuccess = (postValue?: any) => {
    return {
        type: PreInvoiceTypes.GET_ALL_PREINVOICE_EDIT_DETAILS_SUCCESS,
        payload: postValue
    }
}

export const getPreInvoiceSLAEditFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: PreInvoiceTypes.GET_ALL_PREINVOICE_EDIT_DETAILS_FAILURE,
        payload: errors
    }
}


export const reqDeleteProvisions = function* () {
    yield takeEvery(PreInvoiceTypes.DELETE_PREINVOICE_REQUEST, deleteProvisionsDetails);
}
export const  reqDeleteProvisionsData = (postValue?: any) => {
    return {
        type: PreInvoiceTypes.DELETE_PREINVOICE_REQUEST,
        payload: postValue
    }
}
export const reqDeleteProvisionsSuccess = (postValue?: any) => {
    return {
        type: PreInvoiceTypes.DELETE_PREINVOICE_SUCCESS,
        payload: postValue
    }
}

export const reqDeleteProvisionsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: PreInvoiceTypes.DELETE_PREINVOICE_FAILURE,
        payload: errors
    }
}



export const reqProjectProvisions = function* () {
    yield takeEvery(PreInvoiceTypes.PROJECT_PREINVOICE_REQUEST, projectProvisionsDetails);
}
export const  reqProjectProvisionsData = (postValue?: any) => {
    return {
        type: PreInvoiceTypes.PROJECT_PREINVOICE_REQUEST,
        payload: postValue
    }
}
export const ProjectProvisionsSuccess = (postValue?: any) => {
    return {
        type: PreInvoiceTypes.PROJECT_PREINVOICE_SUCCESS,
        payload: postValue
    }
}

export const ProjectProvisionsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: PreInvoiceTypes.PROJECT_PREINVOICE_FAILURE,
        payload: errors
    }
}


export const reqSLAProvisions = function* () {
    yield takeEvery(PreInvoiceTypes.SLA_PREINVOICE_REQUEST, slaProvisionsDetails);
}
export const  reqSLAProvisionsData = (postValue?: any) => {
    return {
        type: PreInvoiceTypes.SLA_PREINVOICE_REQUEST,
        payload: postValue
    }
}
export const SLAProvisionsSuccess = (postValue?: any) => {
    return {
        type: PreInvoiceTypes.SLA_PREINVOICE_SUCCESS,
        payload: postValue
    }
}

export const SLAProvisionsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: PreInvoiceTypes.SLA_PREINVOICE_FAILURE,
        payload: errors
    }
}