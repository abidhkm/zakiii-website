import * as functions from 'firebase-functions';
import * as fse from "fs-extra";
import * as sm from "sitemap";
import * as path from "path";

// get languages
const languages = fse.readdirSync(path.join(__dirname, "../data")).filter((name) => name.length === 2);

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
  new Promise((resolve) => {
    const urlsInfo = [];
    for (const language of languages) {
      if (!fse.existsSync(path.join(__dirname, `../data/${language}/articles/list.json`))) continue;

      const articles = fse.readJsonSync(path.join(__dirname, `../data/${language}/articles/list.json`));
      for (const article of articles) {
        urlsInfo.push((language === "en" ? "" : "/" + language) + '/Articles/' + article.slug);
      }
    }
    resolve(urlsInfo);
  }),
  // Books
  new Promise((resolve) => {
    const urlsInfo = [];
    for (const language of languages) {
      if (!fse.existsSync(path.join(__dirname, `../data/${language}/books/list.json`))) continue;

      const books = fse.readJsonSync(path.join(__dirname, `../data/${language}/books/list.json`));
      for (const book of books) {
        urlsInfo.push((language === "en" ? "" : "/" + language) + '/Books/' + book.slug);
      }
    }
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
