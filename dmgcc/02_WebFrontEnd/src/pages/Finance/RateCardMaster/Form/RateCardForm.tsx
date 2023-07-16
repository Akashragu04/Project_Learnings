import React from 'react'
import { Formik, Form, FieldArray } from 'formik';
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, ButtonGroup, Autocomplete } from '@mui/material';
import { yearList, LevelList } from '../../../../services/Constants';

const RateCardForm = (props?: any) => {

    const goBack = () => {
        props.handleClose()
    }
    return (
        <Box sx={{ padding: 5 }}>
            <Formik
                validateOnChange
                // innerRef={res => formikData = res}
                initialValues={props.getFieldData}
                // validationSchema={schemaCapnitiValidation}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    props.onSubmit(values)
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
                                    <Grid item xs={12} md={4} sx={{marginTop:3}}>
                                        <Autocomplete
                                            onChange={(event: any, value: any) => {
                                                if(value) {
                                                    setFieldValue("team", value.team);
                                                    setFieldValue("department", value.department);
                                                } else {
                                                    setFieldValue("team", '');
                                                    setFieldValue("department", '');
                                                }
                                            }}
                                            getOptionLabel={(option: any) => (option ? option.cost_center : "")}
                                            onInputChange={(event, value) => {
                                                setFieldValue("costcenter", value)
                                            }}
                                            id='costcenter'
                                            options={props.getCostCentreList ? props.getCostCentreList : []}
                                            sx={{ marginLeft: 2 }}
                                            renderInput={(params) => <TextField {...params} label='Cost Centre' fullWidth />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Team"
                                                variant='outlined'
                                                label="Team"
                                                id='team'
                                                onChange={handleChange}
                                                value={values.team ? values.team : ''}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant='outlined' fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Department"
                                                variant='outlined'
                                                label="Department"
                                                id='department'
                                                onChange={handleChange}
                                                value={values.department ? values.department : ''}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>

                                </Grid>
                            </Box>
                            <Box sx={{ flexGrow: 1, marginTop: 4, width: '100%' }}>
                                <FieldArray
                                    name="ratecards"
                                    render={({ insert, remove, push }) => (
                                        <>
                                            {values.ratecards.length > 0 &&
                                                values.ratecards.map(
                                                    (fieldItem: any, index: any) => (
                                                        <Box key={index}>
                                                            <Grid container spacing={3}>
                                                                <Grid item xs={12} md={2}>
                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                        <TextField
                                                                            placeholder='Hourly Rate Description'
                                                                            variant='outlined'
                                                                            label='Hourly Rate Description'
                                                                            id={`ratecards.${index}.hourly_description`}
                                                                            name={`ratecards.${index}.hourly_description`}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>

                                                                <Grid item xs={12} md={2}>
                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                        <TextField
                                                                            placeholder='Hourly Rate INR'
                                                                            variant='outlined'
                                                                            label='Hourly Rate INR'
                                                                            id={`ratecards.${index}.hourly_rate_inr`}
                                                                            name={`ratecards.${index}.hourly_rate_inr`}
                                                                            onChange={handleChange}
                                                                            type="number"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={12} md={2}>
                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                        <TextField
                                                                            placeholder='Hourly Rate USD'
                                                                            variant='outlined'
                                                                            label='Hourly Rate USD'
                                                                            id={`ratecards.${index}.hourly_rate_usd`}
                                                                            name={`ratecards.${index}.hourly_rate_usd`}
                                                                            onChange={handleChange}
                                                                            type="number"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={12} md={2}>
                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                        <TextField
                                                                            placeholder='Hourly Rate EUR'
                                                                            variant='outlined'
                                                                            label='Hourly Rate EUR'
                                                                            id={`ratecards.${index}.hourly_rate_ero`}
                                                                            name={`ratecards.${index}.hourly_rate_ero`}
                                                                            onChange={handleChange}
                                                                            type="number"
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={12} md={1}>
                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                        <InputLabel id='year'>Level</InputLabel>
                                                                        <Select
                                                                            labelId={`ratecards.${index}.level`}
                                                                            id={`ratecards.${index}.level`}
                                                                            name={`ratecards.${index}.level`}
                                                                            value={fieldItem.level ? fieldItem.level : ''}
                                                                            onChange={(e: any) => {
                                                                                setFieldValue(`ratecards.${index}.level`, e.target.value)
                                                                                // selectReceiverUserData(e);
                                                                            }}
                                                                            label='Level'
                                                                        >
                                                                            {LevelList && LevelList !== null ?
                                                                                LevelList.map((items: any, index: any) =>
                                                                                    <MenuItem value={items.name} key={index} >{items.name}</MenuItem>)
                                                                                : null}

                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={12} md={2}>
                                                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                                                        <InputLabel id='year'>Year</InputLabel>
                                                                        <Select
                                                                            labelId='year'
                                                                            id={`ratecards.${index}.year`}
                                                                            name={`ratecards.${index}.year`}
                                                                            value={fieldItem.year ? fieldItem.year : ''}
                                                                            onChange={(e: any) => {
                                                                                setFieldValue(`ratecards.${index}.year`, e.target.value)
                                                                                // selectReceiverUserData(e);
                                                                            }}
                                                                            label='Year'
                                                                        >
                                                                            {yearList && yearList !== null ?
                                                                                yearList.map((items: any, index: any) =>
                                                                                    <MenuItem value={items.year} key={index} >{items.year}</MenuItem>)
                                                                                : null}
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={1} md={1} sx={{ textAlign: 'center', marginTop: 5 }}>
                                                                    <ButtonGroup size='small' aria-label='small button group'>
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="inherit" type="button"
                                                                            onClick={() => {
                                                                                remove(index)
                                                                            }
                                                                            }
                                                                            disabled={values.ratecards.length <= 1 ? true : false}
                                                                        >
                                                                            -
                                                                        </Button>
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary" type="button"
                                                                            onClick={() =>
                                                                                push({
                                                                                    hourly_rate_descrip: "",
                                                                                    hourly_rate_inr: "",
                                                                                    hourly_rate_usd: "",
                                                                                    hourly_rate_ero: "",
                                                                                    level: '',
                                                                                    year: '',
                                                                                })
                                                                            }
                                                                        >
                                                                            <i className="material-icons">add</i>
                                                                        </Button>
                                                                    </ButtonGroup>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    ))}


                                        </>

                                    )} />
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
        </Box >
    )
}

export default RateCardForm;