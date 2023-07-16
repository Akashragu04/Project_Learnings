import { Dialog, AppBar, Toolbar, Typography, IconButton, Box, FormControl, TextField, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react'
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import { tariffSheetInvoicesTableHeader } from 'pages/SLA/SLACreation/Types';

const Transition: any = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ViewInvoiceDetails = (props?: any) => {
    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={props.onOpen}
                onClose={props.onClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                            View Invoice Details
                        </Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={props.onClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {
                    props.getInvoiceInfo ?
                        <Box sx={{ padding: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense' sx={{marginBottom:3}}>
                                        <TextField
                                            id='project_name'
                                            name="project_name"
                                            label='Project Name'
                                            variant='outlined'
                                            value={props.getInvoiceInfo.project_name}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense' sx={{marginBottom:3}}>
                                        <TextField
                                            id='slaid'
                                            name="slaid"
                                            label='SLA #'
                                            variant='outlined'
                                            value={props.getInvoiceInfo.slaid}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense' sx={{marginBottom:3}}>
                                        <TextField
                                            id='preinvoice_id'
                                            name="preinvoice_id"
                                            label='Pre-Invoice #'
                                            variant='outlined'
                                            value={props.getInvoiceInfo.preinvoice_id}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense' sx={{marginBottom:3}}>
                                        <TextField
                                            id='team'
                                            name="team"
                                            label='Team'
                                            variant='outlined'
                                            value={props.getInvoiceInfo.team}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense' sx={{marginBottom:3}}>
                                        <TextField
                                            id='customer'
                                            name="customer"
                                            label='Customer'
                                            variant='outlined'
                                            value={props.getInvoiceInfo.customer}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense' sx={{marginBottom:3}}>
                                        <TextField
                                            id='invoice_date'
                                            name="invoice_date"
                                            label='Invoice Date'
                                            variant='outlined'
                                            value={props.getInvoiceInfo.invoice_date}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense' sx={{marginBottom:3}}>
                                        <TextField
                                            id='invoice_id'
                                            name="invoice_id"
                                            label='Invoice #'
                                            variant='outlined'
                                            value={props.getInvoiceInfo.invoice_id}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense' sx={{marginBottom:3}}>
                                        <TextField
                                            id='invoice_no'
                                            name="invoice_no"
                                            label='Invoice No'
                                            variant='outlined'
                                            value={props.getInvoiceInfo.invoice_no}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense' sx={{marginBottom:3}}>
                                        <TextField
                                            id='gst_invoice_no'
                                            name="gst_invoice_no"
                                            label='GST Invoice No'
                                            variant='outlined'
                                            value={props.getInvoiceInfo.gst_invoice_no}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense' sx={{marginBottom:3}}>
                                        <TextField
                                            id='currency'
                                            name="currency"
                                            label='Currency'
                                            variant='outlined'
                                            value={props.getInvoiceInfo.currency}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense' sx={{marginBottom:3}}>
                                        <TextField
                                            id='date_of_service'
                                            name="date_of_service"
                                            label='Date Of Service'
                                            variant='outlined'
                                            value={props.getInvoiceInfo.date_of_service}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense' sx={{marginBottom:3}}>
                                        <TextField
                                            id='xe_rate'
                                            name="xe_rate"
                                            label='XE Rate'
                                            variant='outlined'
                                            value={props.getInvoiceInfo.xe_rate}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense' sx={{marginBottom:3}}>
                                        <TextField
                                            id='total_cost'
                                            name="total_cost"
                                            label='Total Cost'
                                            variant='outlined'
                                            value={props.getInvoiceInfo.total_cost}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="outlined" fullWidth margin='dense' sx={{marginBottom:3}}>
                                        <TextField
                                            id='status'
                                            name="status"
                                            label='Status'
                                            variant='outlined'
                                            value={props.getInvoiceInfo.status}
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                {/* This tariff sheet details */}
                                <Grid item xs={12} md={12}>
                                    {
                                        tariffSheetInvoicesTableHeader && props.getInvoiceInfo ?
                                    <TableContainer component={Paper}>
                                        <Table aria-label='simple table'>
                                            <TableHead sx={{ backgroundColor: "#00677F", marginTop: 2 }}>
                                                <TableRow>
                                                    {
                                                        tariffSheetInvoicesTableHeader.map((items?: any, index?: any) => (
                                                            <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: 14, minWidth: 150 }} key={index}>{items.lable}</TableCell>
                                                        ))
                                                    }
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <React.Fragment>
                                                    {props.getInvoiceInfo && props.getInvoiceInfo.sla_preinvoice_tariffsheet ?
                                                        props.getInvoiceInfo.sla_preinvoice_tariffsheet.map((tariffSheetProperty, index) => {
                                                            return (
                                                                <TableRow key={index}>
                                                                    <TableCell sx={{}}>{tariffSheetProperty.material_description ? tariffSheetProperty.material_description : '-'}</TableCell>
                                                                    <TableCell sx={{}}>{tariffSheetProperty.markup_value ? tariffSheetProperty.markup_value : '-'}</TableCell>
                                                                    <TableCell sx={{}}>{tariffSheetProperty.units ? tariffSheetProperty.units : '-'}</TableCell>
                                                                    <TableCell sx={{}}>{tariffSheetProperty.amount ? tariffSheetProperty.amount : '-'}</TableCell>
                                                                    <TableCell sx={{}}>{tariffSheetProperty.rate ? tariffSheetProperty.rate : '-'}</TableCell>
                                                                    <TableCell sx={{}}>{tariffSheetProperty.quantity ? tariffSheetProperty.quantity : '-'}</TableCell>
                                                                    <TableCell sx={{}}>{tariffSheetProperty.budget_available ? tariffSheetProperty.budget_available : '-'}</TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                        : null}
                                                        </React.Fragment>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    :null
                                }
                                </Grid>
                            </Grid>

                        </Box>
                        : null
                }

            </Dialog>
        </React.Fragment>
    )
}

export default ViewInvoiceDetails