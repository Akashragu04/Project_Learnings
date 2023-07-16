
import { leadValida } from "pages/Business/LeadsMonitoring/LeadsForm/Types";
import { formValidationSize } from "services/Constants";
import * as yup from "yup";

export const commonValidationSchema = yup.object({
    title: yup
    .string()
    .required(String("Please enter the title"))
    .min(formValidationSize.lengthMinMsg, leadValida.receiverEntityCharacters2),    
    description: yup
    .string()
    .required(String("Please enter the description"))
    .min(formValidationSize.lengthMinMsg, leadValida.receiverEntityCharacters2),    
});