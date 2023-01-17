let homeButton = document.getElementById("homeButton");
let homePage = document.getElementById("startPage");
let formInfo = document.getElementById("formContext");
let cityInput = document.getElementById("cityInput");

let apiKey = "e681224f251edf9fe2b18dfc26040eac";

homeButton.addEventListener("click", pageGone);

function pageGone() {
  console.log("the button was clicked");
  homePage.classList.add("hide");
}

function formSubmitHandler(e) {
  e.preventDefault();
  console.log("The form was submitted! You're doing great keep on going!");

  let city = cityInput.value.trim();
  console.log(`Entered city: ${city}`);
  grabCityCords(city);
}

function grabCityCords(city) {
  console.log(`Getting coordinates for: ${city}`);

    let geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${apiKey}`;
    
    fetch(geoApi)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let latitude = data[0].lat;
            let longitude = data[0].lon

            console.log(`The latitude of ${city} is: ${latitude}`)
            console.log(`The longitude of ${city} is: ${longitude}`)

        })
        .catch(err => console.log(err))
    
}

formInfo.addEventListener("submit", formSubmitHandler);
