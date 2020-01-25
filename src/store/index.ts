import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import rootReducer, { RootState } from "./rootReducer";

const store = configureStore({
  reducer: rootReducer
});

//export type AppDispatch = typeof store.dispatch;
export default store;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  Action<string>
>;

