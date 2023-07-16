import React, { useEffect } from 'react';
import {
  Accordion, AccordionSummary, Box, Button, Card, CardContent, FormControl,
  FormControlLabel, FormLabel, Grid, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography,
  TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Autocomplete, FormHelperText, Checkbox
} from '@mui/material';
import AppGridContainer from '../../../@crema/core/AppGridContainer';
import { Formik, Form, FieldArray } from 'formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { AppComponentHeader, AppLoader } from '../../../@crema';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  appConstants, appRequirementProperty, appRequirementSchema, currencyConstants, RoutePermittedRole
} from '../../../shared/constants/AppConst';
import { addRequirementValidationSchema } from './FormValidations';
import moment from 'moment';
import IterationView from './iteration-view';
import AdditionalRequirementsForm from './additional-requirements-form';
import ManpowerRequirementsForm from './manpower-requirements-form';
import { connect } from "react-redux"
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createBizRequirementAction, getFacilityUserDetailRequestAction, getHRUserDetailRequestAction,
  getITUserDetailRequestAction, initBizRequirementAction, saveAndNotifyBizRequirementAction, updateBizRequirementAction, saveAndNotifyAllBizRequirementAction, getExistingRateCardListAction
} from 'saga/Actions';
import CommonStore from '@crema/services/commonstore';
import { onKeyDown, onNumbervalition } from '@crema/commonservices/CommonFileDownload';


const AddRequirements = (props: any) => {
  const userRole = CommonStore().userRoleType;
  const navigate = useNavigate();
  const navState: any = useLocation();
  let formikRef: any;
  const formAction: any = 'create';
  const [expanded, setExpanded] = React.useState(null);
  const [minEndDate, setminEndDate] = React.useState(null);
  const [bizDateRange, setBizDateRange] = React.useState([]);
  const [bizYearList, setBizYearList] = React.useState([]);
  const [bizYear, setBizYear] = React.useState('');
  const [openIterationView, setOpenIterationView] = React.useState(false);
  const [bizIteration, setBizIteration] = React.useState('');
  const [isLevelEnabled, setIsLevelEnabled] = React.useState(false);
  const [requirementId, setrequirementId] = React.useState(null);
  const [isSaveUpdated, setIsSaveUpdated] = React.useState(false);
  const [isSequenceEnable, setSequenceEnable] = React.useState(false);
  /* eslint-disable */
  const [bizIterationList, setbizIterationList] = React.useState([]);
  const [bizIterationResponse, setbizIterationResponse] = React.useState(null);
  const [bizDaysList, setBizDaysList] = React.useState([]);
  const [gethrproposals, sethrproposals] = React.useState(false);
  const [getResValueFail, seResValueFail] = React.useState(null);
  const [getValidInputValue, setValidInputValue] = React.useState(false);
  const [getValidMHCInputValue, setValidMHCInputValue] = React.useState(false);

  let isEditable: any = null;

  const { hrUserList, itUsersList, facilityUsersList, createBizResponse, updateBizResponse, moduleResponse, moduleUpdateResponse,
    existingRateCardList }: any = props;

  useEffect(() => {
    if (navState.state.hasOwnProperty('leadId') && navState.state.leadId) {
      roleBasedAuthrize();
      props.initBizRequirement();
      props.getHRUserList();
      props.getITUserList();
      props.getFacilityUserList();
      props.getExistingRateCardList();
    } else {
      goBack()
    }
  }, []);

  useEffect(() => {
    // Create biz Requirement Response
    if (createBizResponse.status) {
      toast.success(createBizResponse.message, { position: 'bottom-right' });
      props.initBizRequirement();
      goBack();
    }
    if (updateBizResponse.status) {
      toast.success(updateBizResponse.message, { position: 'bottom-right' });
      props.initBizRequirement();
      goBack();
    }
    //Save All Biz Requirement if Module saved
    if (moduleResponse.status && !isSaveUpdated) {
      toast.success(moduleResponse.message, { position: 'bottom-right' });
      if (moduleResponse.data) {
        setrequirementId(moduleResponse.data.id);
        setIsSaveUpdated(true);
      }
    }
    // Save Modules as HR, IT, Facility
    if (moduleUpdateResponse && moduleUpdateResponse.status) {
      toast.success(moduleUpdateResponse.message, { position: 'bottom-right' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [createBizResponse, moduleResponse, moduleUpdateResponse, updateBizResponse]);

  const roleBasedAuthrize = () => {
    if (userRole) {
      if (userRole === RoutePermittedRole.Admin || userRole === RoutePermittedRole.Business) {
        isEditable = true;
      } else {
        isEditable = false;
      }
    }
  }

  const goBack = () => {
    props.initBizRequirement();
    navigate('/business/leads-monitoring');

  }

  const setIterationAction = (dialog) => (event) => {
    setOpenIterationView(event ? dialog : false);
  }

  const setIterationClose = () => {
    setOpenIterationView(false);
  }

  const submitBizIteration = (iteartionData: any) => {
  }

  const handleAccordinChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleCustomAccordinChange = (action) => {
    setExpanded(action);
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
      const bizDaysonYearsList: any = [];
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
          /** Business Days */
          const bizInitStartDate = moment(startDate);
          const bizInitEndDate = moment(endDate);
          const yearObj: any = {
            year: bizStartDate.format("YYYY"),
            start_date: bizStartDate.format("YYYY-01-01"),
            end_date: bizStartDate.format("YYYY-12-31"),
            days: '',
            hours: ''
          };
          if (bizInitStartDate.format("YYYY") === bizStartDate.format("YYYY")) {
            yearObj['start_date'] = bizInitStartDate.format(appConstants.dateFormat);
          }
          if (bizInitEndDate.format("YYYY") === bizStartDate.format("YYYY")) {
            yearObj['end_date'] = bizInitEndDate.format(appConstants.dateFormat);
          }
          yearObj['days'] = calcBusinessDays(yearObj.start_date, yearObj.end_date);
          bizDaysonYearsList.push(yearObj);
          /** Endof Business Days */
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
      const hrRampUpFormData = JSON.parse(JSON.stringify(formikRef.values.hr_rampups));
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
      hrRampUpFormData.forEach((hrRampUpProperty, index) => {
        if (hrRampUpProperty.properties.length) {
          hrRampUpProperty['properties'].length = 0;
          businessCaseDateRangeList.forEach(element => {
            const hrRampUpConstant = JSON.parse(JSON.stringify(appRequirementProperty));
            hrRampUpConstant['property_name'] = `${element.monthLabel}-${element.year}`;
            hrRampUpConstant['property_date'] = element.date;
            hrRampUpConstant['year'] = element.year;
            hrRampUpProperty['properties'].push(hrRampUpConstant);
          });
        }
      });
      formikRef.setFieldValue('rampups', rampUpFormData);
      formikRef.setFieldValue('hr_rampups', hrRampUpFormData);
      formikRef.setFieldValue('customer_rampdown', customerRampDownFormData);
      // End of Ramup Range based dynamical Input Set
      const bizYearRangeList = bizYearsList;
      if (bizYearRangeList.length) {
        if (bizEndDate.format("YYYY") !== bizYearRangeList[bizYearRangeList.length - 1]) {
          bizYearsList.pop();
          bizDaysonYearsList.pop();
        }
      }
      setBizDateRange(businessCaseDateRangeList);
      setBizYearList(bizYearsList)
      const bizDayFieldList: any = JSON.parse(JSON.stringify(bizDaysonYearsList));
      bizDayFieldList.forEach(element => {
        delete element['start_date'];
        delete element['end_date'];
      });
      setBizDaysList(bizDayFieldList);
      // Set Default business Year Filter
      if (bizYearsList.length) {
        setBizYear(bizYearsList[0])
      }
    }

  };

  const calcBusinessDays = (startDate, endDate) => {
    var day = moment(startDate);
    var businessDays = 0;

    while (day.isSameOrBefore(endDate, 'day')) {
      if (day.day() !== 0 && day.day() !== 6) { businessDays++ };
      day.add(1, 'd');
    }
    return businessDays;
  }

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
        const hrRampUpData = JSON.parse(JSON.stringify(formikRef.values.hr_rampups));
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
          hrRampUpData.push(rampDataObj);
          // Manpower Requiremet & Hiring & Rampup & Rampdown Field Set based on dynamical Level and sequence
          formikRef.setFieldValue('manpower_requirements', manpowerRequirementData);
          formikRef.setFieldValue('manpower_hiringcost', manpowerHiringCostData);
          formikRef.setFieldValue('rampups', rampUpData);
          formikRef.setFieldValue('customer_rampdown', rampDownData);
          formikRef.setFieldValue('hr_rampups', hrRampUpData);
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
      if (index === 0 && formikRef.values) {
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
                  { position: 'bottom-right'});
              }
            }
            const rampDownLevelFind = formikRef.values.customer_rampdown.find((item) => item.level === fteProperty.property_name);
            if (rampDownLevelFind) {
              const rampDownTotal = (parseInt(rampDownLevelFind.total)) ? parseInt(rampDownLevelFind.total) : 0;
              if (rampDownTotal > parseInt(eventValue)) {
                toast.warn(`Rampdown - ${rampDownLevelFind.level} is mismatch with Manpower Requirements FTE`,
                  { position: 'bottom-right' });
              }
            }
          }
          if (userRole === RoutePermittedRole.HR) {
            const hrRampupLevelFind = formikRef.values.hr_rampups.find((item) => item.level === fteProperty.property_name);
            if (hrRampupLevelFind) {
              const hrRampUpTotal = (parseInt(hrRampupLevelFind.total)) ? parseInt(hrRampupLevelFind.total) : 0;
              if (hrRampUpTotal > parseInt(eventValue)) {
                toast.warn(`HR Rampup - ${hrRampupLevelFind.level} is mismatch with Manpower Requirements FTE`,
                  { position: 'bottom-right' });
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
              { position: 'bottom-right'});
              setValidMHCInputValue(false)
          }       
        }
        formikRef.setFieldValue(rampUpColumnTotal, totalRampUpLevelTotal.toString())

        // setIsRampCalculating(false);
        formikRef.setFieldValue('isRampCalculating', false);
        onValidInputValues(event.target.value)
      }, 1000);
    } 
  };

const onValidInputValues = (getValues:any) =>{
  
  let testInputValues:any = onNumbervalition(getValues)
  if(testInputValues){
    setValidInputValue(true)
  }else{
    setValidInputValue(false)
    toast.warn(`Invalid Data`,
    { position: 'bottom-right'});

  }
}
  const onHRRampUpCalculation = (index, propertyIndex, event) => {
    formikRef.setFieldValue('isRampCalculating', true);
    // setIsRampCalculating(true);
    const hrRampUpColumnData = `hr_rampups[${index}].properties[${propertyIndex}].property_value`;
    formikRef.setFieldValue(hrRampUpColumnData, event.target.value)
    if (formikRef.values['hr_rampups'][index].properties.length) {
      setTimeout(() => {
        let totalHRRampUp: any = 0;
        formikRef.values['hr_rampups'][index].properties.forEach(element => {
          if (element.property_value) {
            totalHRRampUp = totalHRRampUp + parseFloat(element.property_value);
          }
        });
        const hrRampUpColumnTotal = `hr_rampups[${index}].total`;
        const totalHRRampUpLevelTotal = totalHRRampUp.toFixed(2);
        // Validation on FTE
        const rampUPLevelStr = formikRef.values['hr_rampups'][index].level;
        const manpowerLevelFTE = formikRef.values['manpower_requirements'][0].properties.find((item) => item.property_name === rampUPLevelStr);
        if (manpowerLevelFTE) {
          if (parseInt(totalHRRampUpLevelTotal) > parseInt(manpowerLevelFTE.property_value)) {
            toast.warn(`HR RampUp - ${rampUPLevelStr} Total is greater than Manpower Requirements FTE`,
              { position: 'bottom-right' });
              sethrproposals(true)
          }else{
            sethrproposals(false)
          }
        }
        formikRef.setFieldValue(hrRampUpColumnTotal, totalHRRampUpLevelTotal.toString())
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
              { position: 'bottom-right'});
          }
        }
        formikRef.setFieldValue(rampDownColumnTotal, totalRampDownLevelTotal.toString())
        // setIsRampCalculating(false);
        formikRef.setFieldValue('isRampCalculating', false);
      }, 1000);
    }
  };

  const onCustomerExpenseTotal = (index, event) => {
    formikRef.setFieldValue('isCalculating', true);
    if (formikRef.values) {
      let totalExpensesCost: any = 0;
      const customerExpenseCostData = `customer_expenses[${index}].cost`;
      formikRef.setFieldValue(customerExpenseCostData, event.target.value)
      setTimeout(() => {
        formikRef.values['customer_expenses'].forEach((expenses, key) => {
          if (expenses.cost) {
            totalExpensesCost = totalExpensesCost + parseFloat(expenses.cost);
          }
        });
        const totalExpenseCostData = totalExpensesCost.toFixed(2);
        formikRef.setFieldValue('customer_expense_total', totalExpenseCostData.toString())
        formikRef.setFieldValue('isCalculating', false);
      }, 1000);
    }
  }

  const onCustomerExpenseRemoval = (customerExpenseListHelpers, index, event) => {
    customerExpenseListHelpers.remove(index);
    formikRef.setFieldValue('isCalculating', true);
    if (formikRef.values) {
      let totalExpensesCost: any = 0;
      setTimeout(() => {
        formikRef.values['customer_expenses'].forEach((expenses, key) => {
          if (expenses.cost) {
            totalExpensesCost = totalExpensesCost + parseFloat(expenses.cost);
          }
        });
        const totalExpenseCostData = totalExpensesCost.toFixed(2);
        formikRef.setFieldValue('customer_expense_total', totalExpenseCostData.toString())
        formikRef.setFieldValue('isCalculating', false);
      }, 1000);
    }
  }

  const bizRequirementFilter = () => {
    const bizRequirementData = JSON.parse(JSON.stringify(formikRef.values));
    if (bizRequirementData) {
      bizRequirementData['bizcase_yearly_information'] = bizYearList;
      let bizStartDate = bizRequirementData.business_case_start_date;
      if (bizRequirementData.business_case_start_date) {
        bizStartDate = moment(bizRequirementData.business_case_start_date);
        bizRequirementData['business_case_start_date'] = bizStartDate.format(appConstants.dateFormat);
      } else {
        bizRequirementData['business_case_start_date'] = bizStartDate;
      }
      let bizEndDate = bizRequirementData.business_case_end_date;
      if (bizRequirementData.business_case_end_date) {
        bizEndDate = moment(bizRequirementData.business_case_end_date);
        bizRequirementData['business_case_end_date'] = bizEndDate.format(appConstants.dateFormat);
      } else {
        bizRequirementData['business_case_end_date'] = bizEndDate;
      }
      // const bizEndDate = moment(bizRequirementData.business_case_end_date);

      // bizRequirementData['business_case_end_date'] = bizEndDate.format(appConstants.dateFormat);
      bizRequirementData['active_iteration'] = bizIteration;
      bizRequirementData['business_days'] = bizDaysList;
      delete bizRequirementData['isCalculating'];
      delete bizRequirementData['isRampCalculating'];
      if (bizRequirementData.hr_contact_person) {
        const hrListData = JSON.parse(JSON.stringify(hrUserList));
        const hrUserFind = hrListData.find((item) => item.emp_name === bizRequirementData.hr_contact_person);
        if (hrUserList && hrUserList.length > 0 && hrUserFind) {
          bizRequirementData['hr_shortid'] = hrUserFind.shortid;
          bizRequirementData['hr_email'] = hrUserFind.email;
          formikRef.setFieldValue('hr_shortid', hrUserFind.shortid);
        } else {
          bizRequirementData['hr_shortid'] = '';
          formikRef.setFieldValue('hr_shortid', '');
        }
      }
      if (bizRequirementData.it_contact_person) {
        const itListData = JSON.parse(JSON.stringify(itUsersList));
        const itUserFind = itListData.find((item) => item.emp_name === bizRequirementData.it_contact_person);
        if (itUserFind) {
          bizRequirementData['it_shortid'] = itUserFind.shortid;
          bizRequirementData['it_email'] = itUserFind.email;
          formikRef.setFieldValue('it_shortid', itUserFind.shortid);
        } else {
          bizRequirementData['it_shortid'] = '';
          formikRef.setFieldValue('it_shortid', '');
        }
      }
      if (bizRequirementData.fac_contact_person) {
        const facListData = JSON.parse(JSON.stringify(facilityUsersList));
        const facUserFind = facListData.find((item) => item.emp_name === bizRequirementData.fac_contact_person);
        if (facUserFind) {
          bizRequirementData['fac_shortid'] = facUserFind.shortid;
          bizRequirementData['fac_email'] = facUserFind.email;
          formikRef.setFieldValue('fac_shortid', facUserFind.shortid);
        } else {
          bizRequirementData['fac_shortid'] = '';
          formikRef.setFieldValue('fac_shortid', '');
        }
      }
      return bizRequirementData;
    }
  }

  const onSaveAndNotifyInfo = (action) => {
    const bizRequirementData = bizRequirementFilter();
    if (bizRequirementData) {
      const bizReqPostData = JSON.parse(JSON.stringify(bizRequirementData));
      if (requirementId) {
        const manPowerPostData: any = {};
        if (action === 'HR') {
          manPowerPostData['session_name'] = action;
          manPowerPostData['hr_contact_person'] = bizReqPostData.hr_contact_person;
          manPowerPostData['hr_shortid'] = bizReqPostData.hr_shortid;
          manPowerPostData['hr_email'] = bizReqPostData.hr_email;
          manPowerPostData['manpower_requirements'] = bizReqPostData.manpower_requirements;
          manPowerPostData['manpower_hiringcost'] = bizReqPostData.manpower_hiringcost;
          manPowerPostData['rampups'] = bizReqPostData.rampups;
          manPowerPostData['hr_rampups'] = bizReqPostData.hr_rampups;
        } else if (action === 'IT') {
          manPowerPostData['session_name'] = action;
          manPowerPostData['it_contact_person'] = bizReqPostData.it_contact_person;
          manPowerPostData['it_shortid'] = bizReqPostData.it_shortid;
          manPowerPostData['it_email'] = bizReqPostData.it_email;
          manPowerPostData['it_info'] = bizReqPostData.it_info;
        } else if (action === 'FACILITY') {
          manPowerPostData['session_name'] = action;
          manPowerPostData['fac_contact_person'] = bizReqPostData.fac_contact_person;
          manPowerPostData['fac_shortid'] = bizReqPostData.fac_shortid;
          manPowerPostData['fac_email'] = bizReqPostData.fac_email;
          manPowerPostData['facility'] = bizReqPostData.facility;
        } else if (action === 'SYSTEM_ACCESS') {
          manPowerPostData['session_name'] = action;
          manPowerPostData['system_access'] = bizReqPostData.system_access;
        } else if (action === 'THIRD_PARTY_SERVICE') {
          manPowerPostData['session_name'] = action;
          manPowerPostData['thirdparty_service'] = bizReqPostData.thirdparty_service;
        } else if (action === 'THIRD_PARTY_COST') {
          manPowerPostData['session_name'] = action;
          manPowerPostData['thirdparty_cost'] = bizReqPostData.thirdparty_cost;
        } else if (action === 'TRAVEL_COST') {
          manPowerPostData['session_name'] = action;
          manPowerPostData['travel_cost'] = bizReqPostData.travel_cost;
        } else if (action === 'OTHER_COST') {
          manPowerPostData['session_name'] = action;
          manPowerPostData['other_cost'] = bizReqPostData.other_cost;
        }
        if (formikRef.isValid) {
          props.saveandNotifyBizRequirement({ bizcase_id: requirementId, data: manPowerPostData });
        }
      } else {
        let emailFormData = null;
        if (action === 'HR') {
          emailFormData = bizRequirementData.hr_email;
        } else if (action === 'IT') {
          emailFormData = bizRequirementData.it_email;
        } else if (action === 'FACILITY') {
          emailFormData = bizRequirementData.fac_email;
        }
        //Set Full Save of Biz Requirements
        if (bizRequirementData.business_case_start_date && bizRequirementData.business_case_end_date) {
          if (formikRef.isValid) {
            props.saveandNotifyAllBizRequirement({
              lead_id: navState.state.leadId, action: action, email: emailFormData,
              data: bizRequirementData
            });
          }
        } else {
          toast.warn(appConstants.bizCaseRequirementDateReq, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
      }
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
    const hrRampUpData = JSON.parse(JSON.stringify(formikRef.values.hr_rampups));
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
    const hrRampUpLevelData = hrRampUpData.filter((item) => item.level !== currentLevel);
    formikRef.setFieldValue('manpower_requirements', manpowerRequirementData);
    formikRef.setFieldValue('manpower_hiringcost', manpowerHiringCostData);
    formikRef.setFieldValue('rampups', rampUpLevelData);
    formikRef.setFieldValue('hr_rampups', hrRampUpLevelData);
    formikRef.setFieldValue('customer_rampdown', rampDownLevelData);
    setTimeout(() => {
      formikRef.setFieldValue('isRampCalculating', false);
      onCalculateManPower(true);
      onCalculateHiringCostTotal();
    }, 1000);
  }

  return (
    <>
      <AppComponentHeader
        title="Business Requirement"
        description=""
      />
      <AppGridContainer>

        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Card variant='outlined'>
            <CardContent>
              <Box style={{ marginTop: 16 }}>
                <Formik
                  enableReinitialize
                  innerRef={(action) => { formikRef = action }}
                  initialValues={appRequirementSchema}
                  validationSchema={addRequirementValidationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    if (values) {
                      const bizRequirementData = bizRequirementFilter();
                      if (bizRequirementData) {
                        if (requirementId) {
                          props.updateBizRequirement({ bizcase_id: requirementId, data: bizRequirementData });
                        } else {
                          props.createBizRequirement({ lead_id: navState.state.leadId, data: bizRequirementData });
                        }
                      }
                    }
                    setSubmitting(false);
                    // resetForm();
                  }}
                >
                  {({ isSubmitting, values, errors, touched, isValid, dirty, setFieldValue, handleChange, handleSubmit }) => (
                    <Form
                      style={{ width: "100%", display: "flex", flexDirection: "column" }}
                      noValidate
                      autoComplete="off"
                    >
                      <Box sx={{ flexGrow: 1, width: '100%' }}>
                        <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                          <Grid item xs={12} md={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                disablePast
                                label='Business Case Start Date'
                                value={values.business_case_start_date}
                                // disabled error={(errors.business_case_start_date) ? true : false} 
                                onChange={startDate => onBizCaseStartDate('business_case_start_date', 'business_case_end_date', startDate)}
                                renderInput={(params) => <TextField fullWidth margin='dense' variant='outlined' {...params} required
                                  helperText={errors.business_case_start_date} disabled  onKeyDown={onKeyDown}/>}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                disablePast
                                minDate={minEndDate}
                                label='Business Case End Date'
                                value={values.business_case_end_date}
                                onChange={endDate => {
                                  formikRef.setFieldValue('business_case_end_date', endDate);
                                  onBizCaseEndDate(values.business_case_start_date, endDate)
                                }}
                                renderInput={(params) => <TextField fullWidth margin='dense' variant='outlined' {...params} required
                                  error={(errors.business_case_end_date) ? true : false} helperText={errors.business_case_end_date} disabled  onKeyDown={onKeyDown}/>}
                                disabled={(values.business_case_start_date) ? false : true}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <FormControl variant='outlined' fullWidth margin='dense'>
                              <InputLabel id='currency-list-label'>Currency</InputLabel>
                              <Select
                                labelId='currency-list-label'
                                id='currency-list-label-standard'
                                name="currency"
                                value={values.currency}
                                onChange={handleChange}
                                label='Currency'
                              >
                                <MenuItem value=''><em>None</em></MenuItem>
                                {currencyConstants.map((option, index) => (
                                  <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                ))}
                              </Select>
                              {errors.currency && <FormHelperText error>{errors.currency}</FormHelperText>}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Grid container spacing={{ xs: 2, md: 8 }} >
                              <Grid item xs={12} md={4}>
                                <FormControl component='fieldset'>
                                  <FormLabel component='legend'>Existing Rate Card</FormLabel>
                                  <RadioGroup row aria-label='Business' name='business_availability' value={values.business_availability}
                                    onChange={(event) => {
                                      setFieldValue("business_availability", event.target.value);
                                      if(event.target.value === 'without_rate') {
                                        setFieldValue("existingratecard", []);
                                      }
                                    }}>
                                    <FormControlLabel value='with_rate' control={<Radio required />} label='Yes' />
                                    <FormControlLabel value='without_rate' control={<Radio required />} label='No' />
                                  </RadioGroup>
                                </FormControl>
                                {errors.business_availability && <FormHelperText error>{errors.business_availability}</FormHelperText>}
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <FormControl fullWidth margin='dense'>
                                  <Autocomplete
                                    disabled={(values.business_availability === 'with_rate' && values.currency) ? false : true}
                                    multiple
                                    id='existingratecard'
                                    options={existingRateCardList}
                                    isOptionEqualToValue={(option, value) => option.id === value.id }
                                    getOptionLabel={(option: any) => `${option.year} - 
                                    ${(values.currency === 'INR') ? option.hourly_rate_inr : ''}
                                    ${(values.currency === 'EUR') ? option.hourly_rate_ero : ''}
                                    ${(values.currency === 'USD') ? option.hourly_rate_usd : ''}
                                     - ${option.level}`}
                                    onChange={(event, value: any) => {
                                      setFieldValue("existingratecard", value);
                                    }}
                                    filterSelectedOptions
                                    value={values?.existingratecard}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        variant='outlined'
                                        label='Choose Rate Card'
                                        placeholder='Rate Card'
                                      />
                                    )}
                                  />
                                  {errors.existingratecard && <FormHelperText error>{errors.existingratecard}</FormHelperText>}
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <FormControl component='fieldset'>
                                  <FormLabel component='legend'>Rate Card Type</FormLabel>
                                  <RadioGroup row aria-label='Ratecard Type' name='ratecard_type' value={values.ratecard_type}
                                    onChange={handleChange}>
                                    <FormControlLabel value='single' control={<Radio />} label='Common Rate Card' />
                                    <FormControlLabel value='multiple' control={<Radio />} label='Level wise Rate Card' />
                                  </RadioGroup>
                                </FormControl>
                                {errors.ratecard_type && <FormHelperText error>{errors.ratecard_type}</FormHelperText>}
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <FormControl variant="outlined" fullWidth margin='dense'>
                                  <TextField
                                    placeholder="Work Hours Per Day"
                                    variant='outlined'
                                    label="Work Hours Per Day"
                                    id={`working_hours`}
                                    name={`working_hours`}
                                    onChange={handleChange}
                                    type='number'
                                    value={values.working_hours}
                                    error={(errors?.working_hours) ? true : false} helperText={errors?.working_hours}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <FormControl fullWidth margin='dense'>
                                  <TextField
                                    placeholder="Manpower Inflation(%)"
                                    variant='outlined'
                                    label="Manpower Inflation(%)"
                                    id={`manpower_inflation`}
                                    name={`manpower_inflation`}
                                    onChange={handleChange}
                                    type='number'
                                    value={values.manpower_inflation}
                                    error={(errors?.manpower_inflation) ? true : false} helperText={errors?.manpower_inflation}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} md={4}>
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
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            {(isLevelEnabled) && <AppLoader />}
                            {/* Manpower Module Form component */}
                            <ManpowerRequirementsForm setFieldValue={setFieldValue} action={formAction} hrUserList={hrUserList} values={values} isSequenceEnable={isSequenceEnable} handleChange={handleChange} expanded={expanded} bizYear={bizYear}
                              bizYearList={bizYearList} handleAccordinChange={handleAccordinChange} onManpowerLevel={onManpowerLevel} setIterationAction={setIterationAction}
                              onManPowerRequirementSet={onManPowerRequirementSet} onManPowerHiringCostSet={onManPowerHiringCostSet} onBusinessYearFilter={onBusinessYearFilter}
                              onRampUpCalculateValidation={onRampUpCalculateValidation} onManpowerLevelChange={onManpowerLevelChange} onSaveAndNotifyInfo={onSaveAndNotifyInfo}
                              onHRRampUpCalculation={onHRRampUpCalculation} onLevelDynamicalRemove={onLevelDynamicalRemove} getResNumber={getResValueFail} getValidInputValue={getValidInputValue} getValidMHCInputValue={getValidMHCInputValue}/>
                            {/* Additional Modules Form Component */}
                            <AdditionalRequirementsForm bizYearList={bizYearList} formikRef={formikRef} onCustomerExpenseTotal={onCustomerExpenseTotal} onCustomerExpenseRemoval={onCustomerExpenseRemoval} action={formAction}
                              itUsersList={itUsersList} facilityUsersList={facilityUsersList} values={values} handleChange={handleChange} expanded={expanded} handleAccordinChange={handleAccordinChange}
                              onSaveAndNotifyInfo={onSaveAndNotifyInfo} />

                            {((userRole === RoutePermittedRole.Admin) || (userRole === RoutePermittedRole.Business)) &&
                              <Accordion expanded={expanded === 'customerRampdownInfo'}>
                                {/* onChange={handleAccordinChange('customerRampdownInfo')} */}
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
                              </Accordion>
                            }
                            {values.is_customer_rampdown &&
                              <Card>
                                <CardContent>
                                  <React.Fragment>
                                    <Grid container direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                                      <Grid item xs={12} md={12}>
                                        <Grid container direction="row" sx={{ marginBottom: 2 }}>
                                          <Grid item xs={12} md={8}>
                                            <Typography variant={'h5'} sx={{ marginTop: 6 }}>Rampdown plan (monthly) -Table</Typography>
                                          </Grid>
                                          <Grid item xs={12} md={4}>
                                            {(bizYearList.length !== 0) && <FormControl variant='standard' fullWidth margin='dense'>
                                              <InputLabel id='business-year-list-label'>Choose Business Year</InputLabel>
                                              <Select
                                                labelId='business-year-list-label'
                                                id='business-year-label-standard'
                                                name="business_year"
                                                value={bizYear}
                                                onChange={item => onBusinessYearFilter(item)}
                                                label='Business Year'
                                              >
                                                <MenuItem value=''><em>None</em></MenuItem>
                                                {bizYearList.map((option) => (
                                                  <MenuItem key={option} value={option}>{option}</MenuItem>
                                                ))}
                                              </Select>
                                            </FormControl>}
                                          </Grid>
                                        </Grid>

                                        <FieldArray
                                          name="customer_rampdown"
                                          render={rampDownListHelpers => (
                                            <Box style={{ width: '100%' }}>
                                              <TableContainer component={Paper}>
                                                <Table aria-label='simple table'>
                                                  <TableHead sx={{ backgroundColor: "#0a8fdc", marginTop: 2 }}>
                                                    <TableRow>
                                                      <TableCell sx={{
                                                        color: 'white', fontWeight: 'bold', position: 'sticky', left: 0, backgroundColor: '#005384', minWidth: 120
                                                      }}>Level</TableCell>
                                                      <TableCell sx={{
                                                        color: 'white', fontWeight: 'bold', minWidth: 120, position: 'sticky', left: '6%', backgroundColor: '#005384'
                                                      }}>Total</TableCell>
                                                      {(values.customer_rampdown.length) ? values.customer_rampdown[0].properties.map((rampdownProperty, index) => (
                                                        <React.Fragment key={index}>
                                                          {(bizYear && (rampdownProperty.year === bizYear)) ? <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 120 }}>{rampdownProperty.property_name}</TableCell> : null}
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
                                                                        disabled={userRole === RoutePermittedRole.Business?false:true}
                                                                        value={property.property_value} onChange={(data) => onRampDownCalculate(index, propertyIndex, data)} type="number" />
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
                                  </React.Fragment>
                                </CardContent>
                              </Card>
                            }
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                          color="inherit" type="button" onClick={goBack}> Cancel
                        </Button>
                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                          color="primary" type="submit" className={!(dirty && isValid) ? "disabled-btn" : ""}
                          disabled={!(dirty && isValid)}> Save
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </CardContent>
          </Card>
          {/* Iteration View Modal PopUp */}
          {openIterationView && <IterationView bizIterationList={bizIterationList} bizIterationResponse={bizIterationResponse}
            show={openIterationView} setIterationAction={setIterationAction} Iteration={bizIteration} setIteration={setBizIteration}
            submitBizIteration={submitBizIteration} setIterationClose={setIterationClose} />}
        </Grid>
      </AppGridContainer>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.businessRequirement.loading,
  error: state.businessRequirement.errors,
  createBizResponse: state.businessRequirement.response,
  updateBizResponse: state.businessRequirement.updateResponse,
  moduleResponse: state.businessRequirement.moduleResponse,
  moduleUpdateResponse: state.businessRequirement.moduleUpdateResponse,
  hrUserList: state.businessRequirement.hrUsersList,
  itUsersList: state.businessRequirement.itUsersList,
  facilityUsersList: state.businessRequirement.facilityUsersList,
  existingRateCardList: state.businessRequirement.rateCardList
})

const mapDispatchToProps = (dispatch: any) => ({
  initBizRequirement: () => {
    dispatch(initBizRequirementAction())
  },
  createBizRequirement: (data: any) => {
    dispatch(createBizRequirementAction(data))
  },
  saveandNotifyAllBizRequirement: (data: any) => {
    dispatch(saveAndNotifyAllBizRequirementAction(data))
  },
  saveandNotifyBizRequirement: (data: any) => {
    dispatch(saveAndNotifyBizRequirementAction(data))
  },
  updateBizRequirement: (data: any) => {
    dispatch(updateBizRequirementAction(data))
  },
  getHRUserList: (data: any) => {
    dispatch(getHRUserDetailRequestAction(data))
  },
  getITUserList: (data: any) => {
    dispatch(getITUserDetailRequestAction(data))
  },
  getFacilityUserList: (data: any) => {
    dispatch(getFacilityUserDetailRequestAction(data))
  },
  getExistingRateCardList: (data: any) => {
    dispatch(getExistingRateCardListAction(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRequirements);
