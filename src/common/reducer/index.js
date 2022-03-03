import { combineReducers } from "redux";
import { breedIntialState, breedReducer } from "./breedReducer";

export const rootIntialState = {
    breed : breedIntialState,
}

export const rootReducer = () => combineReducers({
    breed : breedReducer,
})