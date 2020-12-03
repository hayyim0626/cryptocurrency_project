import { combineReducers } from "redux";
import currencyReducer from "./currencyReducer";

const allReducers = combineReducers({ currencyReducer });

export default allReducers
