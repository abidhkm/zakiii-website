import NProgress from "nprogress";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { initWindowGlobals } from "src/common/window.globals";
import { LazySwitch } from "src/components/lazy-switch";
import { frontendConfig } from "src/config";
import { mainConfig } from "t9/apps/main/config";
import { mainStore } from "t9/redux/main";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import "./style";

// only called once across entry.
initWindowGlobals(mainConfig.app.frontendBaseURL, mainConfig.language.isDefaultLanguage, mainStore);

const lazyComponents = window.globals.addLazyComponents([]);

window.globals.addLazyOperations([]);

export const App: React.SFC<{}> = () => {
  return (
    <>
      <Navbar />
      <LazySwitch
        transitionKey={1}
        transitionClass="fade"
        timeout={frontendConfig.animation.animationDuration}

        childrenKey="app-level"
        lazyComponents={lazyComponents}
      />
      <Footer />
    </>
  );
};

render(
  (<Provider store={mainStore}><Router history={window.globals.history}><App /></Router></Provider>),
  document.getElementById("app-container"),
);

// Progress bar
NProgress.configure({ showSpinner: false, trickleSpeed: 200, minimum: .4, speed: 500 });
let _oldStatus: string;
mainStore.subscribe(() => {
  const status = mainStore.getState().status.status;
  if (_oldStatus === status) { return; }
  _oldStatus = status;
  if (status === "active") {
    NProgress.start();
  } else if (status === "idle") {
    NProgress.done();
  }
});
