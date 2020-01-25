import * as yup from "yup";
import { requeredErrorMsg } from "./Constant";

const ItemCardSchema = yup.object().shape({
  name: yup
    .string()
    .max(100)
    .required(requeredErrorMsg),

  price: yup
    .number()
    .min(0, "0...9 000 000")
    .max(9000000, "0...9 000 000")
    .required(requeredErrorMsg),

  image: yup.string().required(requeredErrorMsg),

  description: yup.string().max(500)
});

export default ItemCardSchema;
