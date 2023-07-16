import React, { useEffect } from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { Grid, FormControl, TextField, Button, FormControlLabel, FormLabel, Radio, RadioGroup, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material';
import { Box } from '@mui/system';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

const MaterialMasterForm = (props?: any) => {
    let formikRef: any;
    const [materialResponse, setMaterialResponse] = React.useState<any>(null)
    const [getCostCenterData, setCostCenterData] = React.useState<any>(null)

    useEffect(() => {
        if (props.action === 'Update' && props.responseData && props.responseData.id) {
            setMaterialResponse(props.responseData)
            if (props.costcenterList) {
                props.costcenterList.forEach((items: any) => {
                    if (items?.costcenter !=="" && items.costcenter === props.responseData.costcenter) {                    
                        setCostCenterData(items)
                    }
                })
            } else {
                setCostCenterData(null)
            }
            onSetMaterialFormValue(props.responseData)
        }else{
            let intialValue:any = {
                materialname: '',
                costcenter: '',
                code: '',
                description: '',
                saccode: '',
                has_markup: '',
                has_wht: '',
                has_fx: '',
                country: '',
                is_taxable: ''
            }
            setMaterialResponse(intialValue)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    //     if (formikRef) {
    //         onSetMaterialFormValue(materialResponse);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [materialResponse])

    const onSetMaterialFormValue = (data?:any) => {
        if (formikRef && data) {
            formikRef.setFieldValue('materialname', data?.materialname);
            formikRef.setFieldValue('costcenter', data?.costcenter);
            formikRef.setFieldValue('code', data?.code);
            formikRef.setFieldValue('description', data?.description);
            formikRef.setFieldValue('saccode', data?.saccode);
            formikRef.setFieldValue('has_markup', data?.has_markup);
            formikRef.setFieldValue('has_wht', data?.has_wht);
            formikRef.setFieldValue('has_fx', data?.has_fx);
            formikRef.setFieldValue('is_taxable', data?.is_taxable);
            formikRef.setFieldValue('country', data?.country);
        }
    }

    const onGetCostCenterData = (getValues: any) => {
        if (getValues) {
            setCostCenterData(getValues)
        } else {
            setCostCenterData(null)
        }
    }

    return (
        <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 1200,
                    width: "100%",
                },
                "& .MuiTypography-h6": {
                    fontWeight: Fonts.SEMI_BOLD,
                    backgroundColor: "#00677F",
                    color: "#ffffff"
                },
            }}
            dividers
            open={props.openAddForm}
            onClose={() => props.closeOpenAddForm()}
            title={`${props.action} Material Master`}
        >
            <Box sx={{ padding: 5 }}>
                <Formik
                    enableReinitialize
                    innerRef={(action) => formikRef = action}
                    initialValues={materialResponse}
                    // validationSchema={schemaCapnitiValidation}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        values['action'] = props.action;
                        if (props.action === 'Create') {
                            if (values.materialname) {
                                props.onSubmitData(values)
                            } else {
                                toast.warn("Material Name is Requied", { position: 'bottom-right' });
                            }
                        } else if (props.action === 'Update') {
                            if (materialResponse && materialResponse.id) {
                                values['id'] = materialResponse.id;
                                if (values.materialname) {
                                    props.onSubmitData(values)
                                } else {
                                    toast.warn("Material Name is Requied", { position: 'bottom-right' });
                                }
                            }
                        }
                    }}>
                    {({ values, setFieldValue, handleChange }) => {
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
                                    <Grid container rowSpacing={3} spacing={{ xs: 2, md: 8 }}  >
                                        <Grid item xs={12} sm={6} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <Autocomplete
                                                    value={getCostCenterData ? getCostCenterData : ''}
                                                    onChange={(event: any, newValue: any) => {
                                                        // onGetYear(newValue)
                                                        setFieldValue('costcenter', newValue ? newValue.costcenter : '')
                                                        onGetCostCenterData(newValue)
                                                    }}
                                                    getOptionLabel={(option: any) => (option ? `${option.costcenter}` : "")}
                                                    id='costcenter'
                                                    options={props.costcenterList ? props.costcenterList : []}
                                                    renderInput={(params) => <TextField {...params} label='Cost Center' />}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="Material Name"
                                                    variant='outlined'
                                                    label="Material Name"
                                                    id={`materialname`}
                                                    name={`materialname`}
                                                    value={values?.materialname}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="Material Code"
                                                    variant='outlined'
                                                    label="Material Code"
                                                    id={`code`}
                                                    name={`code`}
                                                    value={values?.code}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="Description"
                                                    variant='outlined'
                                                    label="Description"
                                                    id={`description`}
                                                    name={`description`}
                                                    value={values?.description}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    placeholder="SAC Code"
                                                    variant='outlined'
                                                    label="SAC Code"
                                                    id={`saccode`}
                                                    name={`saccode`}
                                                    value={values?.saccode}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>
                                        {/* <Grid item xs={12} md={4}>
                                            <FormControl variant='outlined' fullWidth margin='dense'>
                                                <InputLabel id='contractoption-list-label'>Contract Option</InputLabel>
                                                <Select
                                                    labelId="contractoption-list-label"
                                                    id={`contractoption`}
                                                    name={`contractoption`}
                                                    value={values.contractoption}
                                                    onChange={handleChange}
                                                    label="Contract Option"
                                                >
                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                    {(props.slaContractsList && props.slaContractsList.length) && props.slaContractsList.map((option, index) => (
                                                        <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid> */}
                                        <Grid item xs={12} md={4}>
                                            <FormControl variant='outlined' fullWidth margin='dense'>
                                                <InputLabel id='country-list-label'>Country</InputLabel>
                                                <Select
                                                    labelId="country-list-label"
                                                    id={`country`}
                                                    name={`country`}
                                                    value={values?.country}
                                                    onChange={handleChange}
                                                    label="Country"
                                                >
                                                    <MenuItem value=''><em>None</em></MenuItem>
                                                    {(props.slaCountrysList && props.slaCountrysList.length) ? props.slaCountrysList.map((option, index) => (
                                                        <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                                                    )):null}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ background: '#f3f3f3', marginTop: 5, padding: 5, boxShadow: '0px 0px 5px 0px #ccc', borderRadius: 2 }}>
                                        <Grid container rowSpacing={3} spacing={{ xs: 2, md: 8 }}  >
                                            <Grid item xs={12} md={3}>
                                                <FormControl component='fieldset'>
                                                    <FormLabel component='legend' sx={{ fontWeight: "bold" }}>Markup</FormLabel>
                                                    <RadioGroup row aria-label='Business' name='has_markup' value={values?.has_markup}
                                                        onChange={(event) => {
                                                            let hasMarkUp: boolean;
                                                            if (event.target.value === 'true') {
                                                                hasMarkUp = true;
                                                                setFieldValue('has_markup', hasMarkUp);
                                                            } else if (event.target.value === 'false') {
                                                                hasMarkUp = false;
                                                                setFieldValue('has_markup', hasMarkUp);
                                                            }
                                                        }}>
                                                        <FormControlLabel value={true} control={<Radio required />} label='Yes' />
                                                        <FormControlLabel value={false} control={<Radio required />} label='No' />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <FormControl component='fieldset'>
                                                    <FormLabel component='legend' sx={{ fontWeight: "bold" }}>WHT</FormLabel>
                                                    <RadioGroup row aria-label='Business' name='has_wht' value={values?.has_wht}
                                                        onChange={(event) => {
                                                            let isTaxable: boolean;
                                                            if (event.target.value === 'true') {
                                                                isTaxable = true;
                                                                setFieldValue('has_wht', isTaxable);
                                                            } else if (event.target.value === 'false') {
                                                                isTaxable = false;
                                                                setFieldValue('has_wht', isTaxable);
                                                            }
                                                        }}>
                                                        <FormControlLabel value={true} control={<Radio required />} label='Yes' />
                                                        <FormControlLabel value={false} control={<Radio required />} label='No' />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <FormControl component='fieldset'>
                                                    <FormLabel component='legend' sx={{ fontWeight: "bold" }}>Tax</FormLabel>
                                                    <RadioGroup row aria-label='Business' name='is_taxable' value={values?.is_taxable}
                                                        onChange={(event) => {
                                                            let isgst: boolean;
                                                            if (event.target.value === 'true') {
                                                                isgst = true;
                                                                setFieldValue('is_taxable', isgst);
                                                            } else if (event.target.value === 'false') {
                                                                isgst = false;
                                                                setFieldValue('is_taxable', isgst);
                                                            }
                                                        }}>
                                                        <FormControlLabel value={true} control={<Radio required />} label='Yes' />
                                                        <FormControlLabel value={false} control={<Radio required />} label='No' />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <FormControl component='fieldset'>
                                                    <FormLabel component='legend' sx={{ fontWeight: "bold" }}>FX</FormLabel>
                                                    <RadioGroup row aria-label='Business' name='has_fx' value={values?.has_fx}
                                                        onChange={(event) => {
                                                            let isfxrate: boolean;
                                                            if (event.target.value === 'true') {
                                                                isfxrate = true;
                                                                setFieldValue('has_fx', isfxrate);
                                                            } else if (event.target.value === 'false') {
                                                                isfxrate = false;
                                                                setFieldValue('has_fx', isfxrate);
                                                            }
                                                        }}>
                                                        <FormControlLabel value={true} control={<Radio required />} label='Yes' />
                                                        <FormControlLabel value={false} control={<Radio required />} label='No' />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Box>
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
                                            props.closeOpenAddForm()
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
        </AppDialog>
    )
}

export default MaterialMasterForm;