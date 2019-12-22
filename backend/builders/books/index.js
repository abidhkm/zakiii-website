const fse = require('fs-extra');
const fs = require('fs');

// get languages
const languages = fs.readdirSync("data").filter((name) => name.length === 2);

// for each language
for (const language of languages) {
  if (!fse.existsSync(`data/${language}/books/list.json`)) continue;

  fse.ensureDirSync(`out/${language}/books`)
  const booksList = [];
  const booksSlugs = fse.readJsonSync(`data/${language}/books/list.json`);
  for (const bookSlug of booksSlugs) {
    const book = fse.readJsonSync(`data/${language}/books/${bookSlug}/info.json`);
    booksList.push({
      title: book.title,
      slug: bookSlug
    })
    const content = fse.readFileSync(`data/${language}/books/${bookSlug}/content.md`);

    // save [bookSlug].json
    fse.writeJsonSync(
      `out/${language}/books/${bookSlug}.json`,
      {
        ...book,
        slug: bookSlug,
        content: String(content),
      }
    );
  }

  // save list.json
  fse.writeJsonSync(`out/${language}/books/list.json`, booksList);
}
