import React from 'react'
import { Box, Grid, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { Formik, Form, FieldArray } from 'formik';
import { recruitmentStatus } from './Types';

const BizCaseForm = (props?: any) => {
    const [getFieldData, setFieldData] = React.useState<any>(null)

    React.useEffect(() => {
        if (props.getJDMappingInternal && props.getJDMappingInternal.length) {
            // let formikData:any;
            const getFieldData: any = {
                BizCaseMapping: props.getJDMappingInternal
            }
            setFieldData(getFieldData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const goBack = () => {
        props.closeTaleo()
    }
  
    return (
        <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 800,
                    width: "100%"
                },
                "& .MuiTypography-h6": {
                    fontWeight: Fonts.SEMI_BOLD,
                    backgroundColor: "#00677F",
                    color: "#ffffff"
                },
            }}
            dividers
            open={props.showTaleo}
            onClose={() => props.closeTaleo()}
            title={"Business Case Setup Update"}
        >

            <Formik
                validateOnChange
                // innerRef={res => formikData = res}
                initialValues={getFieldData}
                // validationSchema={schemaCapnitiValidation}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    props.onSubmit(values.BizCaseMapping)

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
                            {
                                getFieldData !== null ?
                                    <React.Fragment>
                                        <Box sx={{ flexGrow: 1, width: '100%' }}>
                                            <FieldArray
                                                name="BizCaseMapping"
                                                render={({ insert, remove, push }) => (
                                                    <>
                                                    <Grid container spacing={3}>
                                                    <Grid item xs={12} md={1} sx={{ marginBottom: 2 }}>
                                                        S.No
                                                    </Grid> 
                                                    <Grid item xs={12} md={3} sx={{ marginBottom: 2 }}>
                                                        Month
                                                    </Grid> 
                                                    <Grid item xs={12} md={4} sx={{ marginBottom: 2 }}>
                                                        Position Code
                                                    </Grid> 
                                                    <Grid item xs={12} md={4} sx={{ marginBottom: 2 }}>
                                                        Status
                                                    </Grid> 
                                                    </Grid>
                                                        {values.BizCaseMapping.length > 0 &&
                                                            values.BizCaseMapping.map(
                                                                (fieldItem: any, index: any) => {
                                                                    return (
                                                                        <Box key={index}>
                                                                            <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={1} sx={{ marginBottom: 2 }}>
                                                                              <Box sx={{paddingTop:1}}>{index+1}</Box>  
                                                                            </Grid>
                                                                                <Grid item xs={12} md={3} sx={{ marginBottom: 2 }}>
                                                                                    <FormControl variant="outlined" fullWidth margin='dense'>
                                                                                        <TextField
                                                                                            placeholder="Month"
                                                                                            variant='outlined'
                                                                                            label="Month"
                                                                                            disabled
                                                                                            value={fieldItem.monthandyear ? fieldItem.monthandyear : ""}
                                                                                            id={`BizCaseMapping.${index}.monthandyear`}
                                                                                            name={`BizCaseMapping.${index}.monthandyear`}
                                                                                            onChange={handleChange}
                                                                                        />
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={4} sx={{ marginBottom: 2 }}>
                                                                                    <FormControl variant="outlined" fullWidth margin='dense'>
                                                                                        <TextField
                                                                                            placeholder="Position Code"
                                                                                            variant='outlined'
                                                                                            label="Position Code"
                                                                                            disabled
                                                                                            value={fieldItem.position_code ? fieldItem.position_code : ""}
                                                                                            id={`BizCaseMapping.${index}.position_code`}
                                                                                            name={`BizCaseMapping.${index}.position_code`}
                                                                                            onChange={handleChange}
                                                                                        />
                                                                                    </FormControl>
                                                                                </Grid>

                                                                                <Grid item xs={12} md={4} sx={{ marginBottom: 2 }}>
                                                                                    {/* <FormControl variant='outlined' fullWidth margin='dense'> */}
                                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                                        <InputLabel id={`BizCaseMapping.${index}.status`}>Status</InputLabel>
                                                                                        <Select
                                                                                            labelId='status'
                                                                                            id={`BizCaseMapping.${index}.status`}
                                                                                            name={`BizCaseMapping.${index}.status`}
                                                                                            value={fieldItem.status ? fieldItem.status : ""}
                                                                                            disabled={fieldItem.updated_by === "TALEO" ? true : false}
                                                                                            onChange={(e: any) => {
                                                                                                setFieldValue(`BizCaseMapping.${index}.status`, e.target.value)
                                                                                                setFieldValue(`BizCaseMapping.${index}.updated_by`, "INTERNAL")
                                                                                                //  selectUserData(e, values);
                                                                                            }}
                                                                                            label='Status'
                                                                                        >
                                                                                            {recruitmentStatus && recruitmentStatus !== null ?
                                                                                                recruitmentStatus.map((items: any, index: any) => <MenuItem value={items.name} key={index} >{items.name}</MenuItem>)
                                                                                                : null}
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Box>
                                                                    )
                                                                }
                                                            )}


                                                    </>

                                                )} />
                                        </Box>
                                        <Box sx={{ pt: 5, p: 5, textAlign: "right", }} >

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
                                    </React.Fragment>

                                    : null
                            }


                        </Form>
                    )
                }}
            </Formik>

        </AppDialog>
    )
}

export default BizCaseForm;