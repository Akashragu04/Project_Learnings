import React, { useState } from 'react'
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { Grid, TextField, FormControl, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { RoutePermittedRole } from 'shared/constants/AppConst';

const ViewProjectSLADetails = (props?: any) => {
  const [getCapacityField, setCapacityField] = useState(null)
 
  React.useEffect(() => {
    CapacityFieldData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const CapacityFieldData = () => {
    if (props.getCapacityUpdate) {
      const capacityField: any = {
        id: props.getCapacityUpdate.id,
        project_name: props.getCapacityUpdate.project_name,
        projectid: props.getCapacityUpdate.projectid,
        slaid: props.getCapacityUpdate.slaid,
        sla_name: props.getCapacityUpdate.sla_name,
        userid: props.getCapacityUpdate.userid,
        hrid: props.getCapacityUpdate.hrid,
        resource_name: props.getCapacityUpdate.resource_name,
        resource_email: props.getCapacityUpdate.resource_email,
        resource_shortid: props.getCapacityUpdate.resource_shortid,
        capcity: props.getCapacityUpdate.capcity,
        level: props.getCapacityUpdate.level
      }
      setCapacityField(capacityField)
    }

  }
  const goBack = () => {
    props.closeDialogBox()
  }
  return (
    <AppDialog
      sxStyle={{
        "& .MuiDialog-paperWidthSm": {
          maxWidth: 800,
          width: "100%",
        },
        "& .MuiTypography-h6": {
          fontWeight: Fonts.SEMI_BOLD,
          backgroundColor: "#00677F",
          color: "#ffffff"
        },
      }}
      dividers
      open={props.openSLADetails}
      onClose={() => props.closeDialogBox()}
      title={"Allocate Capacity"}
    >
      {getCapacityField?
       <Formik
       validateOnChange
       // innerRef={res => formikData = res}
       initialValues={getCapacityField}
       // validationSchema={schemaCapnitiValidation}
       onSubmit={(values, { setSubmitting, resetForm }) => {
         props.reqUpdateAllocateResourceData(values)
         props.closeDialogBox()
       }}>
       {({ isSubmitting, values, errors, touched, setFieldValue, handleChange }) => {
         const formFieldValues:any = values;
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
             <Grid container rowSpacing={5} columnSpacing={{ xs: 4, md: 12 }}>
               <Grid item xs={12} md={4}>
                 <FormControl variant="outlined" fullWidth margin='dense'>
                   <TextField
                     placeholder="User Id"
                     variant='outlined'
                     label="User Id"
                     id='userid'
                     value={formFieldValues.userid}
                     disabled
                   />
                 </FormControl>
               </Grid>
               <Grid item xs={12} md={4}>
                 <FormControl variant="outlined" fullWidth margin='dense'>
                   <TextField
                     placeholder="HR Id"
                     variant='outlined'
                     label="HR Id"
                     id='hrid'
                     value={formFieldValues.hrid?formFieldValues.hrid:null}
                     disabled
                   />
                 </FormControl>
               </Grid>
               <Grid item xs={12} md={4}>
                 <FormControl variant="outlined" fullWidth margin='dense'>
                   <TextField
                     placeholder="Project Name"
                     variant='outlined'
                     label="Project Name"
                     id='project_name'
                     value={formFieldValues.project_name}
                     disabled
                   />

                 </FormControl>
               </Grid>
               <Grid item xs={12} md={4}>
                 <FormControl variant="outlined" fullWidth margin='dense'>
                   <TextField
                     placeholder="project Code"
                     variant='outlined'
                     label="Project Code"
                     id='projectid'
                     value={formFieldValues.projectid}
                     disabled
                   />
                 </FormControl>
               </Grid>
               <Grid item xs={12} md={4}>
                 <FormControl variant="outlined" fullWidth margin='dense'>
                   <TextField
                     placeholder="Email"
                     variant='outlined'
                     label="Email"
                     id='resource_email'
                     value={formFieldValues.resource_email}
                     disabled
                   />
                 </FormControl>
               </Grid>
               <Grid item xs={12} md={4}>
                 <FormControl variant="outlined" fullWidth margin='dense'>
                   <TextField
                     placeholder="Name"
                     variant='outlined'
                     label="Name"
                     id='resource_name'
                     value={formFieldValues.resource_name}
                     disabled
                   />
                 </FormControl>
               </Grid>
               <Grid item xs={12} md={4}>
                 <FormControl variant="outlined" fullWidth margin='dense'>
                   <TextField
                     placeholder="SLA Id"
                     variant='outlined'
                     label="SLA Id"
                     id='sla_name'
                     value={formFieldValues.sla_name}
                     disabled
                   />
                 </FormControl>
               </Grid>
               <Grid item xs={12} md={4}>
                 <FormControl variant="outlined" fullWidth margin='dense'>
                   <TextField
                     placeholder="Level"
                     variant='outlined'
                     label="Level"
                     id='level'
                     value={formFieldValues.level}
                     disabled
                   />
                 </FormControl>
               </Grid>
               <Grid item xs={12} md={4}>
                 <FormControl variant="outlined" fullWidth margin='dense'>
                   <TextField
                     placeholder="Capcity"
                     variant='outlined'
                     label="Capcity"
                     id='capcity'
                     value={formFieldValues.capcity}
                    onChange={handleChange}
                    type="number"
                    disabled={RoutePermittedRole.Business === props.useInfo.roles?false:true}
                   />
                 </FormControl>
               </Grid>
               <Grid item xs={12} md={12} sx={{ paddingTop: 0 }}>
                 <Box sx={{ pt: 1, paddingBottom:2, textAlign: "right", }} >

                   <Button sx={{
                     position: "relative",
                     minWidth: 100,
                     marginRight: 2
                   }}
                     variant="contained" color="inherit" type="button"
                     onClick={() => {
                       goBack()
                     }}
                   >  Cancel </Button>
                   <Button sx={{
                     position: "relative",
                     minWidth: 100,
                     marginRight: 2,
                   }}
                     variant="contained" color="primary" type="submit" disabled={RoutePermittedRole.Business === props.useInfo.roles?false:true}>  Submit </Button>
                 </Box>
               </Grid>

             </Grid>
           </Form>)
       }}
     </Formik>
      :null}
     

    </AppDialog>
  )
}

export default ViewProjectSLADetails;