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
  const recentArticlesList = [];
  const recentArticlesSlugs = fse.readJsonSync(`data/${language}/articles/recent.json`);

  for (const articleSlug of articlesSlugs) {
    const article = fse.readJsonSync(`data/${language}/articles/${articleSlug}/info.json`);

    articlesList.push({
      title: article.title,
      slug: articleSlug
    })
    recentArticlesList.push({
      title: article.title,
      slug: articleSlug,
      description: article.description,
      image: article.image,
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
  // save recent.json
  fse.writeJsonSync(`out/${language}/articles/recent.json`, recentArticlesList);
}
