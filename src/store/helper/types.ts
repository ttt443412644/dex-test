export type NotyfyType = "notification" | "dialog";
export type TableType = "products" | "properties";
export type TabIndexType = 0 | 1;

export type RecordType = {
  table: TableType;
  recordId: number;
};

export interface Notify {
  text: string;
  type: NotyfyType;
  record?: RecordType;
}

export interface NotifyState {
  notification: Notify | null;
  tabIndex: TabIndexType;
}

export const SEND_NOTIFY = "SEND_NOTIFY";
export const CLEAR_NOTIFY = "CLEAR_NOTIFY";
export const TAB_INDEX = "TAB_INDEX";

interface SendNotifyAction {
  type: typeof SEND_NOTIFY;
  payload: Notify;
}

interface ClearNotifyAction {
  type: typeof CLEAR_NOTIFY;
}

interface TabIndexAction {
  type: typeof TAB_INDEX;
  payload: TabIndexType;
}

export type NotifyActionType =
  | SendNotifyAction
  | ClearNotifyAction
  | TabIndexAction;
