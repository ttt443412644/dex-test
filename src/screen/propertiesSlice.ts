import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Property,
  getProperties,
  delProperties,
  insertProperty
} from "../api/dexTestAPI";
import { AppThunk } from "../store";
import { sendNotify, setTabIndex } from "../store/helper/actions";

interface PropertiesState {
  properties: Property[];
  loading: boolean;
  fetchIndex: number;
}

interface PropertiesLoaded {
  properties: Property[];
}

const initialState: PropertiesState = {
  properties: [],
  loading: false,
  fetchIndex: 0
};

const properties = createSlice({
  name: "properties",
  initialState,
  reducers: {
    getPropertiesStart(state) {
      state.loading = true;
    },
    getPropertiesSuccess(state, action: PayloadAction<PropertiesLoaded>) {
      const { properties } = action.payload;
      state.properties = properties;
      state.loading = false;
    },
    getPropertiesFailure(state) {
      state.loading = false;
    },

    deletePropertiesSuccess(state) {
      state.fetchIndex = state.fetchIndex + 1;
    },

    addPropertySuccess(state) {
      state.fetchIndex = state.fetchIndex + 1;
    }
  }
});

export const {
  getPropertiesStart,
  getPropertiesSuccess,
  getPropertiesFailure,

  deletePropertiesSuccess,
  addPropertySuccess
} = properties.actions;

export default properties.reducer;

export const fetchProperties = (): AppThunk => async dispatch => {
  try {
    dispatch(getPropertiesStart());
    const properties = await getProperties();
    dispatch(getPropertiesSuccess(properties));
  } catch (err) {
    dispatch(getPropertiesFailure());

    dispatch(
      sendNotify({
        text: "Ошибка при получении списка проперти! " + err.toString(),
        type: "dialog"
      })
    );
  }
};

export const deleteProperties = (id: number): AppThunk => async dispatch => {
  try {
    await delProperties(id);
    dispatch(deletePropertiesSuccess());
  } catch (err) {
    dispatch(
      sendNotify({
        text: "Ошибка при удалении проперти! " + err.toString(),
        type: "dialog"
      })
    );

    return;
  }

  dispatch(
    sendNotify({
      text: "Проперти успешно удалено!",
      type: "notification"
    })
  );
};

export const addProperty = (property: Property): AppThunk => async dispatch => {
  try {
    dispatch(setTabIndex(1));

    await insertProperty(property);
    dispatch(addPropertySuccess());
  } catch (err) {
    dispatch(
      sendNotify({
        text: "Проперти с таким именем уже существует!",
        type: "dialog"
      })
    );

    return false;
  }

  dispatch(
    sendNotify({
      text: "Проперти успешно добавлен!",
      type: "notification"
    })
  );

  return true;
};
