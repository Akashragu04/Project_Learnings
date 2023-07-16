import React from 'react'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import IODumpFrom from './IODumpFrom';
import moment from 'moment';

const EditIODump = (props?:any) => {
    const dataField: any = {
        id:props.resData.id,
        year: props.resData.fiscalyear,
        period: props.resData.period,
        costElement: props.resData.costelement,
        costElementName: props.resData.cost_element_name,
        // objcrcy: props.resData.objcrcy,
        orders: props.resData.orders,
        coObjectName: props.resData.co_object_name,
        offsetAccntName: props.resData.offset_account_name,
        purchsngDocument: props.resData.purchasing_document,
        costElemntDescr: props.resData.cost_element_descr,
        postingDate:  moment(new Date(props.resData.posting_date)).format('YYYY-MM-DD'),
        refDocumntNo: props.resData.ref_document_number,
        reportCurrency: props.resData.report_currency,
        purchaseOrderText:  props.resData.purchaseOrderText,
        documentDate:  moment(new Date(props.resData.document_date)).format('YYYY-MM-DD'),
        documentNumber:  props.resData.document_number,
        trasnsctinCurrency:  props.resData.transaction_currency,
        currency:  props.resData.object_currency,
        reportCur:  props.resData.report_currency,
        name:  props.resData.name,
        // tranCur:  props.resData.tranCur,
        documentHeaderTxt:  props.resData.document_header_text,
        valueType:  props.resData.valuetype,
        valuein_objectcurrency: props.resData.valuein_objectcurrency,
        valuein_reportcurrency: props.resData.valuein_reportcurrency,
        valuein_transactioncurrency:props.resData.valuein_transactioncurrency
    }
  return (
    <Dialog
    fullScreen
    open={props.openEditForexRateForm}
    onClose={props.closeIODump}
// TransitionComponent={Transition}
>
    <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h4' component='div'> IO Dump
            </Typography>
            <IconButton
                edge='start'
                color='inherit'
                onClick={props.closeIODump}
                aria-label='close'
            >
                <CloseIcon />
            </IconButton>
        </Toolbar>
    </AppBar>
      <IODumpFrom dataField={dataField} closeIODump={props.closeIODump} onSubmit={props.onEditSubmitIODump} dataStatus={false}/>
</Dialog>
  )
}

export default EditIODump;