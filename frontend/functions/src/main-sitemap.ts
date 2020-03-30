import * as functions from 'firebase-functions';
import * as sm from "sitemap";
import axios from "axios";

// get languages
const languages = ["en", "ar"];
const backendURL = process.env.NODE_ENV === "development" ? "http://127.0.0.1:9090" : "https://data.zakiii.com";

const promises = [
  // Static Pages
  new Promise((resolve) => {
    const urlsInfo = [];
    const urls = [
      "/",
      "/Developer",
      "/Reader",
      "/Articles",
      "/Books",
      "/Projects",
      "/COVID-19",
    ];
    for (const language of languages) {
      for (const url of urls) {
        urlsInfo.push((language === "en" ? "" : "/" + language) + url);
      }
    }
    resolve(urlsInfo);
  }),
  // Articles
  new Promise(async (resolve) => {
    const urlsInfo = [];
    for (const language of languages)
      try {
        const { data: articles } = await axios.get(backendURL + "/" + language + "/articles/list.json");
        for (const article of articles) {
          urlsInfo.push((language === "en" ? "" : "/" + language) + '/Articles/' + article.slug);
        }
      } catch (error) { }
    resolve(urlsInfo);
  }),
  // Books
  new Promise(async (resolve) => {
    const urlsInfo = [];
    for (const language of languages)
      try {
        const { data: books } = await axios.get(backendURL + "/" + language + "/books/list.json");
        for (const book of books) {
          urlsInfo.push((language === "en" ? "" : "/" + language) + '/Books/' + book.slug);
        }
      } catch (error) { }
    resolve(urlsInfo);
  }),
];

export const mainSitemap = functions.https.onRequest((request, response) => {
  Promise
    .all(promises)
    .then((urlsArray) => {

      const sitemap = sm.createSitemap({ hostname: "https://www.zakiii.com/", cacheTime: 600000 });
      for (const urls of urlsArray) {
        for (const url of urls as string[]) {
          sitemap.add({
            url
          });
        }
      }
      response.writeHead(200, { 'Content-Type': 'application/xml' });
      response.write(sitemap.toString());
      response.end();

    })
    .catch((reason) => {
      console.log(reason);
      response.writeHead(500);
      response.end();
      return;
    })
});
