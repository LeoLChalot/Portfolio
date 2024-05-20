// ? JS Menu aside
const btnBurger = document.getElementById("btn-burger");
let nav = document.querySelector("#nav");
btnBurger.addEventListener("click", () => {
	btnBurger.classList.toggle("active");
	nav.classList.toggle("active");
});