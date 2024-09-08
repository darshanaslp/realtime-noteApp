import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import authReducer from "./reducers/authReducer";
import noteReducer from "./reducers/noteReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  notes: noteReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
