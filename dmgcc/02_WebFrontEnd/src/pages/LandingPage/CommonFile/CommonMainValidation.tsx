import * as yup from "yup";

export const  CommonMainValidationSchema = yup.object().shape({
    title: yup.string()    
    .required(String('Please enter the title'))
    .min(3, 'Please enter at least 3 characters'),
    description: yup.string()    
    .required(String('Please enter the description'))
    .min(3, 'Please enter at least 3 characters'),
 });