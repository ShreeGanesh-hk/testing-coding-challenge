import { BreedActionTypes } from "../actions/breedActions";

export const breedIntialState = {
    dogId: 0,
    loadingIndicator: false,
    name:null,
};

export const breedReducer = (state = breedIntialState, action) => {
    const { type } = action || {}
    switch (type) {
        case BreedActionTypes.SET_DOG_ID:
            return { ...state, dogId: action.payload };
        case BreedActionTypes.SET_LOADING_INDICATOR:
            return { ...state, loadingIndicator: action.payload };
        case BreedActionTypes.SET_DOG_NAME:
            return { ...state, name: action.payload };
        default:
            return state
    }

} 