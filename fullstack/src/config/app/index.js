// FIXME: ts doesn't load code outside of baseUrl!
export const app = (isDev) => ({
  backendURL: isDev ? "http://127.0.0.1:9090" : "https://api.zakiii.com",
  frontendURL: isDev ? "http://127.0.0.1:8080" : "https://zakiii.com",
});
