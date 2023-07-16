
import * as yup from "yup";
import { formValidationSize, commonValida, formValidationPatten } from '../../../../services/Constants';
import { leadValida } from './Types';

export const leadsValidationSchema = yup.object({
  receiver_short_id: yup
    .string()
    .required(String(leadValida.receiverShort)),
  receiver_email_id: yup.string()
    .email(commonValida.invalidemailid)
    .required(commonValida.commonEmail)
    .matches(formValidationPatten.emailPatten, commonValida.invalidemailid),
  receiver_contact_name: yup
    .string()
    .required(String(leadValida.receiverContactName)),
  receiver_entity: yup
    .string()
    .required(String(leadValida.receiverEntity))
    .min(formValidationSize.lengthMinMsg, leadValida.receiverEntityCharacters2)
    .max(formValidationSize.lengthMaxMsg, leadValida.receiverEntityCharacters150),
  project_name: yup
    .string()
    .required(String(leadValida.projectName))
    .min(formValidationSize.lengthMinMsg, leadValida.projectNameCharacters2)
    .max(formValidationSize.lengthMaxMsg, leadValida.projectNameCharacters150),
  short_description: yup
    .string()
    .min(formValidationSize.lengthMinMsg, leadValida.lengthMinMsg)
    .max(formValidationSize.lengthMaxMsg, leadValida.lengthMaxMsg)
});