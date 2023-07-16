import React from 'react'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import IODumpFrom from './IODumpFrom';
import moment from 'moment';

const AddIODump = (props?: any) => {
    const dataField: any = {
        year: "",
        period: "",
        costElement: '',
        costElementName: "",
        objcrcy: "",
        orders: "",
        coObjectName: "",
        offsetAccntName: "",
        purchsngDocument: "",
        costElemntDescr: "",
        postingDate:  moment(new Date()).format('YYYY-MM-DD'),
        refDocumntNo: "",
        reportCurrency: "",
        purchaseOrderText: "",
        documentDate:  moment(new Date()).format('YYYY-MM-DD'),
        documentNumber: "",
        trasnsctinCurrency: "",
        currency: "",
        reportCur: "",
        name: "",
        tranCur: "",
        documentHeaderTxt: "",
        valueType: "",
        valuein_objectcurrency:"",
        valuein_reportcurrency:"",
        valuein_transactioncurrency:""
    }

    return (
        <Dialog
            fullScreen
            open={props.openAddForexRateForm}
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
                    {
                        dataField?
                        <IODumpFrom dataField={dataField} closeIODump={props.closeIODump} onSubmit={props.onSubmitIODump} dataStatus={true} />
                        :null
                    }      
        </Dialog>
    )
}

export default AddIODump;