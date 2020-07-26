import { combineReducers } from "redux";
import channel from "./channel";
import layout from "./layout";
import upload from "./upload";
import videos from "./videos";

const reducers = combineReducers({
  channel,
  layout,
  upload,
  videos,
});

export default reducers;
