import React, { useRef } from 'react'
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl,
  FormControlLabel, Grid, InputLabel, MenuItem, IconButton, RadioGroup, Select, Typography,
  TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox,
  FormGroup, Radio, Autocomplete, FormHelperText, ButtonGroup, createFilterOptions
} from '@mui/material';
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { currencyConstants, contractStatusConstants, tariffUnitConstants, ioCategoryConstants } from '../../../shared/constants/AppConst';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { AddCircle } from '@mui/icons-material';
import { AppGridContainer, AppList, AppLoader } from '@crema';
import { useDropzone } from 'react-dropzone';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import TableHeader from '../TariffSheetTables/TableHeader';
import TariffSheetTableItems from '../TariffSheetTables/TariffSheetTableItems';
import { initialTariffSheetField } from '../SLACreation/Types';
import { Fonts } from "../../../shared/constants/AppEnums";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import { toast } from 'react-toastify';
import moment from 'moment';
import { onKeyDown } from '@crema/commonservices/CommonFileDownload';
import { commonInformationDetails, formValidationSizeMsg } from 'services/Constants';

const filter = createFilterOptions<FilmOptionType>();

const SLAEditForm = (props?: any) => {
  const poHelpersRef = useRef<any>(null);
  const tariffHelpersRef = useRef<any>(null);
  const [minEndDate, setminEndDate] = React.useState(null);
  const contactsHelpersRef = useRef<any>(null);
  const [getCountryName, setCountryName] = React.useState<any>(null)
  const [getCostCenterValue, setCostCenterValue] = React.useState<any>(false)
  const [MaterialDescriptValues, setMaterialDescriptValues] = React.useState<any>(null);
  const [materialManpower, setMaterialManpower] = React.useState(null);
  const [getHasMarkup, setHasMarkup] = React.useState(null)
  const [getMaterialValues, setMaterialValues] = React.useState(13.5);
  const [rateSelectData, setRateData] = React.useState<any>(null);
  const [getSLADetails, setSLADetails] = React.useState<any>(null)
  const [showTariffSheetData, setTariffSheetData] = React.useState<any>(true);
  const ioHelpersRef = useRef<any>(null);
  const [getCompanyDetails, setCompanyDetail] = React.useState<any>({});
  const [getStartDate, setStartDate] = React.useState<any>('');
  const [getEndtDate, setEndDate] = React.useState<any>('');
  const [getEffDate, setEffDate] = React.useState<any>('');
  const [getCountryDetails, setCountryDetails] = React.useState<any>('');
  const [getInternalManpower, setInternalManpower] = React.useState(false);
  const [getSLATermsConditions, setSLATermsConditions] = React.useState<any>([]);
  const [getSLAAttachments, setSLAAttachments] = React.useState<any>([]);
  const [getEditSLATermsConditions, setEditSLATermsConditions] = React.useState<any>([]);
  const [getEditSLAAttachments, setEditSLAAttachments] = React.useState<any>([]);
  const [showProjectUserInfo, setProjectUserInfo] = React.useState<any>([]);
  const [showGetVendorList, setGetVendorList] = React.useState<any>([]);
  const [showIsSlaStatus, setIsSlaStatus] = React.useState<any>(false);
  const [showIsPreInoviceStatus, setIsPreInoviceStatus] = React.useState<any>(false);
  const [showEmailCheckNullStatus, setEmailCheckNullStatus] = React.useState<any>(false);
  const [showContactsDetails, setContactsDetails] = React.useState<any>(false);
  const [showValidForm, setValidForm] = React.useState<any>(false);
  const [showCustomerShortId, setCustomerShortId] = React.useState<any>('');
  const [getSubmitSLAFrom, setSubmitSLAFrom] = React.useState(false);

  // let getSLADetails:any = null;

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


  const onDeleteUploadFile = (file) => {
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...acceptedFiles]);
  };


  const onTCDeleteUploadFile = (file) => {
    dropTermsCondition.acceptedFiles.splice(dropTermsCondition.acceptedFiles.indexOf(file), 1);
    setTCUploadedFiles([...dropTermsCondition.acceptedFiles]);
  };

  const onChangeCompanyDetails = (getCompany: any) => {
    props.getCustomerListDetail.forEach((items: any) => {
      setCompanyDetail(items)
    })
  }
  React.useEffect(() => {
    setCompanyDetail(null)
    if (props.getEditData && props.getSLAEditDetailsList) {
      props.getCustomerListDetail.forEach((items: any) => {
        if (items.customerName === props.getSLAEditDetailsList.customer_company) {
          setCompanyDetail(items)
        }
      })
    }

    if (props.resCountryList) {
      props.resCountryList.forEach((items: any) => {
        if (items.name === props.getEditData.customer_country) {
          setCountryDetails(items)
        }
      })
    }
    if (props.getEditData) {
      var getStartDate = moment(props.getEditData.start_date, "DD-MM-YYYY"); // 1st argument - string, 2nd argument - format
      var startDate = getStartDate.toDate(); // convert moment.js object to Date object
      var getEndDate = moment(props.getEditData.end_date, "DD-MM-YYYY"); // 1st argument - string, 2nd argument - format
      var endDate = getEndDate.toDate(); // convert moment.js object to Date object
      var getEffectiveDate = moment(props.getEditData.effective_date, "DD-MM-YYYY"); // 1st argument - string, 2nd argument - format
      var effectiveDate = getEffectiveDate.toDate(); // convert moment.js object to Date object
      setStartDate(startDate)
      setEndDate(endDate)
      setEffDate(effectiveDate)
      setSLAAttachments(props.getEditData.attachments)
      setSLATermsConditions(props.getEditData.sla_terms_and_conditions)
      setEditSLATermsConditions(props.getEditData.sla_terms_and_conditions)
      setEditSLAAttachments(props.getEditData.attachments)
    }

    if(props.getEditData && props.getEditData.sla_contacts.length){
      let checknullValuesEmailid:any =  props.getEditData.sla_contacts.find((items:any)=>items.email === null)
      if(checknullValuesEmailid){
        setEmailCheckNullStatus(false)
      }else{
        setEmailCheckNullStatus(true)
      }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.getEditData])

  React.useEffect(() => {
    getMaterialDescriptDropdown()

     if(props.updateSLAResponse){
    setSubmitSLAFrom(false)
  }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.updateSLAResponse])
 
  React.useEffect(() => {
    if (props.resAttachmentsFileUpload) {
      setSLAAttachments(props.resAttachmentsFileUpload)
      setEditSLAAttachments([])
    }
    if (props.resTermsFileUpload) {
      setSLATermsConditions(props.resTermsFileUpload)
      setEditSLATermsConditions([])
    }
  }, [props.resAttachmentsFileUpload, props.resTermsFileUpload])

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

  React.useEffect(() => {
    if (getSLADetails) {
      if (getSLADetails.sla_contacts.length !== 0) {
        setContactsDetails(true)
      } else {
        setContactsDetails(false)
      }
   
    }
    setTimeout(() => {
      if (getSLADetails && getSLADetails.sla_contacts) {
        let isPreInvoiceStatus: any = getSLADetails.sla_contacts.find((items: any) => items.is_pre_invoice === true && (items.customer_type === "Service Provider" || items.customer_type === "Service Receiver"))
        if (isPreInvoiceStatus) {
          setIsPreInoviceStatus(true)
        } else {
          setIsPreInoviceStatus(false)
        }
        let isSLAStatus: any = getSLADetails.sla_contacts.find((items: any) => items.is_sla === true && (items.customer_type === "Service Provider" || items.customer_type === "Service Receiver"))
        if (isSLAStatus) {
          setIsSlaStatus(true)
        } else {
          setIsSlaStatus(false)
        }
        getSLADetails.sla_contacts.forEach((items: any) => {
          const fileIndex: any = showProjectUserInfo.findIndex((supFiles: any) => supFiles.shortid === items.short_name)
          fileIndex !== -1 && showProjectUserInfo.splice(fileIndex, 1)
          setProjectUserInfo([...showProjectUserInfo])
        })
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSLADetails, props.isStatusSLA])


  const getMaterialDescriptDropdown = () => {
    if (props.getEditData && props.getEditData.customer_cost_center_manager && props.getEditData.getCurrecy) {
      let postValues: any = {
        costcenter: props.getEditData.customer_cost_center_manager,
        materialdescription: '',
        countryname: props.getEditData.customer_country
      }
      props.getMaterialDescription(postValues)
      props.getCurrencyList(props.getEditData.getCurrecy)
    }
  }

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

  const onIOSLADetails = (getValues?: any) => {
    if (getValues && getValues.io && getValues.io.io_number !== "" && getValues.io.io_category !== "" && getValues.io.value !== "") {
      ioHelpersRef.current.push(getValues?.io);
      formikRef.setFieldValue('io.po_number', "");
      formikRef.setFieldValue('io.vendor', "");
      formikRef.setFieldValue('io.value', "");
    } else {
      toast.error('Please fill all mandatory fields', { position: 'bottom-right' });
    }
  }

  const onOPSLADetails = (getValues?: any) => {
    if (getValues && getValues.po && getValues.po.po_number !== '' && getValues.po.value !== '' && getValues.po.vendor !== '') {
      const fileIndex: any = showGetVendorList.findIndex((vendorItems: any) => vendorItems.name === getValues.po.vendor)
      fileIndex !== -1 && showGetVendorList.splice(fileIndex, 1)
      setGetVendorList([...showGetVendorList])

      poHelpersRef.current.push(getValues.po);
      formikRef.setFieldValue('po.po_number', "");
      formikRef.setFieldValue('po.vendor', "");
      formikRef.setFieldValue('po.value', "");
    } else {
      toast.error('Please fill all mandatory fields', { position: 'bottom-right' });
    }
  }


  //This is function used to contacts
  const onInsertContactData = (getValues?: any) => {
    if (getValues && getValues.contacts && getValues.contacts.customer_type !== '' && getValues.contacts.short_name !== '') {
      const fileIndex: any = showProjectUserInfo.findIndex((supFiles: any) => supFiles.shortid === getValues.contacts.short_name)
      fileIndex !== -1 && showProjectUserInfo.splice(fileIndex, 1)
      setProjectUserInfo([...showProjectUserInfo])

      contactsHelpersRef.current.push(getValues?.contacts);
      formikRef.setFieldValue('contacts.short_name', "");
      formikRef.setFieldValue('contacts.name', "");
      formikRef.setFieldValue('contacts.email', "");
      formikRef.setFieldValue('contacts.customer_type', "");
      formikRef.setFieldValue('contacts.primary', false);
      formikRef.setFieldValue('contacts.key_person', false);
      formikRef.setFieldValue('contacts.is_pre_invoice', false);
      formikRef.setFieldValue('contacts.is_sla', false);
      setCustomerShortId('')
    } else {
      toast.error('Please fill all mandatory fields', { position: 'bottom-right' });
    }
  }

  const setContactCheckbox = (isCheck, fieldValue) => {
    if (isCheck) {
      formikRef.setFieldValue(fieldValue, true)
    } else {
      formikRef.setFieldValue(fieldValue, false)
    }
  }

  // This is function used to set currecny value
  const currencyValues = (getCurrecy: any) => {
    formikRef.setFieldValue('currency', getCurrecy);
    props.getCurrencyList(getCurrecy)
  }


  const onCustomerStartDate = (colName, endDateCol, startDate) => {
    if (startDate) {
      formikRef.setFieldValue(colName, startDate)
      formikRef.setFieldValue(endDateCol, null)
      setminEndDate(startDate);
    }
  };


  const onSetCountryName = (getEvent: any, getSelectValues: any) => {
    setCountryName(getSelectValues.name)
    formikRef.setFieldValue('customer_country', getSelectValues.name)
    setCountryDetails(getSelectValues)
  }

  //This is funcation used to get material Description
  const onGetMaterialDescription = (getValues?: any, customerCostCenter?: any) => {
    if (customerCostCenter && getValues) {
      let postValues: any = {
        costcenter: customerCostCenter,
        // contractoption: getContract,
        materialdescription: '',
        countryname: getValues
      }
      props.getMaterialDescription(postValues)
    }
  }

  // This is function used to set contractOption
  const getContractOption = (getContract?: any, customerCostCenter?: any) => {
    formikRef.setFieldValue('contract_option', getContract);
    let postValues: any = {
      costcenter: customerCostCenter,
      // contractoption: getContract,
      materialdescription: '',
      countryname: getCountryName
    }
    props.getMaterialDescription(postValues)
  }

  const OnResTariffSheetMaterial = (getTariffInfo?: any) => {
    let postValues: any = {
      costcenter: getTariffInfo.cost_center_code,
      contractoption: null,
      materialdescription: getTariffInfo.material_description,
      countryname: getCountryName
    }
    props.onGetTariffSheetMaterial(postValues)
  }

  const onAllocateValues = (getCostCenter?: any) => {
    let getTotalValues: any = getCostCenter.map(item => (parseInt(item.allocate_percentage) || 0)).reduce((prev, curr) => prev + curr, 0);
    if (getTotalValues) {
      if (getTotalValues >= 101) {
        setCostCenterValue(true)
        toast.error('should not be more than 100%.', { position: 'bottom-right' });
      } else {
        setCostCenterValue(false)
      }
    }
  }

  const onRemoveCostCenterData = (getFormData?: any, removeIndex?: any) => {
    let getMaterialData: any = getFormData.find((item: any, index?: any) => index === removeIndex);
    let getFormIndex: any = getFormData.indexOf(getMaterialData)
    getFormData.splice(getFormIndex, 1);
    if (getFormData) {
      let getTotalValues: any = getFormData.map((item: any, index?: any) => (parseInt(item.allocate_percentage) || 0)).reduce((prev, curr) => prev + curr, 0);
      if (getTotalValues) {
        if (getTotalValues >= 100) {
          setCostCenterValue(true)
        } else {
          setCostCenterValue(false)
        }
      }
    }
  }



  const getMaterialDescription = (event?: any, getMaterialData?: any) => {
    // setMaterialDescription(getMaterialData)
    if (getMaterialData) {
      setHasMarkup(getMaterialData.hasmarkup)
      let getValues: any = getMaterialData.description.toLowerCase();
      if (getValues.includes('manpower')) {
        setInternalManpower(true)
        formikRef.setFieldValue('tariff_sheet.units', "");
        formikRef.setFieldValue('tariff_sheet.rate', "");
        formikRef.setFieldValue('tariff_sheet.estimated_quantity', "");
        formikRef.setFieldValue('tariff_sheet.amount', "");
      } else {
        setInternalManpower(false)
        formikRef.setFieldValue('tariff_sheet.units', "");
        formikRef.setFieldValue('tariff_sheet.rate', "");
        formikRef.setFieldValue('tariff_sheet.estimated_quantity', "");
        formikRef.setFieldValue('tariff_sheet.amount', "");

      }
      setMaterialManpower(getValues.toLowerCase())
      onChangeMarkupValue(getMaterialData)
    }
  }

  const onChangeMarkupValue = (getMaterialDetails?: any) => {
    if (getMaterialDetails.hasmarkup === false) {
      setMaterialValues(0)
    } else {
      setMaterialValues(13.5)
    }
  }

  const setTotalMarkupAmount = (estimatedQty: any, rate: any) => {
    const tariffRate = rate ? rate : 0;
    const tariffEstQty = estimatedQty ? estimatedQty : 0;
    const markupAmount = Math.round(tariffRate * tariffEstQty);
    formikRef.setFieldValue('tariff_sheet.amount', markupAmount)
  }


  const onCalculateMarkup = (values: any) => {
    const tariffValues: any = values?.tariff_sheet;
    if (tariffValues && tariffValues.amount && tariffValues.amount !== "" && tariffValues.material_description && tariffValues.material_description !== "" && tariffValues.units && tariffValues.units !== "" && tariffValues.rate) {

      if (getSLADetails.sla_tariffsheet && getSLADetails.sla_tariffsheet.length) {
        let getMaterialDetails: any = getSLADetails.sla_tariffsheet.find((item: any) => item.material_description.split("-")[0] === 'WithHoldingTax (WHT)')
        if (getMaterialDetails && getMaterialDetails.material_description.split("-")[0] === materialManpower) {
          const totalMarupAmount: any = values?.tariff_sheet.amount * getMaterialValues / 100;

          const getAmount = getSLADetails.sla_tariffsheet.map(item => parseInt(item.amount)).reduce((prev, curr) => prev + curr, 0);
          const getMarkupValues = getSLADetails.sla_tariffsheet.map(item => (parseInt(item.markup_amount) || 0)).reduce((prev, curr) => prev + curr, 0);
          getSLADetails.sla_tariffsheet.forEach((tariffsheetItem?: any, index?: any) => {
            if (tariffsheetItem.material_description.split("-")[0] === 'WithHoldingTax (WHT)') {
              let getGateIndex: any = getSLADetails.sla_tariffsheet.indexOf(getMaterialDetails)
              getSLADetails.sla_tariffsheet.splice(getGateIndex, 1);
              if (getAmount && getMarkupValues) {
                let totalAmount: any = parseInt(getAmount) + parseInt(getMarkupValues);
                if (totalAmount) {
                  const totalMarkupValues: number = totalAmount * parseInt(values.tariff_sheet.rate) / 100;
                  tariffValues['amount'] = String(totalMarkupValues);
                }

                tariffValues['markup_value'] = getMaterialValues;
                tariffValues['has_markup'] = getHasMarkup;
                tariffValues['markup_amount'] = totalMarupAmount;
                // tariffHelpersRef.current.push(tariffValues);
              }
            }
          })
        } else if (values?.tariff_sheet && materialManpower === "WithHoldingTax (WHT)") {
          const totalMarupAmount: any = values?.tariff_sheet.amount * getMaterialValues / 100;

          const getAmount = getSLADetails.sla_tariffsheet.map(item => parseInt(item.amount)).reduce((prev, curr) => prev + curr, 0);
          const getMarkupValues = getSLADetails.sla_tariffsheet.map(item => (parseInt(item.markup_amount) || 0)).reduce((prev, curr) => prev + curr, 0);
          if (getAmount && getMarkupValues) {
            let totalAmount: any = parseInt(getAmount) + parseInt(getMarkupValues);
            if (totalAmount) {
              const totalMarkupValues: number = totalAmount * parseInt(values.tariff_sheet.rate) / 100;
              tariffValues['amount'] = String(totalMarkupValues);
            }

            tariffValues['markup_value'] = getMaterialValues;
            tariffValues['has_markup'] = getHasMarkup;
            tariffValues['markup_amount'] = totalMarupAmount;
            tariffHelpersRef.current.push(tariffValues);
          }
          // getSLADetails.sla_tariffsheet.push(values?.tariff_sheet)
        } else {
          if (values?.tariff_sheet) {
            let getMaterialDetails: any = getSLADetails.sla_tariffsheet.find((item: any) => item.material_description.split("-")[0] === 'WithHoldingTax (WHT)')
            if (getMaterialDetails) {
              let getGateIndex: any = getSLADetails.sla_tariffsheet.indexOf(getMaterialDetails)
              getSLADetails.sla_tariffsheet.splice(getGateIndex, 1);
            }

            const totalMarupAmount: any = values.tariff_sheet.amount * getMaterialValues / 100;
            tariffValues['markup_value'] = getMaterialValues;
            tariffValues['has_markup'] = getHasMarkup;
            tariffValues['markup_amount'] = totalMarupAmount;
            tariffHelpersRef.current.push(tariffValues);
            initialTariffSheetField['cost_center_code'] = values?.tariff_sheet.cost_center_code;
            formikRef.setFieldValue('tariff_sheet', initialTariffSheetField)
          }
          if (values?.tariff_sheet) {
            if (getSLADetails.sla_tariffsheet && getMaterialDetails) {
              const getAmount = getSLADetails.sla_tariffsheet.map(item => parseInt(item.amount)).reduce((prev, curr) => prev + curr, 0);
              const getMarkupValues = getSLADetails.sla_tariffsheet.map(item => (parseInt(item.markup_amount) || 0)).reduce((prev, curr) => prev + curr, 0);
              const totalMarkUpUpdate: any = getMaterialDetails.totalMarkupValue;
              const totalMarkUpValuesUpdate: any = getMaterialDetails.markup_value;
              if (getAmount && getMarkupValues) {
                let totalAmount: any = parseInt(getAmount) + parseInt(getMarkupValues);
                if (totalAmount) {
                  const totalMarkupValues: number = totalAmount * parseInt(getMaterialDetails.rate) / 100;
                  getMaterialDetails['amount'] = String(totalMarkupValues);
                }

                getMaterialDetails['totalMarkupValue'] = totalMarkUpUpdate;
                getMaterialDetails['markup_value'] = totalMarkUpValuesUpdate;
                tariffHelpersRef.current.push(getMaterialDetails);
              }
            }
          }
          // getSLADetails.sla_tariffsheet.push(values?.tariff_sheet)
        }
      }
      getSLADetails.sla_tariffsheet.push(values?.tariff_sheet)


      formikRef.setFieldValue('tariff_sheet.units', "");
      formikRef.setFieldValue('tariff_sheet.amount', "");
      formikRef.setFieldValue('tariff_sheet.material_description', "");
      formikRef.setFieldValue('tariff_sheet.rate', "");
      formikRef.setFieldValue('tariff_sheet.has_fx_risk', "");
      formikRef.setFieldValue('tariff_sheet.has_gst', "");
      formikRef.setFieldValue('tariff_sheet.is_taxable', "");
      formikRef.setFieldValue('tariff_sheet.has_markup', "");
      setMaterialDescriptValues(null)
      setRateData([])
      onGetAmount()
    } else {
      toast.error('Please fill all mandatory fields', { position: 'bottom-right' });
    }
  }

  const onGetAmount = () => {
    getSLADetails.sla_tariffsheet.forEach((items?: any) => { })
    getSLADetails.sla_tariffsheet.forEach((items?: any) => { })
  }

  const onRemoveData = (getValueData?: any, getKey?: any) => {
    if (getKey) {
      getSLADetails.sla_tariffsheet.splice(getKey, 1);
    }
    let getMaterialData: any = getSLADetails.sla_tariffsheet.find((item: any) => item.material_description.split("-")[0] === 'WithHoldingTax (WHT)')
    if (getSLADetails.sla_tariffsheet) {
      let getGateIndex: any = getSLADetails.sla_tariffsheet.indexOf(getMaterialData)
      getSLADetails.sla_tariffsheet.splice(getGateIndex, 1);
    }
    if (getSLADetails.sla_tariffsheet && getMaterialData) {
      const getAmount = getSLADetails.sla_tariffsheet.map(item => parseInt(item.amount)).reduce((prev, curr) => prev + curr, 0);
      const getMarkupValues = getSLADetails.sla_tariffsheet.map(item => (parseInt(item.markup_amount) || 0)).reduce((prev, curr) => prev + curr, 0);
      if (getAmount && getMarkupValues) {
        let totalAmount: any = parseInt(getAmount) + parseInt(getMarkupValues);
        if (totalAmount) {
          const totalMarkupValues: number = totalAmount * parseInt(getMaterialData.rate) / 100;
          getMaterialData['amount'] = String(totalMarkupValues);
        }
        tariffHelpersRef.current.push(getMaterialData);
      }

    }
  }

  const onUpdateTariffSheetData = (getSelectValues?: any, getValueData?: any, getKey?: any) => {
    setTariffSheetData(false)

    if (getSelectValues) {
      let getMaterialData: any = getSLADetails.sla_tariffsheet.find((item: any, index?: any) => index === getKey)

      getMaterialData["material_code"] = getSelectValues.materialname;
      getMaterialData["has_markup"] = getSelectValues.has_markup;
      getMaterialData["has_gst"] = getSelectValues.has_gst;
      getMaterialData["has_fx_risk"] = getSelectValues.has_fx_risk;
      getMaterialData["has_wht"] = getSelectValues.has_wht;
      getMaterialData["is_taxable"] = getSelectValues.is_taxable;
    }

    setTimeout(() => {
      setTariffSheetData(true)
      getSLADetails.sla_tariffsheet.forEach((items: any) => {
        if (items.material_code !== null) {
        } else {
        }
      })
    }, 500);
  }


  let formikRef: any

  const onChangeStartDate = (getDate) => {
    setStartDate(getDate)
  }

  const onChangeEndDate = (getDate) => {
    setEndDate(getDate)
  }

  const onChangeEffectiveDate = (getDate) => {
    setEffDate(getDate)
  }
  const onOpenFiles = (getURLFiles: any) => {
    window.open(getURLFiles, '_blank')
  }


  // This is function used to get projectSla data and vendor List
  React.useEffect(() => {
    if (props.getProjectSLAData && props.getProjectSLAData.contacts) {
      setProjectUserInfo(props.getProjectSLAData.contacts)
    } else {
      setProjectUserInfo([])
    }
    if (props.getVendorListDetails) {
      setGetVendorList(props.getVendorListDetails)
    } else {
      setGetVendorList([])
    }
  }, [props.getProjectSLAData, props.getVendorListDetails])

  
  const onGetContactsShortId = (getShortId: any) => {
    setCustomerShortId(getShortId)
  }

  return (
    <React.Fragment>
          {
        getSubmitSLAFrom?
          <AppLoader />
          : null
      }
    <Formik
      enableReinitialize
      innerRef={(action) => { formikRef = action }}
      initialValues={props.getEditData}
      // validationSchema={bizCaseSLAValidationSchema}
      onSubmit={(values, actions) => {
        if (values) {
          const postValues: any = {
            slaname: values.slaname,
            slaid: values.slaid,
            team: values.team,
            customer_company: values.customer_company,
            customer_address: values.team,
            customer_name: values.team,
            customer_cost_center: values.team,
            customer_entity_code: values.customer_entity_code,
            customer_cost_center_manager: values.customer_cost_center,
            provider_cost_center: values.tariff_sheet ? values.tariff_sheet.cost_center_code : '',
            contract_status: values.contract_status,
            customer_country: values.customer_country,
            // "provider_name": "Suresh Kumar",
            currency: values.currency,
            start_date: values.start_date,
            end_date: values.end_date,
            effective_date: values.effective_date,
            organization_type: values.organization_type,
            project_name: values.project_name,
            // "po_number": 114526,
            contract_option: values.contract_option,
            revenue_cost_center: values.revenue_cost_center ? values.revenue_cost_center : [],
            // "FTE": 0,
            service_description: values.service_description,
            billing_cycle: values.billing_cycle,
            total_budget: values.total_budget,
            sla_io: values.sla_io ? values.sla_io : [],
            sla_po: values.sla_po ? values.sla_po : [],
            sla_tariffsheet: values.sla_tariffsheet ? values.sla_tariffsheet : [],
            sla_contacts: values.sla_contacts ? values.sla_contacts : [],
            sla_terms_and_conditions: getSLATermsConditions ? getSLATermsConditions : [],
            attachments: getSLAAttachments ? getSLAAttachments : [],
          }
          const ProjectValue: any = {
            slaid: props.ProjSlaId.slaid,
            slaFormData: postValues
          }

          if (ProjectValue) {
            setSubmitSLAFrom(true)
            props.onSubmitData(ProjectValue)
          }
        }

      }}
    >
      {({ isSubmitting, values, errors, touched, setFieldValue, handleChange, handleSubmit }) => {
        setSLADetails(values)
        if (!(!!(errors.start_date) &&
        !!(errors.end_date) && !!(errors.project_name) &&
        !!(errors.contract_option) && !!(errors.currency) &&
        !!(errors.slaname) && !!(errors.country) &&
        !!(errors.revenue_cost_center) && !!(errors.organization_type) &&
        !!(errors.billing_cycle))) {
        setValidForm(true)

      } else {
        setValidForm(false)
      }


        return (
          <Form
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
            noValidate
            autoComplete="off"
          >
            <Accordion expanded={props.expanded === 'customerDetails'} onChange={props.handleExpandChange('customerDetails')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Customer Details</Typography>
              </AccordionSummary>
              <AccordionDetails>

                <Box sx={{ flexGrow: 1, width: '100%' }}>
                  <AppGridContainer >

                    <Grid item xs={12} md={4}>

                      <FormControl variant='outlined' fullWidth >
                        <Autocomplete
                          id='customerName'
                          options={props.getCustomerListDetail ? props.getCustomerListDetail : []}
                          getOptionLabel={(option: any) => option.customerName}
                          disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                          renderOption={(props, option) => {
                            return (
                              <Box component='li' {...props} key={props['data-option-index']}>
                                {option.customerName}
                              </Box >
                            );
                          }}
                          onChange={(event, value: any) => {
                            setFieldValue("customer", value);
                            onChangeCompanyDetails(value)
                            if (value) {
                              setFieldValue("customer_address", value.address);
                              setFieldValue("customer_company", value.customerName);
                            } else {
                              setFieldValue("customer_address", '');
                              setFieldValue("customer_company", '');
                            }

                          }}
                          filterSelectedOptions
                          value={getCompanyDetails}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label='Choose Customer'
                              placeholder='Customer'
                              name="customer_company"
                              required
                              error={(errors.customer_company) ? true : false} helperText={errors.customer_company}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        disabled
                        label='Address *'
                        id='outlined-size-small'
                        name={'customer_address'}
                        value={values?.customer_address}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label='Project *'
                        id='outlined-size-small'
                        name={'project_name'}
                        value={values?.project_name}
                        onChange={handleChange}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>

                      <FormControl variant='outlined' fullWidth >
                        <TextField
                          fullWidth
                          label='Team *'
                          id='outlined-size-small'
                          name={'team'}
                          value={values?.team}
                          onChange={handleChange}
                          disabled
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControl variant='outlined' fullWidth >
                        <InputLabel id='currency-list-label'>Currency *</InputLabel>
                        <Select
                          labelId='currency-list-label'
                          id='currency-list-label-standard'
                          name="currency"
                          value={values?.currency}
                          disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                          onChange={
                            (e: any) => currencyValues(e.target.value)
                          }
                          label='currency *'
                          required
                        >
                          <MenuItem value=''><em>None</em></MenuItem>
                          {currencyConstants.map((option, index) => (
                            <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                          ))}
                        </Select>
                        {errors.currency && <FormHelperText error>{errors.currency}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          disabled={(props.type === 'c4d' || (props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA")) ? true : false}
                          disablePast
                          label='Start Date'
                          value={getStartDate}
                          onChange={startDate => {
                            onCustomerStartDate('start_date', 'end_date', startDate)
                            onChangeStartDate(startDate)
                          }}
                          renderInput={(params) => <TextField fullWidth variant='outlined' {...params} required
                            error={(errors.start_date) ? true : false} helperText={errors.start_date} onKeyDown={onKeyDown} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          disabled={(props.type === 'c4d' || (props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA")) ? true : false}
                          disablePast
                          minDate={minEndDate}
                          label='End Date'
                          value={getEndtDate}
                          onChange={endDate => {
                            formikRef.setFieldValue('end_date', endDate);
                            onChangeEndDate(endDate)
                          }}
                          renderInput={(params) => <TextField fullWidth variant='outlined' {...params} required
                            error={(errors.end_date) ? true : false} helperText={errors.end_date} onKeyDown={onKeyDown} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          disabled={(props.type === 'c4d' || (props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA")) ? true : false}
                          // disablePast
                          minDate={values?.start_date}
                          label='Effective Date'
                          value={getEffDate}
                          onChange={effectiveDate => {
                            formikRef.setFieldValue('effective_date', effectiveDate);
                            onChangeEffectiveDate(effectiveDate)
                          }}
                          renderInput={(params) => <TextField fullWidth variant='outlined' {...params} required
                            error={(errors.effective_date) ? true : false} helperText={errors.effective_date} onKeyDown={onKeyDown} />} />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl variant='outlined' fullWidth >
                        <InputLabel id='Contract-list-label'>Contract Status *</InputLabel>
                        <Select
                          labelId='contract-list-label'
                          id='contract-list-label-standard'
                          name="contract_status"
                          value={values?.contract_status}
                          disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                          onChange={handleChange}
                          label='contract'

                        >
                          <MenuItem value=''><em>None</em></MenuItem>
                          {contractStatusConstants.map((option, index) => (
                            <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl variant="outlined" fullWidth margin='dense'>
                        <Autocomplete
                          disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                          onChange={(event: any, newValue: any) => {
                            // onGetYear(newValue)
                            setFieldValue('country', newValue ? newValue.name : '')
                            onSetCountryName(event, newValue);
                            onGetMaterialDescription(newValue.name, values?.tariff_sheet.cost_center_code)
                          }}
                          getOptionLabel={(option: any) => (option ? `${option.name}` : "")}
                          id='customer_country'
                          value={getCountryDetails}
                          options={props.resCountryList ? props.resCountryList : []}
                          renderInput={(params) => <TextField {...params} label='Country *' />}
                        />
                        {errors.country && <FormHelperText error>{errors.country}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl variant='outlined' fullWidth >
                        <InputLabel id='Contract-option-label'>Contract Option *</InputLabel>
                        <Select
                          disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                          labelId='contract-option-label'
                          id='contract_option'
                          name="contract_option"
                          value={values?.contract_option}
                          onChange={
                            (e: any) => getContractOption(e.target.value, values?.tariff_sheet.cost_center_code)
                          }
                          label='contract'
                        >
                          <MenuItem value=''><em>None</em></MenuItem>
                          {props.resContractOption ?
                            props.resContractOption.map((option, index) => (
                              <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                            )) : null}
                        </Select>
                        {errors.contract_option && <FormHelperText error>{errors.contract_option}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                        fullWidth
                        label='Customer Cost Centre *'
                        id='customer_cost_center'
                        name="customer_cost_center"
                        //size='small'
                        value={values?.customer_cost_center}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label='Customer Cost Centre Manager *'
                        id='customer_cost_center_manager'
                        name="customer_cost_center_manager"
                        //size='small'
                        value={values?.customer_cost_center_manager}
                        onChange={handleChange}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                        fullWidth
                        label='SLA Name *'
                        id='slaname'
                        name="slaname"
                        value={values?.slaname}
                        onChange={handleChange}
                      />
                      {errors.slaname && <FormHelperText error>{errors.slaname}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label='SLA # *'
                        id='slaid'
                        name="slaid"
                        value={values?.slaid}
                        onChange={handleChange}
                        disabled
                      />
                      {errors.slaid && <FormHelperText error>{errors.slaid}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Box sx={{ marginBottom: 5 }}>
                        <Typography component="h4"
                          variant="h4"
                          sx={{
                            mb: 3,
                            fontWeight: Fonts.SEMI_BOLD,
                          }}>Cost Centre Details</Typography>
                      </Box>
                      <FieldArray
                        name="revenue_cost_center"
                        render={({ insert, remove, push }) => (
                          <>
                            {values?.revenue_cost_center.length > 0 &&
                              values?.revenue_cost_center.map(
                                (fieldItem: any, index: any) => (
                                  <Box key={index}>
                                    <Grid container spacing={3}>
                                      <Grid item xs={12} md={5} sx={{ marginTop: 2, marginBottom: 3 }}>
                                        <FormControl variant='outlined' fullWidth >
                                          <InputLabel id={`revenue_cost_center.${index}.cost_center`}>Cost Centre *</InputLabel>
                                          <Select
                                            labelId={`revenue_cost_center.${index}.cost_center`}
                                            id={`revenue_cost_center.${index}.cost_center`}
                                            name={`revenue_cost_center.${index}.cost_center`}
                                            value={fieldItem?.cost_center}
                                            onChange={handleChange}
                                            label='Cost Centre *'
                                            disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                                          >
                                            <MenuItem value=''><em>None</em></MenuItem>
                                            {props.getCostCenterListDetail.map((option, index) => (
                                              <MenuItem key={index} value={option.costcenter}>{`${option.costcenter} - ${option.team_group}`}</MenuItem>
                                            ))}
                                          </Select>
                                          <ErrorMessage name={`revenue_cost_center[${index}].cost_center`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                        </FormControl>
                                      </Grid>

                                      <Grid item xs={12} md={5}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                          <TextField
                                            placeholder="Allocate *"
                                            variant='outlined'
                                            label="Allocate *"
                                            id={`revenue_cost_center.${index}.allocate_percentage`}
                                            name={`revenue_cost_center.${index}.allocate_percentage`}
                                            value={fieldItem?.allocate_percentage}
                                            onChange={(e: any) => {
                                              formikRef.setFieldValue(`revenue_cost_center.${index}.allocate_percentage`, e.target.value);
                                            }}
                                            onKeyUp={(e: any) => {
                                              onAllocateValues(values?.revenue_cost_center)
                                            }}
                                            disabled={(props.ProjSlaId && props.ProjSlaId.viewStatus !== "View SLA") && fieldItem?.cost_center !== "" ? false : true}
                                          />
                                          <ErrorMessage name={`revenue_cost_center[${index}].allocate_percentage`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                        </FormControl>
                                      </Grid>

                                      <Grid item xs={2} md={1} sx={{ textAlign: 'center', marginTop: 5 }}>
                                        <ButtonGroup size='small' aria-label='small button group'>
                                          <Button
                                            variant="outlined"
                                            color="inherit" type="button"
                                            onClick={() => {
                                              remove(index)
                                              onRemoveCostCenterData(values?.revenue_cost_center, index)
                                            }
                                            }
                                            disabled={values.revenue_cost_center.length <= 1 ? true : false}
                                          >
                                            -
                                          </Button>
                                          <Button
                                            variant="contained"
                                            color="primary" type="button"
                                            onClick={() =>
                                              push({
                                                cost_center: "",
                                                allocate_percentage: '',
                                              })
                                            }
                                            disabled={getCostCenterValue === true ? true : false}

                                          >
                                            <i className="material-icons">add</i>
                                          </Button>
                                        </ButtonGroup>

                                      </Grid>
                                      <Grid item xs={1} md={1}>
                                      </Grid>
                                    </Grid>
                                  </Box>
                                ))}
                          </>
                        )} />
                      <Box>
                        {
                          getCostCenterValue === true ?
                            <Box sx={{ color: '#ff0000' }}>Should not be more than 100%.</Box>
                            : null
                        }
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Box sx={{ marginBottom: 5 }}>
                        <Typography component="h4"
                          variant="h4"
                          sx={{
                            mb: 3,
                            fontWeight: Fonts.SEMI_BOLD,
                          }}>Organization *</Typography>
                      </Box>
                      <FormControl component='fieldset'>
                        {/* <FormLabel component='legend'>Organization</FormLabel> */}
                        <RadioGroup row aria-label='organization' name='organization_type' value={values?.organization_type}
                          onChange={handleChange}>
                          {(props.OrganizationData && props.OrganizationData.length) && props.OrganizationData.map((option, index) => (
                            <FormControlLabel key={index} value={option.name} control={<Radio
                              disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false} />} label={option.name} />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        label='Service Description'
                        id='service_description'
                        multiline
                        rows={4}
                        //size='small'
                        value={values?.service_description}
                        onChange={handleChange}
                        disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl component='fieldset'>
                        <Typography component="h4"
                          variant="h4"
                          sx={{
                            mb: 3,
                            fontWeight: Fonts.SEMI_BOLD,
                          }}>Billing Cycle *</Typography>
                        <RadioGroup row aria-label='billing_cycle' name='billing_cycle' value={values?.billing_cycle}
                          onChange={handleChange}>
                          {(props.BillingcycleData && props.BillingcycleData.length) && props.BillingcycleData.map((option, index) => (
                            <FormControlLabel key={index} value={option.name} control={<Radio
                              disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false} />} label={option.name} />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </AppGridContainer>
                </Box>

              </AccordionDetails>
            </Accordion>
            <Accordion expanded={props.expanded === 'tariffDetails'} onChange={props.handleExpandChange('tariffDetails')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography >Tariff Sheet</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ margin: 4 }}>
                  <Grid container direction="row" alignItems="" justifyContent="" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    {(props.type === 'c4d') ?
                      <Grid item xs={12} md={6}>
                        <TextField
                          disabled
                          fullWidth
                          label='Total Budget *'
                          id='total_budget'
                          name={'total_budget'}
                          value={values.total_budget ? values.total_budget : 0}
                          onChange={handleChange}
                        />
                      </Grid> :
                      <React.Fragment>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth margin='dense'>
                            <TextField name={`tariff_sheet.cost_center_code`} disabled
                              label='Cost Centre Code' variant='outlined' value={values?.tariff_sheet.cost_center_code} onChange={handleChange}
                              type="text" required
                              error={(errors.cost_center_code) ? true : false} helperText={errors.cost_center_code}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl variant="outlined" fullWidth margin='dense'>
                            <Autocomplete
                              onChange={(event: any, newValue: any) => {
                                // onGetYear(newValue)                                
                                if (newValue) {
                                  setMaterialDescriptValues(newValue)
                                  setFieldValue('tariff_sheet.material_description', newValue ? newValue.description : '')
                                  setFieldValue('tariff_sheet.has_gst', newValue ? newValue.has_gst : '')
                                  setFieldValue('tariff_sheet.has_wht', newValue ? newValue.has_wht : '')
                                  setFieldValue('tariff_sheet.has_fx_risk', newValue ? newValue.has_fx : '')
                                  setFieldValue('tariff_sheet.has_markup', newValue ? newValue.has_markup : '')
                                  setFieldValue('tariff_sheet.material_code', newValue ? newValue.materialname : '')
                                  setFieldValue('tariff_sheet.is_taxable', newValue ? newValue.is_taxable : '')
                                  getMaterialDescription(event, newValue);
                                } else {

                                }

                              }}
                              value={MaterialDescriptValues}
                              getOptionLabel={(option: any) => (option && option.description ? `${option.description} - ${option.materialname}` : "")}
                              id='tariff_sheet.material_description'
                              options={props.resMaterialDescription ? props.resMaterialDescription : []}
                              renderInput={(params) => <TextField {...params} label='Material Description *' />}
                              disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                            />
                          </FormControl>
                        </Grid>
                        {((getInternalManpower && getInternalManpower === true)) &&
                          <Grid item xs={12} md={4}>
                            <FormControl fullWidth margin='dense'>
                              <InputLabel id={`tariff_sheet.units-label`}>Units Types</InputLabel>
                              <Select
                                labelId={`tariff_sheet.units-label`}
                                id={`tariff_sheet.units-label-standard`}
                                name={`tariff_sheet.units`}
                                value={values?.tariff_sheet.units}
                                onChange={handleChange}
                                label='Units *'
                                disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}

                              >
                                <MenuItem value=''><em>None</em></MenuItem>
                                {tariffUnitConstants.map((option, index) => (
                                  <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        }
                        {((getInternalManpower === false)) &&
                          <Grid item xs={12} md={4} sx={{ display: materialManpower !== null && materialManpower === "WithHoldingTax (WHT)" ? 'none' : 'block' }}>
                            <FormControl fullWidth margin='dense'>
                              <TextField name={`tariff_sheet.units`}
                                label='Units *' variant='outlined' value={values?.tariff_sheet.units} onChange={handleChange}
                                disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                                type="number"
                              />
                            </FormControl>
                          </Grid>
                        }
                        <Grid item xs={12} md={4} sx={{ display: materialManpower !== null && materialManpower === "WithHoldingTax (WHT)" ? 'none' : 'block' }}>
                          <FormControl fullWidth margin='dense'>
                            <TextField name={`tariff_sheet.estimated_quantity`}
                              label='Estimated Quantity *' variant='outlined' value={values?.tariff_sheet.estimated_quantity}
                              disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                              onChange={(event) => {
                                setFieldValue('tariff_sheet.estimated_quantity', event.target.value);
                                setTotalMarkupAmount(event.target.value, values?.tariff_sheet.rate);
                              }}
                              type="number"
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth margin='dense'>
                            {
                              (getInternalManpower && getInternalManpower === true) ?
                                <Autocomplete
                                  value={rateSelectData}
                                  disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                                  onChange={(event?: any, newValue?: any) => {
                                    if (newValue) {
                                      if (newValue.rate) {
                                        setTotalMarkupAmount(values?.tariff_sheet.estimated_quantity, newValue.rate);
                                        setFieldValue('tariff_sheet.rate', newValue.rate);
                                        setRateData(newValue)
                                      } else {
                                        setTotalMarkupAmount(values?.tariff_sheet.estimated_quantity, newValue);
                                        setFieldValue('tariff_sheet.rate', newValue);
                                        setRateData(newValue)
                                      }
                                    }
                                    if (typeof newValue === 'string') {
                                      // setValue({
                                      //   rate: newValue,
                                      // });
                                    } else if (newValue && newValue.inputValue) {
                                      // Create a new value from the user input
                                      // setValue({
                                      //   rate: newValue.inputValue,
                                      // });
                                    } else {
                                      // setValue(newValue);
                                    }
                                  }}
                                  filterOptions={(options?: any, params?: any) => {
                                    const filtered = filter(options, params);
                                    const { inputValue } = params;
                                    // Suggest the creation of a new value
                                    const isExisting = options.some((option) => inputValue === option.rate);
                                    if (inputValue !== '' && !isExisting) {
                                      filtered.push({
                                        inputValue,
                                        rate: `${inputValue}`,
                                      });
                                    }
                                    return filtered;
                                  }}
                                  selectOnFocus
                                  clearOnBlur
                                  handleHomeEndKeys
                                  id="free-solo-with-text-demo"
                                  // options={tariffUnitConstants?tariffUnitConstants:[]}
                                  options={props.resCurrencyList ? props.resCurrencyList : []}
                                  getOptionLabel={(option?: any) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                      return option;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                      return option.inputValue;
                                    }
                                    // Regular option
                                    return option.rate;
                                  }}
                                  renderOption={(props, option) => <li {...props}>{option.year} - {option.rate} - {option.hourly_description}</li>}
                                  freeSolo
                                  renderInput={(params) => (
                                    <TextField {...params} label="Rate *" />
                                  )}
                                /> :
                                <TextField name={`tariff_sheet.rate`}
                                  label={materialManpower !== null && materialManpower === "WithHoldingTax (WHT)" ? 'WHT %' : 'Rate *'} variant='outlined' value={values?.tariff_sheet.rate}
                                  onChange={(event) => {
                                    setFieldValue('tariff_sheet.rate', event.target.value);
                                    setTotalMarkupAmount(values?.tariff_sheet.estimated_quantity, event.target.value);
                                  }}
                                  disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                                  type="number"
                                />
                            }

                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth margin='dense'>
                            <TextField name={`tariff_sheet.amount`}
                              label='Amount *' variant='outlined' value={values?.tariff_sheet.amount} onChange={handleChange}
                              type="number"
                              disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth margin='dense'>
                            <TextField name={`tariff_sheet.has_markup`}
                              label='Markup Value *' variant='outlined' value={values?.tariff_sheet.has_markup} onChange={handleChange} disabled
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth margin='dense'>
                            <TextField name={`tariff_sheet.has_fx_risk`}
                              label='Fx Risk *' variant='outlined' value={values?.tariff_sheet.has_fx_risk} onChange={handleChange} disabled
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth margin='dense'>
                            <TextField name={`tariff_sheet.has_wht`}
                              label='WHT *' variant='outlined' value={values?.tariff_sheet.has_wht} onChange={handleChange} disabled
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl fullWidth margin='dense'>
                            <TextField name={`tariff_sheet.is_taxable`}
                              label='Tax *' variant='outlined' value={values?.tariff_sheet.is_taxable} onChange={handleChange} disabled
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined" startIcon={<AddCircle />} type="button" onClick={(event) => {
                            onCalculateMarkup(values);
                          }}
                            disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}> Insert
                          </Button>
                        </Grid>
                      </React.Fragment>}
                  </Grid>
                </Box>
                {(props.type !== 'c4d') &&
                  <Box className="autoscroll">
                    <TableContainer component={Paper}>
                      <Table aria-label='simple table'>
                        <TableHeader />
                        <TableBody>
                          <FieldArray
                            name="sla_tariffsheet"
                            render={tariffSheetListHelpers => {
                              tariffHelpersRef.current = tariffSheetListHelpers
                              return (
                                <React.Fragment>
                                  {values?.sla_tariffsheet && showTariffSheetData ?
                                    values?.sla_tariffsheet.map((tariffSheetProperty, index) => {
                                      return (
                                        <TableRow key={index}>
                                          <TariffSheetTableItems disabled={false} data={tariffSheetProperty}
                                            tariffSheetListHelpers={tariffSheetListHelpers} getKey={index} onRemoveData={onRemoveData} getValueInfo={values?.sla_tariffsheet} resMaterialDescription={props.resMaterialDescription} OnResTariffSheetMaterial={OnResTariffSheetMaterial} resTariffSheetMaterial={props.resTariffSheetMaterial} onUpdateTariffSheetData={onUpdateTariffSheetData} />
                                        </TableRow>
                                      )
                                    })
                                    : null}
                                </React.Fragment>
                              )
                            }}
                          />
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>}

              </AccordionDetails>
            </Accordion>
            <Accordion expanded={props.expanded === 'ioDetails'} onChange={props.handleExpandChange('ioDetails')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>I/O</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ margin: 4 }}>
                  <Grid container
                    direction="row"
                    alignItems=""
                    justifyContent=""
                    spacing={{ xs: 2, md: 8 }}
                    columns={{ xs: 4, sm: 8, md: 12 }} >
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth margin='dense'>
                        <TextField name={`io.io_number`}
                          label='I/O Number *' variant='outlined' value={values?.io.io_number} onChange={handleChange}
                          type="number"
                          disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl variant="outlined" fullWidth margin='dense'>
                        <InputLabel id={`io.io_category-label`}>I/O Category *</InputLabel>
                        <Select
                          labelId={`io.io_category-label`}
                          id={`io.io_category-label-standard`}
                          name={`io.io_category`}
                          value={values?.io.io_category}
                          onChange={handleChange}
                          label='I/O Category *'
                          disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}

                        >
                          <MenuItem value=''><em>None</em></MenuItem>
                          {ioCategoryConstants.map((option, index) => (
                            <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                          ))}
                        </Select>
                        {errors.io_category && <FormHelperText error>{errors.io_category}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth margin='dense'>
                        <TextField name={`io.value`}
                          disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                          label='Value *' variant='outlined' value={values?.io.value} onChange={handleChange}
                          type="text"
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined" startIcon={<AddCircle />} type="button" onClick={(event) => {
                        onIOSLADetails(values)
                      }}
                        disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}> Insert
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <Box className="autoscroll">
                  <TableContainer component={Paper}>
                    <Table aria-label='simple table'>
                      <TableHead sx={{ backgroundColor: "#00677F", marginTop: 2 }}>
                        <TableRow>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>IO Number</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>IO Category</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>IO Value</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <FieldArray
                          name="sla_io"
                          render={ioListHelpers => {
                            ioHelpersRef.current = ioListHelpers
                            return (
                              <React.Fragment>
                                {values?.sla_io.map((ioProperty, index) => (
                                  <TableRow key={index}>
                                    <TableCell sx={{}}>{ioProperty.io_number}</TableCell>
                                    <TableCell sx={{}}>{ioProperty.io_category}</TableCell>
                                    <TableCell sx={{}}>{ioProperty.value}</TableCell>
                                    <TableCell sx={{}}>
                                      <IconButton aria-label='delete' onClick={(event) => ioListHelpers.remove(index)}>
                                        <RemoveCircleIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </React.Fragment>
                            )
                          }}
                        />
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={props.expanded === 'poDetails'} onChange={props.handleExpandChange('poDetails')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography>PO</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ margin: 4 }}>
                  <Grid container direction="row" alignItems="" justifyContent="" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth margin='dense'>
                        <TextField name={`po.po_number`}
                          label='P/O Number *' variant='outlined' value={values?.po.po_number} onChange={handleChange}
                          type="number"
                          disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl variant="outlined" fullWidth margin='dense'>
                        <InputLabel id={`po.vendor-label`}>Vendor *</InputLabel>
                        <Select
                          labelId={`po.vendor`}
                          id={`po.vendor`}
                          name={`po.vendor`}
                          value={values?.po.vendor}
                          onChange={handleChange}
                          label='Vendor *'
                          disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}

                        >
                          <MenuItem value=''><em>None</em></MenuItem>
                          {(showGetVendorList && showGetVendorList.length) &&
                            showGetVendorList.map((item?: any, index?: any) => (
                              <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                            ))
                          }
                        </Select>
                        {errors.vendor && <FormHelperText error>{errors.vendor}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth margin='dense'>
                        <TextField name={`po.value`}
                          label='Value *' variant='outlined' value={values?.po.value} onChange={handleChange}
                          type="text"
                          disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined" startIcon={<AddCircle />} type="button" onClick={(event) => {
                        onOPSLADetails(values)
                      }}
                        disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}> Insert
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <Box className="autoscroll">
                  <TableContainer component={Paper}>
                    <Table aria-label='simple table'>
                      <TableHead sx={{ backgroundColor: "#00677F", marginTop: 2 }}>
                        <TableRow>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>PO Number</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>Vendor</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>PO Value</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <FieldArray
                          name="sla_po"
                          render={poListHelpers => {
                            poHelpersRef.current = poListHelpers
                            return (
                              <React.Fragment>
                                {values?.sla_po.map((poProperty, index) => (
                                  <TableRow key={index}>
                                    <TableCell sx={{}}>{poProperty.po_number}</TableCell>
                                    <TableCell sx={{}}>{poProperty.vendor}</TableCell>
                                    <TableCell sx={{}}>{poProperty.value}</TableCell>
                                    <TableCell sx={{}}>
                                      <IconButton aria-label='delete' onClick={(event) => poListHelpers.remove(index)}>
                                        <RemoveCircleIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </React.Fragment>
                            )
                          }}
                        />
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={props.expanded === 'contactDetails'} onChange={props.handleExpandChange('contactDetails')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography>Contacts {showValidForm && showContactsDetails && showEmailCheckNullStatus ? null : <Box sx={{ color: '#ff0000', fontSize: 12, paddingLeft: 2 }}>* Please fill out all required fields</Box>}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ margin: 4 }}>
                  <Grid container direction="row" alignItems="" justifyContent="" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth margin='dense'>
                        <Autocomplete
                          onChange={(event: any, newValue: any) => {
                            onGetContactsShortId(newValue)
                            setFieldValue('contacts.short_name', newValue ? newValue.shortid : "");
                            formikRef.setFieldValue('contacts.name', newValue ? newValue.emp_name : "");
                            formikRef.setFieldValue('contacts.email', newValue ? newValue.email : "");
                          }}
                          value={showCustomerShortId}
                          disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}
                          getOptionLabel={(option: any) => (option ? option.shortid : "")}
                          id={`contacts.short_name`}
                          options={showProjectUserInfo ? showProjectUserInfo : []}
                          renderInput={(params) => <TextField {...params} label='Short Id *' id={`contacts.short_name`} />}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth margin='dense'>
                        <TextField name={`contacts.name`} id={`contacts.name`}
                          label='Name *' variant='outlined' value={values?.contacts.name} onChange={handleChange}
                          type="text"
                          disabled
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth margin='dense'>
                        <TextField name={`contacts.email`} id={`contacts.email`}
                          label='Email *' variant='outlined' value={values?.contacts.email} onChange={handleChange}
                          type="email"
                          disabled
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl variant="outlined" fullWidth margin='dense'>
                        <InputLabel id={`contacts.customer_type-label`}>Customer Type *</InputLabel>
                        <Select
                          labelId={`contacts.customer_type-label`}
                          id={`contacts.customer_type-label-standard`}
                          name={`contacts.customer_type`}
                          value={values?.contacts.customer_type}
                          onChange={handleChange}
                          label='Customer Type *'
                          disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}

                        >
                          <MenuItem value=''><em>None</em></MenuItem>
                          <MenuItem value={'Service Provider'}>Service Provider</MenuItem>
                          <MenuItem value={'Service Receiver'}>Service Receiver</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ marginTop: 3 }}>
                      <FormControl component='fieldset'>
                        <FormGroup >
                          <FormControlLabel control={<Checkbox name='contacts.primary' 
                              checked={values?.contacts.primary ? true : false}
                            onChange={(event) => {
                              const isCheck = event.target.checked
                              setContactCheckbox(isCheck, 'contacts.primary')
                            }}
                          />} label='Primary' />
                        </FormGroup>
                      </FormControl>
                      <FormControl component='fieldset'>
                        <FormGroup >
                          <FormControlLabel control={<Checkbox name='contacts.key_person' 
                              checked={values?.contacts.key_person ? true : false}
                            onChange={(event) => {
                              const isCheck = event.target.checked
                              setContactCheckbox(isCheck, 'contacts.key_person')
                            }}
                          />} label='Key Person' />
                        </FormGroup>
                      </FormControl>
                      <FormControl component='fieldset'>
                        <FormGroup >
                          <FormControlLabel control={<Checkbox name='contacts.is_pre_invoice' checked={values?.contacts.is_pre_invoice ? true : false}
                            onChange={(event) => {
                              const isCheck = event.target.checked
                              setContactCheckbox(isCheck, 'contacts.is_pre_invoice')
                            }}
                            disabled={showIsPreInoviceStatus}
                          />} label='Is Pre-Invoice' />
                        </FormGroup>
                      </FormControl>
                      <FormControl component='fieldset'>
                        <FormGroup >
                          <FormControlLabel control={<Checkbox name='contacts.is_sla' checked={values?.contacts.is_sla ? true : false}
                            onChange={(event) => {
                              const isCheck = event.target.checked
                              setContactCheckbox(isCheck, 'contacts.is_sla')
                            }}
                            disabled={showIsSlaStatus}
                          />} label='Is SLA' />
                        </FormGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="outlined" startIcon={<AddCircle />} type="button" onClick={(event) => {
                        onInsertContactData(values)
                      }}
                        disabled={props.ProjSlaId && props.ProjSlaId.viewStatus === "View SLA" ? true : false}> Insert
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <Box className="autoscroll">
                  <TableContainer component={Paper}>
                    <Table aria-label='simple table'>
                      <TableHead sx={{ backgroundColor: "#00677F", marginTop: 2 }}>
                        <TableRow>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>Name</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>Email</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>Customer Type</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>Primary</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>Key Person</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>Is Pre-Invoice</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>Is SLA</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <FieldArray
                          name="sla_contacts"
                          render={contactsHelpers => {
                            contactsHelpersRef.current = contactsHelpers
                            return (
                              <React.Fragment>
                                {values?.sla_contacts.map((contactProperty, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{contactProperty.name}</TableCell>
                                    <TableCell>{contactProperty.email}</TableCell>
                                    <TableCell>{contactProperty.customer_type}</TableCell>
                                    <TableCell>{(contactProperty.primary) ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>{(contactProperty.key_person) ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>{(contactProperty.is_pre_invoice) ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>{(contactProperty.is_sla) ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                      <IconButton aria-label='delete' onClick={(event) => contactsHelpers.remove(index)}>
                                        <RemoveCircleIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </React.Fragment>
                            )
                          }}
                        />
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={props.expanded === 'slaDetails'} onChange={props.handleExpandChange('slaDetails')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography>SLA Terms and Conditions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item xs={12} md={12}>

                  <UploadModern
                    uploadText={commonInformationDetails.drapanddrop}
                    dropzone={dropzone}
                  />
                  <Box sx={{ color: '#ff0000', fontSize: 12, paddingLeft: 2, marginBottom: 2 }}>{formValidationSizeMsg.fileUploadMaxSize}</Box>
                  <aside>
                    <AppList
                      data={uploadedFiles}
                      renderRow={(file, index) => (
                        <FileRow
                          key={index + file.path}
                          file={file}
                          onDeleteUploadFile={onDeleteUploadFile}
                        />
                      )}
                    />
                  </aside>
                  {
                    getEditSLATermsConditions && getEditSLATermsConditions.length ?
                      <React.Fragment>
                        {
                          getEditSLATermsConditions.map((items: any, index: any) => (
                            <Box key={index} sx={{ border: '1px solid #ccc', padding: 2, marginBottom: 2 }} onClick={() => onOpenFiles(items && items.supporting_files_url ? items.supporting_files_url : '#')} className="pointer">{items.supporting_files_name}</Box>
                          ))
                        }
                      </React.Fragment>
                      : null
                  }
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={props.expanded === 'attachmentDetails'} onChange={props.handleExpandChange('attachmentDetails')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography>Attachments</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item xs={12} md={12}>

                  <UploadModern
                    uploadText={commonInformationDetails.drapanddrop}
                    dropzone={dropTermsCondition}
                  />
                  <Box sx={{ color: '#ff0000', fontSize: 12, paddingLeft: 2, marginBottom: 2 }}>{formValidationSizeMsg.fileUploadMaxSize}</Box>
                  <aside>
                    <AppList
                      data={tcUploadedFiles}
                      renderRow={(file, index) => (
                        <FileRow
                          key={index + file.path}
                          file={file}
                          onDeleteUploadFile={onTCDeleteUploadFile}
                        />
                      )}
                    />
                  </aside>
                  {
                    getEditSLAAttachments && getEditSLAAttachments.length ?
                      <React.Fragment>
                        {
                          getEditSLAAttachments.map((items: any, index: any) => (
                            <Box key={index} sx={{ border: '1px solid #ccc', padding: 2, marginBottom: 2 }} onClick={() => onOpenFiles(items && items.supporting_files_url ? items.supporting_files_url : '#')} className="pointer">{items.supporting_files_name}</Box>
                          ))
                        }
                      </React.Fragment>
                      : null
                  }
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
              <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                color="inherit" type="button" onClick={(event) => { props.goBack() }}> Cancel
              </Button>
              <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                color="primary" type="submit" disabled={(props.ProjSlaId && props.ProjSlaId.viewStatus !== "View SLA") && !getCostCenterValue ? false : true}> Save
              </Button>
            </Box>
          </Form>
        )
      }}
    </Formik>
    </React.Fragment>
  )
}


interface FilmOptionType {
  inputValue?: string;
  hourly_description?: string;
  level?: string;
  rate?: string;
  year?: string
}

export default SLAEditForm;