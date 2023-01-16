let homeButton = document.getElementById("homeButton");
let homePage = document.getElementById("homePage")

homeButton.addEventListener("click", pageGone)

function pageGone() {
    console.log('the button was clicked')
    homePage.classList.add("hide")
}