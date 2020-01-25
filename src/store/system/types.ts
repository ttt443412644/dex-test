export interface SystemState {
  loggedIn: boolean;
  session: string;
  email: string;
}

export const UPDATE_SESSION = "UPDATE_SESSION";

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION;
  payload: SystemState;
}
export type SystemActionTypes = UpdateSessionAction;
