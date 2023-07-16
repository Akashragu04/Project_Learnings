import { formValidationPatten, commonValida, formValidationSize, formValidationSizeMsg } from "services/Constants";
import * as yup from "yup";
import {ExternalResourceValida} from './Types';

export const ExternalResValidationSchema = yup.object({
    shortid: yup
    .string()
    .required(String(ExternalResourceValida.shortid))
    .matches(formValidationPatten.alphanumericTest, ExternalResourceValida.shortidPattenValid)
    .min(formValidationSize.lengthMinMsg, formValidationSizeMsg.lengthMinMsg)
    .max(formValidationSize.lengthMaxMsg, formValidationSizeMsg.lengthMaxMsg), 
    hrid: yup
    .string()
    .required(String(ExternalResourceValida.hrid))
    .matches(formValidationPatten.alphanumericTest, ExternalResourceValida.hridPattenValid)
    .min(formValidationSize.lengthMinMsg, formValidationSizeMsg.lengthMinMsg)
    .max(formValidationSize.lengthMaxMsg, formValidationSizeMsg.lengthMaxMsg),  
    emp_name: yup
    .string()
    .required(String(ExternalResourceValida.emp_name))
    .matches(formValidationPatten.NamePattern, ExternalResourceValida.empNamePattenValid)
    .min(formValidationSize.lengthMinMsg, formValidationSizeMsg.lengthMinMsg)
    .max(formValidationSize.lengthMaxMsg, formValidationSizeMsg.lengthMaxMsg), 
    email: yup
    .string()
    .required(String(commonValida.commonEmail))
    .matches(formValidationPatten.emailPatten, commonValida.invalidemailid), 
});