import { combineReducers } from "redux";
import user from "./user";
import layout from "./layout";
import upload from "./upload";
import videos from "./videos";

const reducers = combineReducers({
  user,
  layout,
  upload,
  videos,
});

export default reducers;
