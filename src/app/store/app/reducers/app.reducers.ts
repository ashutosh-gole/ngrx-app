import { ActionReducer, INIT } from "@ngrx/store";
import { logout } from "../actions/app.action";

export const debugReducer = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    // console.log('state', state);
    // console.log('action', action);
    return reducer(state, action);
  };
};

export const logoutReducer = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    if (action?.type === logout.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
};