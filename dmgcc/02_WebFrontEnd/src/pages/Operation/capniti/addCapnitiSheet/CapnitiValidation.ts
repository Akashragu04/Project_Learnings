import * as yup from "yup";
import moment from 'moment';

export const schemaCapnitiValidation = yup.object().shape({ 
    start_time: yup
      .string()
      .required("Start Date is Required"),
      end_time: yup
      .string()
      .min(
        yup.ref("startDate"),
        "End date must be grater than start date"
      )
});