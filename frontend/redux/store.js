import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./index";
import thunk from "redux-thunk";
const middlewares = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
