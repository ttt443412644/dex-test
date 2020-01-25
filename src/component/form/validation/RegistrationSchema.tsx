import * as Yup from "yup";
import {
  emailRegExpString,
  passwordRegExpString,
  passwordErrorMsg,
  requeredErrorMsg
} from "./Constant";

const BasicFormSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      new RegExp("^[A-Za-zА-Яа-яёЁ ]{3,100}$"),
      "Символы русского или латинского алфавита"
    )
    .required(requeredErrorMsg),

  surname: Yup.string()
    .matches(
      new RegExp("^[A-Za-zА-Яа-яёЁ]{3,100}$"),
      "Символы русского или латинского алфавита"
    )
    .required(requeredErrorMsg),

  email: Yup.string()
    .matches(new RegExp(emailRegExpString), "alex@example.com")
    .required(requeredErrorMsg),

  password: Yup.string()
    .matches(new RegExp(passwordRegExpString), passwordErrorMsg)
    .required(requeredErrorMsg),

  passwordconfirm: Yup.string()
    .matches(new RegExp(passwordRegExpString), passwordErrorMsg)
    .required(requeredErrorMsg)
    .test("passwords-match", "Пароль не совпадает", function(value) {
      return this.parent.password === value;
    })
});
export default BasicFormSchema;
