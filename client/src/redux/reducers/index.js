import { combineReducers } from "redux";
import channel from "./channel";
import layout from "./layout";
import upload from "./upload";
import videos from "./videos";
import comments from "./comments";

const reducers = combineReducers({
  channel,
  layout,
  upload,
  videos,
  comments,
});

export default reducers;
