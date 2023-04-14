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

// ************************************** //
// **	   Récupération du flus RSS    ** //
// ************************************** //

// ? Création des éléments de la section veille IA
let veilleContainer = document.getElementById("veille-container");
let articleContainer = document.createElement("div");

let divArticleContainer = document.getElementById("article-container");
let url = "https://blog.google/technology/ai/rss/";
let parser, xmlDoc;

// ? Requête au flux RSS googleAI
try {
	axios
		.get(url)
		.then((result) => {
			let data = result.data;
			// console.log(data);

			// ? Création de l'objet DOMParser
			parser = new DOMParser();

			// ? Récupération du DOM XML
			xmlDoc = parser.parseFromString(data, "text/xml");
			// console.log(xmlDoc);

			// ? Récupération des articles "Item" du DOM XML
			let listItemXML = xmlDoc.getElementsByTagName("item");
			// console.log(listItemXML[0]);

			// ? Récupération des 5 derniers articles tech
			for (let i = 0; i < 5; i++) {
				// console.log(listItemXML[i]);

				// ? Création des éléments des cards rss
				let divArticle = document.createElement("article");
				divArticle.classList.add("article");
				let divArticleTitle = document.createElement("div");
				divArticleTitle.classList.add("article-title");
				let h2Title = document.createElement("h2");
				let divArticleContent = document.createElement("div");
				divArticleContent.classList.add("article-content");
				let divArticleView = document.createElement("div");
				divArticleView.classList.add("article-view");
				let imgArticle = document.createElement("img");
				imgArticle.classList.add("vignette-article");
				let aArticle = document.createElement("a");
				aArticle.classList.add("lien-article");
				let divArticleText = document.createElement("div");
				divArticleText.classList.add("article-text");
				let divArticleDescription = document.createElement("div");
				divArticleDescription.classList.add("article-description");
				let divArticleTag = document.createElement("div");
				divArticleTag.classList.add("article-tag");
				let pDescription = document.createElement("p");
				pDescription.classList.add("description");
				let pDate = document.createElement("p");
				pDate.classList.add("article-date");

				// ? Récupération et assignement du titre de l'article
				h2Title.innerHTML = listItemXML[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;

				// ? Récupération et assignement du lien de la vignette de l'article
				let srcImg = listItemXML[i].getElementsByTagName("media:content")[0].getAttribute("url");

				// ? Récupération et assignement via l'attribut "alt" de la balise <img> de la description
				let altImg = listItemXML[i].getElementsByTagName("media:description")[0].childNodes[0].nodeValue;
				imgArticle.src = srcImg;
				imgArticle.alt = altImg;
				// console.log(imgArticle);

				// ? Récupération des tag "Category" XML
				let tagList = listItemXML[i].getElementsByTagName("category");
				// console.log(tagList);
				let tagArray = [];
				let tag;
				for (let i = 0; i < tagList.length; i++) {
					// console.log(tagList[i].childNodes[0].nodeValue);
					tag = tagList[i].childNodes[0].nodeValue;
					console.log(tag)
					tagArray.push(tag);
					console.log(tagArray)
				}
				// console.log(tagArray);
				for(let i = 0; i < tagArray.length; i++){
					let pTag = document.createElement('p')
					pTag.classList.add('text-muted', 'text-info')
					let tag = tagArray[i]
					pTag.innerText = tag
					divArticleTag.appendChild(pTag)
				}

				
				console.log(divArticleTag)
				// ? Formatage de la date au format souhaité
				let date = listItemXML[i].getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
				// console.log(date);
				date = date.substring(0, 16);
				pDate.innerHTML = date;

				// ? Récupération et assignement via l'attribut "href" de la balise <a> du lien de l'article
				let linkArticle = listItemXML[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
				aArticle.href = linkArticle;
				aArticle.target = "_blank";
				aArticle.textContent = "Lire l'article";

				let ogArray = listItemXML[i].getElementsByTagName("og");
				// console.log(ogArray[0].childNodes[2].textContent);
				pDescription.textContent = ogArray[0].childNodes[2].textContent;

				// ? Insertion des éléments à afficher
				// console.log(h2Title)
				// console.log(imgArticle)
				// console.log(aArticle)
				// console.log(divArticleView)
				// console.log(pDescription)
				// console.log(divArticleDescription)
				// console.log(pDate)
				// console.log(divArticleText)
				// console.log(divArticleTitle)
				// console.log(divArticleContent)
				// console.log(divArticle)

				

				divArticleTitle.appendChild(h2Title);

				divArticleView.appendChild(imgArticle);
				divArticleView.appendChild(aArticle);
				divArticleContent.appendChild(divArticleView);

				divArticleDescription.appendChild(pDescription);
				divArticleText.appendChild(divArticleDescription);
				divArticleText.appendChild(divArticleTag)
				divArticleText.appendChild(pDate);

				divArticleContent.appendChild(divArticleText);

				divArticle.appendChild(divArticleTitle);
				divArticle.appendChild(divArticleContent);

				divArticleContainer.appendChild(divArticle);
			}
		})
		.catch((err) => {
			console.log(err);
		});
} catch {
	(err) => console.log(err);
}
