// tslint:disable-next-line: no-var-requires
const defaultLanguageCode = require("../../../../../t9config.json").defaultLanguage;
const languageCode = "{|language code|}";

export const language = {
  defaultLanguageCode,
  isDefaultLanguage: languageCode === defaultLanguageCode,
  languageCode,
};
