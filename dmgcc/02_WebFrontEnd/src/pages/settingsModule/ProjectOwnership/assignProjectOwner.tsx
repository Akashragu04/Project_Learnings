import React, { useEffect } from 'react';
import {
  Box, Button, Card, CardContent, FormControl,
  Grid, Typography,
  TextField, Table, TableBody, TableCell, TableHead, TableRow, Autocomplete
} from '@mui/material';
import AppGridContainer from '../../../@crema/core/AppGridContainer';
import { Formik, Form } from 'formik';
import { AppAnimate, AppComponentHeader, AppLoader, AppTableContainer } from '../../../@crema';
import { connect } from "react-redux"
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  initProjectOwnershipAction, getBusinessRoleUserListAction, updateProjectOwnerDetailAction
} from 'saga/Actions';
// import CommonStore from '@crema/services/commonstore';
import { Fonts } from 'shared/constants/AppEnums';


const AssignProjectOwner = (props: any) => {
  // const userRole = CommonStore().userRoleType;
  const navigate = useNavigate();
  const navState: any = useLocation();
  let formikRef: any;
  const [choosenUsers, setChoosenUsers] = React.useState<any>([]);

  const { businessUserList, updateProjectOwnerResponse }: any = props;

  useEffect(() => {
    // props.getUserRolesList();
    if (navState.state.hasOwnProperty('data') && navState.state.data.id) {
      props.initProjectOwner();
      props.getBusinessUserList({ user_id: navState.state.data.id });
      bindProjectOwnerMappingDetails(navState.state.data);
    } else {
      goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Update Project Owner Response
    if (updateProjectOwnerResponse && updateProjectOwnerResponse.status) {
      toast.success(updateProjectOwnerResponse.message, { position: 'bottom-right' });
      props.initProjectOwner();
      goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateProjectOwnerResponse]);

  const goBack = () => {
    props.initProjectOwner();
    navigate('/settings');
  }

  const bindProjectOwnerMappingDetails = (data) => {
    if (formikRef && data.id) {
      formikRef.setFieldValue('cost_center', data.cost_center);
      formikRef.setFieldValue('ex_userid', `${data.shortid} - ${data.email}`);
      formikRef.setFieldValue('user_id', null);
    }
  }

  return (
    <>
      <AppComponentHeader
        title="Update Project Owner"
        description="Updating Project Manager Details"
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
                    cost_center: '',
                    ex_userid: '',
                    user_id: '',
                  }}
                  // validationSchema={addRequirementValidationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    if (values) {
                      if (values.user_id && values.ex_userid) {
                        props.updateProjectOwnerDetail({ user_id: values.user_id, ex_userid: values.ex_userid })
                      } else {
                        toast.warn("Please choose the User", { position: 'bottom-right' });
                      }
                    }
                    setSubmitting(false);
                  }}
                >
                  {({ values, setFieldValue, handleChange, handleSubmit }) => (
                    <Form
                      style={{ width: "100%", display: "flex", flexDirection: "column" }}
                      noValidate
                      autoComplete="off"
                    >
                      <Box sx={{ flexGrow: 1, width: '100%' }}>
                        {(props.loading) && <AppLoader />}
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={3}>
                            <FormControl variant="outlined" fullWidth margin='dense'>
                              <TextField
                                placeholder="Cost Centre"
                                variant='outlined'
                                label="Cost Centre"
                                id={`cost_center`}
                                name={`cost_center`}
                                onChange={handleChange}
                                value={values.cost_center}
                                disabled
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <FormControl variant="outlined" fullWidth margin='dense'>
                              <TextField
                                placeholder="Current Project Manager"
                                variant='outlined'
                                label="Current Project Manager"
                                id={`ex_userid`}
                                name={`ex_userid`}
                                onChange={handleChange}
                                value={values.ex_userid}
                                disabled
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin='dense'>
                              <Autocomplete
                                disableClearable
                                id='user_id'
                                options={businessUserList}
                                getOptionLabel={(option: any) => option?.shortid ? option?.shortid : ''}
                                onChange={(event, value: any) => {
                                  if (value && value.id) {
                                    setFieldValue("user_id", value.id);
                                    setChoosenUsers(value)
                                  }
                                }}
                                filterSelectedOptions
                                value={values?.user_id}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label='Choose User'
                                    placeholder='User'
                                  />
                                )}
                              />
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
  loading: state.projectSettings.loading,
  error: state.projectSettings.errors,
  updateProjectOwnerResponse: state.projectSettings.projectResponse,
  projectOwnerResponse: state.projectSettings.projectOwnerResponse,
  businessUserList: state.projectSettings.businessUserList
})

const mapDispatchToProps = (dispatch: any) => ({
  initProjectOwner: () => {
    dispatch(initProjectOwnershipAction())
  },
  getBusinessUserList: (data) => {
    dispatch(getBusinessRoleUserListAction(data))
  },
  updateProjectOwnerDetail: (data) => {
    dispatch(updateProjectOwnerDetailAction(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignProjectOwner);