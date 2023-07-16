import * as Yup from "yup";

export const schemaTimesheet: any = Yup.object().shape({
    start_time: Yup.date()    
    .required(String('Please Select Start Time')),
    end_time: Yup.date().min(
        Yup.ref('start_time'),
        "end date can't be before start date"
      )      
      .required(String('Please Select End Time')),
    sla: Yup
        .string()
        .required(String('Please Select SLA'))
}); 