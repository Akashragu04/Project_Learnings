import { call, put } from "redux-saga/effects";
import { ConfigAPI } from "../../services/config";
import baseAPI from "../../services/Service";
import { commonGeBrochuretFailure, commonGetBrochureSuccess, commonGetFailure, commonGetSuccess, getAddContentFailure, getAddContentSuccess, getBrochureDownloadFailure, getBrochureDownloadSuccess, getBrochureFailure, getBrochureSuccess, getContentDetailsFailure, getContentDetailsSuccess, getContentDownloadFailure, getContentDownloadSuccess, getLatestNewsletterFailure, getLatestNewsletterSuccess, getNewsletterDownloadFailure, getNewsletterDownloadSuccess, getNewsletterFailure, getNewsletterSuccess } from "../actions/other.actions";


export function* brochureDetails() {
    try {
        const uri = ConfigAPI.getBrochure;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getBrochureSuccess({
                    payload: data,
                    resBrochureDetails:data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getBrochureFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getBrochureFailure({
                errors: e.message,
            })
        );
    }
}

export function* brochureDownloadDetails() {
    try {
        const uri = ConfigAPI.getAboutUsURL;
        const { data } = yield call(baseAPI.get, `${uri}?ModelName=About Us`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getBrochureDownloadSuccess({
                    payload: data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getBrochureDownloadFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getBrochureDownloadFailure({
                errors: e.message,
            })
        );
    }
}

export function* contentDetails() {
    try {
        const uri = ConfigAPI.getContentURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getContentDetailsSuccess({
                    payload: data,
                    resContentDetails:data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getContentDetailsFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getContentDetailsFailure({
                errors: e.message,
            })
        );
    }
}

export function* contentDownloadDetails() {
    try {
        const uri = ConfigAPI.getAboutUsURL;
        const { data } = yield call(baseAPI.get, `${uri}?ModelName=About Us`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getContentDownloadSuccess({
                    payload: data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getContentDownloadFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getContentDownloadFailure({
                errors: e.message,
            })
        );
    }
}

export function* newsletterDetails() {
    try {
        const uri = ConfigAPI.getNewLetterURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getNewsletterSuccess({
                    payload: data,
                    resNewsLetterDetails:data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getNewsletterFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getNewsletterFailure({
                errors: e.message,
            })
        );
    }
}

export function* newsletterLatestDetails() {
    try {
        const uri = ConfigAPI.getLatestNewsLetterURL;
        const { data } = yield call(baseAPI.get, `${uri}`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getLatestNewsletterSuccess({
                    payload: data,
                    resLatestNewsLetterDetails:data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getLatestNewsletterFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getLatestNewsletterFailure({
                errors: e.message,
            })
        );
    }
}

export function* newsletterDownloadDetails() {
    try {
        const uri = ConfigAPI.getAboutUsURL;
        const { data } = yield call(baseAPI.get, `${uri}?ModelName=About Us`);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getNewsletterDownloadSuccess({
                    payload: data,
                    resNewsLetterDownload:data.data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getNewsletterDownloadFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getNewsletterDownloadFailure({
                errors: e.message,
            })
        );
    }
}

export function* postAddContentDetails() {
    try {
        const uri = ConfigAPI.getAboutUsURL;
        const { data } = yield call(baseAPI.post, uri);
        if (data.status === true) {
            // toast(data.message, {position: 'bottom-right'});
            yield put(
                getAddContentSuccess({
                    payload: data
                })
            );
        } else {
            // toast.error(data.message, {position: 'bottom-right'});
            getAddContentFailure({
                errors: data,
            })
        }

    } catch (e: any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getAddContentFailure({
                errors: e.message,
            })
        );
    }
}

export function* commonGetData(getCommonValues?: any) {
  try {
    const { data } = yield call(baseAPI.get, getCommonValues.payload);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        commonGetSuccess({
          payload: data,
          resCommonViewData: data.data
        })
      );
    } else {
      // toast.error(data.message, {position: 'bottom-right'});
      commonGetFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      commonGetFailure({
        errors: e.message,
      })
    );
  }
}

export function* commonGetBrochureData(getCommonValues?: any) {
  try {
    const { data } = yield call(baseAPI.get, getCommonValues.payload);
    if (data) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        commonGetBrochureSuccess({
          payload: data,
          resCommonViewBrochureData: data
        })
      );
    } else {
      // toast.error(data.message, {position: 'bottom-right'});
      commonGeBrochuretFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
        commonGeBrochuretFailure({
        errors: e.message,
      })
    );
  }
}