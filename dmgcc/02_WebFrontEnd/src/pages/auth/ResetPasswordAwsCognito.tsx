import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import IntlMessages from "../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../shared/constants/AppEnums";
// import AppAnimate from "../../@crema/core/AppAnimate";
import AppTextField from "../../@crema/core/AppFormComponents/AppTextField";
import { ReactComponent as Logo } from "../../assets/user/reset-password.svg";
import { useTheme } from "@mui/material";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { ActionTypes } from "saga/sagas/Types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppLoader from '@crema/core/AppLoader'

const ResetPasswordAwsCognito = (props?: any) => {
  const { statuscode, loading } = props;
  // const dispatch = useDispatch();
  const theme = useTheme();
  const { token } = useParams();
  const { messages } = useIntl();
  const navigate = useNavigate();

  useEffect(() => {
    if (statuscode) {
      if (statuscode.statuscode === 200) {
        navigate('/signin')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statuscode])

  const validationSchema = yup.object({
    newPassword: yup
      .string()
      .required(String(messages["validation.enterNewPassword"])),
    confirmPassword: yup
      .string()
      .required(String(messages["validation.reTypePassword"])),
  });
  const onSubmitChangePassword = (getValue: any) => {
    props.postChangePassword(getValue)
  }

  return (
    // <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box
        sx={{
          pb: 6,
          py: { xl: 8 },
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        {
          loading ?
            <AppLoader /> :
            <Card
              sx={{
                maxWidth: 1024,
                width: "100%",
                textAlign: "center",
                overflow: "hidden",
                padding: { xs: 8, md: 12 },
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                paddingLeft: {
                  lg: 8,
                  xl: 20,
                },
                paddingRight: {
                  lg: 12,
                  xl: 20,
                },
                backgroundColor: "#ffffffc9"
              }}
            >
              <Grid container spacing={5}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    textAlign: "center",
                    alignSelf: { lg: "center" },
                  }}
                >
                  <Box
                    display="inline-block"
                    sx={{
                      width: "100%",
                      height: "100%",
                      textAlign: "center",
                      "& svg": {
                        width: "100%",
                        height: "100%",
                        display: "inline-block",
                        paddingRight: { xs: 0, lg: 10 },
                      },
                    }}
                  >
                    <Logo fill={theme.palette.primary.main} />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      mb: { xs: 6, xl: 8 },
                      fontWeight: Fonts.BOLD,
                      fontSize: 20,
                      marginTop: { lg: 15 }
                    }}
                  >
                    <IntlMessages id="common.resetPassword" />
                  </Box>
                  <Formik
                    validateOnChange={true}
                    initialValues={{
                      newPassword: "",
                      confirmPassword: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(data, { setErrors, resetForm }) => {
                      if (data.newPassword !== data.confirmPassword) {
                        setErrors({
                          confirmPassword: messages[
                            "validation.passwordMisMatch"
                          ] as string,
                        });
                      } else {
                        const postData: any = {
                          token: token,
                          password: data.newPassword
                        }
                        onSubmitChangePassword(postData)
                      }
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Box
                        sx={{
                          textAlign: "left",

                        }}
                      >
                        <Form noValidate autoComplete="off">

                          <Box
                            sx={{
                              mb: { xs: 3, xl: 4 },
                            }}
                          >
                            <AppTextField
                              name="newPassword"
                              label={<IntlMessages id="common.newPassword" />}
                              sx={{
                                width: "100%",
                              }}
                              variant="outlined"
                              type="password"
                            />
                          </Box>
                          <Box
                            sx={{
                              mb: { xs: 3, xl: 4 },
                            }}
                          >
                            <AppTextField
                              name="confirmPassword"
                              label={<IntlMessages id="common.retypePassword" />}
                              sx={{
                                width: "100%",
                              }}
                              variant="outlined"
                              type="password"
                            />
                          </Box>

                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              width: "100%",
                              height: 44,
                            }}
                            type="submit"
                            disabled={loading ? true : false}
                          >
                            {<IntlMessages id="common.resetMyPassword" />}
                          </Button>
                        </Form>
                      </Box>
                    )}
                  </Formik>
                </Grid>
              </Grid>
            </Card>
        }

      </Box>
    // </AppAnimate>
  );
};

const mapStateToProps = (state: any) => {
  return {
    statuscode: state.auth.resetPassword,
    loading: state.auth.loading
  }
}
const mapDispatchToProps = (dispatch?: any) => {
  return {
    postChangePassword: (getValue?: any) => dispatch({ type: ActionTypes.CHANGEPASSWORD_REQUEST, value: getValue })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordAwsCognito);
