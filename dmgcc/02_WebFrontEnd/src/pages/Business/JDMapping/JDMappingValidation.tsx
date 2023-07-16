import { formValidationPatten } from "services/Constants";
import * as yup from "yup";

export const jdMappingValidationSchema = yup.object({
    jd_assign: yup.array().of(
        yup.object().shape({
            jdlist: yup.string().matches(formValidationPatten.alphanumericTest, 'Invalid Data')
                .required(String("Please Select JD's")),
            quantity: yup.string().matches(formValidationPatten.onlynumber, 'Invalid Data')
                .required(String("Please enter the FTE"))
        })
    )
});