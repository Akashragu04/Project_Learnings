export enum ActionTypes {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  RESET_CUSTOMER_VALIDATION = 'RESET_CUSTOMER_VALIDATION',
  GUEST_CUSTOMER_VALIDATION_REQUEST = 'GUEST_CUSTOMER_VALIDATION_REQUEST',
  GUEST_CUSTOMER_VALIDATION_SUCCESS = 'GUEST_CUSTOMER_VALIDATION_SUCCESS',
  GUEST_CUSTOMER_VALIDATION_ERROR = 'GUEST_CUSTOMER_VALIDATION_ERROR',
  RESET_PUSH_NOTIFICATION_REQUEST = 'RESET_PUSH_NOTIFICATION_REQUEST',
  REMOVE_PUSH_NOTIFICATION_REQUEST = 'REMOVE_PUSH_NOTIFICATION_REQUEST',
  REMOVE_PUSH_NOTIFICATION_SUCCESS = 'REMOVE_PUSH_NOTIFICATION_SUCCESS',
  REMOVE_PUSH_NOTIFICATION_ERROR = 'REMOVE_PUSH_NOTIFICATION_ERROR',
  CLEAR_REQUEST = 'CLEAR_REQUEST',
  CLEAR_SUCCESS = 'CLEAR_SUCCESS',
  CLEAR_ERROR = 'CLEAR_ERROR',
  FORGOTPASSWORD_REQUEST = 'FORGOTPASSWORD_REQUEST',
  FORGOTPASSWORD_SUCCESS = 'FORGOTPASSWORD_SUCCESS',
  FORGOTPASSWORD_ERROR = 'FORGOTPASSWORD_ERROR',
  CHANGEPASSWORD_REQUEST = 'CHANGEPASSWORD_REQUEST',
  CHANGEPASSWORD_SUCCESS = 'CHANGEPASSWORD_SUCCESS',
  CHANGEPASSWORD_ERROR = 'CHANGEPASSWORD_ERROR',
  LOGOUT_REQUEST = 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_ERROR = 'LOGOUT_ERROR',
  GETDATA_REQUEST = 'GETDATA_REQUEST',
  GETDATA_SUCCESS = 'GETDATA_SUCCESS',
  GETDATA_ERROR = 'GETDATA_ERROR',
  PROFILE_RESET = 'PROFILE_RESET',
  GET_LEADS_REQUEST = 'GET_LEADS_REQUEST',
  GET_LEADS_SUCCESS = 'GET_LEADS_SUCCESS',
  GET_LEADS_ERROR = 'GET_LEADS_ERROR',
  ADD_LEADS_REQUEST = 'ADD_LEADS_REQUEST',
  ADD_LEADS_SUCCESS = 'ADD_LEADS_SUCCESS',
  ADD_LEADS_ERROR = 'ADD_LEADS_ERROR',
  GET_USERDETAILS_REQUEST = 'GET_USERDETAILS_REQUEST',
  GET_USERDETAILS_SUCCESS = 'GET_USERDETAILS_SUCCESS',
  GET_USERDETAILS_ERROR = 'GET_USERDETAILS_ERROR',
  ASSIGN_PROJECT_REQUEST = 'ASSIGN_PROJECT_REQUEST',
  ASSIGN_PROJECT_SUCCESS = 'ASSIGN_PROJECT_SUCCESS',
  ASSIGN_PROJECT_ERROR = 'ASSIGN_PROJECT_ERROR',
  GET_LEADS_DATA_REQUEST = 'GET_LEADS_DATA_REQUEST',
  GET_LEADS_DATA_SUCCESS = 'GET_LEADS_DATA_SUCCESS',
  GET_LEADS_DATA_ERROR = 'GET_LEADS_DATA_ERROR',
  UPDATE_LEADS_DATA_REQUEST = 'UPDATE_LEADS_DATA_REQUEST',
  UPDATE_LEADS_DATA_SUCCESS = 'UPDATE_LEADS_DATA_SUCCESS',
  UPDATE_LEADS_DATA_ERROR = 'UPDATE_LEADS_DATA_ERROR',
  CLEAR_BUSINESS_REQUEST = 'CLEAR_BUSINESS_REQUEST',
  CLEAR_BUSINESS_SUCCESS = 'CLEAR_BUSINESS_SUCCESS',
  TOKEN_VALIDATION_REQUEST = 'TOKEN_VALIDATION_REQUEST',
  TOKEN_VALIDATION_SUCCESS = 'TOKEN_VALIDATION_SUCCESS',
  TOKEN_VALIDATION_ERROR = 'TOKEN_VALIDATION_ERROR',
  GET_BUSINESS_CASE_REQUEST = 'GET_BUSINESS_CASE_REQUEST',
  GET_BUSINESS_CASE_SUCCESS = 'GET_BUSINESS_CASE_SUCCESS',
  GET_BUSINESS_CASE_ERROR = 'GET_BUSINESS_CASE_ERROR',
  BUSINESS_CASE_APPROVEL_REQUEST = 'BUSINESS_CASE_APPROVEL_REQUEST',
  BUSINESS_CASE_APPROVEL_SUCCESS = 'BUSINESS_CASE_APPROVEL_SUCCESS',
  BUSINESS_CASE_APPROVEL_ERROR = 'BUSINESS_CASE_APPROVEL_ERROR',
  MAIL_BUSINESS_CASE_APPROVEL_REQUEST = 'MAIL_BUSINESS_CASE_APPROVEL_REQUEST',
  MAIL_BUSINESS_CASE_APPROVEL_SUCCESS = 'MAIL_BUSINESS_CASE_APPROVEL_SUCCESS',
  MAIL_BUSINESS_CASE_APPROVEL_ERROR = 'MAIL_BUSINESS_CASE_APPROVEL_ERROR',
  IMAGE_DELETE_REQUEST = 'IMAGE_DELETE_REQUEST',
  IMAGE_DELETE_SUCCESS = 'IMAGE_DELETE_SUCCESS',
  IMAGE_DELETE_ERROR = 'IMAGE_DELETE_ERROR',
  RESEND_MAIL_REQUEST = 'RESEND_MAIL_REQUEST',
  RESEND_MAIL_SUCCESS = 'RESEND_MAIL_SUCCESS',
  RESEND_MAIL_ERROR = 'RESEND_MAIL_ERROR',
  LEADS_CONVERSION_REQUEST = 'LEADS_CONVERSION_REQUEST',
  LEADS_CONVERSION_SUCCESS = 'LEADS_CONVERSION_SUCCESS',
  LEADS_CONVERSION_ERROR = 'LEADS_CONVERSION_ERROR',
  GET_DEPARTMENT_REQUEST = 'GET_DEPARTMENT_REQUEST',
  GET_DEPARTMENT_SUCCESS = 'GET_DEPARTMENT_SUCCESS',
  GET_DEPARTMENT_ERROR = 'GET_DEPARTMENT_ERROR',
  GET_STEPPER_REQUEST = 'GET_STEPPER_REQUEST',
  GET_STEPPER_SUCCESS = 'GET_STEPPER_SUCCESS',
  GET_STEPPER_ERROR = 'GET_STEPPER_ERROR',
  GET_CUSTOMER_AND_BUSINESS_REQUEST = 'GET_CUSTOMER_AND_BUSINESS_REQUEST',
  GET_CUSTOMER_AND_BUSINESS_SUCCESS = 'GET_CUSTOMER_AND_BUSINESS_SUCCESS',
  GET_CUSTOMER_AND_BUSINESS_ERROR = 'GET_STEPPER_GET_CUSTOMER_AND_BUSINESS_RROR',
  SET_COMMON_FILEUPLOAD_RESET = 'SET_COMMON_FILEUPLOAD_RESET',
  SET_COMMON_FILEUPLOAD_REQUEST = 'SET_COMMON_FILEUPLOAD_REQUEST',
  SET_COMMON_FILEUPLOAD_SUCCESS = 'SET_COMMON_FILEUPLOAD_SUCCESS',
  SET_COMMON_FILEUPLOAD_FAILURE = 'SET_COMMON_FILEUPLOAD_FAILURE',
  CLEAR_AUTH_REQUEST='CLEAR_AUTH_REQUEST',
  CLEAR_AUTH_SUCCESS='CLEAR_AUTH_SUCCESS',
  CLEAR_AUTH_ERROR='CLEAR_AUTH_ERROR',
  TOKEN_ERROR_CHECK_REQUEST='TOKEN_ERROR_CHECK_REQUEST',
  TOKEN_ERROR_CHECK_SUCCESS='TOKEN_ERROR_CHECK_SUCCESS',
  TOKEN_ERROR_CHECK_ERROR='TOKEN_ERROR_CHECK_ERROR',
}
export enum BusinessRequirementTypes {
  INIT_BIZ_REQUIREMENTS = 'INIT_BIZ_REQUIREMENTS',
  CREATE_BIZ_REQUIREMENTS = 'CREATE_BIZ_REQUIREMENTS',
  CREATE_BIZ_REQUIREMENTS_SUCCESS = 'CREATE_BIZ_REQUIREMENTS_SUCCESS',
  CREATE_BIZ_REQUIREMENTS_FAILURE = 'CREATE_BIZ_REQUIREMENTS_FAILURE',
  GET_BIZ_REQUIREMENT_DETAILS = 'GET_BIZ_REQUIREMENT_DETAILS',
  GET_BIZ_REQUIREMENT_SUCCESS = 'GET_BIZ_REQUIREMENT_SUCCESS',
  GET_BIZ_REQUIREMENT_FAILURE = 'GET_BIZ_REQUIREMENT_FAILURE',
  GET_BIZ_ITERATION_DETAILS = 'GET_BIZ_ITERATION_DETAILS',
  GET_BIZ_ITERATION_DETAILS_SUCCESS = 'GET_BIZ_ITERATION_DETAILS_SUCCESS',
  GET_BIZ_ITERATION_DETAILS_FAILURE = 'GET_BIZ_ITERATION_DETAILS_FAILURE',
  SAVEANDNOTIFYALL_BIZ_REQUIREMENTS_REQUEST = 'SAVEANDNOTIFYALL_BIZ_REQUIREMENTS_REQUEST',
  SAVEANDNOTIFYALL_BIZ_REQUIREMENTS_SUCCESS = 'SAVEANDNOTIFYALL_BIZ_REQUIREMENTS_SUCCESS',
  SAVEANDNOTIFYALL_BIZ_REQUIREMENTS_FAILURE = 'SAVEANDNOTIFYALL_BIZ_REQUIREMENTS_FAILURE',
  SAVEANDNOTIFY_BIZ_REQUIREMENTS_REQUEST = 'SAVEANDNOTIFY_BIZ_REQUIREMENTS_REQUEST',
  SAVEANDNOTIFY_BIZ_REQUIREMENTS_SUCCESS = 'SAVEANDNOTIFY_BIZ_REQUIREMENTS_SUCCESS',
  SAVEANDNOTIFY_BIZ_REQUIREMENTS_FAILURE = 'SAVEANDNOTIFY_BIZ_REQUIREMENTS_FAILURE',
  UPDATE_BIZ_REQUIREMENTS_REQUEST = 'UPDATE_BIZ_REQUIREMENTS_REQUEST',
  UPDATE_BIZ_REQUIREMENTS_SUCCESS = 'UPDATE_BIZ_REQUIREMENTS_SUCCESS',
  UPDATE_BIZ_REQUIREMENTS_FAILURE = 'UPDATE_BIZ_REQUIREMENTS_FAILURE',
  GET_HR_USERDETAILS_REQUEST = 'GET_HR_USERDETAILS_REQUEST',
  GET_HR_USERDETAILS_SUCCESS = 'GET_HR_USERDETAILS_SUCCESS',
  GET_HR_USERDETAILS_ERROR = 'GET_HR_USERDETAILS_ERROR',
  GET_FACILITY_USERDETAILS_REQUEST = 'GET_FACILITY_USERDETAILS_REQUEST',
  GET_FACILITY_USERDETAILS_SUCCESS = 'GET_FACILITY_USERDETAILS_SUCCESS',
  GET_FACILITY_USERDETAILS_ERROR = 'GET_FACILITY_USERDETAILS_ERROR',
  GET_IT_USERDETAILS_REQUEST = 'GET_IT_USERDETAILS_REQUEST',
  GET_IT_USERDETAILS_SUCCESS = 'GET_IT_USERDETAILS_SUCCESS',
  GET_IT_USERDETAILS_ERROR = 'GET_IT_USERDETAILS_ERROR',
  GET_EXISTING_RATECARD_LIST_REQUEST = 'GET_EXISTING_RATECARD_LIST_REQUEST',
  GET_EXISTING_RATECARD_LIST_SUCCESS = 'GET_EXISTING_RATECARD_LIST_SUCCESS',
  GET_EXISTING_RATECARD_LIST_ERROR = 'GET_EXISTING_RATECARD_LIST_ERROR',
  RESET_ACTIVE_RAMPUPDATA_ACTION = 'RESET_ACTIVE_RAMPUPDATA_ACTION',
  SET_ACTIVE_RAMPUPDATA_REQUEST = 'SET_ACTIVE_RAMPUPDATA_REQUEST',
  SET_ACTIVE_RAMPUPDATA_SUCCESS = 'SET_ACTIVE_RAMPUPDATA_SUCCESS',
  SET_ACTIVE_RAMPUPDATA_ERROR = 'SET_ACTIVE_RAMPUPDATA_ERROR',
  GET_FINANCE_USERDETAILS_REQUEST = 'GET_FINANCE_USERDETAILS_REQUEST',
  GET_FINANCE_USERDETAILS_SUCCESS = 'GET_FINANCE_USERDETAILS_SUCCESS',
  GET_FINANCE_USERDETAILS_ERROR = 'GET_FINANCE_USERDETAILS_ERROR',
  SEND_FINANCE_BIZ_EMAIL_REQUEST = 'SEND_FINANCE_BIZ_EMAIL_REQUEST',
  SEND_FINANCE_BIZ_EMAIL_SUCCESS = 'SEND_FINANCE_BIZ_EMAIL_SUCCESS',
  SEND_FINANCE_BIZ_EMAIL_ERROR = 'SEND_FINANCE_BIZ_EMAIL_ERROR',
  INIT_BIZ_PROFITLOSS_CALCULATION = 'INIT_BIZ_PROFITLOSS_CALCULATION',
  UPDATE_BIZ_PROFITLOSS_CALCULATION_REQUEST = 'UPDATE_BIZ_PROFITLOSS_CALCULATION_REQUEST',
  UPDATE_BIZ_PROFITLOSS_CALCULATION_SUCCESS = 'UPDATE_BIZ_PROFITLOSS_CALCULATION_SUCCESS',
  UPDATE_BIZ_PROFITLOSS_CALCULATION_FAILURE = 'UPDATE_BIZ_PROFITLOSS_CALCULATION_FAILURE',
  GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_REQUEST = 'GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_REQUEST',
  GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_SUCCESS = 'GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_SUCCESS',
  GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_FAILURE = 'GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_FAILURE',
  GET_BIZ_PROFITLOSS_CALCULATION_LIST_REQUEST = 'GET_BIZ_PROFITLOSS_CALCULATION_LIST_REQUEST',
  GET_BIZ_PROFITLOSS_CALCULATION_LIST_SUCCESS = 'GET_BIZ_PROFITLOSS_CALCULATION_LIST_SUCCESS',
  GET_BIZ_PROFITLOSS_CALCULATION_LIST_FAILURE = 'GET_BIZ_PROFITLOSS_CALCULATION_LIST_FAILURE',
  GET_BIZ_PROFITLOSS_ITERATION_DETAIL_REQUEST = 'GET_BIZ_PROFITLOSS_ITERATION_DETAIL_REQUEST',
  GET_BIZ_PROFITLOSS_ITERATION_DETAIL_SUCCESS = 'GET_BIZ_PROFITLOSS_ITERATION_DETAIL_SUCCESS',
  GET_BIZ_PROFITLOSS_ITERATION_DETAIL_FAILURE = 'GET_BIZ_PROFITLOSS_ITERATION_DETAIL_FAILURE',
  UPDATE_FINAL_BIZ_PROFITLOSS_REQUEST = 'UPDATE_FINAL_BIZ_PROFITLOSS_REQUEST',
  UPDATE_FINAL_BIZ_PROFITLOSS_SUCCESS = 'UPDATE_FINAL_BIZ_PROFITLOSS_SUCCESS',
  UPDATE_FINAL_BIZ_PROFITLOSS_FAILURE = 'UPDATE_FINAL_BIZ_PROFITLOSS_FAILURE',
  SET_REQUIREMENT_WITHOUT_BIZCASE_REQUEST = 'SET_REQUIREMENT_WITHOUT_BIZCASE_REQUEST',
  SET_REQUIREMENT_WITHOUT_BIZCASES_SUCCESS = 'SET_REQUIREMENT_WITHOUT_BIZCASES_SUCCESS',
  SET_REQUIREMENT_WITHOUT_BIZCASE_FAILURE = 'SET_REQUIREMENT_WITHOUT_BIZCASE_FAILURE',
}

export enum BusinessCalculationTypes {
  INIT_BIZ_PROFITLOSS_CALCULATION = 'INIT_BIZ_PROFITLOSS_CALCULATION',
  INIT_BIZ_PROFITLOSS_ITERATION_DETAIL = 'INIT_BIZ_PROFITLOSS_ITERATION_DETAIL',
  UPDATE_BIZ_PROFITLOSS_CALCULATION_REQUEST = 'UPDATE_BIZ_PROFITLOSS_CALCULATION_REQUEST',
  UPDATE_BIZ_PROFITLOSS_CALCULATION_SUCCESS = 'UPDATE_BIZ_PROFITLOSS_CALCULATION_SUCCESS',
  UPDATE_BIZ_PROFITLOSS_CALCULATION_FAILURE = 'UPDATE_BIZ_PROFITLOSS_CALCULATION_FAILURE',
  GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_REQUEST = 'GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_REQUEST',
  GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_SUCCESS = 'GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_SUCCESS',
  GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_FAILURE = 'GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_FAILURE',
  GET_BIZ_PROFITLOSS_CALCULATION_LIST_REQUEST = 'GET_BIZ_PROFITLOSS_CALCULATION_LIST_REQUEST',
  GET_BIZ_PROFITLOSS_CALCULATION_LIST_SUCCESS = 'GET_BIZ_PROFITLOSS_CALCULATION_LIST_SUCCESS',
  GET_BIZ_PROFITLOSS_CALCULATION_LIST_FAILURE = 'GET_BIZ_PROFITLOSS_CALCULATION_LIST_FAILURE',
  GET_BIZ_PROFITLOSS_ITERATION_DETAIL_REQUEST = 'GET_BIZ_PROFITLOSS_ITERATION_DETAIL_REQUEST',
  GET_BIZ_PROFITLOSS_ITERATION_DETAIL_SUCCESS = 'GET_BIZ_PROFITLOSS_ITERATION_DETAIL_SUCCESS',
  GET_BIZ_PROFITLOSS_ITERATION_DETAIL_FAILURE = 'GET_BIZ_PROFITLOSS_ITERATION_DETAIL_FAILURE',
  UPDATE_FINAL_BIZ_PROFITLOSS_REQUEST = 'UPDATE_FINAL_BIZ_PROFITLOSS_REQUEST',
  UPDATE_FINAL_BIZ_PROFITLOSS_SUCCESS = 'UPDATE_FINAL_BIZ_PROFITLOSS_SUCCESS',
  UPDATE_FINAL_BIZ_PROFITLOSS_FAILURE = 'UPDATE_FINAL_BIZ_PROFITLOSS_FAILURE',
}

export enum BizJDMappingTypes {
  INIT_BIZ_JDMAPPINGS = 'INIT_BIZ_JDMAPPINGS',
  CREATE_BIZ_JDMAPPINGS = 'CREATE_BIZ_JDMAPPINGS',
  CREATE_BIZ_JDMAPPINGS_SUCCESS = 'CREATE_BIZ_JDMAPPINGS_SUCCESS',
  CREATE_BIZ_JDMAPPINGS_FAILURE = 'CREATE_BIZ_JDMAPPINGS_FAILURE',
  GET_BIZ_PROJECT_DETAILS = 'GET_BIZ_PROJECT_DETAILS',
  GET_BIZ_PROJECT_SUCCESS = 'GET_BIZ_PROJECT_SUCCESS',
  GET_BIZ_PROJECT_FAILURE = 'GET_BIZ_PROJECT_FAILURE',
  GET_BIZ_JDMAPPINGS_DETAILS = 'GET_BIZ_JDMAPPINGS_DETAILS',
  GET_BIZ_JDMAPPINGS_SUCCESS = 'GET_BIZ_JDMAPPINGS_SUCCESS',
  GET_BIZ_JDMAPPINGS_FAILURE = 'GET_BIZ_JDMAPPINGS_FAILURE',
  CREATE_JDASSIGN_AND_MAPPINGS = 'CREATE_JDASSIGN_AND_MAPPINGS',
  CREATE_JDASSIGN_AND_MAPPINGS_SUCCESS = 'CREATE_JDASSIGN_AND_MAPPINGS_SUCCESS',
  CREATE_JDASSIGN_AND_MAPPINGS_FAILURE = 'CREATE_JDASSIGN_AND_MAPPINGS_FAILURE',
  SET_JDFILE_UPLOAD_RESET = 'SET_JDFILE_UPLOAD_RESET',
  SET_JDFILE_UPLOAD = 'SET_JDFILE_UPLOAD',
  SET_JDFILE_UPLOAD_SUCCESS = 'SET_JDFILE_UPLOAD_SUCCESS',
  SET_JDFILE_UPLOAD_FAILURE = 'SET_JDFILE_UPLOAD_FAILURE',
  GET_JDLIST_DETAILS_ACTION = 'GET_JDLIST_DETAILS_ACTION',
  GET_JDLIST_DETAILS_SUCCESS = 'GET_JDLIST_DETAILS_SUCCESS',
  GET_JDLIST_DETAILS_FAILURE = 'GET_JDLIST_DETAILS_FAILURE',
  SET_REMOVE_JDMAP_FILES = 'SET_REMOVE_JDMAP_FILES',
  SET_REMOVE_JDMAP_FILES_SUCCESS = 'SET_REMOVE_JDMAP_FILES_SUCCESS',
  SET_REMOVE_JDMAP_FILES_FAILURE = 'SET_REMOVE_JDMAP_FILES_FAILURE',
}

export enum FinanceProcessTypes {
  INIT_FINANCE_RATECARD = 'INIT_FINANCE_RATECARD',
  INIT_FINANCE_UPDATE_RATECARD_RESET = 'INIT_FINANCE_UPDATE_RATECARD_RESET',
  UPDATE_FINANCE_RATECARD_REQUEST = 'UPDATE_FINANCE_RATECARD_REQUEST',
  UPDATE_FINANCE_RATECARD_REQUEST_SUCCESS = 'UPDATE_FINANCE_RATECARD_REQUEST_SUCCESS',
  UPDATE_FINANCE_RATECARD_REQUEST_FAILURE = 'UPDATE_FINANCE_RATECARD_REQUEST_FAILURE',
  GET_ALL_FINANCE_RATECARD_DETAILS = 'GET_ALL_FINANCE_RATECARD_DETAILS',
  GET_ALL_FINANCE_RATECARD_DETAILS_SUCCESS = 'GET_ALL_FINANCE_RATECARD_DETAILS_SUCCESS',
  GET_ALL_FINANCE_RATECARD_DETAILS_FAILURE = 'GET_ALL_FINANCE_RATECARD_DETAILS_FAILURE',
  GET_FINANCE_RATECARD_DETAILS = 'GET_FINANCE_RATECARD_DETAILS',
  GET_FINANCE_RATECARD_DETAILS_SUCCESS = 'GET_FINANCE_RATECARD_DETAILS_SUCCESS',
  GET_FINANCE_RATECARD_DETAILS_FAILURE = 'GET_FINANCE_RATECARD_DETAILS_FAILURE',
  INIT_FINANCE_ACCURALS = 'INIT_FINANCE_ACCURALS',
  INIT_FINANCE_ACCURALS_FILE_REQUEST = 'INIT_FINANCE_ACCURALS_FILE_REQUEST',
  GET_ALL_FINANCE_ACCURALS_DETAILS = 'GET_ALL_FINANCE_ACCURALS_DETAILS',
  GET_ALL_FINANCE_ACCURALS_DETAILS_SUCCESS = 'GET_ALL_FINANCE_ACCURALS_DETAILS_SUCCESS',
  GET_ALL_FINANCE_ACCURALS_DETAILS_FAILURE = 'GET_ALL_FINANCE_ACCURALS_DETAILS_FAILURE',
  GET_FINANCE_ACCURALS_DETAILS_RESPONSE = 'GET_FINANCE_ACCURALS_DETAILS_RESPONSE',
  GET_FINANCE_ACCURALS_DETAILS_SUCCESS = 'GET_FINANCE_ACCURALS_DETAILS_SUCCESS',
  GET_FINANCE_ACCURALS_DETAILS_FAILURE = 'GET_FINANCE_ACCURALS_DETAILS_FAILURE',
  UPDATE_ACCURALS_DETAILS_REQUEST = 'UPDATE_ACCURALS_DETAILS_REQUEST',
  UPDATE_ACCURALS_DETAILS_SUCCESS = 'UPDATE_ACCURALS_DETAILS_SUCCESS',
  UPDATE_ACCURALS_DETAILS_FAILURE = 'UPDATE_ACCURALS_DETAILS_FAILURE',
  SET_ACCURAL_UPLOAD_FILE = 'SET_ACCURAL_UPLOAD_FILE',
  SET_ACCURAL_UPLOAD_FILE_SUCCESS = 'SET_ACCURAL_UPLOAD_FILE_SUCCESS',
  SET_ACCURAL_UPLOAD_FILE_FAILURE = 'SET_ACCURAL_UPLOAD_FILE_FAILURE',
  DOWNLOAD_ACCURAL_DETAILS_REQUEST = 'DOWNLOAD_ACCURAL_DETAILS_REQUEST',
  DOWNLOAD_ACCURAL_DETAILS_REQUEST_SUCCESS = 'DOWNLOAD_ACCURAL_DETAILS_REQUEST_SUCCESS',
  DOWNLOAD_ACCURAL_DETAILS_REQUEST_FAILURE = 'DOWNLOAD_ACCURAL_DETAILS_REQUEST_FAILURE',
  INIT_FINANCE_COST_CENTER_YTD = 'INIT_FINANCE_COST_CENTER_YTD',
  GET_ALL_FINANCE_COST_CENTER_YTD_DETAILS = 'GET_ALL_FINANCE_COST_CENTER_YTD_DETAILS',
  GET_ALL_FINANCE_COST_CENTER_YTD_SUCCESS = 'GET_ALL_FINANCE_COST_CENTER_YTD_SUCCESS',
  GET_ALL_FINANCE_COST_CENTER_YTD_FAILURE = 'GET_ALL_FINANCE_COST_CENTER_YTD_FAILURE',
  GET_FINANCE_COST_CENTER_YTD_DETAILS = 'GET_FINANCE_COST_CENTER_YTD_DETAILS',
  GET_FINANCE_COST_CENTER_YTD_SUCCESS = 'GET_FINANCE_COST_CENTER_YTD_SUCCESS',
  GET_FINANCE_COST_CENTER_YTD_FAILURE = 'GET_FINANCE_COST_CENTER_YTD_FAILURE',
  SET_COSTCENTER_YTD_UPLOAD_REQUEST = 'SET_COSTCENTER_YTD_UPLOAD_REQUEST',
  SET_COSTCENTER_YTD_UPLOAD_SUCCESS = 'SET_COSTCENTER_YTD_UPLOAD_SUCCESS',
  SET_COSTCENTER_YTD_UPLOAD_FAILURE = 'SET_COSTCENTER_YTD_UPLOAD_FAILURE',
  INIT_FINANCE_ENTITYMASTER = 'INIT_FINANCE_ENTITYMASTER',
  GET_ALL_FINANCE_ENTITYMASTER_DETAILS = 'GET_ALL_FINANCE_ENTITYMASTER_DETAILS',
  GET_ALL_FINANCE_ENTITYMASTER_SUCCESS = 'GET_ALL_FINANCE_ENTITYMASTER_SUCCESS',
  GET_ALL_FINANCE_ENTITYMASTER_FAILURE = 'GET_ALL_FINANCE_ENTITYMASTER_FAILURE',
  CREATE_ENTITY_MASTER_REQUEST = 'CREATE_ENTITY_MASTER_REQUEST',
  CREATE_ENTITY_MASTER_REQUEST_SUCCESS = 'CREATE_ENTITY_MASTER_REQUEST_SUCCESS',
  CREATE_ENTITY_MASTER_REQUEST_FAILURE = 'CREATE_ENTITY_MASTER_REQUEST_FAILURE',
  UPDATE_ENTITY_MASTER_REQUEST = 'UPDATE_ENTITY_MASTER_REQUEST',
  UPDATE_ENTITY_MASTER_REQUEST_SUCCESS = 'UPDATE_ENTITY_MASTER_REQUEST_SUCCESS',
  UPDATE_ENTITY_MASTER_REQUEST_FAILURE = 'UPDATE_ENTITY_MASTER_REQUEST_FAILURE',
  SET_ENTITYMASTER_UPLOAD_REQUEST = 'SET_ENTITYMASTER_UPLOAD_REQUEST',
  SET_ENTITYMASTER_UPLOAD_SUCCESS = 'SET_ENTITYMASTER_UPLOAD_SUCCESS',
  SET_ENTITYMASTER_UPLOAD_FAILURE = 'SET_ENTITYMASTER_UPLOAD_FAILURE',
  INIT_FINANCE_MATERIALMASTER = 'INIT_FINANCE_MATERIALMASTER',
  GET_ALL_FINANCE_MATERIALMASTER_DETAILS = 'GET_ALL_FINANCE_MATERIALMASTER_DETAILS',
  GET_ALL_FINANCE_MATERIALMASTER_SUCCESS = 'GET_ALL_FINANCE_MATERIALMASTER_SUCCESS',
  GET_ALL_FINANCE_MATERIALMASTER_FAILURE = 'GET_ALL_FINANCE_MATERIALMASTER_FAILURE',
  CREATE_MATERIAL_MASTER_REQUEST = 'CREATE_MATERIAL_MASTER_REQUEST',
  CREATE_MATERIAL_MASTER_REQUEST_SUCCESS = 'CREATE_MATERIAL_MASTER_REQUEST_SUCCESS',
  CREATE_MATERIAL_MASTER_REQUEST_FAILURE = 'CREATE_MATERIAL_MASTER_REQUEST_FAILURE',
  UPDATE_MATERIAL_MASTER_REQUEST = 'UPDATE_MATERIAL_MASTER_REQUEST',
  UPDATE_MATERIAL_MASTER_REQUEST_SUCCESS = 'UPDATE_MATERIAL_MASTER_REQUEST_SUCCESS',
  UPDATE_MATERIAL_MASTER_REQUEST_FAILURE = 'UPDATE_MATERIAL_MASTER_REQUEST_FAILURE',
  GET_SLA_CONTRACTS_LIST_DETAILS = 'GET_SLA_CONTRACTS_LIST_DETAILS',
  GET_SLA_CONTRACTS_LIST_SUCCESS = 'GET_SLA_CONTRACTS_LIST_SUCCESS',
  GET_SLA_CONTRACTS_LIST_FAILURE = 'GET_SLA_CONTRACTS_LIST_FAILURE',
  GET_SLA_COUNTRYS_LIST_DETAILS = 'GET_SLA_COUNTRYS_LIST_DETAILS',
  GET_SLA_COUNTRYS_LIST_SUCCESS = 'GET_SLA_COUNTRYS_LIST_SUCCESS',
  GET_SLA_COUNTRYS_LIST_FAILURE = 'GET_SLA_COUNTRYS_LIST_FAILURE',
  SET_MATERIALMASTER_UPLOAD_REQUEST = 'SET_MATERIALMASTER_UPLOAD_REQUEST',
  SET_MATERIALMASTER_UPLOAD_SUCCESS = 'SET_MATERIALMASTER_UPLOAD_SUCCESS',
  SET_MATERIALMASTER_UPLOAD_FAILURE = 'SET_MATERIALMASTER_UPLOAD_FAILURE',
  INIT_PROVISIONS_ACTION = 'INIT_PROVISIONS_ACTION',
  INIT_PROVISIONS_UPDATE_ACTION = 'INIT_PROVISIONS_UPDATE_ACTION',
  GET_PROVISIONS_COSTCENTER_REQUEST = 'GET_PROVISIONS_COSTCENTER_REQUEST',
  GET_PROVISIONS_COSTCENTER_SUCCESS = 'GET_PROVISIONS_COSTCENTER_SUCCESS',
  GET_PROVISIONS_COSTCENTER_FAILURE = 'GET_PROVISIONS_COSTCENTER_FAILURE',
  GET_PROVISIONS_STATUS_REQUEST = 'GET_PROVISIONS_STATUS_REQUEST',
  GET_PROVISIONS_STATUS_SUCCESS = 'GET_PROVISIONS_STATUS_SUCCESS',
  GET_PROVISIONS_STATUS_FAILURE = 'GET_PROVISIONS_STATUS_FAILURE',
  GET_PROVISIONS_FILTER_REQUEST = 'GET_PROVISIONS_FILTER_REQUEST',
  GET_PROVISIONS_FILTER_SUCCESS = 'GET_PROVISIONS_FILTER_SUCCESS',
  GET_PROVISIONS_FILTER_FAILURE = 'GET_PROVISIONS_FILTER_FAILURE',
  UPDATE_PROVISIONS_DATA_REQUEST = 'UPDATE_PROVISIONS_DATA_REQUEST',
  UPDATE_PROVISIONS_DATA_SUCCESS = 'UPDATE_PROVISIONS_DATA_SUCCESS',
  UPDATE_PROVISIONS_DATA_FAILURE = 'UPDATE_PROVISIONS_DATA_FAILURE',
  GET_PROVISIONS_OVERALL_METRICS_REQUEST = 'GET_PROVISIONS_OVERALL_METRICS_REQUEST',
  GET_PROVISIONS_OVERALL_METRICS_SUCCESS = 'GET_PROVISIONS_OVERALL_METRICS_SUCCESS',
  GET_PROVISIONS_OVERALL_METRICS_FAILURE = 'GET_PROVISIONS_OVERALL_METRICS_FAILURE',
  CHECK_ADD_PROVISIONS_DETAILS_REQUEST = 'CHECK_ADD_PROVISIONS_DETAILS_REQUEST',
  CHECK_ADD_PROVISIONS_DETAILS_SUCCESS = 'CHECK_ADD_PROVISIONS_DETAILS_SUCCESS',
  CHECK_ADD_PROVISIONS_DETAILS_FAILURE = 'CHECK_ADD_PROVISIONS_DETAILS_FAILURE',

  DOWNLOAD_PROVISIONS_ARCHIEVE_REQUEST = 'DOWNLOAD_PROVISIONS_ARCHIEVE_REQUEST',
  DOWNLOAD_PROVISIONS_ARCHIEVE_SUCCESS = 'DOWNLOAD_PROVISIONS_ARCHIEVE_SUCCESS',
  DOWNLOAD_PROVISIONS_ARCHIEVE_FAILURE = 'DOWNLOAD_PROVISIONS_ARCHIEVE_FAILURE',
  DOWNLOAD_PROVISIONS_OVERALL_DETAILS_REQUEST = 'DOWNLOAD_PROVISIONS_OVERALL_DETAILS_REQUEST',
  DOWNLOAD_PROVISIONS_OVERALL_DETAILS_SUCCESS = 'DOWNLOAD_PROVISIONS_OVERALL_DETAILS_SUCCESS',
  DOWNLOAD_PROVISIONS_OVERALL_DETAILS_FAILURE = 'DOWNLOAD_PROVISIONS_OVERALL_DETAILS_FAILURE',
  CLEAR_FINANCE_REQUEST = 'CLEAR_FINANCE_REQUEST',
  CLEAR_FINANCE_SUCCESS = 'CLEAR_FINANCE_SUCCESS',
  CLEAR_FINANCE_FAILURE = 'CLEAR_FINANCE_FAILURE'
}

export enum BizCaseSLATypes {
  INIT_BIZCASE_SLA = 'INIT_BIZCASE_SLA',
  CREATE_BIZCASE_SLA = 'CREATE_BIZCASE_SLA',
  CREATE_BIZCASE_SLA_REQUEST_SUCCESS = 'CREATE_BIZCASE_SLA_REQUEST_SUCCESS',
  CREATE_BIZCASE_SLA_REQUEST_FAILURE = 'CREATE_BIZCASE_SLA_REQUEST_FAILURE',
  GET_ALL_BIZCASE_SLA_DETAILS = 'GET_ALL_BIZCASE_SLA_DETAILS',
  GET_ALL_BIZCASE_SLA_DETAILS_SUCCESS = 'GET_ALL_BIZCASE_SLA_DETAILS_SUCCESS',
  GET_ALL_BIZCASE_SLA_DETAILS_FAILURE = 'GET_ALL_BIZCASE_SLA_DETAILS_FAILURE',
  GET_BIZCASE_SLA_CUSTOMER_DETAILS = 'GET_BIZCASE_SLA_CUSTOMER_DETAILS',
  GET_BIZCASE_SLA_CUSTOMER_DETAILS_SUCCESS = 'GET_BIZCASE_SLA_CUSTOMER_DETAILS_SUCCESS',
  GET_BIZCASE_SLA_CUSTOMER_DETAILS_FAILURE = 'GET_BIZCASE_SLA_CUSTOMER_DETAILS_FAILURE',
  GET_BIZCASE_SLA_COSTCENTER_DETAILS = 'GET_BIZCASE_SLA_COSTCENTER_DETAILS',
  GET_BIZCASE_SLA_COSTCENTER_DETAILS_SUCCESS = 'GET_BIZCASE_SLA_COSTCENTER_DETAILS_SUCCESS',
  GET_BIZCASE_SLA_COSTCENTER_DETAILS_FAILURE = 'GET_BIZCASE_SLA_COSTCENTER_DETAILS_FAILURE',
  GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS = 'GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS',
  GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS_SUCCESS = 'GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS_SUCCESS',
  GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS_FAILURE = 'GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS_FAILURE',
  GET_BIZCASE_SLA_EDIT_DETAILS = 'GET_BIZCASE_SLA_EDIT_DETAILS',
  GET_BIZCASE_SLA_EDIT_DETAILS_SUCCESS = 'GET_BIZCASE_SLA_EDIT_DETAILS_SUCCESS',
  GET_BIZCASE_SLA_EDIT_DETAILS_FAILURE = 'GET_BIZCASE_SLA_EDIT_DETAILS_FAILURE',
  UPDATE_BIZCASE_SLA_DETAILS = 'UPDATE_BIZCASE_SLA_DETAILS',
  UPDATE_BIZCASE_SLA_DETAILS_SUCCESS = 'UPDATE_BIZCASE_SLA_DETAILS_SUCCESS',
  UPDATE_BIZCASE_SLA_DETAILS_FAILURE = 'UPDATE_BIZCASE_SLA_DETAILS_FAILURE',
  GET_BIZCASE_CHART_REQUEST = 'GET_BIZCASE_CHART_REQUEST',
  GET_BIZCASE_CHART_SUCCESS = 'GET_BIZCASE_CHART_SUCCESS',
  GET_BIZCASE_CHART_FAILURE = 'GET_BIZCASE_CHART_FAILURE',
  UPDATE_BIZCASE_SLA_CONTRACT_DETAILS = 'UPDATE_BIZCASE_SLA_CONTRACT_DETAILS',
  UPDATE_BIZCASE_SLA_CONTRACT_SUCCESS = 'UPDATE_BIZCASE_SLA_CONTRACT_SUCCESS',
  UPDATE_BIZCASE_SLA_CONTRACT_FAILURE = 'UPDATE_BIZCASE_SLA_CONTRACT_FAILURE',
  GET_BIZCASE_C4DSLA_DETAILS = 'GET_BIZCASE_C4DSLA_DETAILS',
  GET_BIZCASE_C4DSLA_DETAILS_SUCCESS = 'GET_BIZCASE_C4DSLA_DETAILS_SUCCESS',
  GET_BIZCASE_C4DSLA_DETAILS_FAILURE = 'GET_BIZCASE_C4DSLA_DETAILS_FAILURE',
  SET_BIZCASE_C4DSLA_REQUEST = 'SET_BIZCASE_C4DSLA_REQUEST',
  SET_BIZCASE_C4DSLA_REQUEST_SUCCESS = 'SET_BIZCASE_C4DSLA_REQUEST_SUCCESS',
  SET_BIZCASE_C4DSLA_REQUEST_FAILURE = 'SET_BIZCASE_C4DSLA_REQUEST_FAILURE',  
  CLEAR_BIZ_SLA_REQUEST='CLEAR_BIZ_SLA_REQUEST',
  CLEAR_BIZ_SLA_SUCCESS='CLEAR_BIZ_SLA_SUCCESS',
  CLEAR_BIZ_SLA_ERROR='CLEAR_BIZ_SLA_ERROR',
  SLA_APPROVAL_STATUS_REQUEST='SLA_APPROVAL_STATUS_REQUEST',
  SLA_APPROVAL_STATUS_SUCCESS='SLA_APPROVAL_STATUS_SUCCESS',
  SLA_APPROVAL_STATUS_ERROR='SLA_APPROVAL_STATUS_ERROR',
}

export enum SettingsModuleTypes {
  INIT_ROLEMANAGEMENT_ACTIONS = 'INIT_ROLEMANAGEMENT_ACTIONS',
  CREATE_ASSIGN_ROLE_REQUEST = 'CREATE_ASSIGN_ROLE_REQUEST',
  CREATE_ASSIGN_ROLE_REQUEST_SUCCESS = 'CREATE_ASSIGN_ROLE_REQUEST_SUCCESS',
  CREATE_ASSIGN_ROLE_REQUEST_FAILURE = 'CREATE_ASSIGN_ROLE_REQUEST_FAILURE',
  GET_ALL_ROLEBASED_USERS_DETAILS = 'GET_ALL_ROLEBASED_USERS_DETAILS',
  GET_ALL_ROLEBASED_USERS_SUCCESS = 'GET_ALL_ROLEBASED_USERS_SUCCESS',
  GET_ALL_ROLEBASED_USERS_FAILURE = 'GET_ALL_ROLEBASED_USERS_FAILURE',
  GET_UNMAPPED_USERS_DETAILS = 'GET_UNMAPPED_USERS_DETAILS',
  GET_UNMAPPED_USERS_DETAILS_SUCCESS = 'GET_UNMAPPED_USERS_DETAILS_SUCCESS',
  GET_UNMAPPED_USERS_DETAILS_FAILURE = 'GET_UNMAPPED_USERS_DETAILS_FAILURE',
  GET_ALL_USERROLES_LIST_REQUEST = 'GET_ALL_USERROLES_LIST_REQUEST',
  GET_ALL_USERROLES_LIST_REQUEST_SUCCESS = 'GET_ALL_USERROLES_LIST_REQUEST_SUCCESS',
  GET_ALL_USERROLES_LIST_REQUEST_FAILURE = 'GET_ALL_USERROLES_LIST_REQUEST_FAILURE',
  INIT_PROJECTOWNERSHIP_ACTIONS = 'INIT_PROJECTOWNERSHIP_ACTIONS',
  UPDATE_PROJECT_OWNER_REQUEST = 'UPDATE_PROJECT_OWNER_REQUEST',
  UPDATE_PROJECT_OWNER_SUCCESS = 'UPDATE_PROJECT_OWNER_SUCCESS',
  UPDATE_PROJECT_OWNER_FAILURE = 'UPDATE_PROJECT_OWNER_FAILURE',
  GET_ALL_PROJECTOWNER_USERS_DETAILS = 'GET_ALL_PROJECTOWNER_USERS_DETAILS',
  GET_ALL_PROJECTOWNER_USERS_SUCCESS = 'GET_ALL_PROJECTOWNER_USERS_SUCCESS',
  GET_ALL_PROJECTOWNER_USERS_FAILURE = 'GET_ALL_PROJECTOWNER_USERS_FAILURE',
  GET_BUSINESS_USERS_LIST_REQUEST = 'GET_BUSINESS_USERS_LIST_REQUEST',
  GET_BUSINESS_USERS_LIST_SUCCESS = 'GET_BUSINESS_USERS_LIST_SUCCESS',
  GET_BUSINESS_USERS_LIST_FAILURE = 'GET_BUSINESS_USERS_LIST_FAILURE',
}


export enum PreInvoiceTypes {
  INIT_PREINVOICE = 'INIT_PREINVOICE',
  CREATE_PREINVOICE_REQUEST = 'CREATE_PREINVOICE_REQUEST',
  CREATE_PREINVOICE_REQUEST_SUCCESS = 'CREATE_PREINVOICE_REQUEST_SUCCESS',
  CREATE_PREINVOICE_REQUEST_FAILURE = 'CREATE_PREINVOICE_REQUEST_FAILURE',
  GET_ALL_PREINVOICE_DETAILS = 'GET_ALL_PREINVOICE_DETAILS',
  GET_ALL_PREINVOICE_DETAILS_SUCCESS = 'GET_ALL_PREINVOICE_DETAILS_SUCCESS',
  GET_ALL_PREINVOICE_DETAILS_FAILURE = 'GET_ALL_PREINVOICE_DETAILS_FAILURE',
  GET_PREINVOICE_DETAIL_REQUEST = 'GET_PREINVOICE_DETAIL_REQUEST',
  GET_PREINVOICE_DETAIL_SUCCESS = 'GET_PREINVOICE_DETAIL_SUCCESS',
  GET_PREINVOICE_DETAIL_FAILURE = 'GET_PREINVOICE_DETAIL_FAILURE',
  GET_ALL_INVOICE_DETAILS = 'GET_ALL_INVOICE_DETAILS',
  GET_ALL_INVOICE_DETAILS_SUCCESS = 'GET_ALL_INVOICE_DETAILS_SUCCESS',
  GET_ALL_INVOICE_DETAILS_FAILURE = 'GET_ALL_INVOICE_DETAILS_FAILURE',
  GET_ALL_PREINVOICE_EDIT_DETAILS = 'GET_ALL_PREINVOICE_EDIT_DETAILS',
  GET_ALL_PREINVOICE_EDIT_DETAILS_SUCCESS = 'GET_ALL_PREINVOICE_EDIT_DETAILS_SUCCESS',
  GET_ALL_PREINVOICE_EDIT_DETAILS_FAILURE = 'GET_ALL_PREINVOICE_EDIT_DETAILS_FAILURE',
  DELETE_PREINVOICE_REQUEST = 'DELETE_PREINVOICE_REQUEST',
  DELETE_PREINVOICE_SUCCESS = 'DELETE_PREINVOICE_SUCCESS',
  DELETE_PREINVOICE_FAILURE = 'DELETE_PREINVOICE_FAILURE',
  PROJECT_PREINVOICE_REQUEST = 'PROJECT_PREINVOICE_REQUEST',
  PROJECT_PREINVOICE_SUCCESS = 'PROJECT_PREINVOICE_SUCCESS',
  PROJECT_PREINVOICE_FAILURE = 'PROJECT_PREINVOICE_FAILURE',
  SLA_PREINVOICE_REQUEST = 'SLA_PREINVOICE_REQUEST',
  SLA_PREINVOICE_SUCCESS = 'SLA_PREINVOICE_SUCCESS',
  SLA_PREINVOICE_FAILURE = 'SLA_PREINVOICE_FAILURE',
}

export enum ReportsProcessTypes {
  INIT_BIZ_REPORT = 'INIT_BIZ_REPORT',
  GET_BIZCASE_DETAILS_REPORT_REQUEST = 'GET_BIZCASE_DETAILS_REPORT_REQUEST',
  GET_BIZCASE_DETAILS_REPORT_SUCCESS = 'GET_BIZCASE_DETAILS_REPORT_SUCCESS',
  GET_BIZCASE_DETAILS_REPORT_FAILURE = 'GET_BIZCASE_DETAILS_REPORT_FAILURE',
  DOWNLOAD_CUSTOMER_BIZ_REPORT_REQUEST = 'DOWNLOAD_CUSTOMER_BIZ_REPORT_REQUEST',
  DOWNLOAD_CUSTOMER_BIZ_REPORT_SUCCESS = 'DOWNLOAD_CUSTOMER_BIZ_REPORT_SUCCESS',
  DOWNLOAD_CUSTOMER_BIZ_REPORT_FAILURE = 'DOWNLOAD_CUSTOMER_BIZ_REPORT_FAILURE',
  DOWNLOAD_LEADS_BIZ_REPORT_REQUEST = 'DOWNLOAD_LEADS_BIZ_REPORT_REQUEST',
  DOWNLOAD_LEADS_BIZ_REPORT_SUCCESS = 'DOWNLOAD_LEADS_BIZ_REPORT_SUCCESS',
  DOWNLOAD_LEADS_BIZ_REPORT_FAILURE = 'DOWNLOAD_LEADS_BIZ_REPORT_FAILURE',
  DOWNLOAD_DETAILED_BIZCASE_EXCELREPORT_REQUEST = 'DOWNLOAD_DETAILED_BIZCASE_EXCELREPORT_REQUEST',
  DOWNLOAD_DETAILED_BIZCASE_EXCELREPORT_SUCCESS = 'DOWNLOAD_DETAILED_BIZCASE_EXCELREPORT_SUCCESS',
  DOWNLOAD_DETAILED_BIZCASE_EXCELREPORT_FAILURE = 'DOWNLOAD_DETAILED_BIZCASE_EXCELREPORT_FAILURE',
  DOWNLOAD_DETAILED_BIZCASE_PDFREPORT_REQUEST = 'DOWNLOAD_DETAILED_BIZCASE_PDFREPORT_REQUEST',
  DOWNLOAD_DETAILED_BIZCASE_PDFREPORT_SUCCESS = 'DOWNLOAD_DETAILED_BIZCASE_PDFREPORT_SUCCESS',
  DOWNLOAD_DETAILED_BIZCASE_PDFREPORT_FAILURE = 'DOWNLOAD_DETAILED_BIZCASE_PDFREPORT_FAILURE',
  DOWNLOAD_BIZ_SETUP_REPORT_REQUEST = 'DOWNLOAD_BIZ_SETUP_REPORT_REQUEST',
  DOWNLOAD_BIZ_SETUP_REPORT_SUCCESS = 'DOWNLOAD_BIZ_SETUP_REPORT_SUCCESS',
  DOWNLOAD_BIZ_SETUP_REPORT_FAILURE = 'DOWNLOAD_BIZ_SETUP_REPORT_FAILURE',
  DOWNLOAD_NEW_BIZ_RECRUITMENT_REPORT_REQUEST = 'DOWNLOAD_NEW_BIZ_RECRUITMENT_REPORT_REQUEST',
  DOWNLOAD_NEW_BIZ_RECRUITMENT_REPORT_SUCCESS = 'DOWNLOAD_NEW_BIZ_RECRUITMENT_REPORT_SUCCESS',
  DOWNLOAD_NEW_BIZ_RECRUITMENT_REPORT_FAILURE = 'DOWNLOAD_NEW_BIZ_RECRUITMENT_REPORT_FAILURE',
  INIT_SLA_REPORT = 'INIT_SLA_REPORT',
  DOWNLOAD_SLA_REPORT_REQUEST = 'DOWNLOAD_SLA_REPORT_REQUEST',
  DOWNLOAD_SLA_REPORT_SUCCESS = 'DOWNLOAD_SLA_REPORT_SUCCESS',
  DOWNLOAD_SLA_REPORT_FAILURE = 'DOWNLOAD_SLA_REPORT_FAILURE',
  INIT_OPERATIONS_REPORT_PROCESS = 'INIT_OPERATIONS_REPORT_PROCESS',
  GET_COSTCENTER_LIST_DETAIL_REQUEST = 'GET_COSTCENTER_LIST_DETAIL_REQUEST',
  GET_COSTCENTER_LIST_DETAIL_SUCCESS = 'GET_COSTCENTER_LIST_DETAIL_SUCCESS',
  GET_COSTCENTER_LIST_DETAIL_FAILURE = 'GET_COSTCENTER_LIST_DETAIL_FAILURE',
  GET_EMPLOYEE_LIST_DETAIL_REQUEST = 'GET_EMPLOYEE_LIST_DETAIL_REQUEST',
  GET_EMPLOYEE_LIST_DETAIL_SUCCESS = 'GET_EMPLOYEE_LIST_DETAIL_SUCCESS',
  GET_EMPLOYEE_LIST_DETAIL_FAILURE = 'GET_EMPLOYEE_LIST_DETAIL_FAILURE',
  GET_PROJECTS_LIST_DETAIL_REQUEST = 'GET_PROJECTS_LIST_DETAIL_REQUEST',
  GET_PROJECTS_LIST_DETAIL_SUCCESS = 'GET_PROJECTS_LIST_DETAIL_SUCCESS',
  GET_PROJECTS_LIST_DETAIL_FAILURE = 'GET_PROJECTS_LIST_DETAIL_FAILURE',
  DOWNLOAD_RESOURCE_OPERATIONS_REPORT_REQUEST = 'DOWNLOAD_RESOURCE_OPERATIONS_REPORT_REQUEST',
  DOWNLOAD_RESOURCE_OPERATIONS_REPORT_SUCCESS = 'DOWNLOAD_RESOURCE_OPERATIONS_REPORT_SUCCESS',
  DOWNLOAD_RESOURCE_OPERATIONS_REPORT_FAILURE = 'DOWNLOAD_RESOURCE_OPERATIONS_REPORT_FAILURE',
  DOWNLOAD_OPERATIONS_CAPACITY_REPORT_REQUEST = 'DOWNLOAD_OPERATIONS_CAPACITY_REPORT_REQUEST',
  DOWNLOAD_OPERATIONS_CAPACITY_REPORT_SUCCESS = 'DOWNLOAD_OPERATIONS_CAPACITY_REPORT_SUCCESS',
  DOWNLOAD_OPERATIONS_CAPACITY_REPORT_FAILURE = 'DOWNLOAD_OPERATIONS_CAPACITY_REPORT_FAILURE',
  DOWNLOAD_OPERATIONS_POSITIONS_REPORT_REQUEST = 'DOWNLOAD_OPERATIONS_POSITIONS_REPORT_REQUEST',
  DOWNLOAD_OPERATIONS_POSITIONS_REPORT_SUCCESS = 'DOWNLOAD_OPERATIONS_POSITIONS_REPORT_SUCCESS',
  DOWNLOAD_OPERATIONS_POSITIONS_REPORT_FAILURE = 'DOWNLOAD_OPERATIONS_POSITIONS_REPORT_FAILURE',
  DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_COSTCENTER_REQUEST = 'DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_COSTCENTER_REQUEST',
  DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_COSTCENTER_SUCCESS = 'DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_COSTCENTER_SUCCESS',
  DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_COSTCENTER_FAILURE = 'DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_COSTCENTER_FAILURE',
  DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_SHORTID_REQUEST = 'DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_SHORTID_REQUEST',
  DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_SHORTID_SUCCESS = 'DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_SHORTID_SUCCESS',
  DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_SHORTID_FAILURE = 'DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_SHORTID_FAILURE',
  DOWNLOAD_OPERATIONS_TASKREPORT_REQUEST = 'DOWNLOAD_OPERATIONS_TASKREPORT_REQUEST',
  DOWNLOAD_OPERATIONS_TASKREPORT_SUCCESS = 'DOWNLOAD_OPERATIONS_TASKREPORT_SUCCESS',
  DOWNLOAD_OPERATIONS_TASKREPORT_FAILURE = 'DOWNLOAD_OPERATIONS_TASKREPORT_FAILURE',
  INIT_FINANCE_REPORT_PROCESS = 'INIT_FINANCE_REPORT_PROCESS',
  DOWNLOAD_REVENUESUMMARY_REPORT_REQUEST = 'DOWNLOAD_REVENUESUMMARY_REPORT_REQUEST',
  DOWNLOAD_REVENUESUMMARY_REPORT_SUCCESS = 'DOWNLOAD_REVENUESUMMARY_REPORT_SUCCESS',
  DOWNLOAD_REVENUESUMMARY_REPORT_FAILURE = 'DOWNLOAD_REVENUESUMMARY_REPORT_FAILURE',
  DOWNLOAD_ACCURALS_REPORT_REQUEST = 'DOWNLOAD_ACCURALS_REPORT_REQUEST',
  DOWNLOAD_ACCURALS_REPORT_SUCCESS = 'DOWNLOAD_ACCURALS_REPORT_SUCCESS',
  DOWNLOAD_ACCURALS_REPORT_FAILURE = 'DOWNLOAD_ACCURALS_REPORT_FAILURE',
  DOWNLOAD_TRAVELCOST_REPORT_REQUEST = 'DOWNLOAD_TRAVELCOST_REPORT_REQUEST',
  DOWNLOAD_TRAVELCOST_REPORT_SUCCESS = 'DOWNLOAD_TRAVELCOST_REPORT_SUCCESS',
  DOWNLOAD_TRAVELCOST_REPORT_FAILURE = 'DOWNLOAD_TRAVELCOST_REPORT_FAILURE',
  DOWNLOAD_MATERIAL_EXPENSE_AND_REVENUE_REPORT_REQUEST = 'DOWNLOAD_MATERIAL_EXPENSE_AND_REVENUE_REPORT_REQUEST',
  DOWNLOAD_MATERIAL_EXPENSE_AND_REVENUE_REPORT_SUCCESS = 'DOWNLOAD_MATERIAL_EXPENSE_AND_REVENUE_REPORT_SUCCESS',
  DOWNLOAD_MATERIAL_EXPENSE_AND_REVENUE_REPORT_FAILURE = 'DOWNLOAD_MATERIAL_EXPENSE_AND_REVENUE_REPORT_FAILURE',
  INIT_RESOURCE_REPORT_PROCESS = 'INIT_RESOURCE_REPORT_PROCESS',
  DOWNLOAD_MANPOWER_SKILLSET_REPORT_REQUEST = 'DOWNLOAD_MANPOWER_SKILLSET_REPORT_REQUEST',
  DOWNLOAD_MANPOWER_SKILLSET_REPORT_SUCCESS = 'DOWNLOAD_MANPOWER_SKILLSET_REPORT_SUCCESS',
  DOWNLOAD_MANPOWER_SKILLSET_REPORT_FAILURE = 'DOWNLOAD_MANPOWER_SKILLSET_REPORT_FAILURE',
  DOWNLOAD_BENCHRESOURCES_REPORT_REQUEST = 'DOWNLOAD_BENCHRESOURCES_REPORT_REQUEST',
  DOWNLOAD_BENCHRESOURCES_REPORT_SUCCESS = 'DOWNLOAD_BENCHRESOURCES_REPORT_SUCCESS',
  DOWNLOAD_BENCHRESOURCES_REPORT_FAILURE = 'DOWNLOAD_BENCHRESOURCES_REPORT_FAILURE',
  DOWNLOAD_ATTRITION_RESOURCE_REPORT_REQUEST = 'DOWNLOAD_ATTRITION_RESOURCE_REPORT_REQUEST',
  DOWNLOAD_ATTRITION_RESOURCE_REPORT_SUCCESS = 'DOWNLOAD_ATTRITION_RESOURCE_REPORT_SUCCESS',
  DOWNLOAD_ATTRITION_RESOURCE_REPORT_FAILURE = 'DOWNLOAD_ATTRITION_RESOURCE_REPORT_FAILURE',
}

export interface LoginType {
  username: string
  password: string
  rememberme: boolean
  browser_uid?: string
}

export interface AuthState {
  loading: boolean;
  items: {};
  errors: any,
  userRoleType?: any,
  profileDetails?: any,
  isAuthenticated?: any,
  isLoading?: any,
  getUserDateList?: any,
  businessGridData?: any,
  leadsResponse?: any,
  assignSuccess?: any,
  resetPassword?: any,
  getLeadsEditResponse?: any,
  totalElements?: number,
  totalPages?: number,
  pageSize?: number,
  updateStatus?: boolean,
  getLeadsEditResponseState?: boolean,
  assignSuccessStatus?: boolean,
  tokenValidationStatus?: any,
  businessCasedReqResponse?: any,
  businessCasedReqData?: any;
  addEditLeadsResponse?: any,
  approvalBizProcessStatus?: boolean,
  leadsConversion?: any,
  getDepartmentList?: any,
  getstepperData?: any,
  getBizCaseSetupChart?: any,
  getCustomerandBusiness?: any,
  getUserDetails?: any,
  accessToken?: any,
  isCustomerValid?:any,
  removeNotificationResponse?:any,
  resTokenError?:any,
  resSLAApproval?:any
}
