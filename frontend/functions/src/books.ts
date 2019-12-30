import * as functions from 'firebase-functions';
import * as fs from "fs";
import * as path from "path";

export const books = functions.https.onRequest((request, response) => {
  const language = request.path.startsWith("/ar") ? "ar/" : "";
  const bookSlug = decodeURI(request.path).split("/")[language ? 3 : 2];
  const bookDataPath = path.join(__dirname, `../data/${language || "en/"}/books/${bookSlug}.json`);

  if (!fs.existsSync(bookDataPath)) {
    console.log(bookDataPath + " | not found");

    response.writeHead(302, { 'Location': `/${language}Books` });
    response.end();
    return;
  }
  const book = require(bookDataPath);
  const htmlPath = path.join(__dirname, `../html/${language}index.html`);
  fs.readFile(htmlPath, { encoding: 'utf-8' }, (err, data) => {
    if (!err) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      let html = data;
      html = html.replace(/<title>[\s\S]+<\/title>/, `<title>${book.title} | zakiii</title>`);
      html = html.replace(/<meta name="description" content="[^"]+">/, `<meta name="description" content="${book.description}">`);
      html = html.replace(/<meta property="og:image" content="[^"]+">/, `<meta property="og:image" content="${book.image}">`);
      response.write(html);
      response.end();
    } else {
      response.status(500);
      response.end();
      console.log(err);
    }
  });
});
