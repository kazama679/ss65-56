// tạo kho chứa tất cả 
import { createStore, combineReducers } from "redux"
import jobReducer from "./reducers/jobReducer"

const rootReducecr=combineReducers({
    jobReducer,
})
export const store=createStore(rootReducecr);