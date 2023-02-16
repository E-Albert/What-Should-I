let homeButton = document.getElementById("homeButton");
let homePage = document.getElementById("startPage");
let formInfo = document.getElementById("formContext");
let cityInput = document.getElementById("cityInput");
let activityInput = document.getElementById("activityInput");
let header = document.getElementById("header");
let main = document.getElementById("main");
let footer = document.getElementById("footer");

let apiKey = "e681224f251edf9fe2b18dfc26040eac";
let mapKey = "AIzaSyB2jsY4UMem8T06ilsqSs9W4YcS6IyCZac";


homeButton.addEventListener("click", hideNSeek);

function hideNSeek() {
  console.log("the button was clicked");
  homePage.classList.add("hide");
  header.classList.remove("hide");
  main.classList.remove("hide");
  footer.classList.remove("hide");
}

function formSubmitHandler(e) {
  e.preventDefault();
  console.log("The form was submitted! You're doing great keep on going!");

  let city = cityInput.value.trim();
  // let activity = activityInput.value.trim()
  console.log(`Entered city: ${city}`);
  // console.log(`Entered activity: ${activity}`)
  grabCityCords(city);
  // findPlaces(activity)
  cityInput.value = "";
}

function grabCityCords(city) {
  console.log(`Getting coordinates for: ${city}`);

  let geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${apiKey}`;

  fetch(geoApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let latitude = parseFloat(data[0].lat.toFixed(5));
      let longitude = parseFloat(data[0].lon.toFixed(5));

      console.log(latitude)
      console.log(longitude)
      console.log(typeof latitude);
      console.log(typeof longitude);

      console.log(`The latitude of ${city} is: ${latitude}`);
      console.log(`The longitude of ${city} is: ${longitude}`);

      getWeather(latitude, longitude);
      initMap(latitude, longitude);
      findPlaces(latitude, longitude);
    })
    .catch((err) => console.log(err));
}

function getWeather(latitude, longitude) {
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

  fetch(weatherApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let temp = data.main.temp;
      console.log(`The temperature is ${temp} degrees farenheit`);
    })
    .catch((err) => console.log(err));
}

// Initialize and add the map
function initMap(latitude, longitude) {
  // The map centered at user city
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: latitude, lng: longitude },
  });
}

function findPlaces(latitude, longitude) {
  
  let activity = activityInput.value.trim()

  console.log(latitude)
  console.log(longitude)
  console.log(activity)
  console.log(mapKey)

  let placesApi = `https://floating-headland-95050.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${mapKey}&location=${latitude},${longitude}&radius=50000&keyword=${activity}`;
  
  fetch(placesApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}

// function googleGeoCode(city) {
//   console.log(city)
//   let googleGeoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${mapKey}`

//   fetch(googleGeoUrl)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//       console.log(data.results[0].geometry.location.lat)
//       let googleGeoLat = parseFloat(data.results[0].geometry.location.lat)
//       let googleGeoLon = parseFloat(data.results[0].geometry.location.lon)
//       initMap(googleGeoLat, googleGeoLon)
//     })
//     .catch(err => console.log(err))
// }

window.initMap = initMap;

formInfo.addEventListener("submit", formSubmitHandler);
