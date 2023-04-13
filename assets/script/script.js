// ? JS Menu aside
let btnBurger = document.getElementById("btn-burger");
let asideContainer = document.querySelector("#aside-container");
let btnBurgerSpan = document.querySelectorAll("#btn-burger span");
let copyright = document.querySelector(".copyright");
let body = document.querySelector("body");

// console.log(btnBurger);

btnBurger.addEventListener("click", () => {
	btnBurger.classList.toggle("active");
	asideContainer.classList.toggle("active");
	copyright.classList.toggle("active");
	console.log(copyright);
});

// ? JS Typerwriter
// let message = document.querySelector("#typewriter").dataset.message;
// console.log(message);
// let textPosition = 0;
// let speed = 1000;
// function typewriter(message) {
// 	document.querySelector("#typewriter").innerHTML = message[0].substring(0, textPosition) + "<span>|</span>";
// 	if (textPosition++ != message[0].length) {
// 		setTimeout(typewriter(message), speed);
// 	}
// }
// window.addEventListener("load", typewriter(message));

// let TxtType = function (el, toRotate, period) {
// 	this.toRotate = toRotate;
// 	this.el = el;
// 	this.loopNum = 0;
// 	this.period = parseInt(period, 10) || 2000;
// 	this.txt = "";
// 	this.tick();
// 	this.isDeleting = false;
// };

class TxtType {
	constructor(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = "";
		this.tick();
		this.isDeleting = false;
	}
	tick() {
		let i = this.loopNum % this.toRotate.length;
		let fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

		let that = this;
		let delta = 200 - Math.random() * 100;

		if (this.isDeleting) {
			delta /= 2;
		}

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === "") {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(function () {
			that.tick();
		}, delta);
	}
}

window.onload = function () {
	let elements = document.getElementsByClassName("typewrite");
	for (let i = 0; i < elements.length; i++) {
		let toRotate = elements[i].getAttribute("data-type");
		let period = elements[i].getAttribute("data-period");
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	// INJECT CSS
	let css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
	document.body.appendChild(css);
};

// ? Flux RSS
// ! RS policy: No 'Access-Control-Allow-Origin' header i
// let url = "https://www.technologyreview.com/feed/";
// let url = "https://blogs.microsoft.com/AI/feed/";
// let url = "https://research.aimultiple.com/feed/";
// let url = "https://towardsdatascience.com/feed"
// let url = "https://www.marktechpost.com/category/technology/artificial-intelligence/feed/";

// * data format XML
let url = "https://blog.google/technology/ai/rss/";



try {
	axios
	.get(url)
	.then((res) => {
		let data = res.data
		console.log(data);
	})
} catch {
	(err) => console.log(err);
}

