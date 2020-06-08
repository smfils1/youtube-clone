import { combineReducers } from "redux";
import user from "./user";
import layout from "./layout";

const reducers = combineReducers({
  user,
  layout,
});

export default reducers;
