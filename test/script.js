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
// let url = "https://www.technologyreview.com/feed/";
// let url = "https://blogs.microsoft.com/AI/feed/";
// let url = "https://research.aimultiple.com/feed/";
// let url = "https://towardsdatascience.com/feed"
// let url = "https://www.marktechpost.com/category/technology/artificial-intelligence/feed/";

// * data format XML
let url = "https://blog.google/technology/ai/rss/";
let parser, xmlDoc;
try {
	axios
		.get(url)
		.then((result) => {
			let data = result.data;
			// console.log(data);
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(data, "text/xml");
			// console.log(xmlDoc);
			let listItemXML = xmlDoc.getElementsByTagName("item");
			// console.log(listItemXML[0]);

			for (let i = 0; i < 5; i++) {
				// console.log(listItemXML[i]);
				let container = document.createElement("article");
				container.style.display = "flex";
				container.style.flexDirection = "column";
				container.style.alignItems = "center";
				let itemTitle = document.createElement("h2");
				itemTitle.innerHTML = listItemXML[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
				itemTitle.style.textAlign = "center";
				// console.log(listItemXML[i].getElementsByTagName('title')[0].childNodes[0].nodeValue)
				let itemMedia = document.createElement("img");
				let linkMedia = listItemXML[i].getElementsByTagName("media:content")[0].getAttribute("url");
				let descriptionMedia =
					listItemXML[i].getElementsByTagName("media:description")[0].childNodes[0].nodeValue;
				itemMedia.src = linkMedia;
				itemMedia.width = "300";
				itemMedia.alt = descriptionMedia;
				itemMedia.style["box-shadow"] = "0px 0px 8px 0px rgba(168, 168, 168, 1)";
				itemMedia.style["border-radius"] = "10px";
				itemMedia.style["margin-bottom"] = "20px";
				// console.log(linkMedia);
				let publiDate = document.createElement("p");
				let date = listItemXML[i].getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
				// console.log(date);
				date = date.substring(0, 16);
				publiDate.innerHTML = date;
				let itemArticle = document.createElement("a");
				let linkArticle = listItemXML[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
				itemArticle.href = linkArticle;
				itemArticle.textContent = "Lire l'article";

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
