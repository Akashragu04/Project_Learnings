import { call, put } from "redux-saga/effects";
import { toast } from 'react-toastify';
import {baseAPI} from '../../services/Service';
import {ConfigAPI} from '../../services/config';
import { addFinanceCostCentreSuccess, addFinanceCostCentreFailure, 
    uploadFinanceCostCentreSuccess, uploadFinanceCostCentreFailure, 
    downloadFinanceCostCentreFailure, downloadFinanceCostCentreSuccess, 
    getFinanceCostCentreFailure, getFinanceCostCentreSuccess, 
    editFinanceCostCentreFailure, editFinanceCostCentreSuccess, uploadFinanceIOMappingSuccess, 
    uploadFinanceIOMappingFailure, downloadFinanceIOMappingSuccess, downloadFinanceIOMappingFailure, 
    getFinanceIOMappingSuccess, getFinanceIOMappingFailure, addFinanceIOMappingFailure, addFinanceIOMappingSuccess, 
    addFinanceForoxRateSuccess, addFinanceForoxRateFailure, uploadFinanceForoxRateFailure, uploadFinanceForoxRateSuccess, 
    downloadFinanceForoxRateFailure, downloadFinanceForoxRateSuccess, getFinanceForoxRateFailure, getFinanceForoxRateSuccess, 
    editFinanceForoxRateFailure, editFinanceForoxRateSuccess, uploadFinanceVendorFailure, uploadFinanceVendorSuccess, getFinanceVendorFailure, getFinanceVendorSuccess, addFinanceVendorSuccess, addFinanceVendorFailure, editFinanceVendorSuccess, editFinanceVendorFailure, uploadFinanceIODumpSuccess, uploadFinanceIODumpFailure, getFinanceIODumpSuccess, getFinanceIODumpFailure, editFinanceIODumpSuccess, editFinanceIODumpFailure, addFinanceIODumpSuccess, addFinanceIODumpFailure, uploadFinanceRateCardSuccess, uploadFinanceRateCardFailure, getFinanceRateCardFailure, getFinanceRateCardSuccess, addFinanceRateCardFailure, addFinanceRateCardSuccess, editFinanceRateCardFailure, editFinanceRateCardSuccess, downloadFileObjectCommonFailure, downloadFileObjectCommonSuccess, getIoCcChartSuccess, getIoCcChartFailure, getMarketDataSuccess, getMarketDataFailure, putMarketDataSuccess, putMarketDataFailure, onChangeCostCenterStatusFailure, onChangeCostCenterStatusSuccess } from '../Actions/FinanceMaster.actions'
import { getErrorTokenResponseSuccess } from "saga/Actions";
import { appConstants } from "shared/constants/AppConst";

export function* reqFinanceCostCentreData(getFinanceCost?:any) {
    try { 
      const uri = ConfigAPI.financeAddCostCenter;
      const {data} = yield call(baseAPI.post, `${uri}`, getFinanceCost.payload);
      if (data.status === true ) {
        toast.success(data.message, {position: 'bottom-right'});
        yield put(
            addFinanceCostCentreSuccess({
            payload: data,
          })
        );
      } else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     } else {
        toast.warning(data.message, {position: 'bottom-right'});
        yield put(
            addFinanceCostCentreFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        addFinanceCostCentreFailure({
          errors: e.message,
        })
      );
    }
  }

  export function* getIoCcChartData(getChartData?:any) {
    try { 
      const {data} = yield call(baseAPI.get, `${getChartData.payload}`);
      if (data.status === true ) {
        // toast.success(data.message, {position: 'bottom-right'});
        yield put(
          getIoCcChartSuccess({
            payload: data,
            resIoCcChartData:data.data
          })
        );
      } else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     } else {
        toast.warning(data.message, {position: 'bottom-right'});
        yield put(
          getIoCcChartFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getIoCcChartFailure({
          errors: e.message,
        })
      );
    }
  }
  

  export function* getMarketDataDetail(getChartData?:any) {
    try { 
      const uri = ConfigAPI.getMarketDataURL;
      const {data} = yield call(baseAPI.get, uri);
      if (data.status === true ) {
        // toast.success(data.message, {position: 'bottom-right'});
        yield put(
          getMarketDataSuccess({
            payload: data,
            resMarketData:data.data
          })
        );
      } else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     } else {
        toast.warning(data.message, {position: 'bottom-right'});
        yield put(
          getMarketDataFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getMarketDataFailure({
          errors: e.message,
        })
      );
    }
  }
  

  export function* putMarketDataDetail(getChartData?:any) {
    try { 
      const uri = ConfigAPI.getMarketDataURL;
      const {data} = yield call(baseAPI.put, uri, getChartData.payload);
      if (data.status === true ) {
        toast.success(data.message, {position: 'bottom-right'});
        yield put(
          putMarketDataSuccess({
            payload: data,
            putResMarketData:data
          })
        );
      } else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     } else {
        toast.warning(data.message, {position: 'bottom-right'});
        yield put(
          putMarketDataFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        putMarketDataFailure({
          errors: e.message,
        })
      );
    }
  }

export function* editFinanceCostCentreData(getFinanceCost?:any) {
    try { 
      const uri = ConfigAPI.financeCostCenter;
      const {data} = yield call(baseAPI.put, `${uri}/${getFinanceCost.payload.id}`, getFinanceCost.payload);
      if (data.status === true ) {
        toast.success(data.message, {position: 'bottom-right'});
        yield put(
            editFinanceCostCentreSuccess({
            payload: data,
          })
        );
      } else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     } else {
        toast.warning(data.message, {position: 'bottom-right'});
        yield put(
            editFinanceCostCentreFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        editFinanceCostCentreFailure({
          errors: e.message,
        })
      );
    }
  }

  
export function* getFinanceCostCentreData(getFinanceCost?:any) {
    try { 
      const uri = ConfigAPI.financeCostCenter;
      const {data} = yield call(baseAPI.get, `${uri}?size=${getFinanceCost.payload.size}&page=${getFinanceCost.payload.page}&sort=${getFinanceCost.payload.sort}&searchKeyword=${getFinanceCost.payload.searchKeyword}`);
      if (data.status === true ) {
        // toast(data.message, {position: 'bottom-right'});
        yield put(
            getFinanceCostCentreSuccess({
            payload: data,
            getCostCentreData:data.data
          })
        );
      } else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     } else {
        toast.warning(data.message, {position: 'bottom-right'});
        yield put(
            getFinanceCostCentreFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getFinanceCostCentreFailure({
          errors: e.message,
        })
      );
    }
  }

  
export function* downloadFinanceCostCentreData(getFinanceCost?:any) {
    try { 
      const uri = ConfigAPI.financeAddCostCenter;
      const {data} = yield call(baseAPI.get, `${uri}`, getFinanceCost.payload);
      if (data.status === true ) {
        // toast.success(data.message, {position: 'bottom-right'});
        yield put(
            downloadFinanceCostCentreSuccess({
            payload: data,
          })
        );
      } else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     } else {
        toast.warning(data.message, {position: 'bottom-right'});
        yield put(
            downloadFinanceCostCentreFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        downloadFinanceCostCentreFailure({
          errors: e.message,
        })
      );
    }
  }

  
export function* uploadFinanceCostCentreData(getFinanceCost?:any) {
    try { 
      const {data} = yield call(baseAPI.post, `${getFinanceCost.payload.url}`, getFinanceCost.payload.file);
      if (data.status === true ) {
        toast.success(data.message, {position: 'bottom-right'});
        yield put(
            uploadFinanceCostCentreSuccess({
            payload: data,
          })
        );
      } else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     } else {
        toast.warning(data.message, {position: 'bottom-right'});
        yield put(
            uploadFinanceCostCentreFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        uploadFinanceCostCentreFailure({
          errors: e.message,
        })
      );
    }
  }
  
  
export function* reqAddFinanceIOMappingData(getFinanceIOMapping?:any) {
  try { 
    const uri = ConfigAPI.iomappingwithproject;
    const {data} = yield call(baseAPI.post, `${uri}/${getFinanceIOMapping.payload.id}`, getFinanceIOMapping.payload.body);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        addFinanceIOMappingSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        addFinanceIOMappingFailure({
            errors: data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      addFinanceIOMappingFailure({
        errors: e.message,
      })
    );
  }
}
 
  
export function* getFinanceIOMappingData(getFinanceIOMapping?:any) {
  try { 
    const uri = ConfigAPI.iomappingProjects;
    const {data} = yield call(baseAPI.get, `${uri}?size=${getFinanceIOMapping.payload.size}&page=${getFinanceIOMapping.payload.page}&sort=${getFinanceIOMapping.payload.sort}&searchKeyword=${getFinanceIOMapping.payload.SearchKeyword}`);
    if (data.status === true ) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getFinanceIOMappingSuccess({
          payload: data,
          getIOMappingData:data.data
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        getFinanceIOMappingFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getFinanceIOMappingFailure({
        errors: e.message,
      })
    );
  }
}
 
  
export function* downloadFinanceIOMappingData(getFinanceIOMapping?:any) {
  try { 
    const uri = ConfigAPI.forexRates;
    const {data} = yield call(baseAPI.post, `${uri}`, getFinanceIOMapping.payload);
    if (data.status === true ) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        downloadFinanceIOMappingSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        downloadFinanceIOMappingFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      downloadFinanceIOMappingFailure({
        errors: e.message,
      })
    );
  }
}

 
  
export function* uploadFinanceIOMappingData(getFinanceIOMapping?:any) {
  try { 
    const uri = ConfigAPI.iomappinguploadcsv;
    const {data} = yield call(baseAPI.post, `${uri}`, getFinanceIOMapping.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        uploadFinanceIOMappingSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        uploadFinanceIOMappingFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      uploadFinanceIOMappingFailure({
        errors: e.message,
      })
    );
  }
}
 
//This is a function used to add new forox rate
export function* reqAddFinanceForoxRateeData(getFinanceIOMapping?:any) {
  try { 
    const uri = ConfigAPI.forexRatesBulkinsert;
    const {data} = yield call(baseAPI.post, `${uri}`, getFinanceIOMapping.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        addFinanceForoxRateSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        addFinanceForoxRateFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      addFinanceForoxRateFailure({
        errors: e.message,
      })
    );
  }
}
 
  
export function* editFinanceForoxRateData(getFinanceForoxRate?:any) {
  try { 
    const uri = ConfigAPI.forexRates;
    const {data} = yield call(baseAPI.put, `${uri}/${getFinanceForoxRate.payload.id}`, getFinanceForoxRate.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        editFinanceForoxRateSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        editFinanceForoxRateFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      editFinanceForoxRateFailure({
        errors: e.message,
      })
    );
  }
}
 
  
export function* getFinanceForoxRateData(getFinanceForoxRate?:any) {
  try { 
    const uri = ConfigAPI.forexRates;
    const {data} = yield call(baseAPI.get, `${uri}?size=${getFinanceForoxRate.payload.size}&page=${getFinanceForoxRate.payload.page}&sort=${getFinanceForoxRate.payload.sort}&searchKeyword=${getFinanceForoxRate.payload.SearchKeyword}&filterKeyword=${getFinanceForoxRate.payload.filterKeyword}`);
    if (data.status === true ) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getFinanceForoxRateSuccess({
          payload: data,
          getForoxRateCard:data.data
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        getFinanceForoxRateFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getFinanceForoxRateFailure({
        errors: e.message,
      })
    );
  }
}
 
  
export function* downloadFinanceForoxRateData(getFinanceForoxRate?:any) {
  try { 
    const uri = ConfigAPI.iomappinguploadcsv;
    const {data} = yield call(baseAPI.post, `${uri}`, getFinanceForoxRate.payload);
    if (data.status === true ) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        downloadFinanceForoxRateSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        downloadFinanceForoxRateFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      downloadFinanceForoxRateFailure({
        errors: e.message,
      })
    );
  }
}
export function* uploadFinanceForoxRateData(getFinanceIOMapping?:any) {
  try { 
    const uri = ConfigAPI.forexRatesUploadcsv;
    const {data} = yield call(baseAPI.post, `${uri}`, getFinanceIOMapping.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        uploadFinanceForoxRateSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        uploadFinanceForoxRateFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      uploadFinanceForoxRateFailure({
        errors: e.message,
      })
    );
  }
}
 
//This is a function used to vendor
export function* uploadFinanceVendorData(getFinanceVendor?:any) {
  try { 
    const uri = ConfigAPI.addnewvendor;
    const {data} = yield call(baseAPI.post, `${uri}`, getFinanceVendor.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        uploadFinanceVendorSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        uploadFinanceVendorFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      uploadFinanceVendorFailure({
        errors: e.message,
      })
    );
  }
}

  
export function* reqAddFinanceVendoreData(getFinanceVendore?:any) {
  try { 
    const uri = ConfigAPI.vendorBulkinsert;
    const {data} = yield call(baseAPI.post, `${uri}`, getFinanceVendore.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        addFinanceVendorSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        addFinanceVendorFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      addFinanceVendorFailure({
        errors: e.message,
      })
    );
  }
}
  
export function* editFinanceVendorData(getFinanceVendore?:any) {
  try { 
    const uri = ConfigAPI.updateVendor;
    const {data} = yield call(baseAPI.put, `${uri}/${getFinanceVendore.payload.id}`, getFinanceVendore.payload.data);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        editFinanceVendorSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        editFinanceVendorFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      editFinanceVendorFailure({
        errors: e.message,
      })
    );
  }
}
  
export function* getFinanceVendorData(getFinanceVendor?:any) {
  try { 
    const uri = ConfigAPI.vendor;
    const {data} = yield call(baseAPI.get, `${uri}?size=${getFinanceVendor.payload.size}&page=${getFinanceVendor.payload.page}&sort=${getFinanceVendor.payload.sort}&searchKeyword=${getFinanceVendor.payload.SearchKeyword}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getFinanceVendorSuccess({
          payload: data,
          getVendorData:data.data
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        getFinanceVendorFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getFinanceVendorFailure({
        errors: e.message,
      })
    );
  }
}

//This is a function used to IO Dump upload
export function* uploadFinanceIODumpData(getFinanceVendor?:any) {
  try { 
    const uri = ConfigAPI.iodumpUpload;
    const {data} = yield call(baseAPI.post, `${uri}`, getFinanceVendor.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        uploadFinanceIODumpSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        uploadFinanceIODumpFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      uploadFinanceIODumpFailure({
        errors: e.message,
      })
    );
  }
}

export function* reqAddFinanceIODumpeData(getFinanceIODumpe?:any) {
  try { 
    const uri = ConfigAPI.iodump;
    const {data} = yield call(baseAPI.post, `${uri}`, getFinanceIODumpe.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        addFinanceIODumpSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        addFinanceIODumpFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      addFinanceIODumpFailure({
        errors: e.message,
      })
    );
  }
}

export function* editFinanceIODumpData(getFinanceIODump?:any) {
  try { 
    const uri = ConfigAPI.iodump;
    const {data} = yield call(baseAPI.put, `${uri}/${getFinanceIODump.payload.id}`, getFinanceIODump.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        editFinanceIODumpSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        editFinanceIODumpFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      editFinanceIODumpFailure({
        errors: e.message,
      })
    );
  }
}

export function* getFinanceIODumpData(getFinanceIODump?:any) {
  try { 
    const uri = ConfigAPI.iodump;
    const {data} = yield call(baseAPI.get, `${uri}?size=${getFinanceIODump.payload.size}&page=${getFinanceIODump.payload.page}&sort=${getFinanceIODump.payload.sort}&searchKeyword=${getFinanceIODump.payload.SearchKeyword}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getFinanceIODumpSuccess({
          payload: data,
          getIODumpData:data.data
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        getFinanceIODumpFailure({
            errors: data.data,
          })
        );
    }    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getFinanceIODumpFailure({
        errors: e.message,
      })
    );
  }
}

export function* getFinanceRateCardData(getFinanceRateCard?:any) {
  try { 
    const uri = ConfigAPI.getRatecardDetails;
    const {data} = yield call(baseAPI.get, `${uri}?size=${getFinanceRateCard.payload.size}&page=${getFinanceRateCard.payload.page}&sort=${getFinanceRateCard.payload.sort}&searchKeyword=${getFinanceRateCard.payload.SearchKeyword}&filterKeyword=${getFinanceRateCard.payload.filterKeyword}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getFinanceRateCardSuccess({
          payload: data,
          getRateCardMasterData:data.data
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        getFinanceRateCardFailure({
            errors: data.data,
          })
        );
    }    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getFinanceRateCardFailure({
        errors: e.message,
      })
    );
  }
}


//This is a function used to IO Dump
export function* uploadFinanceRateCardData(getFinanceRateCard?:any) {
  try { 
    const uri = ConfigAPI.ratecardupload;
    const {data} = yield call(baseAPI.post, `${uri}`, getFinanceRateCard.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        uploadFinanceRateCardSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        uploadFinanceRateCardFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      uploadFinanceRateCardFailure({
        errors: e.message,
      })
    );
  }
}


//This is a function used to IO Dump
export function* addFinanceRateCardData(getFinanceRateCard?:any) {
  try { 
    const uri = ConfigAPI.ratecard;
    const {data} = yield call(baseAPI.post, `${uri}`, getFinanceRateCard.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        addFinanceRateCardSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        addFinanceRateCardFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      addFinanceRateCardFailure({
        errors: e.message,
      })
    );
  }
}

//This is a function used to IO Dump
export function* editFinanceRateCardData(getFinanceRateCard?:any) {
  try { 
    const uri = ConfigAPI.ratecardBulkmodify;
    const {data} = yield call(baseAPI.post, `${uri}`, getFinanceRateCard.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        editFinanceRateCardSuccess({
          payload: data,
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        editFinanceRateCardFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      editFinanceRateCardFailure({
        errors: e.message,
      })
    );
  }
}

//This is a function used to File Download
export function* downloadFileObjectCommonData(getFinanceRateCard?:any) {
  try { 
    const {data} = yield call(baseAPI.get, `${getFinanceRateCard.payload}`);
    if (data ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        downloadFileObjectCommonSuccess({
          payload: data,
          resFileObject:data
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        downloadFileObjectCommonFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      downloadFileObjectCommonFailure({
        errors: e.message,
      })
    );
  }
}

//This is a function used to File Download
export function* onChangeCostCenterStatusDetail(getChangeBlock?:any) {
  try { 
    const {data} = yield call(baseAPI.delete, `${getChangeBlock.payload}`);
    if (data ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        onChangeCostCenterStatusSuccess({
          payload: data,
          resCostCenterBlock:data
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        onChangeCostCenterStatusFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      onChangeCostCenterStatusFailure({
        errors: e.message,
      })
    );
  }
}

// This is used to action get Completed mark Details
export function* clearStatusDetail(action?: any) {

} 
