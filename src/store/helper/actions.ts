import {
  Notify,
  SEND_NOTIFY,
  CLEAR_NOTIFY,
  TAB_INDEX,
  NotifyActionType,
  TabIndexType
} from "./types";

export function setTabIndex(index: TabIndexType): NotifyActionType {
  return {
    type: TAB_INDEX,
    payload: index
  };
}

export function sendNotify(newNotify: Notify): NotifyActionType {
  return {
    type: SEND_NOTIFY,
    payload: newNotify
  };
}

export function clearNotify(): NotifyActionType {
  return {
    type: CLEAR_NOTIFY
  };
}
