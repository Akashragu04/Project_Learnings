import { formValidationPatten } from "services/Constants";
import { validationConstants } from "shared/constants/AppConst";
import * as yup from "yup";

export const jdCreateValidationSchema = yup.object({
    jd_information: yup.array().of(
        yup.object().shape({
            jd_code: yup.string().matches(formValidationPatten.alphanumericTest, 'Only Alphanumeric accepted')
                .required(String("Please enter the JD Code"))
                .min(validationConstants.minStringLength, `JD Code should contain ${validationConstants.minStringLength} characters`)
                .max(validationConstants.maxStringLength, `Sorry You are exceeding the limit ${validationConstants.maxStringLength}`),
            jd_role: yup.string().matches(formValidationPatten.alphanumericTest, 'Only Alphanumeric accepted')
                .required(String("Please enter the JD Role"))
                .min(validationConstants.minStringLength, `JD Role should contain ${validationConstants.minStringLength} characters`)
                .max(validationConstants.maxStringLength, `Sorry You are exceeding the limit ${validationConstants.maxStringLength}`),
            position_code: yup.string().matches(formValidationPatten.alphanumericTest, 'Only Alphanumeric accepted')
                .required(String("Please enter the Position Code (Tolio)"))
                .min(validationConstants.minStringLength, `Position Code should contain ${validationConstants.minStringLength} characters`)
                .max(validationConstants.maxStringLength, `Sorry You are exceeding the limit ${validationConstants.maxStringLength}`)
        })
    )
});

export const jdMappingValidationSchema = yup.object({
    jd_assign: yup.array().of(
        yup.object().shape({
            remarks: yup.string().matches(formValidationPatten.alphanumericTest, 'Only Alphanumeric accepted')
                .min(validationConstants.minDescriptionLength, `Position Code should contain ${validationConstants.minDescriptionLength} characters`)
                .max(validationConstants.maxDescriptionLength, `Sorry You are exceeding the limit ${validationConstants.maxDescriptionLength}`)
        })
    )
});

export const provisionFilterValidationSchema = yup.object({
    costcenter: yup.string().nullable().required(String("Costcenter is required")),
    year: yup.string().nullable().required(String("Year is required")),
    month: yup.string().nullable().required(String("Month is required"))
});
