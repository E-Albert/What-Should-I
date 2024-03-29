//DOM ELEMENTS
let homeButton = document.getElementById("homeButton");
let homePage = document.getElementById("startPage");
let homePageText = document.getElementById("startPageText")
let formInfo = document.getElementById("formContext");
let cityInput = document.getElementById("cityInput");
let activityInput = document.getElementById("activityInput");
let header = document.getElementById("header");
let main = document.getElementById("main");
let placeInfo = document.getElementById("placeInfo");
let weather = document.getElementById("weather");
let weatherImage = document.getElementById("weatherImage")
let guidelines = document.getElementById("preMapPara")
let formSubmitButton = document.getElementById("formSubmit")

//GLOBAL VARIABLES
let apiKey = "e681224f251edf9fe2b18dfc26040eac";
let mapKey = "AIzaSyB2jsY4UMem8T06ilsqSs9W4YcS6IyCZac";
let map;
let places = [];
let markerArray = [];
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;




//FUNCTIONS
function hideNSeek() {
  homePage.classList.add("hide");
  homePageText.classList.add("hide")
  header.classList.remove("hide");
  main.classList.remove("hide");
}

function hideGuidelines() {
  guidelines.classList.add("hide")
}

function formSubmitHandler(e) {
  e.preventDefault();
  placeInfo.innerHTML = ""
  labelIndex = 0
  let city = cityInput.value.trim();
  grabCityCords(city);
}

function grabCityCords(city) {
  let geoApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${apiKey}`;
  
  fetch(geoApi)
  .then((res) => res.json())
  .then((data) => {
    let latitude = parseFloat(data[0].lat.toFixed(5));
    let longitude = parseFloat(data[0].lon.toFixed(5));
    
    getWeather(latitude, longitude);
    initMap(latitude, longitude);
  })
  .catch((err) => console.log(err));
}

function getWeather(latitude, longitude) {
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  
  fetch(weatherApi)
  .then((res) => res.json())
  .then((data) => {
    let temp = Math.ceil(data.main.temp);
    weatherGif(temp)
  })
  .catch((err) => console.log(err));
}

function weatherGif(temp) {
  weather.innerHTML = ""
  
  let gifSrc;
  let gifSentence;
  let gifAlt
  
  if (temp > 80) {
    gifSrc = "assets/sunwithsunglasses.gif";
    gifAlt = "sun with glasses"
    gifSentence = "Seems like it's hot outside. Better wear your sunscreen."
  } else if (temp > 60) {
    gifSrc = "assets/girlridingbike.gif"
    gifAlt = "the grass blowing in the wind"
    gifSentence = "A nice day to be outdoors."
  } else {
    gifSrc = "assets/coldshivering.gif"
    gifAlt = "character shivering under a blanket"
    gifSentence = "Its going to be cold! Don't forget to bring a sweater."
  }
  
  let weatherHeader = document.createElement("h2")
  let weatherSentence = document.createElement("p")
  let gif = document.createElement("img")
  
  gif.src = gifSrc
  gif.alt = gifAlt
  
  weatherHeader.textContent = `${temp} °F`
  weatherSentence.textContent = `${gifSentence}`
  
  weather.appendChild(gif)
  weather.appendChild(weatherHeader)
  weather.appendChild(weatherSentence)
}


function initMap(latitude, longitude) {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: latitude, lng: longitude },
  });
  
  let activity = activityInput.value.trim()
  let placesApi = `https://floating-headland-95050.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${mapKey}&location=${latitude},${longitude}&radius=50000&keyword=${activity}`;
  
  fetch(placesApi)
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach(place => {
      
      let name = place.name
      let address = place.vicinity
      let open = place.opening_hours.open_now
      let rating = place.rating
      let location = place.geometry.location
      
      const marker = new google.maps.Marker({
        position: location,
        map,
        title: name,
        label: labels[labelIndex++ % labels.length]
      })
      
      let contentString = `
      <div id="infoWindowDiv">
      <h2 id="infoWindowName">${name}</h2>
      <p id="infoWindowAddress">${address}</p>
      <p id="infoWindowOpen">${open ? 'Currently Open' : 'Currently Closed'}</p>
      <p id="infoWindowRating">Rating: ${rating}/5</p>
      </div>
      `
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: name,
      });
      
      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });
      
      places.push([name, address, open, rating])
      
      let placeDiv = document.createElement("div")
      let placeName = document.createElement("h2")
      let placeAddress = document.createElement('p')
      let placeOpen = document.createElement('p')
      let placeRating = document.createElement('p')
      
      placeDiv.className = "infoDiv"
      
      placeName.textContent =`${marker.label}) ${name}`
      placeAddress.textContent = `${address}`
      placeOpen.textContent = open? 'Currently Open' : 'Currently Closed'
      placeRating.textContent = `Rating: ${rating}/5`
      
      placeDiv.appendChild(placeName)
      placeDiv.appendChild(placeAddress)
      placeDiv.appendChild(placeOpen)
      placeDiv.appendChild(placeRating)
      
      placeInfo.appendChild(placeDiv)
      
    })
  })
  .catch((err) => console.log(err));
  
  activityInput.value = "";
}

//EVENTS
window.initMap = initMap;
homeButton.addEventListener("click", hideNSeek);
formSubmitButton.addEventListener("click", hideGuidelines)
formInfo.addEventListener("submit", formSubmitHandler);
