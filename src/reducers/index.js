import { combineReducers } from "redux";

import dataReducers from "./dataReducers";

const appReducer = combineReducers({
  data: dataReducers,
});

export default appReducer;
