import * as React from "react";
import "../product/ProductScreen.css";
import "../product/ProductAddScreen.css";
import "./PropertyAddScreen.css";
import { link } from "../../util/Constant";
import { Formik } from "formik";
import ItemPropertySchema from "../../component/form/validation/ItemPropertySchema";
import { useHistory } from "react-router";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useDispatch } from "react-redux";
import { Property, PropertyType } from "../../api/dexTestAPI";
import { addProperty } from "../propertiesSlice";

function PropertyAddScreen() {
  const dispatch = useDispatch();
  const history = useHistory();

  const submitAction = (property: Property) => {
    const promise: any = dispatch(addProperty(property));
    (promise as Promise<boolean>).then((result: boolean) => {
      result && history.push(link.listing);
    });
  };
  return (
    <div className="main-container">
      <div className="itemcard-container itemcardedit-container">
        <Formik
          initialValues={{
            name: "",
            type: "Dropdown"
          }}
          validationSchema={ItemPropertySchema}
          onSubmit={async values => {
            const property: Property = {
              id: null,
              name: values.name.trim(),
              type: values.type as PropertyType
            };

            submitAction(property);

            //выбираем из БД свойство с таким же наименованием
            /*axios(apiUrl + "/properties?name=" + values.name.trim()).then(
              result => {
                if (result.status === 200) {
                  if (result.data.length > 0) {
                    return;
                  }

                  //добавляем свойство
                  axios
                    .post(apiUrl + "/properties", {
                      id: new Date().getTime(),
                      name: values.name.trim(),
                      type: values.type
                    })
                    .then(function(response) {
                      console.log(response);
                      history.push(listingLink + "/property");
                    });
                }
              }
              );*/
          }}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue
            } = props;

            const radioHandleChange = (
              event: React.ChangeEvent<HTMLInputElement>
            ) => {
              setFieldValue("type", (event.target as HTMLInputElement).value);
            };

            return (
              <form onSubmit={handleSubmit} className="form-container">
                <div className="button-container">
                  <button
                    className="button cancel"
                    type="button"
                    onClick={(_: React.MouseEvent<HTMLButtonElement>) => {
                      history.push(link.listing);
                      //history.goBack();
                    }}
                  >
                    {"Вернуться"}
                  </button>

                  <button
                    className="button save"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {"Сохранить"}
                  </button>
                </div>

                <div className="fields">
                  <div className="title">
                    <p>{"Добавление свойства"}</p>
                  </div>
                  <label className="label" htmlFor="name">
                    {"Название свойства"}
                    <span>{"*"}</span>
                  </label>

                  <input
                    id="name"
                    placeholder="Цвет авто"
                    type="text"
                    maxLength={100}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.name && touched.name
                        ? "field field-error"
                        : "field"
                    }
                  />
                  {errors.name && touched.name && (
                    <div className="text-error">{errors.name}</div>
                  )}

                  <label className="label" htmlFor="type">
                    {"Укажите тип свойства"}
                    <span>{"*"}</span>
                  </label>

                  <RadioGroup
                    id="type"
                    value={values.type}
                    onChange={radioHandleChange}
                  >
                    <FormControlLabel
                      value="Dropdown"
                      control={<Radio />}
                      label="Dropdown"
                      className="radio-label"
                    />
                    <FormControlLabel
                      value="Number"
                      control={<Radio />}
                      className="radio-label"
                      label="Number"
                    />
                    <FormControlLabel
                      value="String"
                      control={<Radio />}
                      className="radio-label"
                      label="String"
                    />
                  </RadioGroup>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default PropertyAddScreen;
