import * as yup from "yup";
import { useIntl } from "react-intl";


const LoginFormValidation = () => {
    const { messages } = useIntl();
    const validationSchema = yup.object({
        username: yup
          .string()
          .required(String(messages["validation.userNameRequired"])),
        password: yup
          .string()
          .required(String(messages["validation.passwordRequired"])),
      });
  return ({validationSchema})
}

export default LoginFormValidation;