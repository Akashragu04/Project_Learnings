import { commonValida, formValidationPatten } from "services/Constants";
import { appConstants, validationConstants } from "shared/constants/AppConst";
import * as yup from "yup";

export const addRequirementValidationSchema = yup.object({
    business_case_start_date: yup
        .date()
        .nullable()
        .required(String("Biz.Case Start Date is required")),
    business_case_end_date: yup
        .date()
        .nullable()
        .required(String("Biz.Case End Date is required")),
    currency: yup.string().required(String("Currency is required")),
    business_availability: yup.string().required(String("Existing Rate Card is required")),
    ratecard_type: yup.string().when(
        'business_availability', {
        is: 'without_rate',
        then: yup.string().required(String("Rate Card Type is required"))
    }),
    rate_card: yup.array().when(
        'business_availability', {
        is: 'with_rate',
        then: yup.array().min(1, "Rate Card is required")
    }),
    working_hours: yup.string()
    .matches(formValidationPatten.onlynumber, commonValida.commonmessage)
    .required(String("Working Hours is required")),
    // .typeError(appConstants.specifyNumber)    ,
    manpower_inflation: yup.string()
    .matches(formValidationPatten.onlynumber, commonValida.commonmessage)
    .required(String("Inflation is required"))
    .typeError(appConstants.specifyNumber),
    rate_card_inflation: yup.string().required(String("RateCard Inflation is required")).typeError(appConstants.specifyNumber)
    .matches(formValidationPatten.onlynumber, commonValida.commonmessage),
    it_info: yup.array().of(
        yup.object().shape({
            description: yup.string().min(validationConstants.minDescriptionLength, `Description should contain ${validationConstants.minDescriptionLength} characters`)
                .max(validationConstants.maxDescriptionLength, `Sorry You are exceeding the limit ${validationConstants.maxDescriptionLength}`),
            remark: yup.string().min(validationConstants.minDescriptionLength, `Remarks should contain ${validationConstants.minDescriptionLength} characters`)
                .max(validationConstants.maxDescriptionLength, `Sorry You are exceeding the limit ${validationConstants.maxDescriptionLength}`)
        })
    ),
    facility: yup.array().of(
        yup.object().shape({
            description: yup.string().min(validationConstants.minDescriptionLength, `Description should contain ${validationConstants.minDescriptionLength} characters`)
                .max(validationConstants.maxDescriptionLength, `Sorry You are exceeding the limit ${validationConstants.maxDescriptionLength}`),
            remark: yup.string().min(validationConstants.minDescriptionLength, `Remarks should contain ${validationConstants.minDescriptionLength} characters`)
                .max(validationConstants.maxDescriptionLength, `Sorry You are exceeding the limit ${validationConstants.maxDescriptionLength}`)
        })
    ),
    system_access: yup.array().of(
        yup.object().shape({
            description: yup.string().min(validationConstants.minDescriptionLength, `Description should contain ${validationConstants.minDescriptionLength} characters`)
                .max(validationConstants.maxDescriptionLength, `Sorry You are exceeding the limit ${validationConstants.maxDescriptionLength}`)
        })
    ),
    other_cost: yup.array().of(
        yup.object().shape({
            description: yup.string().min(validationConstants.minDescriptionLength, `Description should contain ${validationConstants.minDescriptionLength} characters`)
                .max(validationConstants.maxDescriptionLength, `Sorry You are exceeding the limit ${validationConstants.maxDescriptionLength}`)
        })
    ),
    thirdparty_service: yup.array().of(
        yup.object().shape({
            description: yup.string().min(validationConstants.minDescriptionLength, `Description should contain ${validationConstants.minDescriptionLength} characters`)
                .max(validationConstants.maxDescriptionLength, `Sorry You are exceeding the limit ${validationConstants.maxDescriptionLength}`)
        })
    ),
    thirdparty_cost: yup.array().of(
        yup.object().shape({
            description: yup.string().min(validationConstants.minDescriptionLength, `Description should contain ${validationConstants.minDescriptionLength} characters`)
                .max(validationConstants.maxDescriptionLength, `Sorry You are exceeding the limit ${validationConstants.maxDescriptionLength}`)
        })
    ),
    travel_cost: yup.array().of(
        yup.object().shape({
            description: yup.string().min(validationConstants.minDescriptionLength, `Description should contain ${validationConstants.minDescriptionLength} characters`)
                .max(validationConstants.maxDescriptionLength, `Sorry You are exceeding the limit ${validationConstants.maxDescriptionLength}`)
        })
    ),
    customer_expenses: yup.array().of(
        yup.object().shape({
            description: yup.string().min(validationConstants.minDescriptionLength, `Description should contain ${validationConstants.minDescriptionLength} characters`)
                .max(validationConstants.maxDescriptionLength, `Sorry You are exceeding the limit ${validationConstants.maxDescriptionLength}`),
            remark: yup.string().min(validationConstants.minDescriptionLength, `Remarks should contain ${validationConstants.minDescriptionLength} characters`)
                .max(validationConstants.maxDescriptionLength, `Sorry You are exceeding the limit ${validationConstants.maxDescriptionLength}`)
        })
    ),
});

export const viewBizCaseRequirementValidationSchema = yup.object({
    business_case_start_date: yup
        .date()
        .nullable()
        .required(String("Biz.Case Start Date is required")),
    business_case_end_date: yup
        .date()
        .nullable()
        .required(String("Biz.Case End Date is required")),
    man_power_inflation: yup.number().required(String("Inflation is required")).typeError(appConstants.specifyNumber),
    rate_card_inflation: yup.number().required(String("RateCard Inflation is required")).typeError(appConstants.specifyNumber),
});