import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import layout from "./layout";

const reducers = combineReducers({
  auth,
  user,
  layout,
});

export default reducers;
