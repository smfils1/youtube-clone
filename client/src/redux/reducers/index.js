import { combineReducers } from "redux";
import user from "./user";
import layout from "./layout";
import upload from "./upload";

const reducers = combineReducers({
  user,
  layout,
  upload,
});

export default reducers;
