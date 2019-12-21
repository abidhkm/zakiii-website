const fse = require('fs-extra');
const fs = require('fs');

// get languages
const languages = fs.readdirSync("data").filter((name) => name.length === 2);

// for each language
for (const language of languages) {
  if (!fse.existsSync(`data/${language}/articles/list.json`)) continue;

  fse.ensureDirSync(`out/${language}/articles`)
  const articlesList = [];
  const articlesSlugs = fse.readJsonSync(`data/${language}/articles/list.json`);
  for (const articleSlug of articlesSlugs) {
    const article = fse.readJsonSync(`data/${language}/articles/${articleSlug}/info.json`);
    articlesList.push({
      title: article.title,
      slug: articleSlug
    })
    const content = fse.readFileSync(`data/${language}/articles/${articleSlug}/content.md`);

    // save [articleSlug].json
    fse.writeJsonSync(
      `out/${language}/articles/${articleSlug}.json`,
      {
        ...article,
        slug: articleSlug,
        content: String(content),
      }
    );
  }

  // save list.json
  fse.writeJsonSync(`out/${language}/articles/list.json`, articlesList);
}
