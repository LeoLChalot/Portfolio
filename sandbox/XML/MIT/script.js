// ? Création des éléments de la section veille IA
let veilleContainer = document.getElementById("veille-container");

let divArticleContainer = document.getElementById("article-container");

let url =
	"https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.lafermeduweb.net%2Ftag%2Frss%2Fnodejs.xml?search_veille%5Bsorting%5D=&search_veille%5BnbPerPages%5D=10&search_veille%5BdateInterval%5D=&search_veille%5Bauthor%5D=&search_veille%5Blang%5D=all&search_veille%5Bsearch%5D=";

let parser, xmlDoc;

// ? Requête au flux RSS googleAI
try {
	axios
		.get(url)
		.then((result) => {
			let data = result.data;
			// console.log(data)
			let items = data.items;
			console.log(items);

			// ? Récupération des 5 derniers articles tech
			for (let i = 0; i < 10; i++) {
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




				// ? console.log des éléments à afficher
				// divArticleTitle.appendChild(h2Title);

				// divArticleView.appendChild(imgArticle);
				// divArticleView.appendChild(aArticle);
				// divArticleContent.appendChild(divArticleView);

				// divArticleDescription.appendChild(pDescription);
				// divArticleText.appendChild(divArticleDescription);
				// divArticleText.appendChild(divArticleTag);
				// divArticleText.appendChild(pDate);

				// divArticleContent.appendChild(divArticleText);

				// divArticle.appendChild(divArticleTitle);
				// divArticle.appendChild(divArticleContent);

				// divArticleContainer.appendChild(divArticle);
			}
		})
		.catch((err) => {
			console.log(err);
		});
} catch {
	(err) => console.log(err);
}