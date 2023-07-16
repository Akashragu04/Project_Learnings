import { call, put } from "redux-saga/effects";
import { toast } from 'react-toastify';
import {baseAPI} from '../../services/Service';
import {ConfigAPI} from '../../services/config';
import { getProjectSuccess, getProjectFailure, getProjectOverviewSuccess, 
  getProjectOverviewFailure, getProjectListSuccess, getProjectListFailure, getResourceAllocationFailure, 
  getResourceAllocationSuccess, getSLAListFailure, getSLAListSuccess, postResourceAllocationSuccess, 
  postResourceAllocationFailure, getCapacityManagementSuccess, getCapacityManagementFailure, 
  getTimesheetProjectFailure, getTimesheetProjectSuccess, getTimesheetSLAFailure, getTimesheetSLASuccess, 
  getTimesheetTaskFailure, getTimesheetTaskSuccess, postTimesheetFailure, postTimesheetSuccess, getEmpTimesheetFailure, 
  getEmpTimesheetSuccess, getTaskFailure, getTaskSuccess, getTaskSLAFailure, getTaskSLASuccess, getTaskResourceFailure, 
  getTaskResourceSuccess, getTaskDetailsSuccess, getTaskDetailsFailure, getTaskProjectListSuccess, getTaskProjectListFailure, 
  postTaskFailure, postTaskSuccess, uploadTaskFailure, uploadTaskSuccess, taskFileuploadFailure, taskFileuploadSuccess, 
  capacityResourceFailure, capacityResourceSuccess, capacitySLAFailure, capacitySLASuccess, allocateResourceFailure, 
  allocateResourceSuccess, updateAllocateResourceFailure, updateAllocateResourceSuccess, updateStatusTaskOverviewSuccess, updateStatusTaskOverviewFailure, postChangeCapnitiTaskFailure, postChangeCapnitiTaskSuccess, postReopenTaskFailure, postReopenTaskSuccess} from '../Actions/operation.action';
import { getErrorTokenResponseSuccess } from "saga/Actions";
import { appConstants } from "shared/constants/AppConst";

  
export function* getProjectDetails(getProjectInfo?:any) {
    try { 
      const uri = ConfigAPI.getProject;
      const {data} = yield call(baseAPI.get, `${uri}?size=${getProjectInfo.value.size}&page=${getProjectInfo.value.page}&sort=${getProjectInfo.value.sort}&Serachkeyword=${getProjectInfo.value.Serachkeyword}`);
      if (data.status === true ) {
        // toast(data.message, {position: 'bottom-right'});
        yield put(
            getProjectSuccess({
            payload: data,
            getProjectDetails:data.data
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
            getProjectFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getProjectFailure({
          errors: e.message,
        })
      );
    }
  }

    
export function* getProjectOverviewDetails(getProjectOverview?:any) {
    try { 
      const uri = ConfigAPI.getprojectoverview;
      const {data} = yield call(baseAPI.get, `${uri}${getProjectOverview.value.id}`);
      if (data.status === true ) {
        // toast(data.message, {position: 'bottom-right'});
        yield put(
            getProjectOverviewSuccess({
            payload: data,
            getProjectOverview:data.data
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
            getProjectOverviewFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getProjectOverviewFailure({
          errors: e.message,
        })
      );
    }
  }


  
    
export function* getProjectList() {
  try { 
    const uri = ConfigAPI.getProjectList;
    const {data} = yield call(baseAPI.get, `${uri}`);
    if (data.status === true ) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getProjectListSuccess({
          payload: data,
          getProjectList:data.data
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
        getProjectListFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getProjectListFailure({
        errors: e.message,
      })
    );
  }
}
    
export function* getResourceAllocation(getResourceId?:any) {
  try { 
    const uri = ConfigAPI.getResourceAllocationURL;
    const {data} = yield call(baseAPI.get, `${uri}${getResourceId.value}`);
    if (data.status === true ) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getResourceAllocationSuccess({
          payload: data,
          ResourceAllocation:data.data
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
        getResourceAllocationFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getResourceAllocationFailure({
        errors: e.message,
      })
    );
  }
}
  
    
export function* getSLAListDetails(getResourceId?:any) {
  try { 
    const uri = ConfigAPI.getSLADetails;
    const {data} = yield call(baseAPI.get, `${uri}${getResourceId.value}`);
    if (data.status === true ) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getSLAListSuccess({
          payload: data,
          getSLAList:data.data
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
        getSLAListFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getSLAListFailure({
        errors: e.message,
      })
    );
  }
}
  
    
export function* postResourceAllocationDetails(getResourceAllocation?:any) {
  try { 
    const uri = ConfigAPI.postResourceAllocation;
    const {data} = yield call(baseAPI.post, uri, getResourceAllocation.value);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        postResourceAllocationSuccess({
          payload: data
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
        postResourceAllocationFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      postResourceAllocationFailure({
        errors: e.message,
      })
    );
  }
}
  
    
export function* getCapacityDetails() {
  try { 
    const uri = ConfigAPI.getCapacityManagement;
    const {data} = yield call(baseAPI.get, uri);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getCapacityManagementSuccess({
          payload: data,
          getCapacitylist:data.data
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
        getCapacityManagementFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getCapacityManagementFailure({
        errors: e.message,
      })
    );
  }
}
  
    
export function* getTimesheetProjectDetails(getTimesheetRequest?:any) {
  try { 
    const uri = ConfigAPI.getTimesheetProject;
    const {data} = yield call(baseAPI.get, `${uri}?size=${getTimesheetRequest.value.size}&page=${getTimesheetRequest.value.page}&sort=${getTimesheetRequest.value.sort}&Searchkeyword=${getTimesheetRequest.value.Serachkeyword}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getTimesheetProjectSuccess({
          payload: data,
          getTimesheetData:data.data
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
        getTimesheetProjectFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getTimesheetProjectFailure({
        errors: e.message,
      })
    );
  }
}
  
    
export function* getTimesheetSLAList(getProjectId?:any) {
  try { 
    const uri = ConfigAPI.getTimesheetSlaList;
    const {data} = yield call(baseAPI.get, `${uri}/${getProjectId.payload}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getTimesheetSLASuccess({
          payload: data,
          getTimesheetSLAList:data.data
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
        getTimesheetSLAFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getTimesheetSLAFailure({
        errors: e.message,
      })
    );
  }
}
  
    
export function* getTimesheetTaskList(getSLAId?:any) {
  try { 
    const uri = ConfigAPI.getTimesheetTaskList;
    const {data} = yield call(baseAPI.get, `${uri}${getSLAId.value}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getTimesheetTaskSuccess({
          payload: data,
          getTimesheetTaskList:data.data
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
        getTimesheetTaskFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getTimesheetTaskFailure({
        errors: e.message,
      })
    );
  }
}
    
export function* postTimesheetData(getSLAId?:any) {
  try { 
    const uri = ConfigAPI.getTimesheet;
    const {data} = yield call(baseAPI.post, `${uri}`, getSLAId.value);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        postTimesheetSuccess({
          payload: data
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
        postTimesheetFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      postTimesheetFailure({
        errors: e.message,
      })
    );
  }
}
  
    
export function* getEmpTimesheetData(getSLAId?:any) {
  try { 
    const uri = ConfigAPI.getTimesheetByProject;
    const {data} = yield call(baseAPI.get, `${uri}${getSLAId.value.project_id}?size=${getSLAId.value.size}&page=${getSLAId.value.page}&sort=${getSLAId.value.sort}&Searchkeyword=${getSLAId.value.Serachkeyword}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getEmpTimesheetSuccess({
          payload: data,
          getEmployeeTimesheetList:data.data
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
        getEmpTimesheetFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getEmpTimesheetFailure({
        errors: e.message,
      })
    );
  }
}
  
// This is function used to task list
export function* getTaskProjectDetails(getTaskProject?:any) {
  try { 
    const uri = ConfigAPI.postTask;
    const {data} = yield call(baseAPI.get, `${uri}?size=${getTaskProject.value.size}&page=${getTaskProject.value.page}&sort=${getTaskProject.value.sort}&Searchkeyword=${getTaskProject.value.Serachkeyword}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getTaskSuccess({
          payload: data,
          resTaskData:data.data
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
        getTaskFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getTaskFailure({
        errors: e.message,
      })
    );
  }
}

    
export function* getTaskSLAList(getSLAId?:any) {
  try { 
    const uri = ConfigAPI.getSLAByProject;
    const {data} = yield call(baseAPI.get, `${uri}${getSLAId.payload}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getTaskSLASuccess({
          payload: data,
          resTaskSLA:data.data
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
        getTaskSLAFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getTaskSLAFailure({
        errors: e.message,
      })
    );
  }
}

    
export function* getTaskResourceList(getSLAId?:any) {
  try { 
    const uri = ConfigAPI.getResourceList;
    const {data} = yield call(baseAPI.get, `${uri}${getSLAId.value}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getTaskResourceSuccess({
          payload: data,
          resResourceData:data.data
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
        getTaskResourceFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getTaskResourceFailure({
        errors: e.message,
      })
    );
  }
}

    
export function* getTaskViewDetails(getTaskId?:any) {
  try { 
    const uri = ConfigAPI.getTaskList;
    const {data} = yield call(baseAPI.get, `${uri}${getTaskId.value}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getTaskDetailsSuccess({
          payload: data,
          getTaskView:data.data
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
        getTaskDetailsFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getTaskDetailsFailure({
        errors: e.message,
      })
    );
  }
}

    
export function* getTaskProject() {
  try { 
    const uri = ConfigAPI.getTaskProject;
    const {data} = yield call(baseAPI.get, `${uri}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getTaskProjectListSuccess({
          payload: data,
          resTaskProject:data.data
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
        getTaskProjectListFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getTaskProjectListFailure({
        errors: e.message,
      })
    );
  }
}

    
export function* postTaskData(postTask?:any) {
  try { 
    const uri = ConfigAPI.postTask;
    const {data} = yield call(baseAPI.post, `${uri}`, postTask.value);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        postTaskSuccess({
          payload: data
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
        postTaskFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      postTaskFailure({
        errors: e.message,
      })
    );
  }
}

    
export function* uploadTaskDetails(getTaskId?:any) {
  try { 
    const uri = ConfigAPI.postTask;
    const {data} = yield call(baseAPI.get, `${uri}/${getTaskId.value}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        uploadTaskSuccess({
          payload: data
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
        uploadTaskFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      uploadTaskFailure({
        errors: e.message,
      })
    );
  }
}

    
export function* taskFileuploadData(getFileUploadData?:any) {
  try { 
    const uri = ConfigAPI.taskFileUpload;
    const {data} = yield call(baseAPI.post, `${uri}`, getFileUploadData.value);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        taskFileuploadSuccess({
          payload: data,
          resTaskFileUpload:data.data
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
        taskFileuploadFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      taskFileuploadFailure({
        errors: e.message,
      })
    );
  }
}

    
export function* capacityResourceView() {
  try { 
    const uri = ConfigAPI.getResourceView;
    const {data} = yield call(baseAPI.get, `${uri}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        capacityResourceSuccess({
          payload: data,
          resCapacityResource:data.data
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
        capacityResourceFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      capacityResourceFailure({
        errors: e.message,
      })
    );
  }
}


    
export function* capacitySLAView() {
  try { 
    const uri = ConfigAPI.getSLAViews;
    const {data} = yield call(baseAPI.get, `${uri}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        capacitySLASuccess({
          payload: data,
          getCapacitySLA:data.data
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
        capacitySLAFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      capacitySLAFailure({
        errors: e.message,
      })
    );
  }
}

    
export function* allocateResourceData(getAllocationRes?:any) {
  try { 
    const uri = ConfigAPI.mapResourceData;
    const {data} = yield call(baseAPI.post, `${uri}${getAllocationRes.payload.project_code}/${getAllocationRes.payload.sla_code}`, getAllocationRes.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        allocateResourceSuccess({
          payload: data
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
        allocateResourceFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      allocateResourceFailure({
        errors: e.message,
      })
    );
  }
}

    
export function* updateAllocateResourceData(getAllocationRes?:any) {
  try { 
    const uri = ConfigAPI.updateResourceAllocation;
    const {data} = yield call(baseAPI.put, `${uri}${getAllocationRes.payload.id}`, getAllocationRes.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        updateAllocateResourceSuccess({
          payload: data
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
        updateAllocateResourceFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      updateAllocateResourceFailure({
        errors: e.message,
      })
    );
  }
}

    
export function* updateStatusTaskOverviewData(getAllocationRes?:any) {
  try { 
    const uri = ConfigAPI.postTaskUpdate;
    const {data} = yield call(baseAPI.get, `${uri}/${getAllocationRes.payload.task_id}/${getAllocationRes.payload.status}`);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        updateStatusTaskOverviewSuccess({
          payload: data
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
        updateStatusTaskOverviewFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      updateStatusTaskOverviewFailure({
        errors: e.message,
      })
    );
  }
}
    
export function* postChangeCapnitiTaskData(getAllocationRes?:any) {
  try { 
    const uri = ConfigAPI.setCapinitiandTask;
    const {data} = yield call(baseAPI.get, `${uri}/${getAllocationRes.payload.slaid}/${getAllocationRes.payload.capniti_enable}/${getAllocationRes.payload.task_enable}/${getAllocationRes.payload.error_factor}`);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        postChangeCapnitiTaskSuccess({
          payload: data
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
        postChangeCapnitiTaskFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      postChangeCapnitiTaskFailure({
        errors: e.message,
      })
    );
  }
}
    
export function* postReopenTaskData(getPostValues?:any) {
  try { 
    const uri = ConfigAPI.reopenTaskDetails;
    const {data} = yield call(baseAPI.post, `${uri}/${getPostValues.payload.taskid}/${getPostValues.payload.reopenstatus}`, getPostValues.payload.reCommentPost);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        postReopenTaskSuccess({
          payload: data
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
        postReopenTaskFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      postReopenTaskFailure({
        errors: e.message,
      })
    );
  }
}

// This is used to action get Completed mark Details
export function* ClearCapnitiDetailsData(action?: any) {

} 