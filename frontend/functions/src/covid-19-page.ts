import * as functions from 'firebase-functions';
import * as fs from "fs";
import * as path from "path";

export const covid19Page = functions.https.onRequest((request, response) => {
  const language = request.path.startsWith("/ar") ? "ar/" : "";

  const pageInfo = {
    title: "Coronavirus Live Updates",
    description: "Global case statistics for coronavirus, updated live. Read and share the latest information.",
    image: "https://ncov.totok.ai/pic/coronavirus_share.png",
  };
  const htmlPath = path.join(__dirname, `../html/${language}index.html`);
  fs.readFile(htmlPath, { encoding: 'utf-8' }, (err, data) => {
    if (!err) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      let html = data;
      html = html.replace(/<title>[\s\S]+<\/title>/, `<title>${pageInfo.title} | zakiii</title>`);
      html = html.replace(/<meta name="description" content="[^"]+">/, `<meta name="description" content="${pageInfo.description}">`);
      html = html.replace(/<meta property="og:image" content="[^"]+">/, `<meta property="og:image" content="${pageInfo.image}">`);
      response.write(html);
      response.end();
    } else {
      response.status(500);
      response.end();
      console.log(err);
    }
  });
});
