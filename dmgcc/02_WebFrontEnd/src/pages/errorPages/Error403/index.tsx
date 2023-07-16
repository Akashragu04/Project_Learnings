import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { Fonts } from "shared/constants/AppEnums";
import { initialUrl } from "shared/constants/AppConst";
// import AppAnimate from "@crema/core/AppAnimate";
import IntlMessages from "@crema/utility/IntlMessages";
import { ReactComponent as Logo } from "../../../assets/icon/403.svg";
import { useTheme } from "@mui/material";
import { useAuthMethod } from "@crema/utility/AuthHooks";
import { connect } from "react-redux";
import { checkNonCustomerValidationAction, resetCustomerValidationAction } from "saga/Actions";
import { AppConfirmDialog } from "@crema";

const Error403 = (props?: any) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuthMethod();
  const [isConfirmDialogOpen, setConfirmDialogOpen] = React.useState<boolean>(false);
  const { profileDetails, isCustomerValid } = props;

  React.useEffect(() => {
    props.initNewCustomerValidation();
    if (profileDetails && profileDetails.new_user) {
      setConfirmDialogOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (isCustomerValid && isCustomerValid.status) {
      props.initNewCustomerValidation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCustomerValid])

  const onGoBackToHome = () => {
    navigate(initialUrl);
    logout();
  };

  const onDenyAction = () => {
    setConfirmDialogOpen(false);
    logout();
  }

  const onConfirmAction = () => {
    setConfirmDialogOpen(false);
    props.checkNonCustomerValidation({})
  }


  return (
    // <AppAnimate animation="transition.slideUpIn" delay={200}>
    <React.Fragment>
      <Box
        sx={{
          py: { xl: 8 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            mb: { xs: 4, xl: 8 },
            width: "100%",
            maxWidth: { xs: 200, sm: 300, xl: 706 },
            "& svg": {
              width: "100%",
              maxWidth: 400,
            },
          }}
        >
          <Logo fill={theme.palette.primary.main} />
        </Box>
        <Box sx={{ mb: { xs: 4, xl: 5 } }}>
          <Box
            component="h3"
            sx={{
              mb: { xs: 3, xl: 4 },
              fontSize: { xs: 20, md: 24 },
              fontWeight: Fonts.MEDIUM,
            }}
          >
            Unauthorized
          </Box>
          <Box
            sx={{
              mb: { xs: 4, xl: 5 },
              color: grey[600],
              fontSize: 16,
              fontWeight: Fonts.MEDIUM,
            }}
          >
            <Typography>You are not authorized for this page</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontWeight: Fonts.MEDIUM,
              fontSize: 16,
              textTransform: "capitalize",
            }}
            onClick={onGoBackToHome}
          >
            <IntlMessages id="error.goBackToLogin" />
          </Button>
        </Box>
      </Box>
      <AppConfirmDialog
        open={isConfirmDialogOpen}
        onDeny={onDenyAction}
        onConfirm={onConfirmAction}
        title={'Are you sure you want to proceed with Customer Role?'}
        dialogTitle={'Confirm'}
      />
    </React.Fragment>
    // </AppAnimate>

  );
};

const mapStateToProps = (state: any) => ({
  loading: state.auth.loading,
  error: state.auth.errors,
  isCustomerValid: state.auth.isCustomerValid,
  userRoleType: state.auth.userRoleType,
  profileDetails: state.auth.profileDetails,
  isAuthenticated: state.auth.isAuthenticated,
  getUserDetails: state.auth.getUserDetails,
  accessToken: state.auth.accessToken
})

const mapDispatchToProps = (dispatch: any) => ({
  initNewCustomerValidation: () => {
    dispatch(resetCustomerValidationAction())
  },
  checkNonCustomerValidation: (data) => {
    dispatch(checkNonCustomerValidationAction(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Error403);
