import axios from "axios";

function searchForBreed(query) {
  const headers = {
    "x-api-key": "e6f9506e-7860-4813-9945-f5a87b52e557"
  };
  let breedData = axios.request({
    url: "https://api.thedogapi.com/v1/breeds/search",
    headers: headers,
    method: 'get',
    params: {
      q: query
    },

  }).then((resp) => {
    return resp.data;
  })
    .catch((error) => {
      console.error("There was an error!", error);
      return error;
    });
  return breedData;
}

function getBreedDetails(breed_id) {
  const headers = {
    "x-api-key": "e6f9506e-7860-4813-9945-f5a87b52e557"
  };
  let breedData = axios.request({
    url: "https://api.thedogapi.com/v1/images/search",
    headers: headers,
    method: 'get',
    params: {
      breed_id: breed_id
    },

  }).then((resp) => {
    return resp.data;
  })
    .catch((error) => {
      console.error("There was an error!", error);
      return error;
    });
  return breedData;
}

export async function GetAllDogs(query) {
  const result = await searchForBreed(query);
  let ListOfBreeds = [...new Set(result.map(x => {
    return { title: x.name, id: x.id }
  }))]
  return { ListOfBreeds };
}

export async function GetImageAndBreed(id, name) {
  const result = await getBreedDetails(id);
  let breed = null;
  if (result.length === 0 && id > 0) {
    const getBreedByName = await searchForBreed(name);
    breed = getBreedByName.length !== 0 ? getBreedByName[0] : []
  }
  else if(id > 0) {
    breed = result[0].breeds[0];
    breed.url = result[0].url;
  } 
  
  if (breed === null & id > 0) {
      throw "Breed Information not found"
    }
  return breed;
}