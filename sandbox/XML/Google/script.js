// ? Création des éléments de la section veille IA
let veilleContainer = document.getElementById("veille-container");

let divArticleContainer = document.getElementById("article-container");

// ? https://api.rss2json.com/v1/api.json?rss_url=[url] - Les ":" sont notés "%3A", les "/" sont notés "%2F"
let url = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fblog.google%2Ftechnology%2Fai%2Frss";

// ? Requête au flux RSS googleAI
try {
	axios
		.get(url)
		.then((result) => {
			let data = result.data;
			let items = data.items;
			console.log(items)

			// ? Récupération des 5 derniers articles tech
			items.forEach((item) => {

			/* 
			?! Objet récupéré sous la forme JSON
			*	{ 
			*		0{
			*			author:
			?			categories: [Tableau de mots clés] [item.categorie[index]]
			*			content:
			*			description:
			?			ensclosure :
			?					link: (source de l'image pour la vignette) [item.enclosure.link]
			*			guid:
			?			link: (lien vers l'article) [item.link]
			?			pubDate: (date au format AA-MM-JJ HH-MM-SS) [item.pubDate]
			*			thumbnail:
			?			title: (titre de l'article) [item.title]
			*		}
			*	}
			*/

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
				let pDate = document.createElement("p");
				pDate.classList.add("article-date");

				h2Title.textContent = item.title;
				console.log(h2Title)
				imgArticle.src = item.enclosure.link;
				console.log(imgArticle)
				aArticle.textContent = "Lire l'article";
				aArticle.href = item.link;
				let date = item.pubDate;
				date = date.substring(0, 10);
				pDate.innerText = date
				console.log(date)

				// ? console.log des éléments à afficher
				divArticleTitle.appendChild(h2Title);
				divArticleView.appendChild(imgArticle);
				divArticleView.appendChild(aArticle);
				divArticleContent.appendChild(divArticleView);
				divArticleText.appendChild(pDate);
				divArticleContent.appendChild(divArticleText);
				divArticle.appendChild(divArticleTitle);
				divArticle.appendChild(divArticleContent);

				divArticleContainer.appendChild(divArticle);
			});
		})
		.catch((err) => {
			console.log(err);
		});
} catch {
	(err) => console.log(err);
}
