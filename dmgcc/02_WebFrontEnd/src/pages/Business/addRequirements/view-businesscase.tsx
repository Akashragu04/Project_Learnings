import React, { useEffect } from 'react';
import {
  Accordion, AccordionSummary, Box, Button, Card, CardContent, FormControl,
  Grid, Input, Typography,
  TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, ButtonGroup, Checkbox
} from '@mui/material';
import AppGridContainer from '../../../@crema/core/AppGridContainer';
import { Formik, Form, FieldArray } from 'formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { AppComponentHeader, AppLoader } from '../../../@crema';
import {
  appConstants, appRequirementProperty, RoutePermittedRole, updateBizCaseSchema
} from '../../../shared/constants/AppConst';
import { viewBizCaseRequirementValidationSchema } from './FormValidations';
import moment from 'moment';
import { connect } from "react-redux"
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getBizProfitLossCalculationListAction,
  getBizRequirementDetailAction, initBizProfitLossCalculationAction, initBizProfitLossIterationDetailnAction, initBizRequirementAction, updateBizProfitLossCalculationRequest, updateFinalBizProfitLossRequest,
} from 'saga/Actions';
import CommonStore from '@crema/services/commonstore';
import ViewBizCaseManpowerForm from './viewbizcase-manpower-form';
import ViewBizCaseCalculationIterationView from './viewbizcase-calculation-iterationview';
import { onKeyDown } from '@crema/commonservices/CommonFileDownload';

const ViewBusinessCase = (props: any) => {
  const userRole = CommonStore().userRoleType;
  const navigate = useNavigate();
  const navState: any = useLocation();
  let formikRef: any;
  const [isFetched, setIsFetched] = React.useState(true);
  const [expanded, setExpanded] = React.useState('manpower');
  const [minEndDate, setminEndDate] = React.useState(null);
  const [bizDateRange, setBizDateRange] = React.useState([]);
  const [bizYearList, setBizYearList] = React.useState([]);
  const [bizYear, setBizYear] = React.useState('');
  // const [bizIteration, setBizIteration] = React.useState('');
  const [isLevelEnabled, setIsLevelEnabled] = React.useState(false);
  const [requirementId, setrequirementId] = React.useState(null);
  const [isSequenceEnable, setSequenceEnable] = React.useState(false);
  const [isDetailResponseInitiated, setIsDetailResponseInitiated] = React.useState(false);
  const [bizCasePreview, setBizCasePreview] = React.useState(true);
  const [calcIterationPreview, setCalcIterationPreview] = React.useState(false);
  const [calcPreviewAction, setCalcPreviewAction] = React.useState('');

  const { bizDetails, isLoading, updateBizProfitResponse, businessProfitIterationList, updateBizSubmitResponse }: any = props;

  useEffect(() => {
    if (navState.state.hasOwnProperty('bizId') && navState.state.bizId) {
      props.initBizRequirement();
      props.initBizProfitLossCalculation();
      props.getBizCalculationIterationList({ biz_id: navState.state.bizId });
      props.getBizRequirementDetail({ bizcase_id: navState.state.bizId })
    } else {
      goBack()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bizDetails.status && !isDetailResponseInitiated) {
      const getBizInitialData = JSON.parse(JSON.stringify(bizDetails.data));
      setIsDetailResponseInitiated(true);
      setrequirementId(bizDetails.data.id);
      setBizDetailFormResponse(getBizInitialData); //Set Form Data func
    }
    if (updateBizProfitResponse.status) {
      toast.success(updateBizProfitResponse.message, { position: 'bottom-right' });
      props.initBizRequirement();
      props.initBizProfitLossCalculation();
      goBack();
    }
    if (updateBizSubmitResponse.status) {
      toast.success(updateBizSubmitResponse.message, { position: 'bottom-right' });
      props.initBizRequirement();
      props.initBizProfitLossCalculation();
      goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bizDetails, updateBizProfitResponse, updateBizSubmitResponse]);

  const setBizDetailFormResponse = (bizFormResponse) => {
    if (formikRef) {
      const bizStartDate = moment(bizFormResponse.business_case_start_date).toDate();
      const bizEndDate = moment(bizFormResponse.business_case_end_date).toDate();
      formikRef.setFieldValue('business_case_start_date', bizStartDate);
      formikRef.setFieldValue('business_case_end_date', bizEndDate);
      formikRef.setFieldValue('man_power_inflation', bizFormResponse.manpower_inflation);
      formikRef.setFieldValue('rate_card_inflation', bizFormResponse.rate_card_inflation);
      formikRef.setFieldValue('manpower_hiringcost', bizFormResponse.manpower_hiringcost);
      formikRef.setFieldValue('manpower_requirements', bizFormResponse.manpower_requirements);
      formikRef.setFieldValue('is_customer_rampdown', bizFormResponse.is_customer_rampdown);
      onGetInitRampupRange(bizFormResponse.business_case_start_date, bizFormResponse.business_case_end_date, bizFormResponse);
      formikRef.setFieldValue('rampups', bizFormResponse.rampups);
      formikRef.setFieldValue('customer_rampdown', bizFormResponse.customer_rampdown);
      // setBizIteration(bizFormResponse.active_iteration);  
      setIsFetched(false);
    }
  }

  const goBack = () => {
    props.initBizRequirement();
    props.initBizProfitLossCalculation();
    navigate('/business/business-setup');
  }

  const handleAccordinChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const onBizCaseStartDate = (colName, endDateCol, startDate) => {
    if (startDate) {
      formikRef.setFieldValue(colName, startDate)
      formikRef.setFieldValue(endDateCol, null)
      setminEndDate(startDate);
    }
  };

  const onBizCaseEndDate = (startDate, endDate) => {
    if (endDate) {
      setTimeout(() => {
        onGetRampupRange(startDate, endDate);
      }, 1000);
    }
  };

  const onBusinessYearFilter = (event) => {
    setBizYear(event.target.value)
  };

  const onGetRampupRange = (startDate, endDate) => {
    if (startDate && endDate) {
      const bizStartDate = moment(startDate);
      const bizEndDate = moment(endDate);

      const businessCaseDateRangeList: any = [];
      const bizYearsList: any = [];
      while (bizStartDate.isSameOrBefore(bizEndDate)) {
        const bizDateRangeObj: any = {};
        bizDateRangeObj['date'] = bizStartDate.format("YYYY-MM-01");
        bizDateRangeObj['year'] = bizStartDate.format("YYYY");
        bizDateRangeObj['month'] = bizStartDate.format("MM");
        bizDateRangeObj['monthLabel'] = bizStartDate.format("MMM");
        businessCaseDateRangeList.push(bizDateRangeObj);
        bizStartDate.add(1, 'month');
        const yearFind = bizYearsList.some((item) => item === bizStartDate.format("YYYY"));
        if (!yearFind) {
          bizYearsList.push(bizStartDate.format("YYYY"));
        }
      }
      if (moment(businessCaseDateRangeList[businessCaseDateRangeList.length - 1].date).format("MM") !== bizEndDate.format("MM")) {
        const bizDateRangeObj: any = {};
        bizDateRangeObj['date'] = bizEndDate.format("YYYY-MM-01");
        bizDateRangeObj['year'] = bizEndDate.format("YYYY");
        bizDateRangeObj['month'] = bizEndDate.format("MM");
        bizDateRangeObj['monthLabel'] = bizEndDate.format("MMM");
        businessCaseDateRangeList.push(bizDateRangeObj);
      }
      // Start of Ramup Range based dynamical Input Set
      const rampUpFormData = JSON.parse(JSON.stringify(formikRef.values.rampups));
      const customerRampDownFormData = JSON.parse(JSON.stringify(formikRef.values.customer_rampdown));
      rampUpFormData.forEach((rampUpProperty, index) => {
        if (rampUpProperty.properties.length) {
          const rampUpPropertiesList: any = [];
          businessCaseDateRangeList.forEach((element, key) => {
            const rampUpConstant = JSON.parse(JSON.stringify(appRequirementProperty));
            const rampValueFind = rampUpProperty.properties.find((item: any) => item.property_date === element.date);
            if (rampValueFind) {
              rampUpConstant['property_value'] = rampValueFind.property_value;
            } else {
              rampUpConstant['property_value'] = '';
            }
            rampUpConstant['property_name'] = `${element.monthLabel}-${element.year}`;
            rampUpConstant['property_date'] = element.date;
            rampUpConstant['year'] = element.year;
            rampUpPropertiesList.push(rampUpConstant);
          });
          rampUpProperty['properties'] = rampUpPropertiesList;
        }
      });
      customerRampDownFormData.forEach((rampDownProperty, index) => {
        if (rampDownProperty.properties.length) {
          const rampDownPropertiesList: any = [];
          businessCaseDateRangeList.forEach(element => {
            const rampDownConstant = JSON.parse(JSON.stringify(appRequirementProperty));
            const rampDownValueFind = rampDownProperty.properties.find((item: any) => item.property_date === element.date);
            if (rampDownValueFind) {
              rampDownConstant['property_value'] = rampDownValueFind.property_value;
            } else {
              rampDownConstant['property_value'] = '';
            }
            rampDownConstant['property_name'] = `${element.monthLabel}-${element.year}`;
            rampDownConstant['property_date'] = element.date;
            rampDownConstant['year'] = element.year;
            rampDownPropertiesList.push(rampDownConstant);
          });
          rampDownProperty['properties'] = rampDownPropertiesList;
        }
      });
      formikRef.setFieldValue('rampups', rampUpFormData);
      formikRef.setFieldValue('customer_rampdown', customerRampDownFormData);
      // End of Ramup Range based dynamical Input Set
      const bizYearRangeList = bizYearsList;
      if (bizYearRangeList.length) {
        if (bizEndDate.format("YYYY") !== bizYearRangeList[bizYearRangeList.length - 1]) {
          bizYearsList.pop();
        }
      }
      setBizDateRange(businessCaseDateRangeList);
      setBizYearList(bizYearsList)
      // Set Default business Year Filter
      if (bizYearsList.length) {
        setBizYear(bizYearsList[0])
      }
    }

  };

  const onGetInitRampupRange = (startDate, endDate, bizDetailResponse) => {
    if (startDate && endDate) {
      const bizStartDate = moment(startDate);
      const bizEndDate = moment(endDate);

      const businessCaseDateRangeList: any = [];
      const bizYearsList: any = [];
      while (bizStartDate.isSameOrBefore(bizEndDate)) {
        const bizDateRangeObj: any = {};
        bizDateRangeObj['date'] = bizStartDate.format("YYYY-MM-01");
        bizDateRangeObj['year'] = bizStartDate.format("YYYY");
        bizDateRangeObj['month'] = bizStartDate.format("MM");
        bizDateRangeObj['monthLabel'] = bizStartDate.format("MMM");
        businessCaseDateRangeList.push(bizDateRangeObj);
        bizStartDate.add(1, 'month');
        const yearFind = bizYearsList.some((item) => item === bizStartDate.format("YYYY"));
        if (!yearFind) {
          bizYearsList.push(bizStartDate.format("YYYY"));
        }
      }
      if (moment(businessCaseDateRangeList[businessCaseDateRangeList.length - 1].date).format("MM") !== bizEndDate.format("MM")) {
        const bizDateRangeObj: any = {};
        bizDateRangeObj['date'] = bizEndDate.format("YYYY-MM-01");
        bizDateRangeObj['year'] = bizEndDate.format("YYYY");
        bizDateRangeObj['month'] = bizEndDate.format("MM");
        bizDateRangeObj['monthLabel'] = bizEndDate.format("MMM");
        businessCaseDateRangeList.push(bizDateRangeObj);
      }
      // Start of Ramup Range based dynamical Input Set
      const rampUpFormData = JSON.parse(JSON.stringify(bizDetailResponse.rampups));
      const customerRampDownFormData = JSON.parse(JSON.stringify(bizDetailResponse.customer_rampdown));
      rampUpFormData.forEach((rampUpProperty, index) => {
        if (rampUpProperty.properties.length) {
          rampUpProperty['properties'].length = 0;
          businessCaseDateRangeList.forEach(element => {
            const rampUpConstant = JSON.parse(JSON.stringify(appRequirementProperty));
            rampUpConstant['property_name'] = `${element.monthLabel}-${element.year}`;
            rampUpConstant['property_date'] = element.date;
            rampUpConstant['year'] = element.year;
            rampUpProperty['properties'].push(rampUpConstant);
          });
        }
      });
      customerRampDownFormData.forEach((rampDownProperty, index) => {
        if (rampDownProperty.properties.length) {
          rampDownProperty['properties'].length = 0;
          businessCaseDateRangeList.forEach(element => {
            const rampDownConstant = JSON.parse(JSON.stringify(appRequirementProperty));
            rampDownConstant['property_name'] = `${element.monthLabel}-${element.year}`;
            rampDownConstant['property_date'] = element.date;
            rampDownConstant['year'] = element.year;
            rampDownProperty['properties'].push(rampDownConstant);
          });
        }
      });
      formikRef.setFieldValue('rampups', rampUpFormData);
      formikRef.setFieldValue('customer_rampdown', customerRampDownFormData);
      // End of Ramup Range based dynamical Input Set
      const bizYearRangeList = bizYearsList;
      if (bizYearRangeList.length) {
        if (bizEndDate.format("YYYY") !== bizYearRangeList[bizYearRangeList.length - 1]) {
          bizYearsList.pop();
        }
      }
      setBizDateRange(businessCaseDateRangeList);
      setBizYearList(bizYearsList)
      // Set Default business Year Filter
      if (bizYearsList.length) {
        setBizYear(bizYearsList[0])
      }
    }

  };


  /** Start of Manpower Requirement & Hiring Cost Calculation & Dynamical Levels */

  const onManpowerLevelChange = (event) => {
    const level = event.target.value;
    formikRef.setFieldValue('manpower_level', level);
    if (level) {
      if ((level === "L1") || (level === "L2") || (level === "L3" || (level === "L4"))) {
        formikRef.setFieldValue('level_sequence', '');
        setSequenceEnable(true);
      } else {
        setSequenceEnable(false);
      }
    }
  }

  const onManpowerLevel = (level, Sequence) => {
    setIsLevelEnabled(true);
    if (formikRef.values.business_case_start_date && formikRef.values.business_case_end_date) {
      if (level) {
        let propertyLevel = '';
        if (Sequence) {
          propertyLevel = `${level}-${Sequence}`;
        } else {
          propertyLevel = `${level}`;
        }
        const manpowerRequirementData = JSON.parse(JSON.stringify(formikRef.values.manpower_requirements));
        const manpowerHiringCostData = JSON.parse(JSON.stringify(formikRef.values.manpower_hiringcost));
        const rampUpData = JSON.parse(JSON.stringify(formikRef.values.rampups));
        const rampDownData = JSON.parse(JSON.stringify(formikRef.values.customer_rampdown));
        const levelExist = manpowerRequirementData[0].properties.find((item) => item.property_name === propertyLevel);

        if (!levelExist) {
          const reqPropertyObj = JSON.parse(JSON.stringify(appRequirementProperty));
          reqPropertyObj['property_name'] = propertyLevel;
          reqPropertyObj['property_date'] = '';
          reqPropertyObj['year'] = '';
          manpowerRequirementData.forEach((reqProperty, index) => {
            reqProperty['properties'].push(reqPropertyObj);
          });
          manpowerHiringCostData.forEach((reqHiringProperty, index) => {
            reqHiringProperty['properties'].push(reqPropertyObj);
          });
          const rampDataObj: any = {};
          rampDataObj['level'] = propertyLevel;
          rampDataObj['total'] = '';
          rampDataObj['properties'] = [];
          if (bizDateRange) {
            bizDateRange.forEach((element: any) => {
              const rampUpConstant = JSON.parse(JSON.stringify(appRequirementProperty));
              rampUpConstant['property_name'] = `${element.monthLabel}-${element.year}`;
              rampUpConstant['property_date'] = element.date;
              rampUpConstant['year'] = element.year;
              rampDataObj['properties'].push(rampUpConstant);
            });
          }
          rampUpData.push(rampDataObj);
          rampDownData.push(rampDataObj);
          // Manpower Requiremet & Hiring & Rampup & Rampdown Field Set based on dynamical Level and sequence
          formikRef.setFieldValue('manpower_requirements', manpowerRequirementData);
          formikRef.setFieldValue('manpower_hiringcost', manpowerHiringCostData);
          formikRef.setFieldValue('rampups', rampUpData);
          formikRef.setFieldValue('customer_rampdown', rampDownData);
          // Level & Sequence Field Reset
          formikRef.setFieldValue('manpower_level', '');
          formikRef.setFieldValue('level_sequence', '');
          setTimeout(() => {
            setIsLevelEnabled(false);
          }, 500);
        } else {
          setIsLevelEnabled(false);
          toast.warn(appConstants.sequenceExistMsg, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
      }
    } else {
      setIsLevelEnabled(false);
      toast.warn(appConstants.bizCaseDateValdationMsg, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  /** Requirement Calculations */
  const onManPowerRequirementSet = (index, propertyIndex, event) => {
    const eventValue = (event.target.value) ? event.target.value : '0';
    formikRef.setFieldValue('isCalculating', true);
    // setIsCalculating(true);
    if (eventValue) {
      const manPowerRequirementColumn = `manpower_requirements[${index}].properties[${propertyIndex}].property_value`;
      const manPowerHiringCostColumn = `manpower_hiringcost[${index}].properties[${propertyIndex}].property_value`;
      formikRef.setFieldValue(manPowerRequirementColumn, eventValue)
      if (index === 0) {
        formikRef.setFieldValue(manPowerHiringCostColumn, eventValue)
        setTimeout(() => {
          const constPersonIndex = index + 1;
          const totalCostIndex = constPersonIndex + 1;
          const fteValue = formikRef.values['manpower_requirements'][index]['properties'][propertyIndex]['property_value'];
          const costPerPersonValue = formikRef.values['manpower_requirements'][constPersonIndex]['properties'][propertyIndex]['property_value'];
          const totalCostDataColumn = `manpower_requirements[${totalCostIndex}].properties[${propertyIndex}].property_value`;
          if (costPerPersonValue) {
            const totalCostData = fteValue * costPerPersonValue;
            formikRef.setFieldValue(totalCostDataColumn, totalCostData.toString())
            customManPowerHiringCostSet(propertyIndex)
          }
          onCalculateManPower(false)
        }, 1000);
        const fteProperty = formikRef.values['manpower_requirements'][index]['properties'][propertyIndex];
        if (fteProperty.property_name && eventValue) {
          const rampUpLevelFind = formikRef.values.rampups.find((item) => item.level === fteProperty.property_name);
          if ((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business)) {
            if (rampUpLevelFind) {
              const rampUpTotal = (parseInt(rampUpLevelFind.total)) ? parseInt(rampUpLevelFind.total) : 0;
              if (rampUpTotal > parseInt(eventValue)) {
                toast.warn(`Rampup - ${rampUpLevelFind.level} is mismatch with Manpower Requirements FTE`,
                  { position: 'bottom-right', autoClose: false });
              }
            }
            const rampDownLevelFind = formikRef.values.customer_rampdown.find((item) => item.level === fteProperty.property_name);
            if (rampDownLevelFind) {
              const rampDownTotal = (parseInt(rampDownLevelFind.total)) ? parseInt(rampDownLevelFind.total) : 0;
              if (rampDownTotal > parseInt(eventValue)) {
                toast.warn(`Rampdown - ${rampDownLevelFind.level} is mismatch with Manpower Requirements FTE`,
                  { position: 'bottom-right', autoClose: false });
              }
            }
          }
        }
      } else if (index === 1) {
        setTimeout(() => {
          if (formikRef.values) {
            const totalCostIndex = index + 1;
            const fteValue = formikRef.values['manpower_requirements'][0]['properties'][propertyIndex]['property_value'];
            const costPerPersonValue = formikRef.values['manpower_requirements'][index]['properties'][propertyIndex]['property_value'];
            const totalCostDataColumn = `manpower_requirements[${totalCostIndex}].properties[${propertyIndex}].property_value`;
            const totalCostData = fteValue * costPerPersonValue;
            formikRef.setFieldValue(totalCostDataColumn, totalCostData.toString())
            onCalculateManPower(false)
            customManPowerHiringCostSet(propertyIndex)
          }
        }, 1000);
      }
    }
  };

  /** Hiring Cost Calculations */
  const onManPowerHiringCostSet = (index, propertyIndex, event) => {
    const eventValue = (event.target.value) ? event.target.value : '0';
    formikRef.setFieldValue('isCalculating', true);
    const manPowerHiringCostColumn = `manpower_hiringcost[${index}].properties[${propertyIndex}].property_value`;
    formikRef.setFieldValue(manPowerHiringCostColumn, eventValue)
    if (index === 1) {
      setTimeout(() => {
        if (formikRef.values) {
          let otherHiringCostData:any = 0;
          const totalHiringCostIndex = index + 2;
          const otherHiringCostIndex = index + 1;
          const totalHiringCostDataColumn = `manpower_hiringcost[${totalHiringCostIndex}].properties[${propertyIndex}].property_value`;

          const perofCandidateValue = formikRef.values['manpower_hiringcost'][index]['properties'][propertyIndex]['property_value'];
          const otherHiringCostValue = formikRef.values['manpower_hiringcost'][otherHiringCostIndex]['properties'][propertyIndex]['property_value'];
          if(otherHiringCostValue) { otherHiringCostData = otherHiringCostValue; }
          const totalCostValue = formikRef.values['manpower_requirements'][2]['properties'][propertyIndex]['property_value'];
          const percentCalc:any = (totalCostValue / 100) * perofCandidateValue;
          const totalHC = parseInt(percentCalc) + parseInt(otherHiringCostData);
          formikRef.setFieldValue(totalHiringCostDataColumn, totalHC.toString())
          onCalculateHiringCostTotal()
        }
      }, 1000);
    } else if (index === 2) {
      setTimeout(() => {
        if (formikRef.values) {
          const totalHiringCostIndex = index + 1;
          const PercForCandIndex = index - 1;
          const totalHiringCostDataColumn = `manpower_hiringcost[${totalHiringCostIndex}].properties[${propertyIndex}].property_value`;
          
          const perofCandidateValue = formikRef.values['manpower_hiringcost'][PercForCandIndex]['properties'][propertyIndex]['property_value'];
          const otherHiringCostValue = formikRef.values['manpower_hiringcost'][index]['properties'][propertyIndex]['property_value'];
          const totalCostValue = formikRef.values['manpower_requirements'][2]['properties'][propertyIndex]['property_value'];
          const percentCalc:any = (totalCostValue / 100) * perofCandidateValue;
          const totalHC = parseInt(percentCalc) + parseInt(otherHiringCostValue);
          formikRef.setFieldValue(totalHiringCostDataColumn, totalHC.toString())
          onCalculateHiringCostTotal()
        }
      }, 1000);
    }
  };

  const customManPowerHiringCostSet = (propertyIndex) => {
    const constPersonIndex = 1;
    const otherHiringCostIndex = constPersonIndex + 1;
    const totalHiringCostIndex = constPersonIndex + 2;
    const totalHiringCostDataColumn = `manpower_hiringcost[${totalHiringCostIndex}].properties[${propertyIndex}].property_value`;

    const perofCandidateValue = formikRef.values['manpower_hiringcost'][constPersonIndex]['properties'][propertyIndex]['property_value'];
    const otherHiringCostValue = formikRef.values['manpower_hiringcost'][otherHiringCostIndex]['properties'][propertyIndex]['property_value'];
    const totalCostValue = formikRef.values['manpower_requirements'][2]['properties'][propertyIndex]['property_value'];
    if (perofCandidateValue) {
      const percentCalc:any = (totalCostValue / 100) * perofCandidateValue;
      const totalHC = parseInt(percentCalc) + parseInt(otherHiringCostValue);
      formikRef.setFieldValue(totalHiringCostDataColumn, totalHC.toString())
      onCalculateHiringCostTotal()
    }

  }

  /** FTE Total & Total cost Calculation for Requirment and Hiring cost FTE Total */
  const onCalculateManPower = (isLoader: any) => {
    if (formikRef.values) {
      formikRef.values['manpower_requirements'].forEach((requirement, key) => {
        // Manpower FTE Row Total
        if (requirement.level === "FTE") {
          let totalManPower: any = 0;
          requirement.properties.forEach((element, propertyKey) => {
            if (element.property_value) {
              totalManPower = totalManPower + parseInt(element.property_value);
            }
          });
          const manPowerInitialRowColumn = `manpower_requirements[0].total`; //properties[0].property_value
          const HiringInitialRowColumn = `manpower_hiringcost[0].total`; //properties[0].property_value
          const totalPowerData = totalManPower.toString();
          formikRef.setFieldValue(manPowerInitialRowColumn, totalPowerData)
          formikRef.setFieldValue(HiringInitialRowColumn, totalPowerData)
          formikRef.setFieldValue('isCalculating', false);
          setTimeout(() => {
            if (isLoader) {
              formikRef.setFieldValue('isCalculating', false);
            }
          }, 500);
          // setIsCalculating(false);          
        } else if (requirement.level === "Total Cost") {
          let totalManPower: any = 0;
          requirement.properties.forEach((element, propertyKey) => {
            if (element.property_value) {
              totalManPower = totalManPower + parseInt(element.property_value);
            }
          });
          const manPowerTotalCostColumn = `manpower_requirements[2].total`; //properties[0].property_value
          const totalPowerData = totalManPower.toString();
          formikRef.setFieldValue(manPowerTotalCostColumn, totalPowerData)
          formikRef.setFieldValue('isCalculating', false);
          setTimeout(() => {
            if (isLoader) {
              formikRef.setFieldValue('isCalculating', false);
            }
          }, 500);
          // setIsCalculating(false);
        }
      });
    }
  }

  /** Total Hiring Cost Calculations */
  const onCalculateHiringCostTotal = () => {
    if (formikRef.values) {
      formikRef.values['manpower_hiringcost'].forEach((requirement, key) => {
        if (requirement.level === "Total Hiring Cost") {
          let totalHiringCost: any = 0;
          requirement.properties.forEach((element, propertyKey) => {
            if (element.property_value) {
              totalHiringCost = totalHiringCost + parseFloat(element.property_value);
            }
          });
          const manHiringCostTotalColumn = `manpower_hiringcost[3].total`; //properties[0].property_value
          const totalHiringCostData = totalHiringCost.toFixed(2);
          formikRef.setFieldValue(manHiringCostTotalColumn, totalHiringCostData.toString())
          formikRef.setFieldValue('isCalculating', false);
        }
      });
    }
  }
  /** End of Manpower Requirement & Hiring Cost Calculation */

  /** RampUp & Rampdown Calculations */
  const onRampUpCalculateValidation = (index, propertyIndex, event) => {
    formikRef.setFieldValue('isRampCalculating', true);
    // setIsRampCalculating(true);
    const rampUpColumnData = `rampups[${index}].properties[${propertyIndex}].property_value`;
    formikRef.setFieldValue(rampUpColumnData, event.target.value)
    if (formikRef.values['rampups'][index].properties.length) {
      setTimeout(() => {
        let totalRampUp: any = 0;
        formikRef.values['rampups'][index].properties.forEach(element => {
          if (element.property_value) {
            totalRampUp = totalRampUp + parseFloat(element.property_value);
          }
        });
        const rampUpColumnTotal = `rampups[${index}].total`;
        const totalRampUpLevelTotal = totalRampUp.toFixed(2);
        // Validation on FTE
        const rampUpLevelStr = formikRef.values['rampups'][index].level;
        const manpowerLevelFTE = formikRef.values['manpower_requirements'][0].properties.find((item) => item.property_name === rampUpLevelStr);
        if (manpowerLevelFTE) {
          if (parseInt(totalRampUpLevelTotal) > parseInt(manpowerLevelFTE.property_value)) {
            toast.warn(`Rampup - ${rampUpLevelStr} Total is greater than Manpower Requirements FTE`,
              { position: 'bottom-right', autoClose: false });
          }
        }
        formikRef.setFieldValue(rampUpColumnTotal, totalRampUpLevelTotal.toString())
        // setIsRampCalculating(false);
        formikRef.setFieldValue('isRampCalculating', false);
      }, 1000);
    }
  };
  const onRampDownCalculate = (index, propertyIndex, event) => {
    formikRef.setFieldValue('isRampCalculating', true);
    // setIsRampCalculating(true);
    const rampDownColumnData = `customer_rampdown[${index}].properties[${propertyIndex}].property_value`;
    formikRef.setFieldValue(rampDownColumnData, event.target.value)
    if (formikRef.values['customer_rampdown'][index].properties.length) {
      setTimeout(() => {
        let totalRampDown: any = 0;
        formikRef.values['customer_rampdown'][index].properties.forEach(element => {
          if (element.property_value) {
            totalRampDown = totalRampDown + parseFloat(element.property_value);
          }
        });
        const rampDownColumnTotal = `customer_rampdown[${index}].total`;
        const totalRampDownLevelTotal = totalRampDown.toFixed(2);
        // Validation on FTE
        const rampDownLevelStr = formikRef.values['customer_rampdown'][index].level;
        const manpowerLevelFTE = formikRef.values['manpower_requirements'][0].properties.find((item) => item.property_name === rampDownLevelStr);
        if (manpowerLevelFTE) {
          if (parseInt(totalRampDownLevelTotal) > parseInt(manpowerLevelFTE.property_value)) {
            toast.warn(`Customer Rampdown - ${rampDownLevelStr} Total is greater than Customer Requirements FTE`,
              { position: 'bottom-right', autoClose: false });
          }
        }
        formikRef.setFieldValue(rampDownColumnTotal, totalRampDownLevelTotal.toString())
        // setIsRampCalculating(false);
        formikRef.setFieldValue('isRampCalculating', false);
      }, 1000);
    }
  };

  const bizRequirementFilter = () => {
    const bizRequirementData = JSON.parse(JSON.stringify(formikRef.values));
    if (bizRequirementData) {
      const bizStartDate = moment(bizRequirementData.business_case_start_date);
      const bizEndDate = moment(bizRequirementData.business_case_end_date);
      bizRequirementData['business_case_start_date'] = bizStartDate.format("YYYY-MM-DD");
      bizRequirementData['business_case_end_date'] = bizEndDate.format("YYYY-MM-DD");
      delete bizRequirementData['isCalculating'];
      delete bizRequirementData['isRampCalculating'];
      return bizRequirementData;
    }
  }

  const onLevelDynamicalRemove = (levelProperty, action) => {
    formikRef.setFieldValue('isRampCalculating', true);
    formikRef.setFieldValue('isCalculating', true);
    let currentLevel: any = '';
    const manpowerRequirementData = JSON.parse(JSON.stringify(formikRef.values.manpower_requirements));
    const manpowerHiringCostData = JSON.parse(JSON.stringify(formikRef.values.manpower_hiringcost));
    const rampUpData = JSON.parse(JSON.stringify(formikRef.values.rampups));
    const rampDownData = JSON.parse(JSON.stringify(formikRef.values.customer_rampdown));
    if (action === 'ramp') {
      currentLevel = levelProperty.level;
    } else if (action === 'manpower') {
      currentLevel = levelProperty.property_name;
    }
    manpowerRequirementData.forEach((requirement) => {
      if (requirement.properties.length) {
        const reqProperties = requirement.properties.filter((item) => item.property_name !== currentLevel);
        requirement['properties'] = reqProperties;
      }
    });
    manpowerHiringCostData.forEach((hiringCost) => {
      if (hiringCost.properties.length) {
        const reqProperties = hiringCost.properties.filter((item) => item.property_name !== currentLevel);
        hiringCost['properties'] = reqProperties;
      }
    });
    const rampUpLevelData = rampUpData.filter((item) => item.level !== currentLevel);
    const rampDownLevelData = rampDownData.filter((item) => item.level !== currentLevel);
    formikRef.setFieldValue('manpower_requirements', manpowerRequirementData);
    formikRef.setFieldValue('manpower_hiringcost', manpowerHiringCostData);
    formikRef.setFieldValue('rampups', rampUpLevelData);
    formikRef.setFieldValue('customer_rampdown', rampDownLevelData);
    setTimeout(() => {
      formikRef.setFieldValue('isRampCalculating', false);
      onCalculateManPower(true);
      onCalculateHiringCostTotal();
    }, 1000);
  }

  const showBizCasePreview = () => {
    setBizCasePreview(true);
  }

  const setIterationAction = (dialog) => (event) => {
    setCalcIterationPreview(event ? dialog : false);
    setCalcPreviewAction('');
    props.initBizProfitLossIterationDetail();
  }

  const setIterationPreviewClose = () => {
    setCalcIterationPreview(false);
  }

  const showCalcIterationPreview = (action) => {
    setCalcIterationPreview(true);
    setCalcPreviewAction(action);
  }

  const updateFinalIterationCalculation = (iteration, bizRequirementData) => {
    if (requirementId && iteration) {
      props.updateFinalBizProfitIterationRequest({ biz_id: requirementId, iteration_id: iteration, data: bizRequirementData });
    } else {
      toast.warning("Please choose the calculation Iteration", { position: 'bottom-right' });
    }
  }
  return (
    <>
      {(isLoading && isFetched) ? <AppLoader /> :
        <>
          <AppComponentHeader
            title="View Business Case"
            description=""
          />
          <AppGridContainer>

            <Grid item xs={12} style={{}}>
              <ButtonGroup variant='outlined' aria-label='outlined button group'>
                <Button variant={bizCasePreview ? "contained" : "outlined"} onClick={() => showBizCasePreview()}>Businss Case Preview</Button>
                <Button variant={calcIterationPreview ? "contained" : "outlined"} onClick={() => showCalcIterationPreview('Preview')}>Calculation Preview</Button>
                <Button variant={calcIterationPreview ? "contained" : "outlined"} onClick={() => showCalcIterationPreview('Iteration')}>Calculation Iterations</Button>
              </ButtonGroup>
            </Grid>

            <Grid item xs={12} style={{ marginTop: 0 }}>
              {bizCasePreview && <Card variant='outlined'>
                <CardContent>
                  <Box style={{ marginTop: 16 }}>
                    <Formik
                      enableReinitialize
                      innerRef={(action) => { formikRef = action }}
                      initialValues={updateBizCaseSchema}
                      validationSchema={viewBizCaseRequirementValidationSchema}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        if (values) {
                          const bizRequirementData = bizRequirementFilter();
                          if (bizRequirementData) {
                            if (requirementId) {
                              props.updateBizProfitCalculationRequest({ biz_id: requirementId, data: bizRequirementData });
                            }
                          }
                        }
                        setSubmitting(false);
                      }}
                    >
                      {({ values, errors, setFieldValue, handleChange }) => (
                        <Form
                          style={{ width: "100%", display: "flex", flexDirection: "column" }}
                          noValidate
                          autoComplete="off"
                        >
                          <Box sx={{ flexGrow: 1, width: '100%' }}>
                            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                              <Grid item xs={12} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <DatePicker
                                    // disabled
                                    // disablePast
                                    label='Business Case Start Date'
                                    value={values.business_case_start_date}
                                    onChange={startDate => onBizCaseStartDate('business_case_start_date', 'business_case_end_date', startDate)}
                                    renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} required
                                      error={(errors.business_case_start_date) ? true : false} helperText={errors.business_case_start_date} onKeyDown={onKeyDown}/>}
                                  />
                                </LocalizationProvider>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <DatePicker
                                    // disabled
                                    // disablePast
                                    minDate={minEndDate}
                                    label='Business Case End Date'
                                    value={values.business_case_end_date}
                                    onChange={endDate => {
                                      formikRef.setFieldValue('business_case_end_date', endDate);
                                      onBizCaseEndDate(values.business_case_start_date, endDate)
                                    }}
                                    renderInput={(params) => <TextField fullWidth margin='dense' variant='standard' {...params} required
                                      error={(errors.business_case_end_date) ? true : false} helperText={errors.business_case_end_date} onKeyDown={onKeyDown}/>}
                                  // disabled={(values.business_case_start_date) ? false : true}
                                  />
                                </LocalizationProvider>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <FormControl fullWidth margin='dense'>
                                  <TextField
                                    placeholder="Manpower Inflation(%)"
                                    variant='outlined'
                                    label="Manpower Inflation(%)"
                                    id={`man_power_inflation`}
                                    name={`man_power_inflation`}
                                    onChange={handleChange}
                                    type='number'
                                    value={values.man_power_inflation}
                                    error={(errors?.man_power_inflation) ? true : false} helperText={errors?.man_power_inflation}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <FormControl fullWidth margin='dense'>
                                  <TextField
                                    placeholder="Inflation(%)"
                                    variant='outlined'
                                    label="Inflation(%)"
                                    id={`rate_card_inflation`}
                                    name={`rate_card_inflation`}
                                    onChange={handleChange}
                                    type='number'
                                    value={values.rate_card_inflation}
                                    error={(errors?.rate_card_inflation) ? true : false} helperText={errors?.rate_card_inflation}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} md={12}>
                                {(isLevelEnabled) && <AppLoader />}
                                {/* Manpower Module Form component */}
                                <ViewBizCaseManpowerForm values={values} isSequenceEnable={isSequenceEnable} handleChange={handleChange} expanded={expanded} bizYear={bizYear}
                                  bizYearList={bizYearList} handleAccordinChange={handleAccordinChange} onManpowerLevel={onManpowerLevel} onManPowerRequirementSet={onManPowerRequirementSet}
                                  onManPowerHiringCostSet={onManPowerHiringCostSet} onBusinessYearFilter={onBusinessYearFilter} onRampUpCalculateValidation={onRampUpCalculateValidation}
                                  onManpowerLevelChange={onManpowerLevelChange} onLevelDynamicalRemove={onLevelDynamicalRemove} />

                                {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business)) &&
                                  <Accordion expanded={expanded === 'customerRampdownInfo'}>
                                    <AccordionSummary
                                      aria-controls='rampdown-content' id='rampdown-header' sx={{ backgroundColor: "#f5f3f3" }} >
                                      <Typography variant={'h5'}>Customer Rampdown Plan</Typography>
                                      {(values.isRampCalculating) && <AppLoader />}
                                      <Box sx={{ display: 'inline-flex', justifyContent: 'right', position: 'absolute', right: 0, bottom: 1 }}>
                                        <FormControl variant="standard" margin='dense'>
                                          <Checkbox
                                            name={`is_customer_rampdown`}
                                            checked={(values.is_customer_rampdown) ? values.is_customer_rampdown : false}
                                            onChange={(event) => {
                                              setFieldValue(`is_customer_rampdown`, event.target.checked)
                                            }}
                                            disabled={userRole === RoutePermittedRole.Business?false:true}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{}}
                                          />
                                        </FormControl>
                                      </Box>
                                    </AccordionSummary>
                                    {/* <AccordionDetails>                                      
                                    </AccordionDetails> */}
                                  </Accordion>}
                                {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business)) && <React.Fragment>
                                  {values.is_customer_rampdown && <Card>
                                    <CardContent>
                                      <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                                        <Grid item xs={12} md={12}>
                                          <FieldArray
                                            name="customer_rampdown"
                                            render={rampDownListHelpers => (
                                              <Box className="autoscroll">
                                                <TableContainer component={Paper}>
                                                  <Table aria-label='simple table'>
                                                    <TableHead sx={{ backgroundColor: "#0a8fdc", marginTop: 2 }}>
                                                      <TableRow>
                                                        <TableCell sx={{
                                                          color: 'white', fontWeight: 'bold', position: 'sticky', left: 0, backgroundColor: '#005384', minWidth: 150
                                                        }}>Level</TableCell>
                                                        <TableCell sx={{
                                                          color: 'white', fontWeight: 'bold', minWidth: 150, position: 'sticky', left: '6%', backgroundColor: '#005384'
                                                        }}>Total</TableCell>
                                                        {(values.customer_rampdown.length) ? values.customer_rampdown[0].properties.map((rampdownProperty, index) => (
                                                          <React.Fragment key={index}>
                                                            {(bizYear && (rampdownProperty.year === bizYear)) ? <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 150 }}>{rampdownProperty.property_name}</TableCell> : null}
                                                          </React.Fragment>
                                                        )) : null}

                                                      </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                      {values.customer_rampdown.map((rampdown, index) => (
                                                        <TableRow
                                                          key={index}
                                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                          <TableCell component='th' scope='row' align="center" style={{ position: 'sticky', left: 0, backgroundColor: '#f6f6f6', zIndex: 1 }}>
                                                            {rampdown.level}
                                                          </TableCell>
                                                          <TableCell component='th' scope='row' align="center" style={{ position: 'sticky', left: '6%', backgroundColor: '#f6f6f6', zIndex: 1 }}>
                                                            <FormControl variant="standard" fullWidth margin='dense'>
                                                              <Input id={`customer_rampdown[${index}].total`}
                                                                name={`customer_rampdown[${index}].total`}
                                                                value={rampdown.total} onChange={handleChange} type="number" disabled />
                                                            </FormControl>
                                                          </TableCell>

                                                          <FieldArray
                                                            name="properties"
                                                            render={propertyListHelpers => (
                                                              <React.Fragment>
                                                                {values.customer_rampdown[index].properties.map((property, propertyIndex) => (
                                                                  <React.Fragment key={propertyIndex}>
                                                                    {(bizYear && (property.year === bizYear)) ? <TableCell>
                                                                      <FormControl variant="standard" fullWidth margin='dense'>
                                                                        <Input id={`customer_rampdown[${index}].properties[${propertyIndex}].property_value`}
                                                                          name={`customer_rampdown[${index}].properties[${propertyIndex}].property_value`}
                                                                          value={property.property_value} disabled={userRole === RoutePermittedRole.Business?false:true} onChange={(data) => onRampDownCalculate(index, propertyIndex, data)} type="number" />
                                                                      </FormControl>
                                                                    </TableCell> : null}

                                                                  </React.Fragment>

                                                                ))}
                                                              </React.Fragment>

                                                            )} />

                                                        </TableRow>
                                                      ))}
                                                    </TableBody>
                                                  </Table>
                                                </TableContainer>
                                              </Box>
                                            )}
                                          />
                                        </Grid>
                                      </Grid>
                                    </CardContent>
                                  </Card>}
                                </React.Fragment>}
                              </Grid>
                            </Grid>
                          </Box>

                          <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                            <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                              color="inherit" type="button" onClick={goBack}> Cancel
                            </Button>
                            <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                              color="primary" type="submit" className="hideoption"> Save
                            </Button>
                          </Box>
                        </Form>
                      )}
                    </Formik>
                  </Box>
                </CardContent>
              </Card>}
              {/* Calculation Preview Modal */}
              {calcIterationPreview && <ViewBizCaseCalculationIterationView setIterationPreviewClose={setIterationPreviewClose} businessProfitIterationList={businessProfitIterationList} requirementId={requirementId} action={calcPreviewAction}
                show={calcIterationPreview} setIterationAction={setIterationAction} updateFinalIterationCalculation={updateFinalIterationCalculation} />}
            </Grid>
          </AppGridContainer>
        </>
      }
    </>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.businessRequirement.loading,
  isLoading: state.businessRequirement.isLoading,
  error: state.businessRequirement.errors,
  bizDetails: state.businessRequirement.detailResponse,
  calculationIsloading: state.businessCalculations.isLoading,
  calculationError: state.businessCalculations.errors,
  updateBizProfitResponse: state.businessCalculations.response,
  updateBizSubmitResponse: state.businessCalculations.bizSubmitResponse,
  businessProfitIterationList: state.businessCalculations.businessProfitIterationList
})

const mapDispatchToProps = (dispatch: any) => ({
  initBizRequirement: () => {
    dispatch(initBizRequirementAction())
  },
  initBizProfitLossCalculation: () => {
    dispatch(initBizProfitLossCalculationAction())
  },
  initBizProfitLossIterationDetail: () => {
    dispatch(initBizProfitLossIterationDetailnAction())
  },
  getBizRequirementDetail: (data: any) => {
    dispatch(getBizRequirementDetailAction(data))
  },
  updateBizProfitCalculationRequest: (data: any) => {
    dispatch(updateBizProfitLossCalculationRequest(data))
  },
  getBizCalculationIterationList: (data: any) => {
    dispatch(getBizProfitLossCalculationListAction(data))
  },
  updateFinalBizProfitIterationRequest: (data: any) => {
    dispatch(updateFinalBizProfitLossRequest(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewBusinessCase);
