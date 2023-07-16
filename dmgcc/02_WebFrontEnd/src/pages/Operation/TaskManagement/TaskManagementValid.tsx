import * as yup from "yup";
import { formValidationSize, formValidationSizeMsg } from '../../../services/Constants';
import { taskNameValida } from "./Types";

export const taskValidationSchema = yup.object({
    project_code: yup
    .string()
    .required(String('Please Select project code')),
    sla: yup
    .string()
    .required(String('Please Select SLA')),   
    assigned_to: yup
    .string()
    .required(String('Please Select Assigned')),
    task_name: yup
    .string()
    .required(String(taskNameValida.taskName))
    // .matches(formValidationPatten.NamePattern, taskNameValida.invlidTaskName)
    .max(formValidationSize.nameMaxSize, formValidationSizeMsg.lengthfiftyMaxMsg)
    .min(formValidationSize.lengthMinMsg, formValidationSizeMsg.lengthMinMsg), 
});