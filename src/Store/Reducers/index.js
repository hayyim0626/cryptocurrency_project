import { combineReducers } from "redux";
import currencyReducer from "./currencyReducer";
import dataReducer from "./dataReducer";

const allReducers = combineReducers({ currencyReducer, dataReducer });

export default allReducers;
