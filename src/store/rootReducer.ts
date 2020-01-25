import { combineReducers } from "redux";
import { systemReducer } from "./system/reducers";
import { helperReducer } from "./helper/reducers";
import productsSlice from "../screen/productsSlice";
import propertiesSlice from "../screen/propertiesSlice";
import userSlice from "../screen/userSlice";

//https://redux.js.org/recipes/usage-with-typescript/
const rootReducer = combineReducers({
  system: systemReducer,
  helper: helperReducer,
  products: productsSlice,
  properties: propertiesSlice,
  user: userSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
