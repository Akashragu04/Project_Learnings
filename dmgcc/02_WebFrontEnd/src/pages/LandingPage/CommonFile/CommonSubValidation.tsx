import * as yup from "yup";

export const  CommonSubValidationSchema = yup.object().shape({ 
    title: yup.string()    
    .required(String('Please enter the title'))
    .min(3, 'Please enter at least 3 characters'),
    sub_list: yup.array().of(
        yup.object().shape({
            content: yup.string()
            .required('Please enter the content')
            .min(3, 'Please enter at least 3 characters'),
            })
        )
 });