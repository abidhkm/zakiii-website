import { fullstackConfig } from "config";
import { frontendConfig } from "src/config";
import { language } from "../language";

const isDev = frontendConfig.environment.isDev;
const host = (typeof window !== "undefined") ? window.location.host : (isDev ? "127.0.0.1" : "www.zakiii.com");
const protocol = (typeof window !== "undefined") ? window.location.protocol : (isDev ? "http" : "https");
const origin = protocol + "//" + host;

const frontendBaseURL = language.isDefaultLanguage ? "" : "/" + language.languageCode;

export const app = {
  host,
  origin,
  protocol,

  backendURL: fullstackConfig.app(isDev).backendURL,
  frontendBaseURL,
  frontendURL: origin + frontendBaseURL,
};
