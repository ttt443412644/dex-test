import * as yup from "yup";
import {
  emailRegExpString,
  passwordRegExpString,
  passwordErrorMsg,
  requeredErrorMsg
} from "./Constant";

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(new RegExp(emailRegExpString), "alex@example.com")
    .required(requeredErrorMsg),

  password: yup
    .string()
    .matches(new RegExp(passwordRegExpString), passwordErrorMsg)
    .required(requeredErrorMsg)
});

export default LoginSchema;
