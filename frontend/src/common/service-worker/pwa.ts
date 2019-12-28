if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then((registration) => { /* */ })
      .catch((registrationError) => {
        // tslint:disable-next-line: no-console
        console.log("SW registration failed: ", registrationError);
      });
  });
}
