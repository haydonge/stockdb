import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_DM64CNG_.mjs';
import 'clsx';
import 'html-escaper';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BbJZUkG7.js"}],"styles":[{"type":"external","src":"/_astro/index.CAcvdRvV.css"},{"type":"inline","content":"@view-transition{navigation: auto;}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",Segoe UI Symbol,\"Noto Color Emoji\"}.container[data-astro-cid-37fxchfa]{display:flex;flex-direction:column;align-items:center;padding:1rem;width:100%;box-sizing:border-box}header[data-astro-cid-37fxchfa]{width:100%;display:flex;flex-direction:column;align-items:center;text-align:center}.button-group[data-astro-cid-37fxchfa]{display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:1rem}.bg-gradient[data-astro-cid-37fxchfa]{background:linear-gradient(to bottom,black,var(--theme-base))}@media (min-width: 640px){.container[data-astro-cid-37fxchfa]{padding:2rem}header[data-astro-cid-37fxchfa]{flex-direction:row;justify-content:space-between}.button-group[data-astro-cid-37fxchfa]{justify-content:flex-end;gap:1.5rem}}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/addlink.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/addLink\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"addLink.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/addLink.json.ts","pathname":"/api/addLink.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/addstock.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/addstock\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"addstock.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/addstock.json.ts","pathname":"/api/addstock.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/process-data.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/process-data\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"process-data.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/process-data.json.ts","pathname":"/api/process-data.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/searchdata.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/searchdata\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"searchdata.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/searchdata.json.ts","pathname":"/api/searchdata.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/[id].json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/([^/]+?)\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false},{"content":".json","dynamic":false,"spread":false}]],"params":["id"],"component":"src/pages/api/[id].json.ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.B-wYAeaR.js"}],"styles":[{"type":"external","src":"/_astro/index.CAcvdRvV.css"},{"type":"inline","content":"@view-transition{navigation: auto;}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",Segoe UI Symbol,\"Noto Color Emoji\"}.container[data-astro-cid-37fxchfa]{display:flex;flex-direction:column;align-items:center;padding:1rem;width:100%;box-sizing:border-box}header[data-astro-cid-37fxchfa]{width:100%;display:flex;flex-direction:column;align-items:center;text-align:center}.button-group[data-astro-cid-37fxchfa]{display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:1rem}.bg-gradient[data-astro-cid-37fxchfa]{background:linear-gradient(to bottom,black,var(--theme-base))}@media (min-width: 640px){.container[data-astro-cid-37fxchfa]{padding:2rem}header[data-astro-cid-37fxchfa]{flex-direction:row;justify-content:space-between}.button-group[data-astro-cid-37fxchfa]{justify-content:flex-end;gap:1.5rem}}\n"}],"routeData":{"route":"/index2","isIndex":false,"type":"page","pattern":"^\\/index2\\/?$","segments":[[{"content":"index2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/index2.astro","pathname":"/index2","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.hO2aa7uw.js"}],"styles":[{"type":"external","src":"/_astro/index.CAcvdRvV.css"},{"type":"inline","content":"@view-transition{navigation: auto;}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",Segoe UI Symbol,\"Noto Color Emoji\"}.container[data-astro-cid-37fxchfa]{display:flex;flex-direction:column;align-items:center;padding:1rem;width:100%;box-sizing:border-box}header[data-astro-cid-37fxchfa]{width:100%;display:flex;flex-direction:column;align-items:center;text-align:center}.button-group[data-astro-cid-37fxchfa]{display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:1rem}.bg-gradient[data-astro-cid-37fxchfa]{background:linear-gradient(to bottom,black,var(--theme-base))}@media (min-width: 640px){.container[data-astro-cid-37fxchfa]{padding:2rem}header[data-astro-cid-37fxchfa]{flex-direction:row;justify-content:space-between}.button-group[data-astro-cid-37fxchfa]{justify-content:flex-end;gap:1.5rem}}\n"}],"routeData":{"route":"/search","isIndex":false,"type":"page","pattern":"^\\/search\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.astro","pathname":"/search","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CAcvdRvV.css"}],"routeData":{"route":"/tw","isIndex":false,"type":"page","pattern":"^\\/tw\\/?$","segments":[[{"content":"tw","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tw.astro","pathname":"/tw","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D-Ys3d0x.js"}],"styles":[{"type":"external","src":"/_astro/index.CAcvdRvV.css"},{"type":"inline","content":"@view-transition{navigation: auto;}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",Segoe UI Symbol,\"Noto Color Emoji\"}.container[data-astro-cid-37fxchfa]{display:flex;flex-direction:column;align-items:center;padding:1rem;width:100%;box-sizing:border-box}header[data-astro-cid-37fxchfa]{width:100%;display:flex;flex-direction:column;align-items:center;text-align:center}.button-group[data-astro-cid-37fxchfa]{display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:1rem}.bg-gradient[data-astro-cid-37fxchfa]{background:linear-gradient(to bottom,black,var(--theme-base))}@media (min-width: 640px){.container[data-astro-cid-37fxchfa]{padding:2rem}header[data-astro-cid-37fxchfa]{flex-direction:row;justify-content:space-between}.button-group[data-astro-cid-37fxchfa]{justify-content:flex-end;gap:1.5rem}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/demo/astro_db_3_good/src/pages/404.astro",{"propagation":"none","containsHead":true}],["D:/demo/astro_db_3_good/src/pages/index.astro",{"propagation":"none","containsHead":true}],["D:/demo/astro_db_3_good/src/pages/index2.astro",{"propagation":"none","containsHead":true}],["D:/demo/astro_db_3_good/src/pages/search.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/api/[id].json.ts":"chunks/pages/_id__nBXnkUSO.mjs","/src/pages/api/addLink.json.ts":"chunks/pages/addLink_zQ7k0beR.mjs","/src/pages/api/addstock.json.ts":"chunks/pages/addstock_DD_hjyBN.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_BXUiAJGb.mjs","/src/pages/index2.astro":"chunks/pages/index2_BYCh7v8r.mjs","/src/pages/api/process-data.json.ts":"chunks/pages/process-data_DTFKrTck.mjs","/src/pages/search.astro":"chunks/pages/search_CF_XhT1D.mjs","/src/pages/api/searchdata.json.ts":"chunks/pages/searchdata_3nvw7wkV.mjs","/src/pages/tw.astro":"chunks/pages/tw_B_ROXdJE.mjs","\u0000@astrojs-manifest":"manifest_WJLS4Pnw.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_D6crlED3.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_0Ip7Db-Q.mjs","\u0000@astro-page:src/pages/api/addLink.json@_@ts":"chunks/addLink_BzGseOSI.mjs","\u0000@astro-page:src/pages/api/addstock.json@_@ts":"chunks/addstock_Ch-a6yty.mjs","\u0000@astro-page:src/pages/api/process-data.json@_@ts":"chunks/process-data_BF84U2mF.mjs","\u0000@astro-page:src/pages/api/searchdata.json@_@ts":"chunks/searchdata_p5epB681.mjs","\u0000@astro-page:src/pages/api/[id].json@_@ts":"chunks/_id__DZ4Zh_6F.mjs","\u0000@astro-page:src/pages/index2@_@astro":"chunks/index2_1nVpT3yz.mjs","\u0000@astro-page:src/pages/search@_@astro":"chunks/search_B2VcS4VW.mjs","\u0000@astro-page:src/pages/tw@_@astro":"chunks/tw_BTl6sP3U.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_BzOADN9V.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.B-wYAeaR.js","/astro/hoisted.js?q=2":"_astro/hoisted.D-Ys3d0x.js","/astro/hoisted.js?q=0":"_astro/hoisted.hO2aa7uw.js","/astro/hoisted.js?q=3":"_astro/hoisted.BbJZUkG7.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/error-404.3WIKjvvr.jpeg","/_astro/dots.B3Rppea-.png","/_astro/sanmina-logo.BgJUZxxd.png","/_astro/index.CAcvdRvV.css","/favicon.svg","/sanmina-logo.png","/wklbabylogopng.png","/_astro/hoisted.B-wYAeaR.js","/_astro/hoisted.BbJZUkG7.js","/_astro/hoisted.D-Ys3d0x.js","/_astro/hoisted.hO2aa7uw.js","/_astro/UpdateDiaglog.astro_astro_type_script_index_0_lang.C94y6ndp.js"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
