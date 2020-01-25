import { createSlice } from "@reduxjs/toolkit";
import { User, authentication } from "../api/dexTestAPI";
import { AppThunk } from "../store";

import axios from "axios";

export type AuthStatusType = "request" | "success" | "failure";

interface UserState {
  isAuthenticated: boolean;
}

const initialState: UserState = {
  isAuthenticated: localStorage.getItem("cks_token") !== null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authFailure(state) {
      state.isAuthenticated = false;
    },

    authSuccess(state) {
      state.isAuthenticated = true;
    }
  }
});

export const { authFailure, authSuccess } = userSlice.actions;

export default userSlice.reducer;

type AuthType = "login" | "registration";

export const auth = (
  user: User,
  type: AuthType
): AppThunk => async dispatch => {
  try {
    const token = await authentication(user, type);

    //сохраняем для дальнейших запросов
    //https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
    axios.defaults.headers.common["X-API-Key"] = token.data;
    localStorage.setItem("cks_token", token.data);

    dispatch(authSuccess());
  } catch (err) {
    dispatch(authFailure());
  }
};

export const logout = (): AppThunk => async dispatch => {
  dispatch(authFailure());
};
