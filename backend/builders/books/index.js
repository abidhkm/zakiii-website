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

  // recent.json
  const recentBooksList = [];
  const recentBooksSlugs = fse.readJsonSync(`data/${language}/books/recent.json`);
  for (const bookSlug of recentBooksSlugs) {
    const book = fse.readJsonSync(`data/${language}/books/${bookSlug}/info.json`);
    recentBooksList.push({
      title: book.title,
      slug: bookSlug,
      description: book.description,
      image: book.image,
    })
  }
  fse.writeJsonSync(`out/${language}/books/recent.json`, recentBooksList);

  // favorite.json
  const favoriteBooksList = [];
  const favoriteBooksSlugs = fse.readJsonSync(`data/${language}/books/favorite.json`);
  for (const bookSlug of favoriteBooksSlugs) {
    const book = fse.readJsonSync(`data/${language}/books/${bookSlug}/info.json`);
    favoriteBooksList.push({
      title: book.title,
      slug: bookSlug,
      description: book.description,
      image: book.image,
    })
  }
  fse.writeJsonSync(`out/${language}/books/favorite.json`, favoriteBooksList);
}
