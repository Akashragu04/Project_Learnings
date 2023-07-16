import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import { ActionTypes } from "saga/sagas/Types";
import { useAuthMethod } from "@crema/utility/AuthHooks";

const LoginForm = (props?: any) => {
  const { logout } = useAuthMethod();

  useEffect(() => {
    if(props.errors){
      logout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.errors])

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
        justifyContent: "center"
      }}
    >
      <Card
        sx={{
          maxWidth: 1024,
          width: "100%",
          padding: 5,
          paddingLeft: { xs: 8, md: 2 },
          overflow: "hidden",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          backgroundColor: "#ffffffc9"
        }}
      >
        <Grid container rowSpacing={5} columnSpacing={{ xs: 4, md: 12 }}>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              textAlign: "center",
            }}
            padding={10}
            margin={10}
          >
            <div className="loader-spin">
              <span className="crema-dot crema-dot-spin">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </span>
            </div>
            <Typography variant='h4' sx={{ marginTop: 10 }} component='div'>Welcome to Daimler...</Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
    // </AppAnimate>
  );
};

const mapStateToProps = (state: any) => {
  return {
    statuscode: state.auth.items,
    loading: state.auth.loading,
    errors: state.auth.errors,
  }
}
const mapDispatchToProps = (dispatch?: any) => {
  return {
    getLogoutUser: () => dispatch({ type: ActionTypes.LOGOUT_REQUEST })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);