export const BreedActionTypes ={
    SET_DOG_ID : 'breed/DOG_Id',
    SET_DOG_NAME:'breed/DOG_NAME',
    SET_LOADING_INDICATOR:'breed/LOADING_INDICATOR'
    // SET_BREED_LIST :'breed/breedList',
};

export const setSelectedDogId = (payload) =>({
    type : BreedActionTypes.SET_DOG_ID,
    payload,
});

export const setLoadingIndicator = (payload) =>({
    type : BreedActionTypes.SET_LOADING_INDICATOR,
    payload,
})


export const setSelectedDogName = (payload) =>({
    type : BreedActionTypes.SET_DOG_NAME,
    payload,
})