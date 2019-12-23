const fse = require('fs-extra');
const fs = require('fs');

// get languages
const languages = fs.readdirSync("data").filter((name) => name.length === 2);

// for each language
for (const language of languages) {
  if (!fse.existsSync(`data/${language}/projects/list.json`)) continue;

  fse.ensureDirSync(`out/${language}/projects`)

  // list.json
  const projectsList = [];
  const projectsSlugs = fse.readJsonSync(`data/${language}/projects/list.json`);
  for (const projectSlug of projectsSlugs) {
    const project = fse.readJsonSync(`data/${language}/projects/${projectSlug}/info.json`);
    projectsList.push({
      ...project,
      slug: projectSlug,
    })
  }
  fse.writeJsonSync(`out/${language}/projects/list.json`, projectsList);

  // recent.json
  const recentProjectsList = [];
  const recentProjectsSlugs = fse.readJsonSync(`data/${language}/projects/recent.json`);
  for (const projectSlug of recentProjectsSlugs) {
    const project = fse.readJsonSync(`data/${language}/projects/${projectSlug}/info.json`);
    recentProjectsList.push({
      ...project,
      slug: projectSlug,
    })
  }
  fse.writeJsonSync(`out/${language}/projects/recent.json`, recentProjectsList);
}
