import React from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { Form, Formik } from "formik";
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Input } from "@mui/material";

const AssignBusinessCase = (props?: any) => {
  let formikData: any;

  const handleShortIdChange = (event) => {
    if (props.businessGridData.getUserDateList && props.businessGridData.getUserDateList !== null) {
      props.businessGridData.getUserDateList.forEach((items: any, i: any) => {
        if (items.shortid === event.target.value) {
          formikData.setFieldValue('service_provider_contact_name', items.emp_name)
          formikData.setFieldValue('service_provider_email_id', items.email)
          formikData.setFieldValue('service_provider_department', items.department)
          formikData.setFieldValue('service_provider_cost_center', items.cost_center)
          formikData.setFieldValue('user_id', items.id)
        }
      })
    }
  };
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
      open={props.assignEnable}
      onClose={() => props.setAssignEnable(false)}
      title={"Assign service provider"}
    >
      <Formik
        innerRef={res => formikData = res}
        initialValues={{
          service_provider_short_id: "",
          service_provider_email_id: "",
          service_provider_contact_name: "",
          service_provider_department: "",
          service_provider_cost_center: "",
          user_id: ""
        }}
        validationSchema={props.assignValidationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          props.putAssignEnable(false);
          props.putAssignData(data, props.putAssignId)
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
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
              <FormControl variant='standard' sx={{ m: 1, width: '100%' }}>
                <InputLabel id='service_provider_short_id'>Short ID</InputLabel>
                <Select
                  labelId='service_provider_short_id'
                  id='service_provider_short_id'
                  name="service_provider_short_id"
                  value={values.service_provider_short_id}
                  onChange={(e: any) => {
                    setFieldValue('service_provider_short_id', e.target.value)
                    handleShortIdChange(e);
                  }}
                  label='Short Id'
                >
                  {/* {props.businessGridData.getUserDateList && props.businessGridData.getUserDateList !== null ?
                    props.businessGridData.getUserDateList.map((items: any, index: any) =>
                      <MenuItem value={items.shortid} key={index}>{items.shortid}</MenuItem>)
                    : null} */}
                  {props.getCustomerandBusiness && props.getCustomerandBusiness !== null ?
                    props.getCustomerandBusiness.business.map((items: any, index: any) => <MenuItem value={items.shortid} key={index}>{items.shortid}</MenuItem>)
                    : null}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flexGrow: 1, width: '100%', marginTop: 4, display: "none" }}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="user_id">User Id</InputLabel>
                <Input id="user_id" name="user_id" value={values.user_id} />
              </FormControl>
            </Box>

            <Box sx={{ flexGrow: 1, width: '100%', marginTop: 4 }}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="service_provider_contact_name">Name</InputLabel>
                <Input id="service_provider_contact_name" name="service_provider_contact_name" value={values.service_provider_contact_name} disabled />
              </FormControl>
            </Box>

            <Box sx={{ flexGrow: 1, width: '100%', marginTop: 4 }}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="service_provider_email_id">Email</InputLabel>
                <Input id="service_provider_email_id" name="service_provider_email_id" value={values.service_provider_email_id} disabled />
              </FormControl>
            </Box>

            <Box sx={{ flexGrow: 1, width: '100%', marginTop: 4 }}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="service_provider_department">Department</InputLabel>
                <Input id="service_provider_department" name="service_provider_department" value={values.service_provider_department} disabled />
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


export default AssignBusinessCase;