import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlpar=new URLSearchParams(search);
  const adventureurlid= urlpar.get('adventure');

  // Place holder for functionality to work in the Stubs
  return adventureurlid;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
     let data= await fetch(config.backendEndpoint + `/adventures/detail/?adventure=${adventureId}`);
     let jsondata= await data.json();
     console.log(jsondata);
     return jsondata;
 
     }
     catch(err){
       return null;
     }
  
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML=adventure.name;
  document.getElementById("adventure-subtitle").innerHTML=adventure.subtitle;
  document.getElementById("adventure-content").innerHTML=adventure.content;
  adventure.images.forEach((img)=>{
    let imgele=document.createElement("div");
    imgele.innerHTML=`<img src=${img} class="activity-card-image d-block w-100">`;
    document.getElementById("photo-gallery").appendChild(imgele);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner-id"></div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `
  images.forEach((img,index)=>{
    let carouselitemele=document.createElement("div");
    const activeclass = index == 0 ? 'active' : '';
    carouselitemele.className = `carousel-item ${activeclass}`;
    carouselitemele.innerHTML=`<img src=${img} class="activity-card-image d-block w-100">`;
    document.getElementById("carousel-inner-id").appendChild(carouselitemele);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display ="block";
    document.getElementById("reservation-person-cost").innerHTML = String(adventure.costPerHead)
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
 let price=adventure.costPerHead;
 let total = price*persons;
 document.getElementById("reservation-cost").innerHTML=String(total); 
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  document.getElementById('myForm').addEventListener("submit",async(e)=>{
  e.preventDefault()
  const formData={
    adventure: adventure.id,
    name: `${e.target.name}`,
    date: new Date(myForm.elements['date'].value),
    person: `${e.target.person}`,

  };
 console.log(formData);
  
  let resopnse =await fetch(config.backendEndpoint + '/reservations/new',{
   method:'POST',
   headers:{
    'Content-Type': 'application/json'
   },
   body: JSON.stringify(formData),
  });
  let result = await resopnse.json();
  if(result.success) alert('Success!');
  else alert('Failed!');
});
}
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }
  else{
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
