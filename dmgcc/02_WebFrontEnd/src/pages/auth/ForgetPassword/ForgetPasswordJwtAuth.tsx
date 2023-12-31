import React, {useEffect} from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Typography, useTheme } from "@mui/material";
import { Fonts } from "../../../shared/constants/AppEnums";
// import AppAnimate from "../../../@crema/core/AppAnimate";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import { ReactComponent as Logo } from "../../../assets/user/forgot-password.svg";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { ActionTypes } from "saga/sagas/Types";
import AppLoader from '@crema/core/AppLoader'

const ForgetPasswordJwtAuth = (props?:any) => {
  const {statuscode, loading } = props;
  const theme = useTheme();
  const { messages } = useIntl();
  const navigate = useNavigate();
  useEffect(()=>{
if(statuscode){
  if(statuscode.statuscode === 200){
    navigate('/signin')
  }
}
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statuscode])
  const validationSchema = yup.object({
    email: yup
      .string()
      .email(String(messages["validation.emailFormat"]))
      .required(String(messages["validation.emailRequired"])),
  });
  const goBack = () => {
    navigate('/signin')
    }

    const onSubmitForgetpassword = (getValue:any)=>{
      props.sendForgetPassword(getValue)
    }
  return (
<>
{loading?
      <AppLoader/>      
      :
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
        <Card
          sx={{
            maxWidth: 924,
            width: "100%",
            textAlign: "center",
            overflow: "hidden",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              backgroundColor:"#ffffffc9"
  
          }}
        >
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  "& svg": {
                    width: "100%",
                    height: "350px",
                    display: "inline-block",
                    paddingRight: { xs: 0, lg: 2.5 },
                  },
                }}
              >
                <Logo fill={theme.palette.primary.main} />
              </Box>
            </Grid>
  
            <Grid item xs={12} lg={6}>
              <Box
                sx={{
                  p: { xs: 8, lg: 12 },
                  px: { xl: 16 },
                  py: { xl: 12 },
                }}
              >
                <Box
                  sx={{
                    mb: { xs: 4, xl: 8 },
                    fontWeight: Fonts.BOLD,
                    fontSize: 20,
                  }}
                >
                  <IntlMessages id="common.forgetPassword" />
                </Box>
                <Box sx={{ mb: 5, fontSize: 14 }}>
                  <Typography component="p">
                    <IntlMessages id="common.forgetPasswordTextOne" />
                  </Typography>
                  <Typography component="p">
                    <IntlMessages id="common.forgetPasswordTextTwo" />
                  </Typography>
                </Box>
                <Formik
                  validateOnChange={true}
                  initialValues={{
                    email: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    onSubmitForgetpassword(data)
                    setSubmitting(false);
                    // resetForm();
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                        <AppTextField
                          name="email"
                          label={<IntlMessages id="common.emailAddress" />}
                          sx={{
                            width: "100%",
                          }}
                          variant="outlined"
                        />
                      </Box>
                    
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={loading ? true : false}
                        sx={{
                          width: "100%",
                          height: 44,
                        }}
                        type="submit"
                      >
                        Send password
                      </Button>
                      <Box
                          sx={{
                            mb: { xs: 3, xl: 4 },
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { sm: "center" },
                          }}
                        >
                      <Box
                            component="span"
                            sx={{
                              cursor: "pointer",
                              ml: { xs: 0, sm: "auto" },
                              mt: { xs: 2, sm: 0, xl: 4 },
                              color: "primary.main",
                              fontWeight: Fonts.BOLD,
                              fontSize: 14,
                              mb: { xs: 3, xl: 4 }
                            }}
                            onClick={()=>goBack()}
                          >
                            <IntlMessages id="common.back" />
                          </Box>
                          </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    // </AppAnimate>
    }
</>   
  );
};

const mapStateToProps = (state: any) => {
  return{
      statuscode:state.auth.items,
      loading:state.auth.loading
  }
}
const mapDispatchToProps = (dispatch?:any) => {
  return {
  sendForgetPassword: (getValues:any) => dispatch ({ type: ActionTypes.FORGOTPASSWORD_REQUEST, value: getValues })
  }
  }

export default connect(mapStateToProps,mapDispatchToProps)(ForgetPasswordJwtAuth);
