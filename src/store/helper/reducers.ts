import {
  NotifyState,
  NotifyActionType,
  SEND_NOTIFY,
  CLEAR_NOTIFY,
  TAB_INDEX
} from "./types";

const initialState: NotifyState = {
  notification: null,
  tabIndex: 0
};

export function helperReducer(
  state = initialState,
  action: NotifyActionType
): NotifyState {
  switch (action.type) {
    case TAB_INDEX:
      return { ...state, tabIndex: action.payload };
    case SEND_NOTIFY:
      return { ...state, notification: action.payload };
    case CLEAR_NOTIFY:
      return { ...state, notification: null };
    default:
      return state;
  }
}
