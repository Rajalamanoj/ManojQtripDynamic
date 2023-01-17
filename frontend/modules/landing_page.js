import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  try{
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
   
  });
}catch(err){
return null;
}
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let data= await fetch(config.backendEndpoint+ '/cities');
  let jsondata= await data.json();
  return jsondata;
  }
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let element=document.createElement("div");
  element.id=id;
  element.setAttribute("class","col-6 col-lg-3 mb-4");
  element.innerHTML=`
  <a href="pages/adventures/?city=${id}" >
    <div class="tile">
      <img src="${image}" alt="" class="img-responsive">
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <P>${description}</P>   
        <div>
    </div>
  </a>
  `
  document.getElementById("data").append(element);

}

export { init, fetchCities, addCityToDOM };
