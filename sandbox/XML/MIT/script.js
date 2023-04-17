// ? Création des éléments de la section veille IA
let veilleContainer = document.getElementById("veille-container");

let divArticleContainer = document.getElementById("article-container");
let url = "https://news.mit.edu/topic/mitartificial-intelligence2-rss.xml";
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
			console.log(listItemXML[0]);

			// ? Récupération des 5 derniers articles tech
			for (let i = 0; i < 10; i++) {
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
					// console.log(tag);
					tagArray.push(tag);
					// console.log(tagArray);
				}
				// console.log(tagArray);
				for (let i = 0; i < tagArray.length; i++) {
					let pTag = document.createElement("p");
					pTag.classList.add("tag", "text-muted", "text-info");
					let tag = tagArray[i];
					pTag.innerText = tag;
					divArticleTag.appendChild(pTag);
				}

				// console.log(divArticleTag);
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

				// ? console.log des éléments à afficher
				divArticleTitle.appendChild(h2Title);

				divArticleView.appendChild(imgArticle);
				divArticleView.appendChild(aArticle);
				divArticleContent.appendChild(divArticleView);

				divArticleDescription.appendChild(pDescription);
				divArticleText.appendChild(divArticleDescription);
				divArticleText.appendChild(divArticleTag);
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
