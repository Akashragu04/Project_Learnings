import React, { useEffect } from 'react';
import {
  Box, Button, Card, CardContent, FormControl,
  Grid, InputLabel, MenuItem, Select, Typography,
  TextField, Table, TableBody, TableCell, TableHead, TableRow, Autocomplete
} from '@mui/material';
import AppGridContainer from '../../../@crema/core/AppGridContainer';
import { Formik, Form } from 'formik';
import { AppAnimate, AppComponentHeader, AppLoader, AppTableContainer } from '../../../@crema';
import { connect } from "react-redux"
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getUnmappedUsersListAction, initRoleManagementAction, getAllUserRolesListAction, createAssignRoleAction
} from 'saga/Actions';
// import CommonStore from '@crema/services/commonstore';
import { Fonts } from 'shared/constants/AppEnums';


const AssignRoleToUsers = (props: any) => {
  // const userRole = CommonStore().userRoleType;
  const navigate = useNavigate();
  const navState: any = useLocation();
  let formikRef: any;
  const [choosenUsers, setChoosenUsers] = React.useState<any>([]);
  const [isUserDisabled, setUserDisable] = React.useState<any>(false);

  const { unMappedUsersList, usersRolesList, createRoleMappResponse }: any = props;

  useEffect(() => {
    props.initRoleManagementProcess();
    props.getUnmappedUsersList();
    props.getUserRolesList();
    if (navState.state.action && navState.state.action === 'update') {
      if (navState.state.hasOwnProperty('data') && navState.state.data) {
        bindUserRoleMappingDetails(navState.state.data);
        setUserDisable(true);
      } else {
        goBack();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //   // Create biz Requirement Response
    if (createRoleMappResponse.status) {
      toast.success(createRoleMappResponse.message, { position: 'bottom-right' });
      props.initRoleManagementProcess();
      goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createRoleMappResponse]);

  const goBack = () => {
    props.initRoleManagementProcess();
    navigate('/settings');
  }

  const bindUserRoleMappingDetails = (data) => {
    if (formikRef && data.id) {
      formikRef.setFieldValue('role_id', data.roles[0].id);
      formikRef.setFieldValue('user_id', [data.id]);
      formikRef.setFieldValue('user_list', [data]);
      setChoosenUsers([data]);
    }
  }

  return (
    <>
      <AppComponentHeader
        title="Assign User Role"
        description="Assigning Role to the Users"
      />
      <AppGridContainer>

        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Card variant='outlined'>
            <CardContent>
              <Box style={{ marginTop: 16 }}>
                <Formik
                  enableReinitialize
                  innerRef={(action) => { formikRef = action }}
                  initialValues={{
                    user_list: [],
                    user_id: [],
                    role_id: ''
                  }}
                  // validationSchema={addRequirementValidationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    if (values) {
                      if (values.role_id && values.user_id.length) {
                        props.createUserRoleMapping({ data: values })
                      } else {
                        toast.warn("Username & Role is required", { position: 'bottom-right' });
                      }
                    }
                    setSubmitting(false);
                    // resetForm();
                  }}
                >
                  {({ isSubmitting, values, errors, touched, setFieldValue, handleChange, handleSubmit }) => (
                    <Form
                      style={{ width: "100%", display: "flex", flexDirection: "column" }}
                      noValidate
                      autoComplete="off"
                    >
                      <Box sx={{ flexGrow: 1, width: '100%' }}>
                        {(props.loading) && <AppLoader />}
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin='dense'>
                              <Autocomplete
                                disabled={isUserDisabled}
                                multiple
                                id='user_list'
                                options={unMappedUsersList}
                                getOptionLabel={(option: any) => `${option.hrid} - ${option.shortid}`}
                                // defaultValue={[top100Films[13]]}
                                onChange={(event, value: any) => {
                                  let userId: any = [];
                                  if (value.length) {
                                    userId = value.map((item) => item.id);
                                  }
                                  setFieldValue("user_list", value);
                                  setFieldValue("user_id", userId);
                                  setChoosenUsers(value)
                                }}
                                filterSelectedOptions
                                value={values?.user_list}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label='Choose Users'
                                    placeholder='Users'
                                  />
                                )}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormControl variant='outlined' fullWidth margin='dense'>
                              <InputLabel id='currency-list-label'>Roles</InputLabel>
                              <Select
                                labelId='role_id-list-label'
                                id='role_id-list-label-standard'
                                name="role_id"
                                value={values.role_id}
                                onChange={handleChange}
                                label='Roles'
                              >
                                <MenuItem value=''><em>None</em></MenuItem>
                                {usersRolesList.map((option, index) => (
                                  <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          {(choosenUsers.length !== 0) && <Grid item xs={12} md={12}>
                            <Typography sx={{ my: 4 }} variant='h4' component='div'>Users </Typography>
                            <AppAnimate animation="transition.fadeIn" delay={200}>
                              <AppTableContainer>
                                <Table className="table">
                                  <TableHead>
                                    <TableRow
                                      sx={{
                                        position: "relative",
                                        "& .tableCell": {
                                          fontSize: 13,
                                          padding: 2,
                                          paddingTop: 0,
                                          fontWeight: Fonts.BOLD,
                                          whiteSpace: "nowrap",
                                          "&:first-of-type": {
                                            paddingLeft: 5,
                                          },
                                          "&:last-of-type": {
                                            paddingRight: 5,
                                          },
                                        },
                                      }}
                                    >
                                      <TableCell align="left" className="tableCell">
                                        HR ID
                                      </TableCell>
                                      <TableCell align="left" className="tableCell">
                                        Short ID
                                      </TableCell>
                                      <TableCell align="left" className="tableCell">
                                        Employee Code
                                      </TableCell>
                                      <TableCell align="left" className="tableCell">
                                        Employee Name
                                      </TableCell>
                                      <TableCell align="left" className="tableCell">
                                        department
                                      </TableCell>
                                      <TableCell align="left" className="tableCell">
                                        email
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {choosenUsers.map((data) => (
                                      <TableRow key={data.id}>
                                        <TableCell align="left" className="tableCell">
                                          {data?.hrid}
                                        </TableCell>
                                        <TableCell align="left" className="tableCell">
                                          {data.shortid}
                                        </TableCell>
                                        <TableCell align="left" className="tableCell">
                                          {data.employee_code}
                                        </TableCell>
                                        <TableCell align="left" className="tableCell">
                                          {data.emp_name}
                                        </TableCell>
                                        <TableCell align="left" className="tableCell">
                                          {data.department}
                                        </TableCell>
                                        <TableCell align="left" className="tableCell">
                                          {data.email}
                                        </TableCell>
                                      </TableRow>
                                    ))}

                                  </TableBody>
                                </Table>
                              </AppTableContainer>
                            </AppAnimate>
                          </Grid>}
                        </Grid>
                      </Box>

                      <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                          color="inherit" type="button" onClick={goBack}> Cancel
                        </Button>
                        <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                          color="primary" type="submit"> Save
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </AppGridContainer>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.settingsProcess.loading,
  error: state.settingsProcess.errors,
  createRoleMappResponse: state.settingsProcess.response,
  unMappedUsersList: state.settingsProcess.usersList,
  usersRolesList: state.settingsProcess.usersRolesList
})

const mapDispatchToProps = (dispatch: any) => ({
  initRoleManagementProcess: () => {
    dispatch(initRoleManagementAction())
  },
  getUnmappedUsersList: (data) => {
    dispatch(getUnmappedUsersListAction(data))
  },
  getUserRolesList: (data) => {
    dispatch(getAllUserRolesListAction(data))
  },
  createUserRoleMapping: (data) => {
    dispatch(createAssignRoleAction(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignRoleToUsers);