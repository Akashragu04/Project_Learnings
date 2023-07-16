import React from 'react'
import { TableCell, TableRow } from '@mui/material';

const PerinvoiceTableItems = (props?:any) => {
   
    // const getFieldData:any = {
    //     getFieldData:[
    //         {
    //             material_description:'',
    //             units:'',
    //             estimated_quantity:'',
    //             rate:'',
    //             amount:'',
    //             markup:''
    //         }
    //     ]
    // }
  return (
    <TableRow key={props.getKey}>
    <TableCell sx={{}}>{props.data.material_description}</TableCell>
    <TableCell sx={{}}>{props.data.units}</TableCell>
    <TableCell sx={{}}>{props.data.estimated_quantity}</TableCell>
    <TableCell sx={{}}>{props.data.rate}</TableCell>
    <TableCell sx={{}}>{props.data.amount}</TableCell>
    <TableCell sx={{}}>{props.data.markup}</TableCell>
    <TableCell sx={{}}>{props.data.amount}</TableCell>  
    <TableCell sx={{}}>{props.data.budget_available}</TableCell>
  </TableRow>

//     <Formik
//     validateOnChange
//     // innerRef={res => formikData = res}
//     initialValues={getFieldData}
//     // validationSchema={validationSchemaTest}
//     onSubmit={(values, { setSubmitting, resetForm }) => {
//         // let postValues: any = {
//         //     pre_id: getPerInvoiceId,
//         //     sla_id: props.getSLAInfo.id
//         // }
//         // props.onSubmitData(postValues)

//     }}>
//     {({ isSubmitting, values, errors, touched, setFieldValue, handleChange }) => {
//         return (
//             <Form
//                 style={{
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                 }}
//                 noValidate
//                 autoComplete="off"
//             >
//                 <Box sx={{ flexGrow: 1, width: '100%', marginTop: 8 }}>
//                     <Grid container rowSpacing={5} spacing={{ xs: 2, md: 8 }}  >
       
//                     </Grid>
//                 </Box>
//                 <Box sx={{ pt: 5, textAlign: "right", }} >

//                     <Button sx={{
//                         position: "relative",
//                         minWidth: 100,
//                         marginRight: 2
//                     }}
//                         variant="contained"
//                         color="inherit"
//                         type="button"
//                         onClick={() => {
//                             goBack()
//                         }}
//                     >  Cancel </Button>
//                     <Button sx={{
//                         position: "relative",
//                         minWidth: 100,
//                         marginRight: 2
//                     }}
//                         variant="contained"
//                         color="primary"
//                         type="submit"
//                     >  Submit </Button>
//                 </Box>
//             </Form>
//         )
//     }}
// </Formik>
  )
}

export default PerinvoiceTableItems;