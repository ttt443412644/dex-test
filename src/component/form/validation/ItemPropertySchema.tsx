import * as yup from "yup";
import { requeredErrorMsg } from "./Constant";

const ItemPropertySchema = yup.object().shape({
  name: yup
    .string()
    .max(100)
    .required(requeredErrorMsg),

  type: yup.string().required(requeredErrorMsg)
});

export default ItemPropertySchema;
