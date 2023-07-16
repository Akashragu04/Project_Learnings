import * as yup from "yup";

export const bizCaseValidationSchema = yup.object({
    activeIoNumber: yup
    .string()
    .required(String('Please enter IO Number'))
    .min(3, "Please enter at least 3 characters"),
});