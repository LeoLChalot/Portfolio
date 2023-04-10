// ? JS Menu aside
let btnBurger = document.getElementById("btn-burger");
let asideContainer = document.querySelector("#aside-container");
let btnBurgerSpan = document.querySelectorAll("#btn-burger span");
let copyright = document.querySelector(".copyright");
let body = document.querySelector("body");
// console.log(body.style);

console.log(btnBurger);

btnBurger.addEventListener("click", () => {
	btnBurger.classList.toggle("active");
	asideContainer.classList.toggle("active");
	copyright.classList.toggle("active");
	console.log(copyright);
});


// ? JS Typerwriter
let message = document.querySelector('#typewriter').dataset.message;
let messageArray = [message];
console.log(message)
let textPosition = 0;
let speed = 1000;

function typewriter(messageArray) {
    document.querySelector('#typewriter').innerHTML = messageArray[0].substring(0, textPosition) + "<span>|</span>";

    if(textPosition++ != messageArray[0].length){
        setTimeout(typewriter(messageArray), speed);
    }
}

window.addEventListener("load", typewriter(messageArray))