// ? Flux RSS
// ! RS policy: No 'Access-Control-Allow-Origin' header i

// ************************************** //
// **	   Récupération du flus RSS    ** //
// ************************************** //
let btnGoogleIA = document.getElementById('btn-rss-ia');
let btnBlockchain = document.getElementById('btn-rss-blockchain');

// ? Création des éléments de la section veille IA
let veilleContainerIa = document.getElementById('veille-container-ia');
let veilleContainerBlockchain = document.getElementById('veille-container-blockchain');

const divArticleContainerIa = document.getElementById('article-container-ia');
const divArticleContainerBlockchain = document.getElementById('article-container-blockchain');

const url_ai = 'https://blog.google/technology/ai/rss/';
const url_blockchain = 'https://blockchain.news/rss';
let parser, xmlDoc;

btnGoogleIA.addEventListener('click', () => {
   veilleContainerIa.classList.toggle('active');
   btnGoogleIA.value == 'Afficher' ? btnGoogleIA.value = 'Masquer' : btnGoogleIA.value = 'Afficher';
});

btnBlockchain.addEventListener('click', () => {
   veilleContainerBlockchain.classList.toggle('active');
   btnBlockchain.value == 'Afficher' ? btnBlockchain.value = 'Masquer' : btnBlockchain.value = 'Afficher';
});

// ? Requête au flux RSS googleAI
try {
   axios
      .get(url_ai)
      .then((result) => {
         let data = result.data;
         // console.log(data);
         // ? Création de l'objet DOMParser
         parser = new DOMParser();
         // ? Récupération du DOM XML
         xmlDoc = parser.parseFromString(data, 'text/xml');
         // ? Récupération des articles "Item" du DOM XML
         let listItemXML = xmlDoc.getElementsByTagName('item');
         // console.log(listItemXML);
         // ? Récupération des 5 derniers articles tech
         for (let i = 0; i < 6; i++) {
            // ? Création des éléments des cards rss
            let divArticle = document.createElement('article');
            divArticle.classList.add('article');
            let divArticleTitle = document.createElement('div');
            divArticleTitle.classList.add('article-title');
            let h2Title = document.createElement('h2');
            let divArticleContent = document.createElement('div');
            divArticleContent.classList.add('article-content');
            let divArticleView = document.createElement('div');
            divArticleView.classList.add('article-view');
            let imgArticle = document.createElement('img');
            imgArticle.classList.add('vignette-article');
            let aArticle = document.createElement('a');
            aArticle.classList.add('lien-article');
            let divArticleText = document.createElement('div');
            divArticleText.classList.add('article-text');
            let divArticleDescription = document.createElement('div');
            divArticleDescription.classList.add('article-description');
            let divArticleTag = document.createElement('div');
            divArticleTag.classList.add('article-tag');
            let pDescription = document.createElement('p');
            pDescription.classList.add('description');
            let pDate = document.createElement('p');
            pDate.classList.add('article-date');
            // ? Récupération et assignement du titre de l'article
            h2Title.innerHTML =
               listItemXML[i].getElementsByTagName(
                  'title'
               )[0].childNodes[0].nodeValue;
            // ? Récupération et assignement du lien de la vignette de l'article
            // console.log(listItemXML[i]);
            let srcImg;
            // Vérifier si la balise "media:content" existe
            if (listItemXML[i].getElementsByTagName('media:content').length > 0) {
               // Récupérer l'attribut 'url' de la balise "media:content"
               srcImg = listItemXML[i].getElementsByTagName('media:content')[0].getAttribute('url');
            } else {
               // Ne rien faire si la balise "media:content" n'existe pas
               srcImg = "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
            }
            // ? Récupération et assignement via l'attribut "alt" de la balise <img> de la description
            let altImg =
               listItemXML[i].getElementsByTagName('media:description')[0];
            imgArticle.src = srcImg;
            imgArticle.alt = altImg;
            // ? Récupération des tag "Category" XML
            let tagList = listItemXML[i].getElementsByTagName('category');
            let tagArray = [];
            let tag;
            for (let i = 0; i < tagList.length; i++) {
               tag = tagList[i].childNodes[0].nodeValue;

               if (tagArray.length >= 5) break
               tagArray.push(tag);
            }
            for (let i = 0; i < tagArray.length; i++) {
               let pTag = document.createElement('p');
               pTag.classList.add('tag', 'text-muted', 'text-info');
               let tag = tagArray[i];
               pTag.innerText = tag;
               divArticleTag.appendChild(pTag);
            }

            // ? Formatage de la date au format souhaité
            let date =
               listItemXML[i].getElementsByTagName('pubDate')[0].childNodes[0]
                  .nodeValue;
            date = date.substring(0, 16);
            pDate.innerHTML = date;

            // ? Récupération et assignement via l'attribut "href" de la balise <a> du lien de l'article
            let linkArticle =
               listItemXML[i].getElementsByTagName('link')[0].childNodes[0]
                  .nodeValue;
            aArticle.href = linkArticle;
            aArticle.target = '_blank';
            aArticle.textContent = "Lire l'article";

            let ogArray = listItemXML[i].getElementsByTagName('og');
            pDescription.textContent = ogArray[0].childNodes[2].textContent;


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
            divArticleContainerIa.appendChild(divArticle);
         }
      })
      .catch((err) => {
         console.log(err);
      });
} catch {
   (err) => console.log(err);
}

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
// ? Requête au flux Blockchain.news
// .get(proxyUrl + url_blockchain)

try {
   axios
      .get(url_blockchain, {
         headers: {
            'Content-Type': 'text/xml',
            'Access-Control-Allow-Origin': ['*', 'https://leolchalot.github.io'],
         },
      })
      .then((result) => {
         let data = result.data;
         // console.log(data);
         // ? Création de l'objet DOMParser
         parser = new DOMParser();
         // ? Récupération du DOM XML
         xmlDoc = parser.parseFromString(data, 'text/xml');
         // ? Récupération des articles "Item" du DOM XML
         let listItemXML = xmlDoc.getElementsByTagName('item');
         console.log(listItemXML);
         // ? Récupération des 5 derniers articles tech
         for (let i = 0; i < 6; i++) {
            // ? Création des éléments des cards rss
            let divArticle = document.createElement('article');
            divArticle.classList.add('article');
            let divArticleTitle = document.createElement('div');
            divArticleTitle.classList.add('article-title');
            let h2Title = document.createElement('h2');
            let divArticleContent = document.createElement('div');
            divArticleContent.classList.add('article-content');
            let divArticleView = document.createElement('div');
            divArticleView.classList.add('article-view');
            let imgArticle = document.createElement('img');
            imgArticle.classList.add('vignette-article');
            let aArticle = document.createElement('a');
            aArticle.classList.add('lien-article');
            let divArticleText = document.createElement('div');
            divArticleText.classList.add('article-text');
            let divArticleDescription = document.createElement('div');
            divArticleDescription.classList.add('article-description');
            let divArticleTag = document.createElement('div');
            divArticleTag.classList.add('article-tag');
            let pDescription = document.createElement('p');
            pDescription.classList.add('description');
            let pDate = document.createElement('p');
            pDate.classList.add('article-date');
            // ? Récupération et assignement du titre de l'article
            h2Title.innerHTML =
               listItemXML[i].getElementsByTagName(
                  'title'
               )[0].childNodes[0].nodeValue;
            // console.log(listItemXML[i]);
            // console.log({ "title": h2Title.innerHTML });
            let srcImg;
            // Vérifier si la balise "media:content" existe
            if (listItemXML[i].getElementsByTagName('media:content').length > 0) {
               // Récupérer l'attribut 'url' de la balise "media:content"
               srcImg = listItemXML[i].getElementsByTagName('media:content')[0].getAttribute('url');
            } else {
               // Ne rien faire si la balise "media:content" n'existe pas
               srcImg = "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
            }
            // console.log({ "srcImg": srcImg });

            // ? Récupération et assignement via l'attribut "alt" de la balise <img> de la description
            let altImg =
               listItemXML[i].getElementsByTagName('description')[0].innerHTML;

            /*
            ? console.log({ "altImg": altImg });
            * <![CDATA[
            * <img src="https://blockchainstock.blob.core.windows.net:443/features/4CCE17AEF0BB2C1203D415AF28DA829BDE24771EAF904827BEFC9ED70057A83C.jpg" />
            * <br />
            * The Binance has revealed its plans to support the upcoming network upgrade of IRISnet (IRIS).
            * <a href="https://Blockchain.News/news/binance-announces-support-irisnet-network-upgrade"> (Read More)</a>
            * ]]>
            */
            // console.log({ "altImg": altImg });

            const regex = /<!\[CDATA\[([^\]]*)\]]>/g;
            // Remove CDATA tags
            const textWithoutCdata = altImg.replace(regex, '$1');
            altImg = altImg.replace(regex, '');
            imgArticle.src = srcImg;
            imgArticle.alt = altImg;

            /*
            ? console.log({ "textWithoutCdata": textWithoutCdata });
            * <img src="https://blockchainstock.blob.core.windows.net:443/features/4CCE17AEF0BB2C1203D415AF28DA829BDE24771EAF904827BEFC9ED70057A83C.jpg" />
            * <br />
            * The Binance has revealed its plans to support the upcoming network upgrade of IRISnet (IRIS).
            * <a href="https://Blockchain.News/news/binance-announces-support-irisnet-network-upgrade"> (Read More)</a>
            */
            // console.log({ "textWithoutCdata": textWithoutCdata });

            let cleanText = textWithoutCdata.replace(/<[^>]*>/g, '');

            /*
            ? console.log({ "cleanText": cleanText });
            * The Binance has revealed its plans to support the upcoming network upgrade of IRISnet (IRIS). (Read More)
            */
            // console.log({ "cleanText": cleanText });


            const linkRegex = /<a href="([^"]+)">([^<]+)<\/a>/g;
            const matches = textWithoutCdata.matchAll(linkRegex);

            for (const match of matches) {
               const linkURL = match[1];
               aArticle.href = linkURL;
               aArticle.target = '_blank';
               aArticle.textContent = "Lire l'article";
               console.log({ "link": linkURL });
            }

            /*
            ? console.log({ "link": link });
            * "https://Blockchain.News/news/binance-announces-support-irisnet-network-upgrade"
            */

            console.log({ "aArticle": aArticle });

            cleanText = cleanText.replace('(Read More)', '');
            console.log({ "cleanText": cleanText });

            // ? Récupération des tag "Category" XML
            let tagList = listItemXML[i].getElementsByTagName('category');
            let tagArray = [];
            let tag;
            for (let i = 0; i < tagList.length; i++) {
               tag = tagList[i].childNodes[0].nodeValue;
               tagArray.push(tag);
            }
            for (let i = 0; i < tagArray.length; i++) {
               let pTag = document.createElement('p');
               pTag.classList.add('tag', 'text-muted', 'text-info');
               let tag = tagArray[i];
               pTag.innerText = tag;
               divArticleTag.appendChild(pTag);
               console.log({ "pTag": pTag.innerHTML });
            }
            pDescription.innerHTML = cleanText;

            // ? Formatage de la date au format souhaité
            let date =
               listItemXML[i].getElementsByTagName('pubDate')[0].childNodes[0]
                  .nodeValue;
            date = date.substring(0, 16);
            pDate.innerHTML = date;

            console.log({ "pDate": pDate.innerHTML });

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
            divArticleContainerBlockchain.appendChild(divArticle);

         }
      })
      .catch((err) => {
         console.log(err);
      });
} catch {
   (err) => console.log(err);
}