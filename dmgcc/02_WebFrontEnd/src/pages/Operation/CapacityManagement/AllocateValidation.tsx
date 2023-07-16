import * as yup from "yup";
import { formValidationPatten, formValidationSize, formValidationSizeMsg } from '../../../services/Constants';
// import { taskNameValida } from "./Types";

export const capacityValidationSchema = yup.object({
    project_code: yup
    .string()
    .required(String('Please Select project code')),
    sla_code: yup
    .string()
    .required(String('Please Select SLA Code')),   
    capcity: yup
    .string()
    .required(String('Please enter capcity value'))
    .matches(formValidationPatten.numberPatten, 'Invalid Capcity')
    .max(formValidationSize.subjectNameMaxSize, formValidationSizeMsg.lengthfiftyMaxMsg)
    .min(formValidationSize.minLastName, formValidationSizeMsg.lengthOneMinMsg), 
});