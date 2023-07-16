import React, { useEffect } from 'react';
import { Box, Card, CardContent, Grid } from '@mui/material';
import AppGridContainer from '../../../@crema/core/AppGridContainer';
import { AppLoader } from '../../../@crema';
import { useDropzone } from 'react-dropzone';
import {
  getBizCaseC4DSLADetailsAction,
  initBizCaseSLAAction,
  reqBillingcycle, reqBizCaseSLA, reqContractOption, reqCountryList, reqMaterialdescription, reqOrganization, reqProjectSLADetails,
  reqRateCardList,
  reqTariffSheetMaterialdescription,
  reqUpdateAttachmentsConditionss, reqUpdateTermsConditions
} from "../../../saga/Actions/BizCaseSLA.action"
import { connect } from "react-redux";
import { BizCaseSLATypes } from 'saga/sagas/Types';
import { useLocation, useNavigate } from 'react-router-dom';
import SLACreateForm from './SLACreateForm'
import { toast } from 'react-toastify';
import moment from 'moment';
import BreadcrumbsData from '@crema/core/Breadcrumbs';
import { getExistingRateCardListAction, reqCommonGet } from 'saga/Actions';
import { ConfigAPI } from 'services/config';

const SLACreation = (props: any) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(null);
  const [markupValue, setMarkupValue] = React.useState<any>(null);
  const [ProjectInfoData, setProjectInfoData] = React.useState<any>(null);
  const [isFetched, setIsFetched] = React.useState(false);
  const [getCustomerDetails, setCustomerDetails] = React.useState<any>(null);

  const getSlaId: any = state;

  const { getCustomerListDetail, getCostCenterListDetail, getMaterialDescDetail, getProjectSLAData,
    createSLAResponse, BillingcycleData, OrganizationData, C4DSLADetailResponse } = props;

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
  const [isStatusSLA, setStatusSLA]: any = React.useState(false);

  const onDeleteUploadFile = (file) => {
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...acceptedFiles]);
  };

  const onTCDeleteUploadFile = (file) => {
    dropTermsCondition.acceptedFiles.splice(dropTermsCondition.acceptedFiles.indexOf(file), 1);
    setTCUploadedFiles([...dropTermsCondition.acceptedFiles]);
  };

  useEffect(() => {
    props.initBizCaseSLA();
    props.getOrganization();
    props.getBillingcycle();
    props.getCustomerList();
    props.getCostcenterList();
    props.getExistingRateCardList();
    props.reqContractOption();
    props.reqCountryList();
    getVendorList()
    setMarkupValue(13.5)
    if (getSlaId.type === 'sla') {
      props.getProjectSLADetails(getSlaId.ProjectId)
    } else if (getSlaId.type === 'c4d') {
      props.getProjectSLADetails(getSlaId.ProjectId)
      if (getSlaId && getSlaId.data) {
        fetchCustomerProjectSLAData(getSlaId.data);
        onC4DGetMaterialDescription(getSlaId.data)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVendorList = () =>{    
    props.reqCommonGet(`${ConfigAPI.getVendorListAPI}`)
  }
  React.useEffect(() => {
    if (getSlaId.type === 'c4d') {
      if (getCustomerListDetail && getCustomerListDetail.length && getSlaId && getSlaId.data) {
        let getCustomerInfo: any = getCustomerListDetail.find((items: any) => items.customerName === getSlaId.data.customer_company)
        setCustomerDetails(getCustomerInfo)
      }
    } else {
      setCustomerDetails(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCustomerListDetail, getSlaId])

  const goBack = () => {
    if (getSlaId.action) {
      navigate(getSlaId.action)
    }
  }

  useEffect(() => {
    if (getSlaId.type === 'sla') {
      if (getProjectSLAData && !isProjectInitiated) {
        props.getMaterialList({ costCenter: (getProjectSLAData?.project?.cost_center) ? getProjectSLAData?.project?.cost_center : '' });
        getProjectSLAInfoData(getProjectSLAData);
        setProjectInitiated(true);
      }
    }
    if (createSLAResponse && createSLAResponse.status) {
      toast.success(createSLAResponse.message, { position: 'bottom-right' });
      setIsFetched(false);
      props.initBizCaseSLA();
      setStatusSLA(true)
      onNavigateSLAPage();
      // goBack();

    } else {
      setIsFetched(false);
      props.initBizCaseSLA();
      setStatusSLA(false)
    }

    if (C4DSLADetailResponse && C4DSLADetailResponse.status) {
      toast.success(C4DSLADetailResponse.message, { position: 'bottom-right' });
      setIsFetched(false);
      props.initBizCaseSLA();
      setStatusSLA(true)
      onNavigateSLAPage();
      // goBack();
    } else {
      setIsFetched(false);
      props.initBizCaseSLA();
      setStatusSLA(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProjectSLAData, createSLAResponse, C4DSLADetailResponse])

  const onNavigateSLAPage = () => {
    navigate('/SLA/biz-case-sla')
  }
  const getMaterialDescriptionList = (getMaterial?: any) => {
    let postValues: any = {
      costcenter: getMaterial.costcenter,
      // contractoption: getMaterial.contractoption,
      materialdescription: getMaterial.materialdescription,
      country: getMaterial.countryname
    }
    props.reqMaterialdescription(postValues)
  }

  //This is funcation used to C4D Values
  const onC4DGetMaterialDescription = (getValues?: any) => {
    let postValues: any = {
      costcenter: getValues.costcenter,
      // contractoption: getMaterial.contractoption,
      materialdescription: getValues.materialdescription,
      country: getValues.countryname
    }
    props.reqMaterialdescription(postValues)
  }

  const fetchCustomerProjectSLAData = (getProjectSLAData: any) => {
    const slaCreationRequirementSchema: any = {
      sla_id: getProjectSLAData?.slaid ? getProjectSLAData?.slaid : '',
      customer: {},
      costcenter: {},
      customer_company: getProjectSLAData?.customer_company ? getProjectSLAData?.customer_company : '',
      customer_address: getProjectSLAData?.customer_address ? getProjectSLAData?.customer_address : '',
      customer_entity_code: getProjectSLAData?.customer_entity_code ? getProjectSLAData?.customer_entity_code : '',
      project_name: getProjectSLAData?.project_name ? getProjectSLAData?.project_name : '',
      team: getProjectSLAData?.team ? getProjectSLAData?.team : '',
      cost_center: getProjectSLAData?.provider_cost_center ? getProjectSLAData?.provider_cost_center : '',
      currency: getProjectSLAData?.currency ? getProjectSLAData?.currency : '',
      start_date: getProjectSLAData?.start_date ? moment(getProjectSLAData?.start_date, 'DD-MM-YYYY') : '',
      end_date: getProjectSLAData?.end_date ? moment(getProjectSLAData?.end_date, 'DD-MM-YYYY') : '',
      effective_date: getProjectSLAData?.effective_date ? moment(getProjectSLAData?.effective_date, 'DD-MM-YYYY') : '',
      contract_status: '',
      contract_option: '',
      customer_country: '',
      customer_cost_center: getProjectSLAData?.customer_cost_center ? getProjectSLAData?.customer_cost_center : '',
      customer_cost_center_manager: getProjectSLAData?.customer_cost_center_manager ? getProjectSLAData?.customer_cost_center_manager : '',
      organization_type: '',
      service_description: getProjectSLAData?.service_description ? getProjectSLAData?.service_description : '',
      billing_cycle: getProjectSLAData?.billing_cycle,
      tariff_sheet_fte: '',
      total_budget: getProjectSLAData?.total_budget ? getProjectSLAData?.total_budget : 0,
      revenue_cost_center: getProjectSLAData?.revenue_cost_center ? getProjectSLAData.revenue_cost_center : [],
      country: '',
      tariff_sheet: {
        cost_center_code: getProjectSLAData?.provider_cost_center ? getProjectSLAData?.provider_cost_center : '',
        material_description: '',
        material_code: '',
        units: '',
        estimated_quantity: '',
        rate: '',
        amount: '',
        has_fx_risk: '',
        has_gst: '',
        has_wht: '',
        has_markup: '',
        materialname: ''
      },
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
      sla_po: [

      ],
      sla_io: [

      ],
      sla_contacts: getProjectSLAData?.sla_contacts ? getProjectSLAData?.sla_contacts : [],
      sla_tariffsheet: [],
      sla_terms_and_conditions: getProjectSLAData?.sla_argeement_document ? getProjectSLAData?.sla_argeement_document : [],
      attachments: getProjectSLAData?.attachments ? getProjectSLAData?.attachments : [],
      slaname: getProjectSLAData?.slaname ? getProjectSLAData?.slaname : '',
      slaid: getProjectSLAData?.slaid ? getProjectSLAData?.slaid : ''
    }
    setProjectInfoData(slaCreationRequirementSchema)

  }

  const getProjectSLAInfoData = (getProjectSLAData: any) => {
    const slaCreationRequirementSchema: any = {
      customer: {},
      costcenter: {},
      customer_company: '',
      customer_address: '',
      project_name: getProjectSLAData?.project.project_name ? getProjectSLAData?.project.project_name : '',
      team: getProjectSLAData?.team ? getProjectSLAData?.team : '',
      cost_center: getProjectSLAData?.project?.cost_center ? getProjectSLAData.project.cost_center : '',
      currency: '',
      start_date: '',
      end_date: '',
      effective_date: '',
      contract_status: '',
      contract_option: '',
      customer_country: '',
      customer_entity_code: '',
      customer_cost_center: getProjectSLAData?.customer_costcenter ? getProjectSLAData?.customer_costcenter : '',
      customer_cost_center_manager: getProjectSLAData?.project?.service_provider_shortid ? getProjectSLAData?.project?.service_provider_shortid : '',
      organization_type: '',
      service_description: '',
      billing_cycle: '',
      tariff_sheet_fte: '',
      revenue_cost_center: getProjectSLAData?.revenue_cost_center ? getProjectSLAData.revenue_cost_center : [],
      country: '',
      tariff_sheet: {
        cost_center_code: getProjectSLAData?.project?.cost_center ? getProjectSLAData.project.cost_center : '',
        material_description: '',
        units: '',
        estimated_quantity: '',
        rate: '',
        amount: '',
        has_fx_risk: '',
        has_gst: '',
        has_wht: '',
        has_markup: '',
        materialname: '',
        is_taxable: ''
      },
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
      sla_po: [

      ],
      sla_io: [

      ],
      sla_contacts: [],
      sla_tariffsheet: getProjectSLAData?.tarriffsheets ? getProjectSLAData.tarriffsheets : [],
      sla_terms_and_conditions: [],
      attachments: [],
      slaname: ''
    }
    setProjectInfoData(slaCreationRequirementSchema)
  }

  const setFetchLoader = () => {
    setIsFetched(false);
  }

  React.useEffect(() => {
    if (props.resStatusTermsFileUpload && props.resStatusTermsFileUpload.status === false) {
      setUploadedFiles([])
    }

    if (props.resStatusAttachmentsFileUpload && props.resStatusAttachmentsFileUpload.status === false) {
      setTCUploadedFiles([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resStatusAttachmentsFileUpload, props.resStatusTermsFileUpload])

  React.useEffect(() => {
    setUploadedFiles(dropzone.acceptedFiles);
    if (acceptedFiles.length) {
      getTermsUploadFile(acceptedFiles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropzone.acceptedFiles])

  React.useEffect(() => {
    setTCUploadedFiles(dropTermsCondition.acceptedFiles)
    if (dropTermsCondition.acceptedFiles.length) {
      getSLAUploadFile(dropTermsCondition.acceptedFiles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropTermsCondition.acceptedFiles])
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCustomerListDetail, getCostCenterListDetail, getMaterialDescDetail])

  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getTermsUploadFile = (uploadedFiles?: any) => {
    const formData = new FormData();
    if (uploadedFiles.length) {
      for (const tcUpload in uploadedFiles) {
        formData.append("file", uploadedFiles[tcUpload]);
      }
      props.postUpdateTermsConditions(formData)
    }
  }

  const getSLAUploadFile = (uploadedFiles?: any) => {
    const formData = new FormData();
    if (uploadedFiles.length) {
      for (const tcUpload in uploadedFiles) {
        formData.append("file", uploadedFiles[tcUpload]);
      }
      props.postUpdateAttachmentsConditionss(formData)
    }
  }

  const getCurrencyList = (getCurrencyData?: any) => {
    props.reqRateCardList(getCurrencyData)
  }

  const onGetTariffSheetMaterial = (getPostValues?: any) => {
    props.reqTariffSheetMaterialdescription(getPostValues)
  }
  
  return (
    <>
      <BreadcrumbsData menuList={breadCrumbValues} />
      {/* <AppComponentHeader
        title="New Service Level Agreement "
        description=""
      /> */}
      <AppGridContainer>
        <Grid item xs={12} className="marginTop">
          <Card variant='outlined'>
            <CardContent>
              <Box style={{ marginTop: 16 }}>
                {
                  (!isFetched && ProjectInfoData) ?
                    <SLACreateForm handleExpandChange={handleExpandChange}
                      onTCDeleteUploadFile={onTCDeleteUploadFile} onDeleteUploadFile={onDeleteUploadFile}
                      uploadedFiles={uploadedFiles} tcUploadedFiles={tcUploadedFiles} expanded={expanded}
                      markupValue={markupValue} getMaterialDescDetail={getMaterialDescDetail}
                      resTermsFileUpload={props.resTermsFileUpload} resAttachmentsFileUpload={props.resAttachmentsFileUpload}
                      getSlaId={getSlaId} getCustomerListDetail={getCustomerListDetail} getCostCenterListDetail={getCostCenterListDetail}
                      dropzone={dropzone} dropTermsCondition={dropTermsCondition} ProjectInfoData={ProjectInfoData}
                      createBizCaseSLA={props.createBizCaseSLA} setBizC4DSLADetail={props.setBizC4DSLADetail} goBack={goBack} OrganizationData={OrganizationData}
                      BillingcycleData={BillingcycleData} type={getSlaId.type} setFetchLoader={setFetchLoader} getProjectSLAData={getProjectSLAData}
                      rateCardList={props.rateCardList} getMaterialDescription={getMaterialDescriptionList}
                      resMaterialDescription={props.resMaterialDescription ? props.resMaterialDescription : []} resContractOption={props.resContractOption} resCountryList={props.resCountryList ? props.resCountryList : []}
                      getCurrencyList={getCurrencyList} resCurrencyList={props.resCurrencyList ? props.resCurrencyList : []}
                      resTariffSheetMaterial={props.resTariffSheetMaterial ? props.resTariffSheetMaterial : []}
                      onGetTariffSheetMaterial={onGetTariffSheetMaterial} getCustomerDetails={getCustomerDetails} isStatusSLA={isStatusSLA} 
                      createSLAResponse={createSLAResponse} getVendorListDetails={props.getVendorListDetails} C4DSLADetailResponse={C4DSLADetailResponse}/>
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
    checkTokenStatus: state.auth.tokenValidationStatus,
    loading: state.bizCaseSLAProcess.loading,
    getCustomerListDetail: state.bizCaseSLAProcess.getCustomerList,
    getCostCenterListDetail: state.bizCaseSLAProcess.getCostcenterList,
    getMaterialDescDetail: state.bizCaseSLAProcess.getMaterialList,
    resTermsFileUpload: state.bizCaseSLAProcess.resTermsFileUpload,
    resAttachmentsFileUpload: state.bizCaseSLAProcess.resAttachmentsFileUpload,
    getProjectSLAData: state.bizCaseSLAProcess.getProjectSLAData,
    BillingcycleData: state.bizCaseSLAProcess.BillingcycleData,
    OrganizationData: state.bizCaseSLAProcess.OrganizationData,
    createSLAResponse: state.bizCaseSLAProcess.createSLAResponse,
    C4DSLADetailResponse: state.bizCaseSLAProcess.C4DSLADetailResponse,
    rateCardList: state.businessRequirement.rateCardList,
    resMaterialDescription: state.bizCaseSLAProcess.resMaterialDescription,
    resCountryList: state.bizCaseSLAProcess.resCountryList,
    resContractOption: state.bizCaseSLAProcess.resContractOption,
    resCurrencyList: state.bizCaseSLAProcess.resCurrencyList,
    resTariffSheetMaterial: state.bizCaseSLAProcess.resTariffSheetMaterial,
    resStatusAttachmentsFileUpload: state.bizCaseSLAProcess.resStatusAttachmentsFileUpload,
    resStatusTermsFileUpload: state.bizCaseSLAProcess.resStatusTermsFileUpload,
    getVendorListDetails:state.othersReducer.resCommonViewData
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  initBizCaseSLA: () => {
    dispatch(initBizCaseSLAAction())
  },
  createBizCaseSLA: (data: any) => {
    dispatch(reqBizCaseSLA(data))
  },
  setBizC4DSLADetail: (data: any) => {
    dispatch(getBizCaseC4DSLADetailsAction(data))
  },
  getCustomerList: () => dispatch({ type: BizCaseSLATypes.GET_BIZCASE_SLA_CUSTOMER_DETAILS }),
  getCostcenterList: () => dispatch({ type: BizCaseSLATypes.GET_BIZCASE_SLA_COSTCENTER_DETAILS }),
  getMaterialList: (data: any) => dispatch({ type: BizCaseSLATypes.GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS, data }),
  postUpdateTermsConditions: (getValue?: any) => dispatch(reqUpdateTermsConditions(getValue)),
  postUpdateAttachmentsConditionss: (getValue?: any) => dispatch(reqUpdateAttachmentsConditionss(getValue)),
  getProjectSLADetails: (getSLAId?: any) => dispatch(reqProjectSLADetails(getSLAId)),
  getOrganization: () => dispatch(reqOrganization()),
  getBillingcycle: () => dispatch(reqBillingcycle()),
  getExistingRateCardList: (data: any) => { dispatch(getExistingRateCardListAction(data)) },
  reqMaterialdescription: (data: any) => dispatch(reqMaterialdescription(data)),
  reqContractOption: () => dispatch(reqContractOption()),
  reqCountryList: () => dispatch(reqCountryList()),
  reqRateCardList: (data: any) => dispatch(reqRateCardList(data)),
  reqTariffSheetMaterialdescription: (data: any) => dispatch(reqTariffSheetMaterialdescription(data)),
  reqCommonGet:(getPostURL?:any)=>dispatch(reqCommonGet(getPostURL))
  // reqUpdateTermsConditions reqProjectSLADetails
})

const breadCrumbValues = {
  title: 'New Service Level Agreement',
  subTitle: '',
  SubUrl: '',
  homeTitle: "Home",
  homeLink: '/dashboard',
  description: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(SLACreation);


