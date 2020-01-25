import * as React from "react";
import "./LoginScreen.css";
import { Formik } from "formik";
import BasicFormSchema from "../../component/form/validation/RegistrationSchema";
import eye from "./Eye.svg";
import { changeInputElementType } from "./LoginScreen";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { link } from "../../util/Constant";
import { User } from "../../api/dexTestAPI";
import { auth } from "../userSlice";

function RegistrationScreen() {
  const dispatch = useDispatch();

  return (
    <div className="main-container">
      <div className="main-login-container">
        <main className="login-container">
          <p className="title">{"Регистрация"}</p>

          <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              password: "",
              passwordconfirm: ""
            }}
            validationSchema={BasicFormSchema}
            onSubmit={async values => {
              if (values.password !== values.passwordconfirm) {
                return;
              }
              const user: User = {
                email: values.email,
                password: values.password,
                name: values.name,
                surname: values.surname
              };
              dispatch(auth(user, "registration"));
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
                handleSubmit
              } = props;

              return (
                <form className="form-container" onSubmit={handleSubmit}>
                  <label className="label" htmlFor="name">
                    {"Имя"}
                  </label>
                  <input
                    id="name"
                    placeholder="Введите имя"
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

                  <label className="label" htmlFor="surname">
                    {"Фамилия"}
                  </label>
                  <input
                    id="surname"
                    placeholder="Введите фамилию"
                    type="text"
                    maxLength={100}
                    value={values.surname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.surname && touched.surname
                        ? "field field-error"
                        : "field"
                    }
                  />

                  {errors.surname && touched.surname && (
                    <div className="text-error">{errors.surname}</div>
                  )}

                  <label className="label" htmlFor="email">
                    {"E-mail"}
                  </label>
                  <input
                    id="email"
                    placeholder="Введите E-mail"
                    type="text"
                    maxLength={100}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email
                        ? "field field-error"
                        : "field"
                    }
                  />

                  {errors.email && touched.email && (
                    <div className="text-error">{errors.email}</div>
                  )}

                  <label className="label" htmlFor="password">
                    {"Пароль"}
                  </label>
                  <div className="password-container">
                    <input
                      id="password"
                      placeholder="Введите пароль"
                      type="password"
                      maxLength={100}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? "field field-error"
                          : "field"
                      }
                    />

                    <img
                      src={eye}
                      className="eye"
                      alt="password"
                      onMouseDown={_ => {
                        changeInputElementType("password", "text");
                      }}
                      onMouseLeave={_ => {
                        changeInputElementType("password", "password");
                      }}
                      onMouseUp={_ => {
                        changeInputElementType("password", "password");
                      }}
                    />
                  </div>

                  {errors.password && touched.password && (
                    <div className="text-error">{errors.password}</div>
                  )}

                  <label className="label" htmlFor="passwordconfirm">
                    {"Повторите пароль"}
                  </label>
                  <div className="password-container">
                    <input
                      id="passwordconfirm"
                      placeholder="Повторите пароль"
                      type="password"
                      maxLength={100}
                      value={values.passwordconfirm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.passwordconfirm && touched.passwordconfirm
                          ? "field field-error"
                          : "field"
                      }
                    />

                    <img
                      src={eye}
                      className="eye"
                      alt="password"
                      onMouseDown={_ => {
                        changeInputElementType("passwordconfirm", "text");
                      }}
                      onMouseLeave={_ => {
                        changeInputElementType("passwordconfirm", "password");
                      }}
                      onMouseUp={_ => {
                        changeInputElementType("passwordconfirm", "password");
                      }}
                    />
                  </div>

                  {errors.passwordconfirm && touched.passwordconfirm && (
                    <div className="text-error">{errors.passwordconfirm}</div>
                  )}

                  <div className="button-container">
                    <button
                      className="button reg-button"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {"Зарегистрироваться"}
                    </button>
                  </div>

                  <div className="button-container">
                    <Link to={link.login}>{"Вернуться"}</Link>
                  </div>
                </form>
              );
            }}
          </Formik>
        </main>
      </div>
    </div>
  );
}

export default RegistrationScreen;
