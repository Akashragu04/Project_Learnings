import React, { useEffect, useRef } from 'react';
import { Box, Card, CardContent, Grid } from '@mui/material';
import AppGridContainer from '../../../@crema/core/AppGridContainer';
import { AppComponentHeader } from '../../../@crema';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonStore from '@crema/services/commonstore';
import { connect } from "react-redux";
import { BizCaseSLATypes } from 'saga/sagas/Types';
import SLAEditForm from './SLAEditForm';
import { getEditBizCaseSLA, initBizCaseSLAAction, reqBillingcycle, reqContractOption, reqCountryList, reqMaterialdescription, reqOrganization, reqRateCardList, reqTariffSheetMaterialdescription, reqUpdateAttachmentsConditionss, reqUpdateTermsConditions, updateBizCaseSLA, updateBizSLAContractDetailsAction } from '../../../saga/Actions/BizCaseSLA.action';
import AppLoader from '@crema/core/AppLoader';
import { toast } from 'react-toastify';
import { getExistingRateCardListAction, reqCommonGet } from 'saga/Actions';
import { useDropzone } from 'react-dropzone';
import { useAuthMethod } from "@crema/utility/AuthHooks";
import { ConfigAPI } from 'services/config';

const UpdateSLA = (props: any) => {
  const { state } = useLocation();
  const userRole = CommonStore().userRoleType;
  const navigate = useNavigate();
  const navState: any = useLocation();
  let formikRef: any;
  const tariffHelpersRef = useRef<any>(null);
  const ioHelpersRef = useRef<any>(null);
  const poHelpersRef = useRef<any>(null);
  const contactsHelpersRef = useRef<any>(null);
  const [expanded, setExpanded] = React.useState(null);
  const [minEndDate, setminEndDate] = React.useState(null);
  const [markupValue, setMarkupValue] = React.useState<any>(null);
  const { getCustomerListDetail, updateSLAResponse, getSLAEditDetailsList, updateSLAContractResponse,
    BillingcycleData, OrganizationData, getCostCenterListDetail, getMaterialDescDetail, getProjectSLAData } = props;
  const getSlaId: any = state;
  // const [isFetched, setIsFetched] = React.useState(false);
  const { logout } = useAuthMethod();

  // const projectId = useParams();
  const ProjSlaId = navState.state
  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [getEditData, setEditInfo] = React.useState(null)
  useEffect(() => {
    // setEditInfo(null)
    if (ProjSlaId) {
      props.initBizCaseSLA();
      props.getOrganization();
      props.getBillingcycle();
      props.getCostcenterList();
      props.getMaterialList();
      props.getCustomerList();
      props.reqContractOption();
      props.reqCountryList();
      props.getSLAEditDetails(ProjSlaId.slaid)
      getMaterialDescriptionList()
      getVendorList()
      setMarkupValue(13.5)
      // getSLAEdit();
    }
    // getTeamConditions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  React.useEffect(() => {
    if (props.checkTokenStatus) {
      if (props.checkTokenStatus.message === 'Invalid Token') {
        logout()
        navigate("/signin");
        window.location.reload()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.checkTokenStatus])

  useEffect(() => {
    if (getSLAEditDetailsList && !isProjectInitiated) {
      getIniValues();
      setProjectInitiated(true);
    }
    if (updateSLAResponse && updateSLAResponse.status) {
      // setIsFetched(false);
      toast.success(updateSLAResponse.message, { position: 'bottom-right' });
      setEditInfo(null)
      props.initBizCaseSLA();
      goBack();
    } else {
      // setIsFetched(false);
    }
    if (updateSLAContractResponse.status) {
      toast.success(updateSLAContractResponse.message, { position: 'bottom-right' });
      props.initBizCaseSLA();
      goBack();
    }

    if (updateSLAContractResponse && updateSLAContractResponse.status) {
      toast.success(updateSLAContractResponse.message, { position: 'bottom-right' });
      // setIsFetched(false);
      props.initBizCaseSLA();
      goBack();
    } else {
      // setIsFetched(false);
    }
    if(getSLAEditDetailsList){
      onInitialMaterialDescription(getSLAEditDetailsList)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSLAEditDetailsList, updateSLAResponse, updateSLAContractResponse])

  const goBack = () => {
    navigate('/SLA/biz-case-sla')
  }

  const getMaterialDescriptionList = (getMaterial?: any) => {
    if (getMaterial) {
      let postValues: any = {
        costcenter: getMaterial.costcenter,
        // contractoption: props.getSLAEditDetailsList?props.getSLAEditDetailsList.contract_option:'',
        materialdescription: '',
        country: getMaterial.countryname
      }
      props.reqMaterialdescription(postValues)
    }
  }

    //This is funcation used to C4D Values
    const onInitialMaterialDescription = (getValues?: any) => {
      let postValues: any = {
        costcenter: getValues.provider_cost_center,
        // contractoption: getMaterial.contractoption,
        materialdescription: getValues.materialdescription,
        country: getValues.customer_country
      }
      props.reqMaterialdescription(postValues)
    }

  const getIniValues = () => {
    // setEditInfo(null)
    if (props.getSLAEditDetailsList) {
      const editFieldData: any = {
        id: props.getSLAEditDetailsList.id,
        customer_company: props.getSLAEditDetailsList.customer_company,
        customer_address: props.getSLAEditDetailsList.customer_address,
        project_name: props.getSLAEditDetailsList.project_name,
        slaid:props.getSLAEditDetailsList.slaid,
        team: props.getSLAEditDetailsList.team,
        cost_center: props.getSLAEditDetailsList.cost_center,
        currency: props.getSLAEditDetailsList.currency,
        start_date: props.getSLAEditDetailsList.start_date,
        end_date: props.getSLAEditDetailsList.end_date,
        effective_date: props.getSLAEditDetailsList.effective_date,
        contract_status: props.getSLAEditDetailsList.contract_status,
        contract_option: props.getSLAEditDetailsList.contract_option,
        customer_cost_center: props.getSLAEditDetailsList.customer_cost_center,
        customer_cost_center_manager: props.getSLAEditDetailsList.customer_cost_center_manager,
        organization_type: props.getSLAEditDetailsList.organization_type,
        service_description: props.getSLAEditDetailsList.service_description,
        customer_entity_code:props.getSLAEditDetailsList.customer_entity_code,
        billing_cycle: props.getSLAEditDetailsList.billing_cycle,
        tariff_sheet_fte: props.getSLAEditDetailsList.tariff_sheet_fte,
        country: props.getSLAEditDetailsList.country,
        customer_country: props.getSLAEditDetailsList.customer_country,
        tariff_sheet: {
          cost_center_code: props.getSLAEditDetailsList.provider_cost_center,
          material_description: props.getSLAEditDetailsList.material_description,
          units: props.getSLAEditDetailsList.units,
          estimated_quantity: props.getSLAEditDetailsList.estimated_quantity,
          rate: props.getSLAEditDetailsList.rate,
          amount: props.getSLAEditDetailsList.amount,
          markup_value: '13.5',
          has_fx_risk: '',
          has_gst: '',
          has_wht: '',
          has_markup: '',
          materialname: '',
          is_taxable:''
        },
        revenue_cost_center: props.getSLAEditDetailsList.revenue_cost_center ? props.getSLAEditDetailsList.revenue_cost_center : [],
        io: {
          io_number: '',
          io_category: '',
          value: ''

        },
        po: {
          po_number: '',
          value: '',
          vendor: ''
        },
        contacts: {
          short_name: '',
          name: '',
          email: '',
          customer_type: '',
          primary: false,
          key_person: false,
          is_pre_invoice: false,
          is_sla: false,
        },
        sla_po: props.getSLAEditDetailsList.sla_po ? props.getSLAEditDetailsList.sla_po : [],
        sla_io: props.getSLAEditDetailsList.sla_io ? props.getSLAEditDetailsList.sla_io : [],
        sla_contacts: props.getSLAEditDetailsList.sla_contacts ? props.getSLAEditDetailsList.sla_contacts : [],
        sla_tariffsheet: props.getSLAEditDetailsList.sla_tariffsheet ? props.getSLAEditDetailsList.sla_tariffsheet : [],
        sla_terms_and_conditions: props.getSLAEditDetailsList.sla_terms_and_conditions ? props.getSLAEditDetailsList.sla_terms_and_conditions : [],
        attachments: props.getSLAEditDetailsList.attachments ? props.getSLAEditDetailsList.attachments : [],
        total_budget: props.getSLAEditDetailsList.total_budget,
        slaname: props.getSLAEditDetailsList.slaname
      }
      setEditInfo(editFieldData)
    }
  }

  const onCustomerStartDate = (colName, endDateCol, startDate) => {
    if (startDate) {
      formikRef.setFieldValue(colName, startDate)
      formikRef.setFieldValue(endDateCol, null)
      setminEndDate(startDate);
    }
  };
  const setMarkupAmount = () => {
    const markupAmount = Math.round(formikRef.values.tariff_sheet.rate * formikRef.values.tariff_sheet.estimated_quantity);
    formikRef.setFieldValue('tariff_sheet.amount', markupAmount)
  }
  const setContactCheckbox = (isCheck, fieldValue) => {
    if (isCheck) {
      formikRef.setFieldValue(fieldValue, 'yes')
    } else {
      formikRef.setFieldValue(fieldValue, 'No')
    }
    //const checkValue = formikRef.values.contacts.primary

  }
  const onSubmitData = (getEditInfoData?: any) => {
    props.updateBizCaseSLADetails(getEditInfoData)
  }
  const onContactSubmitData = (getEditInfoData?: any) => {
    props.updateBizCaseSLAContractStatusDetails(getEditInfoData)
  }

  const dropzone: any = useDropzone({
    accept: 'image/jpeg, image/png, .csv, application/vnd.ms-excel, text/csv, .pdf, .doc',
    maxFiles: 5,
    maxSize: 10000000
  });
  const dropTermsCondition: any = useDropzone({
    accept: 'image/jpeg, image/png, .csv, application/vnd.ms-excel, text/csv, .pdf, .doc',
    maxFiles: 5,
    maxSize: 10000000
  });
  const { acceptedFiles } = dropzone;
  const [uploadedFiles, setUploadedFiles]: any = React.useState([]);
  const [tcUploadedFiles, setTCUploadedFiles]: any = React.useState([]);
  const [isProjectInitiated, setProjectInitiated]: any = React.useState(false);

  const onDeleteUploadFile = (file) => {
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...acceptedFiles]);
  };

  const onTCDeleteUploadFile = (file) => {
    dropTermsCondition.acceptedFiles.splice(dropTermsCondition.acceptedFiles.indexOf(file), 1);
    setTCUploadedFiles([...dropTermsCondition.acceptedFiles]);
  };

  const setFetchLoader = () => {
    // setIsFetched(false);
  }

  const getCurrencyList = (getCurrencyData?: any) => {
    props.reqRateCardList(getCurrencyData)
  }

  const onGetTariffSheetMaterial = (getPostValues?: any) => {
    props.reqTariffSheetMaterialdescription(getPostValues)
  }

  const getVendorList = () =>{    
    props.reqCommonGet(`${ConfigAPI.getVendorListAPI}`)
  }

  return (
    <>
      <AppComponentHeader
        title="Update Service Level Agreement "
        description=""
      />
      <AppGridContainer>

        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Card variant='outlined'>
            <CardContent>
              <Box style={{ marginTop: 16 }}>
                {getEditData && props.getSLAEditDetailsList ?
                  <SLAEditForm setContactCheckbox={setContactCheckbox}
                    setMarkupAmount={setMarkupAmount}
                    getEditData={getEditData}
                    onCustomerStartDate={onCustomerStartDate} handleExpandChange={handleExpandChange}
                    ProjSlaId={ProjSlaId} minEndDate={minEndDate} expanded={expanded}
                    contactsHelpersRef={contactsHelpersRef} poHelpersRef={poHelpersRef} ioHelpersRef={ioHelpersRef}
                    tariffHelpersRef={tariffHelpersRef} navState={navState} navigate={navigate} userRole={userRole}
                    getCustomerList={getCustomerListDetail} onSubmitData={onSubmitData} onContactSubmitData={onContactSubmitData}
                    goBack={goBack} OrganizationData={OrganizationData}
                    BillingcycleData={BillingcycleData} getCostCenterListDetail={getCostCenterListDetail}
                    onTCDeleteUploadFile={onTCDeleteUploadFile} onDeleteUploadFile={onDeleteUploadFile}
                    uploadedFiles={uploadedFiles} tcUploadedFiles={tcUploadedFiles}
                    markupValue={markupValue} getMaterialDescDetail={getMaterialDescDetail}
                    resTermsFileUpload={props.resTermsFileUpload} resAttachmentsFileUpload={props.resAttachmentsFileUpload}
                    getSlaId={getSlaId} getCustomerListDetail={getCustomerListDetail}
                    dropzone={dropzone} dropTermsCondition={dropTermsCondition}
                    createBizCaseSLA={props.createBizCaseSLA} setBizC4DSLADetail={props.setBizC4DSLADetail}
                    type={getSlaId.type} setFetchLoader={setFetchLoader} getProjectSLAData={getProjectSLAData}
                    rateCardList={props.rateCardList} getMaterialDescription={getMaterialDescriptionList}
                    resMaterialDescription={props.resMaterialDescription} resContractOption={props.resContractOption}
                    resCountryList={props.resCountryList} getCurrencyList={getCurrencyList} resCurrencyList={props.resCurrencyList}
                    resTariffSheetMaterial={props.resTariffSheetMaterial} onGetTariffSheetMaterial={onGetTariffSheetMaterial}
                    getSLAEditDetailsList={props.getSLAEditDetailsList} postUpdateAttachmentsConditionss={props.postUpdateAttachmentsConditionss} 
                    postUpdateTermsConditions={props.postUpdateTermsConditions} getVendorListDetails={props.getVendorListDetails} updateSLAResponse={updateSLAResponse}/>
                  : <AppLoader />}

              </Box>
            </CardContent>
          </Card>
          {/* Iteration View Modal PopUp */}
        </Grid>
      </AppGridContainer>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loading: state.bizCaseSLAProcess.loading,
    getSLAEditDetailsList: state.bizCaseSLAProcess.getSLAEditDetails,
    getCustomerListDetail: state.bizCaseSLAProcess.getCustomerList,
    getCostCenterListDetail: state.bizCaseSLAProcess.getCostcenterList,
    getMaterialDescDetail: state.bizCaseSLAProcess.getMaterialList,
    updateSLAResponse: state.bizCaseSLAProcess.updateSLAResponse,
    updateSLAContractResponse: state.bizCaseSLAProcess.updateSLAContractResponse,
    BillingcycleData: state.bizCaseSLAProcess.BillingcycleData,
    OrganizationData: state.bizCaseSLAProcess.OrganizationData,
    resMaterialDescription: state.bizCaseSLAProcess.resMaterialDescription,
    resCountryList: state.bizCaseSLAProcess.resCountryList,
    resContractOption: state.bizCaseSLAProcess.resContractOption,
    resCurrencyList: state.bizCaseSLAProcess.resCurrencyList,
    resTariffSheetMaterial: state.bizCaseSLAProcess.resTariffSheetMaterial,
    checkTokenStatus: state.auth.tokenValidationStatus,
    resTermsFileUpload: state.bizCaseSLAProcess.resTermsFileUpload,
    resAttachmentsFileUpload: state.bizCaseSLAProcess.resAttachmentsFileUpload,
    getProjectSLAData: state.bizCaseSLAProcess.getProjectSLAData,
    createSLAResponse: state.bizCaseSLAProcess.createSLAResponse,
    C4DSLADetailResponse: state.bizCaseSLAProcess.C4DSLADetailResponse,
    rateCardList: state.businessRequirement.rateCardList,
    getVendorListDetails:state.othersReducer.resCommonViewData
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  initBizCaseSLA: () => {
    dispatch(initBizCaseSLAAction())
  },
  updateBizCaseSLADetails: (data: any) => {
    dispatch(updateBizCaseSLA(data))
  },
  updateBizCaseSLAContractStatusDetails: (data: any) => {
    dispatch(updateBizSLAContractDetailsAction(data))
  },
  //putgetSLAEditDetails: (getSLAId?:any) => dispatch(getEditBizCaseSLA(getSLAId)),
  getSLAEditDetails: (getSLAId?: any) => dispatch(getEditBizCaseSLA(getSLAId)),
  getCustomerList: () => dispatch({ type: BizCaseSLATypes.GET_BIZCASE_SLA_CUSTOMER_DETAILS }),
  getCostcenterList: () => dispatch({ type: BizCaseSLATypes.GET_BIZCASE_SLA_COSTCENTER_DETAILS }),
  getMaterialList: () => dispatch({ type: BizCaseSLATypes.GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS }),
  reqMaterialdescription: (data: any) => dispatch(reqMaterialdescription(data)),
  reqContractOption: () => dispatch(reqContractOption()),
  reqCountryList: () => dispatch(reqCountryList()),
  reqRateCardList: (data: any) => dispatch(reqRateCardList(data)),
  reqTariffSheetMaterialdescription: (data: any) => dispatch(reqTariffSheetMaterialdescription(data)),
  getOrganization: () => dispatch(reqOrganization()),
  getBillingcycle: () => dispatch(reqBillingcycle()),
  getExistingRateCardList: (data: any) => { dispatch(getExistingRateCardListAction(data)) },
  postUpdateTermsConditions: (getValue?: any) => dispatch(reqUpdateTermsConditions(getValue)),
  postUpdateAttachmentsConditionss: (getValue?: any) => dispatch(reqUpdateAttachmentsConditionss(getValue)),
  reqCommonGet:(getPostURL?:any)=>dispatch(reqCommonGet(getPostURL))

})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSLA);


