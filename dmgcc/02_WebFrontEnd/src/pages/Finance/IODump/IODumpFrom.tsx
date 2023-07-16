import React from 'react'
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, Grid } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { onKeyDown } from '@crema/commonservices/CommonFileDownload';

const IODumpFrom = (props?: any) => {
    const goBack = () => {
        props.closeIODump()
    }
    return (
        <Box sx={{ padding: 5 }}>
            <Formik
                validateOnChange
                // innerRef={res => formikData = res}
                initialValues={props.dataField}
                // validationSchema={schemaCapnitiValidation}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const dumpField: any = {
                        id:values.id,
                        fiscalyear: values.year,
                        period: parseInt(values.period),
                        costelement: parseInt(values.costElement),
                        cost_element_name: values.costElementName,
                        // objcrcy: values.objcrcy,
                        orders: parseInt(values.orders),
                        co_object_name: values.coObjectName,
                        offset_account_name: values.offsetAccntName,
                        purchasing_document: values.purchsngDocument,
                        cost_element_descr: values.costElemntDescr,
                        posting_date:  moment(new Date(values.postingDate)).format('YYYY-MM-DD'),
                        ref_document_number: parseInt(values.refDocumntNo),
                        reportCurrency: values.reportCurrency,
                        purchase_order_text:  values.purchaseOrderText,
                        document_date:  moment(new Date(values.documentDate)).format('YYYY-MM-DD'),
                        document_number:  parseInt(values.documentNumber),
                        transaction_currency:  values.trasnsctinCurrency,
                        object_currency:  values.currency,
                        report_currency:  values.reportCur,
                        name:  values.name,
                        // tranCur:  values.tranCur,
                        document_header_text:  values.documentHeaderTxt,
                        valuetype:  parseInt(values.valueType),
                        valuein_objectcurrency:parseFloat(values.valuein_objectcurrency),
                        valuein_reportcurrency:parseFloat(values.valuein_reportcurrency),
                        valuein_transactioncurrency:parseFloat(values.valuein_transactioncurrency)
                    }
                    props.onSubmit(dumpField)
                }}>
                {({ isSubmitting, values, errors, touched, setFieldValue, handleChange }) => {
                    return (
                        <Form
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box sx={{ flexGrow: 1, width: '100%' }}>
                                <Grid container rowSpacing={5} spacing={{ xs: 2, md: 8 }}  >
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Year"
                                                variant='outlined'
                                                label="Year"
                                                id='year'
                                                name="year"
                                                onChange={handleChange}
                                                value={values.year ? values.year : ''}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Period"
                                                variant='outlined'
                                                label="Period"
                                                id='period'
                                                onChange={handleChange}
                                                value={values.period ? values.period : ''}
                                                type="number"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Cost Element"
                                                variant='outlined'
                                                label="Cost Element"
                                                id='costElement'
                                                onChange={handleChange}
                                                value={values.costElement ? values.costElement : ''}
                                                type="number"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Cost Element Name"
                                                variant='outlined'
                                                label="Cost Element Name"
                                                id='costElementName'
                                                onChange={handleChange}
                                                value={values.costElementName ? values.costElementName : ''}
                                            />
                                        </FormControl>
                                    </Grid>

                                    {/* <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Objcrcy"
                                                variant='outlined'
                                                label="objcrcy"
                                                id='objcrcy'
                                                onChange={handleChange}
                                                value={values.objcrcy ? values.objcrcy : ''}
                                            />
                                        </FormControl>
                                    </Grid> */}

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Orders"
                                                variant='outlined'
                                                label="Orders"
                                                id='orders'
                                                onChange={handleChange}
                                                value={values.orders ? values.orders : ''}
                                                type="number"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Co Object Name"
                                                variant='outlined'
                                                label="Co Object Name"
                                                id='coObjectName'
                                                onChange={handleChange}
                                                value={values.coObjectName ? values.coObjectName : ''}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Offset Accnt Name"
                                                variant='outlined'
                                                label="Offset Accnt Name"
                                                id='offsetAccntName'
                                                onChange={handleChange}
                                                value={values.offsetAccntName ? values.offsetAccntName : ''}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="purch sng Document"
                                                variant='outlined'
                                                label="purch sng Document"
                                                id='purchsngDocument'
                                                onChange={handleChange}
                                                value={values.purchsngDocument ? values.purchsngDocument : ''}
                                                type="number"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="cost Elemnt Description"
                                                variant='outlined'
                                                label="cost Elemnt Description"
                                                id='costElemntDescr'
                                                onChange={handleChange}
                                                value={values.costElemntDescr ? values.costElemntDescr : ''}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                     <DatePicker
                                       label='Posting Date'
                                       value={values.postingDate}
                                       minDate={props.dataStatus?moment().toDate():{}}
                                       onChange={reqDate => setFieldValue("postingDate", reqDate)}
                                       renderInput={(params) => <TextField fullWidth margin='dense' variant='outlined' {...params} onKeyDown={onKeyDown}/>}
                                     />
                                   </LocalizationProvider>
                                        {/* <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Posting Date"
                                                variant='outlined'
                                                label="Posting Date"
                                                id='postingDate'
                                                onChange={handleChange}
                                                value={values.postingDate ? values.postingDate : ''}
                                            />
                                        </FormControl> */}
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Ref Documnt No"
                                                variant='outlined'
                                                label="Ref Documnt No"
                                                id='refDocumntNo'
                                                onChange={handleChange}
                                                value={values.refDocumntNo ? values.refDocumntNo : ''}
                                                type="number"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Report Currency"
                                                variant='outlined'
                                                label="Report Currency"
                                                id='reportCurrency'
                                                onChange={handleChange}
                                                value={values.reportCurrency ? values.reportCurrency : ''}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="purchase Order Text"
                                                variant='outlined'
                                                label="purchase Order Text"
                                                id='purchaseOrderText'
                                                onChange={handleChange}
                                                value={values.purchaseOrderText ? values.purchaseOrderText : ''}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                     <DatePicker
                                       label='Document Date'
                                       value={values.documentDate}
                                       minDate={moment().toDate()}
                                       onChange={reqDate => setFieldValue("documentDate", reqDate)}
                                       renderInput={(params) => <TextField fullWidth margin='dense' variant='outlined' {...params} onKeyDown={onKeyDown}/>}
                                     />
                                   </LocalizationProvider>
                                        {/* <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Document Date"
                                                variant='outlined'
                                                label="Document Date"
                                                id='documentDate'
                                                onChange={handleChange}
                                                value={values.documentDate ? values.documentDate : ''}
                                            />
                                        </FormControl> */}
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Document Number"
                                                variant='outlined'
                                                label="Document Number"
                                                id='documentNumber'
                                                onChange={handleChange}
                                                value={values.documentNumber ? values.documentNumber : ''}
                                                type="number"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="trasnsct in Currency"
                                                variant='outlined'
                                                label="trasnsct in Currency"
                                                id='trasnsctinCurrency'
                                                onChange={handleChange}
                                                value={values.trasnsctinCurrency ? values.trasnsctinCurrency : ''}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Currency"
                                                variant='outlined'
                                                label="Currency"
                                                id='currency'
                                                onChange={handleChange}
                                                value={values.currency ? values.currency : ''}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Report Currency"
                                                variant='outlined'
                                                label="Report Currency"
                                                id='reportCur'
                                                onChange={handleChange}
                                                value={values.reportCur ? values.reportCur : ''}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="name"
                                                variant='outlined'
                                                label="name"
                                                id='name'
                                                onChange={handleChange}
                                                value={values.name ? values.name : ''}
                                            />
                                        </FormControl>
                                    </Grid>

                                    {/* <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="trasnsct Currency"
                                                variant='outlined'
                                                label="trasnsct Currency"
                                                id='tranCur'
                                                onChange={handleChange}
                                                value={values.tranCur ? values.tranCur : ''}
                                            />
                                        </FormControl>
                                    </Grid> */}

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Document Header Txt"
                                                variant='outlined'
                                                label="Document Header Txt"
                                                id='documentHeaderTxt'
                                                onChange={handleChange}
                                                value={values.documentHeaderTxt ? values.documentHeaderTxt : ''}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Value Type"
                                                variant='outlined'
                                                label="Value Type"
                                                id='valueType'
                                                onChange={handleChange}
                                                value={values.valueType ? values.valueType : ''}
                                                type="number"
                                            />
                                        </FormControl>
                                    </Grid>
                                    

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Object currency"
                                                variant='outlined'
                                                label="Object currency"
                                                id='valuein_objectcurrency'
                                                onChange={handleChange}
                                                value={values.valuein_objectcurrency ? values.valuein_objectcurrency : ''}
                                                type="number"
                                            />
                                        </FormControl>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Report currency"
                                                variant='outlined'
                                                label="Report currency"
                                                id='valuein_reportcurrency'
                                                onChange={handleChange}
                                                value={values.valuein_reportcurrency ? values.valuein_reportcurrency : ''}
                                                type="number"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Transaction currency"
                                                variant='outlined'
                                                label="Transaction currency"
                                                id='valuein_transactioncurrency'
                                                onChange={handleChange}
                                                value={values.valuein_transactioncurrency ? values.valuein_transactioncurrency : ''}
                                                type="number"
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ pt: 10, textAlign: "right", }} >

                                <Button sx={{
                                    position: "relative",
                                    minWidth: 100,
                                    marginRight: 2
                                }}
                                    variant="contained"
                                    color="inherit"
                                    type="button"
                                    onClick={() => {
                                        goBack()
                                    }}
                                >  Cancel </Button>
                                <Button sx={{
                                    position: "relative",
                                    minWidth: 100,
                                    marginRight: 2
                                }}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >  Submit </Button>
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </Box>
    )
}

export default IODumpFrom;