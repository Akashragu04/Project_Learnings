import React, { useEffect, useRef } from 'react';
import { Box, Card, CardContent, Grid } from '@mui/material';
import AppGridContainer from '../../../@crema/core/AppGridContainer';
import { AppComponentHeader } from '../../../@crema';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CommonStore from '@crema/services/commonstore';
import { connect } from "react-redux";
import { BizCaseSLATypes } from 'saga/sagas/Types';
import PreivoiceEditForm from './PreInvoiceEditForm';
import {getEditBizCaseSLA, updateBizCaseSLA} from '../../../saga/Actions/BizCaseSLA.action';
import moment from 'moment';
import { appConstants } from 'shared/constants/AppConst';

const UpdatePreInvoice = (props: any) => {
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
  const { getCustomerListDetail } = props;
  // const projectId = useParams();
  const ProjSlaId = navState.state
  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [getEditData, setEditInfo] = React.useState(null)
  useEffect(() => {
    if(ProjSlaId){
      props.getSLAEditDetails(ProjSlaId.slaid)
      props.getCostcenterList();
      props.getMaterialList();
      props.getCustomerList();
      getSLAEdit();
    }
  },[])
 
  const getSLAEdit = () => {
    setTimeout(() => getIniValues(), 2000);
    }
  const getIniValues = () =>{
    if (props.getSLAEditDetailsList) {
      const editFieldData: any = {
        id: props.getSLAEditDetailsList.id,
        //date_of_join: moment(props.getEditData.date_of_join).format('YYYY-MM-DD'),

        customer_company: props.getSLAEditDetailsList.customer_company,
        customer_address: props.getSLAEditDetailsList.customer_address,
        project_name: props.getSLAEditDetailsList.project_name,
        team: props.getSLAEditDetailsList.team,
        cost_center: props.getSLAEditDetailsList.cost_center,
        currency: props.getSLAEditDetailsList.currency,
        start_date: moment(props.getSLAEditDetailsList.start_date).format(appConstants.dateFormat),
        end_date: moment(props.getSLAEditDetailsList.end_date).format(appConstants.dateFormat),
        effective_date: moment(props.getSLAEditDetailsList.effective_date).format(appConstants.dateFormat),
        contract_status: props.getSLAEditDetailsList.contract_status,
        contract_option: props.getSLAEditDetailsList.contract_option,
        customer_cost_center: props.getSLAEditDetailsList.customer_cost_center,
        customer_cost_center_manager: props.getSLAEditDetailsList.customer_cost_center_manager,
        organization_type: props.getSLAEditDetailsList.organization_type,
        service_description: props.getSLAEditDetailsList.service_description,
        billing_cycle: props.getSLAEditDetailsList.billing_cycle,
        tariff_sheet_fte: props.getSLAEditDetailsList.tariff_sheet_fte,
        tariff_sheet: {
          cost_center_code: props.getSLAEditDetailsList.cost_center_code,
          material_description: props.getSLAEditDetailsList.material_description,
          units: props.getSLAEditDetailsList.units,
          estimated_quantity: props.getSLAEditDetailsList.estimated_quantity,
          rate: props.getSLAEditDetailsList.rate,
          amount: props.getSLAEditDetailsList.amount,
          markup_value: '13.5'
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
          primary: 'No',
          key_person: 'No',
          is_pre_invoice: 'No',
          is_sla: 'No',
        },
        sla_po: [

        ],
        sla_io: [

        ],
        sla_contacts: [

        ],
        sla_tariffsheet: [
        ],
        sla_terms_and_conditions: [
          // {
          //   id: null,
          //   supporting_files_name: "Aadhaar Card.pdf",
          //   supporting_files_url: "http://localhost:8000/sla/attachmens/Aadhaar Card.pdf",
          //   mapped: null
          // }
        ],
        "attachments": [
          // {
          //   id: null,
          //   supporting_files_name: "Aadhaar Card.pdf",
          //   supporting_files_url: "http://localhost:8000/sla/attachmens/Aadhaar Card.pdf",
          //   mapped: null
          // }
        ],
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
    props.updateBizCaseSLA(getEditInfoData)
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
               <PreivoiceEditForm setContactCheckbox={setContactCheckbox} 
               setMarkupAmount={setMarkupAmount} 
               getEditData={getEditData}
               onCustomerStartDate={onCustomerStartDate} handleExpandChange={handleExpandChange} ProjSlaId={ProjSlaId} minEndDate={minEndDate} expanded={expanded} contactsHelpersRef={contactsHelpersRef} poHelpersRef={poHelpersRef} ioHelpersRef={ioHelpersRef} tariffHelpersRef={tariffHelpersRef} navState={navState} navigate={navigate} userRole={userRole} getCustomerList={getCustomerListDetail} onSubmitData={onSubmitData}/>
                :null}
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
    loading: state.preInvoiceProcess.loading,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  updateBizCaseSLADetails: (data: any) => {
    dispatch(updateBizCaseSLA(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePreInvoice);


