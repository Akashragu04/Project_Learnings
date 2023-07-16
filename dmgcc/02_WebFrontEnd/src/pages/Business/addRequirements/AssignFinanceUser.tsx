import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { Form, Formik } from "formik";
import { Box, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { connect } from 'react-redux';

const AssignFinanceUser = (props?: any) => {
  // let formikRef: any;
  // const [financeUserData, setFinanceUserData] = React.useState<any>(null);

  return (
    <AppDialog
      sxStyle={{
        "& .MuiDialog-paperWidthSm": {
          maxWidth: 600,
          width: "100%",
        },
        "& .MuiTypography-h6": {
          fontWeight: Fonts.SEMI_BOLD,
          backgroundColor: "#00677F",
          color: "#ffffff"
        },
      }}
      dividers
      open={props.show}
      onClose={() => props.setAssignFinanceRole(false)}
      title={"Assign Finance User"}
    >
      <Formik
        // innerRef={res => formikRef = res}
        initialValues={{
          service_provider_short_id: ''
        }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          if(data) {
            props.submitFinanceData(data.service_provider_short_id)
            props.setAssignFinanceRole(false)
          }
        }}
      >
        {({ values, setFieldValue, handleChange }) => (
          <Form
            style={{ width: "100%", display: "flex", flexDirection: "column", }}
            noValidate
            autoComplete="off"
          >
            <Box sx={{ flexGrow: 1, width: '100%' }}>
              <FormControl variant='standard' sx={{ m: 1, width: '100%' }}>
                <InputLabel id='service_provider_short_id'>Short ID</InputLabel>
                <Select
                  labelId='service_provider_short_id'
                  id='service_provider_short_id'
                  name="service_provider_short_id"
                  value={values.service_provider_short_id}
                  onChange={handleChange}
                  label='Choose Finance User'
                >
                  <MenuItem value={''}>Please Select</MenuItem>
                  {(props.financeUsersList.length) && props.financeUsersList.map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option}>{option.shortid}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                pt: 3,
                textAlign: "right",
              }}
            >
              <Button
                sx={{
                  position: "relative",
                  minWidth: 100,
                }}
                variant="outlined"
                color="primary"
                type="submit"
              >
                Assign
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </AppDialog>
  )
}


const mapStateToProps = (state: any) => ({
  // loading: state.businessRequirement.loading,
  // isLoading: state.businessRequirement.isLoading,
  // error: state.businessRequirement.errors,
})

const mapDispatchToProps = (dispatch: any) => ({
  // initBizRequirement: () => {
  //   dispatch(initBizRequirementAction())
  // },
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignFinanceUser);