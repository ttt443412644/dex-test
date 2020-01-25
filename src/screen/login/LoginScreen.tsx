import * as React from "react";
import "./LoginScreen.css";
import { Formik } from "formik";
import LoginSchema from "../../component/form/validation/LoginSchema";
import eye from "./Eye.svg";
import { link } from "../../util/Constant";
import { Link } from "react-router-dom";
import { User } from "../../api/dexTestAPI";
import { auth } from "../userSlice";
import { useDispatch } from "react-redux";

export function changeInputElementType(id: string, type: string) {
  (document.getElementById(id) as HTMLInputElement).type = type;
}

function LoginScreen() {
  const dispatch = useDispatch();

  return (
    <div className="main-container">
      <div className="main-login-container">
        <main className="login-container">
          <p className="title">Вход</p>

          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            validationSchema={LoginSchema}
            onSubmit={async values => {
              const user: User = {
                email: values.email,
                password: values.password
              };
              dispatch(auth(user, "login"));
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
                <form onSubmit={handleSubmit} className="form-container">
                  <label className="label" htmlFor="email">
                    {"E-mail"}
                  </label>

                  <input
                    id="email"
                    placeholder="alex@example.com"
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className={
                        errors.password && touched.password
                          ? "field field-error"
                          : "field "
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

                  <div className="button-container">
                    <button
                      className="button"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {"Войти"}
                    </button>
                  </div>

                  <div className="button-container">
                    <Link to={link.registration}>{"Зарегистрироваться"}</Link>
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

export default LoginScreen;
