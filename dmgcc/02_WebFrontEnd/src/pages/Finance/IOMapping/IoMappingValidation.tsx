import { formValidationPatten } from "services/Constants";
import * as yup from "yup";

export const  validationSchemaIONumber = yup.object().shape({
    ionumbermapped: yup.array().of(
        yup.object().shape({
            order_id: yup.string()
            .matches(formValidationPatten.alphanumericTest, 'Please enter valid IO Number')
            .required('Please enter the IO Number')
            .min(3, 'Please enter at least 3 characters')
            .max(150, "should not be more than 30 characters"),
            year: yup.string()
            .required('Please select year')
            })
        )
 });