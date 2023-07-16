import React from 'react'
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditUserManagerForm = (props?: any) => {
    const goBack = () => {
        props.handleClose()
    }
    return (
        <Box sx={{ padding: 5 }}>
            <Formik
                validateOnChange
                // innerRef={res => formikData = res}
                initialValues={props.getFieldData}
                // validationSchema={validationSchemaTest}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    let postUserRole:any = {
                        role_id:values.role_id,
                        user_id:[props.getUserInfoData.id]
                    }
                    props.onSubmit(postUserRole)

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
                                    <Grid item xs={12} md={12}>
                                        <Grid item xs={12} md={12}>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                                <TextField
                                                    id='user_id'
                                                    name="user_id"
                                                    label='User Short Id'
                                                    disabled
                                                    fullWidth
                                                    variant='outlined'
                                                    value={values.user_id}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                    <FormControl variant='outlined' fullWidth margin='dense'>
                                        <InputLabel id='role_id'>User Type</InputLabel>
                                        <Select
                                          labelId='usertype'
                                          id='role_id'
                                          name="role_id"
                                          value={values.role_id?values.role_id:""}
                                          onChange={(e: any) => {
                                            setFieldValue('role_id', e.target.value)
                                            // selectUserData(e, values);
                                          }}
                                          label='User Type'
                                        >
                                          {props.getUserRoleData && props.getUserRoleData !== null ?
                                            props.getUserRoleData.map((items: any, index: any) => <MenuItem value={items.id} key={index}>{items.name}</MenuItem>)
                                            : null}
                                        </Select>
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
                                    color="primary"
                                    type="submit"
                                >  Submit </Button>

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
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </Box>
    )
}

export default EditUserManagerForm;