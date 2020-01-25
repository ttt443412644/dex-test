import * as React from "react";
import "./App.css";
import LoginScreen from "./screen/login/LoginScreen";
import RegistrationScreen from "./screen/login/RegistrationScreen";
import ListingScreen from "./screen/listing/ListingScreen";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps
} from "react-router-dom";
import ProductScreen from "./screen/product/ProductScreen";
import ProductAddScreen from "./screen/product/ProductAddScreen";
import PropertyAddScreen from "./screen/property/PropertyAddScreen";
import { link } from "./util/Constant";
import Dialog from "./component/dialog/Dialog";
import { clearNotify, sendNotify } from "./store/helper/actions";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "./store/rootReducer";
import NotifyDialog from "./component/dialog/NotifyDialog";
import axios from "axios";
import { logout } from "./screen/userSlice";

const App: React.FC = () => {
  const token = localStorage.getItem("cks_token");
  console.log("token =" + token);
  if (token) {
    axios.defaults.headers.common["X-API-Key"] = token;
  }

  return <AnimationApp />;
};

function AnimationApp() {
  const dispatch = useDispatch();

  const { notification, isAuth } = useSelector((state: RootState) => {
    return {
      notification: state.helper.notification,
      isAuth: state.user.isAuthenticated
    };
  }, shallowEqual);

  //отлавливаем ошибки
  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log(error);
      if (error.response.status === 401) {
        dispatch(logout());
        dispatch(
          sendNotify({
            text: "Ошибка авторизации! Обновите страницу и повторите попытку!",
            type: "dialog"
          })
        );
      }
      if (error.response.status === 402) {
        dispatch(logout());
        dispatch(
          sendNotify({
            text: "Неверные логин и/или пароль!",
            type: "dialog"
          })
        );
      }
      if (error.response.status === 403) {
        dispatch(logout());
        dispatch(
          sendNotify({
            text: "Пользователь с таким email уже существует! ",
            type: "dialog"
          })
        );
      }
      return error;
    }
  );

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={link.login}>
            {isAuth ? <Redirect to={link.listing} /> : <LoginScreen />}
          </Route>

          <Route exact path={link.registration}>
            {isAuth ? <Redirect to={link.listing} /> : <RegistrationScreen />}
          </Route>

          <Route exact path="/">
            <Redirect to={link.listing} />
          </Route>

          <PrivateRoute path={link.listing} isAuth={isAuth}>
            <ListingScreen />
          </PrivateRoute>

          <PrivateRoute exact path={link.productAdd} isAuth={isAuth}>
            <ProductAddScreen />
          </PrivateRoute>

          <PrivateRoute exact path={link.productEdit + "/:id"} isAuth={isAuth}>
            <ProductAddScreen />
          </PrivateRoute>

          <Route exact path={link.product + "/:id"} isAuth={isAuth}>
            <ProductScreen />
          </Route>
          <PrivateRoute exact path={link.propertyAdd} isAuth={isAuth}>
            <PropertyAddScreen />
          </PrivateRoute>

          <Route component={PageNotfound} />
        </Switch>

        <NotifyDialog
          content={notification !== null ? notification.text : ""}
          open={notification !== null && notification.type === "notification"}
          handleClose={(_: React.SyntheticEvent, reason?: string) => {
            if (reason === "clickaway") {
              return;
            }
            dispatch(clearNotify());
          }}
        />

        <Dialog
          title="Ошибка"
          content={notification !== null ? notification.text : ""}
          open={notification !== null && notification.type === "dialog"}
          handleClose={() => {
            dispatch(clearNotify());
          }}
        />
      </div>
    </BrowserRouter>
  );
}

interface PrivateRouteProps extends RouteProps {
  children?: any;
  isAuth: boolean;
}

function PageNotfound() {
  return <div>404</div>;
}

function PrivateRoute(props: PrivateRouteProps) {
  const { isAuth, children, ...rest } = props;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: link.login,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
