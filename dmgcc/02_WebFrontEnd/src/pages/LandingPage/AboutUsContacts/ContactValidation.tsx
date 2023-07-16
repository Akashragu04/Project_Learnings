import * as yup from "yup";

export const contactValidationSchema = yup.object().shape({
    name: yup.string()
        .required(String('Please enter the name'))
        .min(3, 'Please enter at least 3 characters'),
        
        department: yup.string()
        .required(String('Please enter the department'))
        .min(3, 'Please enter at least 3 characters'),
        email: yup.string()
        .required(String('Please enter the email')),
        mobileno: yup.string()
        .required(String('Please enter the mobileno')),
});