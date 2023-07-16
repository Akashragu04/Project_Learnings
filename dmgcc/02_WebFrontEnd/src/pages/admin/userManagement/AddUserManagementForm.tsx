import React from 'react'
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, Autocomplete } from '@mui/material';
// import {EmployeeNameList, userRoleList} from './Types';

const AddUserManagementForm = (props?: any) => {
    const [postUserRole, setUserRole] = React.useState<any>([]);

    const onChangeUserdetail = (getUserData?:any) =>{
setUserRole([])
if(getUserData.length){
getUserData.forEach((items?:any, index?:any)=>{
    setUserRole([...postUserRole, items.id])
})
}
    }
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
                    if(postUserRole.length && values){
                     let postUseData:any = {
                         user_id:postUserRole,
                         role_id:values.role_id
                        }
                        props.onSubmit(postUseData)

                    }

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
                                <Autocomplete
                                id='role_id'
                                options={props.getUserRoleData?props.getUserRoleData:[]}
                                getOptionLabel={(option: any) => `${option.name}`}
                                onChange={(event, value: any) => {
                                    setFieldValue('role_id', value.id)
                                }}
                                filterSelectedOptions
                                value={values?.name}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label='Choose User Type'
                                    placeholder='User Type'
                                  />
                                )}
                              />
                                    </Grid>
                                <Grid item xs={12} md={12}>
                                <Autocomplete
                                multiple
                                id='user_id'
                                options={props.getNonUserList?props.getNonUserList:[]}
                                getOptionLabel={(option: any) => `${option.shortid}`}
                                onChange={(event, value: any) => {
                                    setFieldValue('user_id', value)
                                    onChangeUserdetail(value)
                                }}
                                filterSelectedOptions
                                value={values?.emp_name}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label='Choose Users Id'
                                    placeholder='Users Id'
                                  />
                                )}
                              />
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

export default AddUserManagementForm;
