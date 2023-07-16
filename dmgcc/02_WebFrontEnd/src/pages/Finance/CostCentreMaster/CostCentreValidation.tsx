import * as yup from "yup";
import { formValidationPatten } from '../../../services/Constants';

export const  validationSchemaTest = yup.object().shape({
    teams: yup.array().of(
        yup.object().shape({
            costcenter: yup.string()
            .matches(formValidationPatten.alphanumericTest, 'Please enter valid Cost Centre')
            .required('Please enter the Cost Centre')
            .min(3, 'Please enter at least 3 characters')
            .max(150, "should not be more than 30 characters"),
            team: yup.string()
            .required('Please enter the Team')
            .min(3, 'Please enter at least 3 characters')
            .max(150, "should not be more than 30 characters"),
            team_group: yup.string()
            .required('Please enter the Department')
            })
        )
 });