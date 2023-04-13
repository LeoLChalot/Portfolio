// ******************************* //
// **	   Style du DOM HTML    ** //
// ******************************* //
let styleBody = {
	display: "flex",
	"flex-direction": "column",
	"justify-content": "center",
	"align-items": "center",
	width: "100%",
};
let styleRss = {
	display: "flex",
	"flex-direction": "column",
	"border-radius": "8px",
	"box-shadow": "0px 0px 8px 0px rgba(168, 168, 168, 1)",
	width: "70%",
	padding: "1em",
};
const body = document.getElementsByTagName("body");
const rss = document.getElementById("rss-feed");
Object.assign(rss.style, styleRss);
Object.assign(body[0].style, styleBody);

// ? Flux RSS
// ! RS policy: No 'Access-Control-Allow-Origin'
// ! Liens inutilisables
// let url = "https://www.technologyreview.com/feed/";
// let url = "https://blogs.microsoft.com/AI/feed/";
// let url = "https://research.aimultiple.com/feed/";
// let url = "https://towardsdatascience.com/feed"
// let url = "https://www.marktechpost.com/category/technology/artificial-intelligence/feed/";

// ************************************** //
// **	   Récupération du flus RSS    ** //
// ************************************** //
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

				// ? Création de la balise <article> HTML
				let container = document.createElement("article");
				container.style.display = "flex";
				container.style.flexDirection = "column";
				container.style.alignItems = "center";

				// ? Création de la balise <h2> pour accueillir le titre de l'article
				let itemTitle = document.createElement("h2");

				// ? Récupération et assignement du titre de l'article
				itemTitle.innerHTML = listItemXML[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
				itemTitle.style.textAlign = "center";

				// ? Création de la balise <img> pour accueillir la vignette de l'article
				let itemMedia = document.createElement("img");

				// ? Récupération et assignement du lien de a vignette de l'article
				let linkMedia = listItemXML[i].getElementsByTagName("media:content")[0].getAttribute("url");

				// ? Récupération et assignement via l'attribut "alt" de la balise <img> de la description
				let descriptionMedia = listItemXML[i].getElementsByTagName("media:description")[0].childNodes[0].nodeValue;
				itemMedia.src = linkMedia;
				itemMedia.width = "300";
				itemMedia.alt = descriptionMedia;
				itemMedia.style["box-shadow"] = "0px 0px 8px 0px rgba(168, 168, 168, 1)";
				itemMedia.style["border-radius"] = "10px";
				itemMedia.style["margin-bottom"] = "20px";
				// console.log(linkMedia);

				// ? Création de la balise <p> pour accueillir la date de publication de l'article
				let publiDate = document.createElement("p");

				// ? Formatage de la date au format souhaité
				let date = listItemXML[i].getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
				// console.log(date);
				date = date.substring(0, 16);
				publiDate.innerHTML = date;

				// ? Création de la balise <a> pour accueillir le lien de lecture de l'article
				let itemArticle = document.createElement("a");

				// ? Récupération et assignement via l'attribut "href" de la balise <a> du lien de l'article
				let linkArticle = listItemXML[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
				itemArticle.href = linkArticle;
				itemArticle.textContent = "Lire l'article";

				// ? Insertion des éléments à afficher
				container.appendChild(itemTitle);
				container.appendChild(itemMedia);
				container.appendChild(itemArticle);
				container.appendChild(publiDate);
				rss.appendChild(container);
			}
		})
		.catch((err) => {
			console.log(err);
		});
} catch {
	(err) => console.log(err);
}
