let homeButton = document.getElementById("homeButton");
let homePage = document.getElementById("startPage");
let formInfo = document.getElementById("formContext");
let cityInput = document.getElementById("cityInput");


homeButton.addEventListener("click", pageGone)

function pageGone() {
    console.log('the button was clicked')
    homePage.classList.add("hide")
}

function formSubmitHandler(e) {
    e.preventDefault()
    console.log(e)
    console.log("You're doing great keep on going!")

    let city = cityInput.value.trim();
    console.log(city)
}

formInfo.addEventListener("submit", formSubmitHandler)
