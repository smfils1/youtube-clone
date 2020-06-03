import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";
import promiseMiddleware from "redux-promise";
import logger from "redux-logger";

let middleware = [thunkMiddleware, promiseMiddleware];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, logger];
}

const middlewareEnhancer = applyMiddleware(...middleware);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(middlewareEnhancer));

export default store;
