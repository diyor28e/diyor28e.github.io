const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./login-disclaimer.CAqRwBN-.js","./chunk-vendor.BPExGYxB.js","./zoom-ui-vue3.Dw9QoDCQ.js","../css/zoom-ui-vue3.DSkENbsV.css","./locales.QCMSCURu.js","../css/login-disclaimer.DTZvB6VP.css","./zoom-privacy.CtaP9SFP.js","./user-difference.jxCEu2_c.js","../css/user-difference._TP8NjqD.css","./feedback.Bo976QBp.js","../css/feedback.0KsxecdE.css","./aic-guide.s9Gs23Qt.js","../css/aic-guide.BwN87691.css"])))=>i.map(i=>d[i]);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const microsLoginDisclaimer = () => __vitePreload(() => import("./login-disclaimer.CAqRwBN-.js"), true ? __vite__mapDeps([0,1,2,3,4,5]) : void 0, import.meta.url);
const microsZoomPrivacy = () => __vitePreload(() => import("./zoom-privacy.CtaP9SFP.js"), true ? __vite__mapDeps([6,1,2,3,4]) : void 0, import.meta.url);
const microsUserDifference = () => __vitePreload(() => import("./user-difference.jxCEu2_c.js"), true ? __vite__mapDeps([7,1,4,2,3,8]) : void 0, import.meta.url);
const microsFeedback = () => __vitePreload(() => import("./feedback.Bo976QBp.js"), true ? __vite__mapDeps([9,1,2,3,4,10]) : void 0, import.meta.url);
const microsAICGuide = () => __vitePreload(() => import("./aic-guide.s9Gs23Qt.js"), true ? __vite__mapDeps([11,1,2,3,4,12]) : void 0, import.meta.url);
class MicrosQueue {
  constructor() {
    this.micros = [];
    this.isRunning = false;
  }
  add(micro) {
    this.micros.push(micro);
    if (!this.isRunning) {
      this._run();
    }
  }
  _run() {
    if (this.micros.length === 0) {
      this.isRunning = false;
      return;
    }
    this.isRunning = true;
    const microApp = this.micros.shift();
    try {
      microApp((error) => {
        if (error) {
          console.error("micro execution failed:", error);
        }
        this._run();
      });
    } catch (error) {
      console.error("micro execution failed:", error);
      this._run();
    }
  }
}
const loadMicros = (micros) => {
  return micros().then((module) => {
    return module.default;
  });
};
const queue = new MicrosQueue();
const {
  loginDisclaimer,
  showPrivacyWindow,
  enableUserDifference,
  feedback,
  isHaveSideMenu,
  showAicCoachMark
} = window.microsDatas || {};
if (showPrivacyWindow) {
  queue.add((done) => {
    loadMicros(microsZoomPrivacy).then((runner) => {
      runner(done);
    });
  });
}
if (loginDisclaimer == null ? void 0 : loginDisclaimer.showUserLoginDisclaimer) {
  queue.add((done) => {
    loadMicros(microsLoginDisclaimer).then((runner) => {
      runner(done);
    });
  });
}
if (enableUserDifference) {
  loadMicros(microsUserDifference).then((runner) => {
    runner();
  });
}
if (isHaveSideMenu && showAicCoachMark) {
  queue.add((done) => {
    loadMicros(microsAICGuide).then((runner) => {
      runner(done);
    });
  });
}
if (feedback) {
  loadMicros(microsFeedback).then((runner) => {
    runner();
  });
}
