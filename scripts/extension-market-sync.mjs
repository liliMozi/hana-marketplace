#!/usr/bin/env node
import { createRequire as __createRequire } from "node:module"; const require = __createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// shared/edition-identity-core.cjs
var require_edition_identity_core = __commonJS({
  "shared/edition-identity-core.cjs"(exports, module) {
    "use strict";
    var K = new Uint32Array([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]);
    function sha256Hex(text) {
      const data = new TextEncoder().encode(String(text));
      const bitLength = data.length * 8;
      const blocks = Math.ceil((data.length + 9) / 64);
      const bytes = new Uint8Array(blocks * 64);
      bytes.set(data);
      bytes[data.length] = 128;
      const view = new DataView(bytes.buffer);
      view.setUint32(bytes.length - 8, Math.floor(bitLength / 4294967296));
      view.setUint32(bytes.length - 4, bitLength >>> 0);
      const h = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]);
      const w = new Uint32Array(64);
      const rotr = (x, n) => x >>> n | x << 32 - n;
      for (let offset = 0; offset < bytes.length; offset += 64) {
        for (let i = 0; i < 16; i += 1) w[i] = view.getUint32(offset + i * 4);
        for (let i = 16; i < 64; i += 1) {
          const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ w[i - 15] >>> 3;
          const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ w[i - 2] >>> 10;
          w[i] = w[i - 16] + s0 + w[i - 7] + s1 >>> 0;
        }
        let [a, b, c, d, e, f, g, hh] = h;
        for (let i = 0; i < 64; i += 1) {
          const t1 = hh + (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) + (e & f ^ ~e & g) + K[i] + w[i] >>> 0;
          const t2 = (rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) + (a & b ^ a & c ^ b & c) >>> 0;
          hh = g;
          g = f;
          f = e;
          e = d + t1 >>> 0;
          d = c;
          c = b;
          b = a;
          a = t1 + t2 >>> 0;
        }
        h[0] += a;
        h[1] += b;
        h[2] += c;
        h[3] += d;
        h[4] += e;
        h[5] += f;
        h[6] += g;
        h[7] += hh;
      }
      return Array.from(h, (word) => word.toString(16).padStart(8, "0")).join("");
    }
    var URL_KEYS = /* @__PURE__ */ new Set(["accountBaseUrl", "desktopFeedUrl", "officialCnMarketUrl"]);
    function digestOfficialValue(key, value) {
      const normalized = URL_KEYS.has(key) ? value : value.toLowerCase();
      return sha256Hex(`hana-official-identity-v1
${key}
${normalized}`);
    }
    function matchesOfficialValue(key, value, digests) {
      const reserved = digests[key];
      if (!Array.isArray(reserved)) throw new Error(`unknown official identity key: ${key}`);
      if (typeof value !== "string" || value.length === 0) return false;
      return reserved.includes(digestOfficialValue(key, value));
    }
    function canonical(value) {
      if (value === null || typeof value !== "object") return JSON.stringify(value);
      if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
      return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
    }
    function identitySubset(config) {
      const updates = config && config.updates && typeof config.updates === "object" ? config.updates : {};
      const services = config && config.services && typeof config.services === "object" ? config.services : {};
      const sources = config?.market?.sources && typeof config.market.sources === "object" ? config.market.sources : {};
      return {
        id: config?.id,
        kind: config?.kind,
        displayName: config?.displayName,
        desktop: config?.desktop,
        services: { accountBaseUrl: services.accountBaseUrl, features: services.features },
        market: { sources: { global: sources.global } },
        modelCatalog: config?.modelCatalog,
        updates: {
          desktop: updates.desktop,
          artifact: { channelBaseUrl: updates.artifact?.channelBaseUrl },
          mobile: updates.mobile
        }
      };
    }
    function createPublicEditionIdentity({ updateSources, matchesOfficialValue: matchesOfficialValue2 }) {
      const { PUBLIC_GITHUB_OWNER, PUBLIC_GITHUB_REPO, PUBLIC_GITHUB_RELEASE_BASE } = updateSources;
      const PUBLIC_EDITION2 = Object.freeze({
        id: "hana-global",
        kind: "official-global",
        displayName: "Hana",
        desktop: Object.freeze({
          appId: "com.hanako.app",
          productName: "HanaAgent",
          dataDirName: ".hanako",
          devDataDirName: ".hanako-dev"
        }),
        services: Object.freeze({
          accountBaseUrl: null,
          features: Object.freeze({
            relay: false,
            attachments: false,
            feedback: false,
            platformModels: false,
            activityReporting: false,
            usageReporting: false
          })
        }),
        market: Object.freeze({
          sources: Object.freeze({
            global: "https://raw.githubusercontent.com/liliMozi/hana-marketplace/main/index.v2.json"
          })
        }),
        modelCatalog: Object.freeze({
          url: "https://github.com/liliMozi/hana-model-catalog/releases/latest/download/model-catalog.v2.json"
        }),
        updates: Object.freeze({
          desktop: Object.freeze({
            feedUrl: PUBLIC_GITHUB_RELEASE_BASE,
            digestBaseUrl: `${PUBLIC_GITHUB_RELEASE_BASE}/{tag}/{asset}`,
            installerPageUrl: "https://openhanako.com/",
            releasesPageUrl: `https://github.com/${PUBLIC_GITHUB_OWNER}/${PUBLIC_GITHUB_REPO}/releases`
          }),
          artifact: Object.freeze({
            channelBaseUrl: `${PUBLIC_GITHUB_RELEASE_BASE}/channels`
          }),
          mobile: Object.freeze({
            versionBaseUrl: null,
            expo: null
          })
        })
      });
      function hasPublicCnMarketSource(config) {
        return matchesOfficialValue2("officialCnMarketUrl", config?.market?.sources?.cn);
      }
      function isPublicDesktopEdition2(config) {
        return canonical(identitySubset(config)) === canonical(identitySubset(PUBLIC_EDITION2)) && hasPublicCnMarketSource(config);
      }
      return { PUBLIC_EDITION: PUBLIC_EDITION2, isPublicDesktopEdition: isPublicDesktopEdition2 };
    }
    module.exports = { sha256Hex, digestOfficialValue, matchesOfficialValue, createPublicEditionIdentity };
  }
});

// shared/public-update-sources.cjs
var require_public_update_sources = __commonJS({
  "shared/public-update-sources.cjs"(exports, module) {
    "use strict";
    var PUBLIC_GITHUB_OWNER = "liliMozi";
    var PUBLIC_GITHUB_REPO = "openhanako";
    var PUBLIC_GITHUB_RELEASE_BASE = `https://github.com/${PUBLIC_GITHUB_OWNER}/${PUBLIC_GITHUB_REPO}/releases/download`;
    var PUBLIC_R2_ORIGIN = "https://dl.openhanako.com";
    function assertPublicChannel(channel) {
      if (channel !== "stable" && channel !== "beta") throw new Error("Public update channel must be stable or beta");
      return channel;
    }
    function publicChannelManifestSources(channel) {
      assertPublicChannel(channel);
      return [
        { id: "origin", url: `${PUBLIC_GITHUB_RELEASE_BASE}/channels/${channel}.json` },
        { id: "r2", url: `${PUBLIC_R2_ORIGIN}/channels/${channel}.json` }
      ];
    }
    function cleanPublicUrl(value) {
      try {
        const url = new URL(value);
        if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) return null;
        return url;
      } catch {
        return null;
      }
    }
    function publicArtifactReleaseTag(base) {
      const url = cleanPublicUrl(base);
      if (!url) return null;
      const prefix = url.origin === "https://github.com" ? `/${PUBLIC_GITHUB_OWNER}/${PUBLIC_GITHUB_REPO}/releases/download/` : url.origin === PUBLIC_R2_ORIGIN ? "/" : null;
      if (!prefix || !url.pathname.startsWith(prefix)) return null;
      const tag = url.pathname.slice(prefix.length).replace(/\/$/, "");
      return /^train-(?:(?:stable|beta)-)?[1-9][0-9]*$/.test(tag) ? tag : null;
    }
    function withPublicArtifactMirrorFallbacks(mirrors) {
      if (!Array.isArray(mirrors)) return mirrors;
      const tags = mirrors.map(publicArtifactReleaseTag);
      if (!tags.length || tags.some((tag) => !tag)) return mirrors;
      const result = [...mirrors];
      for (const tag of tags) {
        for (const candidate of [`${PUBLIC_GITHUB_RELEASE_BASE}/${tag}`, `${PUBLIC_R2_ORIGIN}/${tag}`]) {
          if (!result.some((base) => String(base).replace(/\/+$/, "") === candidate)) result.push(candidate);
        }
      }
      return result;
    }
    function safeVersion(version) {
      return typeof version === "string" && /^(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/.test(version);
    }
    function publicInstallerUrls(version, filename) {
      if (!safeVersion(version) || typeof filename !== "string" || !/^[A-Za-z0-9][A-Za-z0-9._+-]*$/.test(filename)) {
        throw new Error("Invalid public installer version or filename");
      }
      return {
        origin: `${PUBLIC_GITHUB_RELEASE_BASE}/v${version}/${filename}`,
        r2: `${PUBLIC_R2_ORIGIN}/${filename}`
      };
    }
    module.exports = {
      PUBLIC_GITHUB_OWNER,
      PUBLIC_GITHUB_REPO,
      PUBLIC_GITHUB_RELEASE_BASE,
      PUBLIC_R2_ORIGIN,
      assertPublicChannel,
      publicChannelManifestSources,
      withPublicArtifactMirrorFallbacks,
      publicInstallerUrls
    };
  }
});

// shared/official-identity-digests.json
var require_official_identity_digests = __commonJS({
  "shared/official-identity-digests.json"(exports, module) {
    module.exports = {
      version: 1,
      digests: {
        serviceDomain: [
          "413a3f5ec7ebbd3eb24f52c1c8dfa23ccf9408b4a1c85c579a08242e7af74241"
        ],
        serviceSubdomainParent: [
          "77f4c04063449b3c359a832068b322cf2c8fab876f7353b1d61a94410807f307"
        ],
        expoProjectId: [
          "83ea0153d2ff7363ec82a92f4372a96c11fe8265f3c5ff91e249eb3753385ab5"
        ],
        expoOwner: [
          "c9b8c56713ad457a05d05424094883d0a212e7e10b9d072012d1081aa53a659e"
        ],
        mobileName: [
          "37338b9eabc79808e12215a6a983c3f2e6faffd929c0073e296c370bce9358cb"
        ],
        mobileSlug: [
          "dfd46b51fae0cf4ccd33486529fc75d7b9880ef40123a8172fc9c3b0bb9a1025"
        ],
        mobileScheme: [
          "91dba307babac20f8d08f097b03a1d7a8282c83404271a24a25a6da3f3b7315c"
        ],
        mobileBundleIdentifier: [
          "33ed71cd12c5616e6cdb449db9f528f28a54abf611c5e2ea899f79eb4d4799e0"
        ],
        accountBaseUrl: [
          "bcbf79f2058f33b503d26a24711653a8929bf4ad3b8342e4a29016b21c9a541d"
        ],
        desktopFeedUrl: [
          "0615713d3781d0f55cfb8e2ce7e51fda6e1f970d565d8e167dcb470c92d56174"
        ],
        officialCnMarketUrl: [
          "db6543fc4030aa9924607c2ef1ab823afe3fb696fba480a58c6852670e7a9f8b"
        ]
      }
    };
  }
});

// shared/official-identity.cjs
var require_official_identity = __commonJS({
  "shared/official-identity.cjs"(exports, module) {
    "use strict";
    var { digests: DIGESTS } = require_official_identity_digests();
    var core = require_edition_identity_core();
    var { sha256Hex, digestOfficialValue } = core;
    function matchesOfficialValue(key, value, digests = DIGESTS) {
      return core.matchesOfficialValue(key, value, digests);
    }
    function isOfficialServiceHost(hostname, digests = DIGESTS) {
      const labels = String(hostname).toLowerCase().split(".");
      for (let i = 0; i < labels.length - 1; i += 1) {
        const suffix = labels.slice(i).join(".");
        if (matchesOfficialValue("serviceDomain", suffix, digests)) return true;
        if (i > 0 && matchesOfficialValue("serviceSubdomainParent", suffix, digests)) return true;
      }
      return false;
    }
    module.exports = { OFFICIAL_IDENTITY_DIGESTS: DIGESTS, digestOfficialValue, matchesOfficialValue, isOfficialServiceHost, sha256Hex };
  }
});

// shared/service-destination.cjs
var require_service_destination = __commonJS({
  "shared/service-destination.cjs"(exports, module) {
    "use strict";
    var { isOfficialServiceHost, matchesOfficialValue } = require_official_identity();
    function isOriginalService2(value) {
      const url = new URL(value);
      const host = url.hostname.toLowerCase();
      return isOfficialServiceHost(host) || host === "u.expo.dev" && matchesOfficialValue("expoProjectId", url.pathname.split("/")[1] || "") || (host === "github.com" || host === "raw.githubusercontent.com") && /^\/liliMozi\/(openhanako|hana-marketplace|hana-model-catalog)(\/|$)/i.test(url.pathname);
    }
    function origin(value) {
      const url = new URL(value);
      if (url.protocol === "wss:") url.protocol = "https:";
      if (url.protocol === "ws:") url.protocol = "http:";
      return url.origin;
    }
    function assertServiceDestination(value, policy, purpose = "http") {
      if (policy.kind === "official-cn") return value;
      let url;
      try {
        url = new URL(value);
      } catch {
        throw new Error("untrusted_service_destination");
      }
      const protocols = purpose === "relay" ? ["wss:", "ws:"] : ["https:", "http:"];
      if (!protocols.includes(url.protocol) || url.username || url.password || url.hash || (purpose === "relay" || purpose === "gateway") && url.search || isOriginalService2(value)) throw new Error("untrusted_service_destination");
      const allowed = [policy.accountBaseUrl, ...policy.trustedOrigins || []].filter(Boolean).map(origin);
      if (!allowed.includes(origin(value))) throw new Error("untrusted_service_destination");
      return value;
    }
    function assertServiceResponse(body, policy) {
      if (!body || typeof body !== "object" || policy.kind === "official-cn") return;
      for (const field of ["relayUrl", "gatewayBaseUrl", "uploadUrl", "downloadUrl", "objectUrl"]) {
        if (body[field] != null) assertServiceDestination(
          body[field],
          policy,
          field === "relayUrl" ? "relay" : field === "gatewayBaseUrl" ? "gateway" : "http"
        );
      }
    }
    var guardedExecutors = /* @__PURE__ */ new WeakMap();
    function protectServiceExecutor(executor, policy) {
      if (!executor || typeof executor.createRequest !== "function") return false;
      const current = guardedExecutors.get(executor);
      if (current) {
        current.policy = policy;
        return true;
      }
      const state = { policy };
      guardedExecutors.set(executor, state);
      const original = executor.createRequest;
      executor.createRequest = function(options, callback) {
        const authority = `${options.protocol || "https:"}//${options.hostname || options.host}${options.port ? ":" + options.port : ""}`;
        assertServiceDestination(new URL(options.path || "/", authority).href, state.policy);
        return original.call(this, options, callback);
      };
      return true;
    }
    module.exports = { protectServiceExecutor, isOriginalService: isOriginalService2, assertServiceDestination, assertServiceResponse };
  }
});

// scripts/extension-market-sync.mjs
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// shared/extension-contract.ts
var EXTENSION_KINDS = Object.freeze([
  "app",
  "skill",
  "recipe",
  "connector",
  "role",
  "bundle",
  "sticker-pack"
]);
var EXTENSION_KIND_SET = new Set(EXTENSION_KINDS);
function isExtensionKind(v) {
  return typeof v === "string" && EXTENSION_KIND_SET.has(v);
}
function isSafeExtensionId(id) {
  if (typeof id !== "string") return false;
  if (!/^[a-z0-9][a-z0-9._-]{0,127}$/.test(id)) return false;
  if (id.endsWith(".") || id.endsWith("-")) return false;
  if (id.includes("..") || id.includes("--")) return false;
  return true;
}
function isCapabilityName(value) {
  if (typeof value !== "string" || !value) return false;
  const slash = value.indexOf("/");
  return slash > 0 && slash === value.lastIndexOf("/") && slash < value.length - 1;
}

// shared/extension-market-index.ts
var MARKET_INDEX_SCHEMA_VERSION = 2;
var MAX_MARKET_ARCHIVE_BYTES = 300 * 1024 * 1024;
var MAX_MARKET_README_BYTES = 2 * 1024 * 1024;
var MAX_MARKET_INDEX_BYTES = 8 * 1024 * 1024;
function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function isNonEmptyString(value) {
  return typeof value === "string" && value.length > 0;
}
function isSafeMarketVersion(value) {
  if (typeof value !== "string" || value.length === 0 || value.length > 512) return false;
  if (value.includes("/") || value.includes("\\") || value.includes("..") || value.includes("\0")) return false;
  if (!/^[A-Za-z0-9][A-Za-z0-9._+-]*$/.test(value)) return false;
  if (value.endsWith(".")) return false;
  return true;
}
function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}
function isHttpsUrl(value) {
  if (typeof value !== "string" || !value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}
function isSha256Hex(value) {
  return typeof value === "string" && /^[0-9a-f]{64}$/.test(value);
}
function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}
function isNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0;
}
function isParseableDate(value) {
  return typeof value === "string" && value.length > 0 && !Number.isNaN(Date.parse(value));
}
function describeArchive(archive, path2) {
  if (!isPlainObject(archive)) return `${path2} must be an object`;
  if (!isHttpsUrl(archive.url)) return `${path2}.url must be an https URL`;
  if (!isSha256Hex(archive.sha256)) return `${path2}.sha256 must be 64 lowercase hex characters`;
  if (!isPositiveInteger(archive.size)) return `${path2}.size must be a positive integer`;
  if (archive.size > MAX_MARKET_ARCHIVE_BYTES) {
    return `${path2}.size exceeds the ${MAX_MARKET_ARCHIVE_BYTES} byte limit`;
  }
  if (archive.format !== "zip") return `${path2}.format must be "zip"`;
  return null;
}
function describePermission(permission, path2) {
  if (!isPlainObject(permission)) return `${path2} must be an object`;
  if (!isCapabilityName(permission.capability)) {
    return `${path2}.capability must be a "<namespace>/<name>" string`;
  }
  if (permission.scope !== void 0 && !isPlainObject(permission.scope)) return `${path2}.scope must be an object`;
  if (permission.reason !== void 0 && typeof permission.reason !== "string") {
    return `${path2}.reason must be a string`;
  }
  return null;
}
function describeItemVersion(entry, path2) {
  if (!isPlainObject(entry)) return `${path2} must be an object`;
  if (!isSafeMarketVersion(entry.version)) return `${path2}.version must be a safe version string`;
  if (entry.minAppVersion !== void 0 && !isNonEmptyString(entry.minAppVersion)) {
    return `${path2}.minAppVersion must be a non-empty string`;
  }
  return describeArchive(entry.archive, `${path2}.archive`);
}
function describeStats(value, path2) {
  if (!isPlainObject(value)) return `${path2} must be an object`;
  if (value.downloads !== void 0 && !isNonNegativeInteger(value.downloads)) {
    return `${path2}.downloads must be a non-negative integer`;
  }
  return null;
}
function describeCompatibility(value, path2) {
  if (!isPlainObject(value)) return `${path2} must be an object`;
  if (value.minAppVersion !== void 0 && !isNonEmptyString(value.minAppVersion)) {
    return `${path2}.minAppVersion must be a non-empty string`;
  }
  if (value.formFactors !== void 0 && !isStringArray(value.formFactors)) {
    return `${path2}.formFactors must be an array of strings`;
  }
  return null;
}
function describeMarketItem(raw, path2) {
  if (!isPlainObject(raw)) return `${path2} must be an object`;
  if (!isExtensionKind(raw.kind)) {
    return `${path2}.kind must be one of ${EXTENSION_KINDS.join(", ")}`;
  }
  if (!isSafeExtensionId(raw.id)) return `${path2}.id is not a safe extension id`;
  if (!isNonEmptyString(raw.name)) return `${path2}.name must be a non-empty string`;
  if (!isNonEmptyString(raw.publisher)) return `${path2}.publisher must be a non-empty string`;
  if (typeof raw.description !== "string") return `${path2}.description must be a string`;
  if (!isSafeMarketVersion(raw.version)) return `${path2}.version must be a safe version string`;
  const archiveError = describeArchive(raw.archive, `${path2}.archive`);
  if (archiveError) return archiveError;
  if (!Array.isArray(raw.permissions)) return `${path2}.permissions must be an array`;
  for (let index = 0; index < raw.permissions.length; index += 1) {
    const permissionError = describePermission(raw.permissions[index], `${path2}.permissions[${index}]`);
    if (permissionError) return permissionError;
  }
  if (raw.versions !== void 0) {
    if (!Array.isArray(raw.versions)) return `${path2}.versions must be an array`;
    for (let index = 0; index < raw.versions.length; index += 1) {
      const versionError = describeItemVersion(raw.versions[index], `${path2}.versions[${index}]`);
      if (versionError) return versionError;
    }
  }
  if (raw.compatibility !== void 0) {
    const compatibilityError = describeCompatibility(raw.compatibility, `${path2}.compatibility`);
    if (compatibilityError) return compatibilityError;
  }
  if (raw.homepage !== void 0 && typeof raw.homepage !== "string") return `${path2}.homepage must be a string`;
  if (raw.repository !== void 0 && typeof raw.repository !== "string") return `${path2}.repository must be a string`;
  if (raw.license !== void 0 && typeof raw.license !== "string") return `${path2}.license must be a string`;
  if (raw.icon !== void 0 && typeof raw.icon !== "string") return `${path2}.icon must be a string`;
  if (raw.categories !== void 0 && !isStringArray(raw.categories)) return `${path2}.categories must be an array of strings`;
  if (raw.keywords !== void 0 && !isStringArray(raw.keywords)) return `${path2}.keywords must be an array of strings`;
  if (raw.readme !== void 0 && typeof raw.readme !== "string") return `${path2}.readme must be a string`;
  if (raw.readmeUrl !== void 0 && typeof raw.readmeUrl !== "string") return `${path2}.readmeUrl must be a string`;
  if (raw.stats !== void 0) {
    const statsError = describeStats(raw.stats, `${path2}.stats`);
    if (statsError) return statsError;
  }
  if (raw.listedAt !== void 0 && !isParseableDate(raw.listedAt)) {
    return `${path2}.listedAt must be a parseable date string`;
  }
  return null;
}
function itemLabel(raw, index) {
  if (isPlainObject(raw) && typeof raw.id === "string" && raw.id) return raw.id;
  return `#${index}`;
}
function validateMarketIndexV2(raw) {
  if (!isPlainObject(raw)) return { errors: ["market index must be a JSON object"] };
  if (raw.schemaVersion !== MARKET_INDEX_SCHEMA_VERSION) {
    return { errors: [`unsupported market index schemaVersion: ${JSON.stringify(raw.schemaVersion)}`] };
  }
  if (!isNonEmptyString(raw.sourceId)) return { errors: ["sourceId must be a non-empty string"] };
  if (!isNonEmptyString(raw.name)) return { errors: ["name must be a non-empty string"] };
  if (!isParseableDate(raw.publishedAt)) return { errors: ["publishedAt must be a parseable date string"] };
  if (!Array.isArray(raw.items)) return { errors: ["items must be an array"] };
  const items = [];
  const warnings = [];
  raw.items.forEach((entry, index) => {
    const failureReason = describeMarketItem(entry, `items[${index}]`);
    if (failureReason) {
      warnings.push(`dropped market item ${itemLabel(entry, index)}: ${failureReason}`);
      return;
    }
    items.push(entry);
  });
  return {
    index: {
      schemaVersion: MARKET_INDEX_SCHEMA_VERSION,
      sourceId: raw.sourceId,
      name: raw.name,
      publishedAt: raw.publishedAt,
      items
    },
    warnings
  };
}

// shared/generated/edition.json
var edition_default = {
  schemaVersion: 1,
  id: "neutral",
  kind: "custom",
  displayName: "HANA",
  desktop: {
    appId: "org.example.hana",
    productName: "HANA",
    dataDirName: ".hana",
    devDataDirName: ".hana-dev"
  },
  mobile: {
    name: "HANA",
    slug: "hana-mobile",
    scheme: "hana",
    iosBundleIdentifier: "org.example.hana",
    androidPackage: "org.example.hana"
  },
  services: {
    accountBaseUrl: null,
    features: {
      relay: false,
      attachments: false,
      feedback: false,
      platformModels: false,
      activityReporting: false,
      usageReporting: false
    }
  },
  market: {
    sources: {
      global: null,
      cn: null
    }
  },
  modelCatalog: {
    url: null
  },
  updates: {
    desktop: {
      feedUrl: null,
      digestBaseUrl: null,
      installerPageUrl: null,
      releasesPageUrl: null
    },
    artifact: {
      channelBaseUrl: null,
      keyset: []
    },
    mobile: {
      versionBaseUrl: null,
      expo: null
    }
  },
  serviceScope: "local-only",
  profileHash: "0707eec8dde6b9f50783c71025f224dc4263608dd8317b204449462ce7cf0f38"
};

// shared/public-edition-identity.ts
var import_edition_identity_core = __toESM(require_edition_identity_core(), 1);
var import_public_update_sources = __toESM(require_public_update_sources(), 1);

// shared/official-identity-digests.json with { type: 'json' }
var official_identity_digests_default = {
  version: 1,
  digests: {
    serviceDomain: [
      "413a3f5ec7ebbd3eb24f52c1c8dfa23ccf9408b4a1c85c579a08242e7af74241"
    ],
    serviceSubdomainParent: [
      "77f4c04063449b3c359a832068b322cf2c8fab876f7353b1d61a94410807f307"
    ],
    expoProjectId: [
      "83ea0153d2ff7363ec82a92f4372a96c11fe8265f3c5ff91e249eb3753385ab5"
    ],
    expoOwner: [
      "c9b8c56713ad457a05d05424094883d0a212e7e10b9d072012d1081aa53a659e"
    ],
    mobileName: [
      "37338b9eabc79808e12215a6a983c3f2e6faffd929c0073e296c370bce9358cb"
    ],
    mobileSlug: [
      "dfd46b51fae0cf4ccd33486529fc75d7b9880ef40123a8172fc9c3b0bb9a1025"
    ],
    mobileScheme: [
      "91dba307babac20f8d08f097b03a1d7a8282c83404271a24a25a6da3f3b7315c"
    ],
    mobileBundleIdentifier: [
      "33ed71cd12c5616e6cdb449db9f528f28a54abf611c5e2ea899f79eb4d4799e0"
    ],
    accountBaseUrl: [
      "bcbf79f2058f33b503d26a24711653a8929bf4ad3b8342e4a29016b21c9a541d"
    ],
    desktopFeedUrl: [
      "0615713d3781d0f55cfb8e2ce7e51fda6e1f970d565d8e167dcb470c92d56174"
    ],
    officialCnMarketUrl: [
      "db6543fc4030aa9924607c2ef1ab823afe3fb696fba480a58c6852670e7a9f8b"
    ]
  }
};

// shared/public-edition-identity.ts
var { PUBLIC_EDITION, isPublicDesktopEdition } = import_edition_identity_core.default.createPublicEditionIdentity({
  updateSources: import_public_update_sources.default,
  matchesOfficialValue: (key, value) => import_edition_identity_core.default.matchesOfficialValue(key, value, official_identity_digests_default.digests)
});

// shared/edition-config.ts
function freeze(value) {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
  return value;
}
function canonicalJson(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
}
function sourceEditionOverride() {
  const proc = globalThis.process;
  const file = proc?.env?.HANA_SOURCE_EDITION_FILE;
  if (file === void 0 || typeof proc?.versions?.node !== "string") return null;
  if (typeof proc.getBuiltinModule !== "function") {
    throw new Error("HANA_SOURCE_EDITION_FILE needs Node 22.3 or later (getBuiltinModule).");
  }
  const { createHash } = proc.getBuiltinModule("node:crypto");
  const fs2 = proc.getBuiltinModule("node:fs");
  const path2 = proc.getBuiltinModule("node:path");
  const { fileURLToPath: fileURLToPath2 } = proc.getBuiltinModule("node:url");
  const filename = fileURLToPath2(import.meta.url);
  const sourceRun = filename.endsWith(path2.join("shared", "edition-config.ts")) && fs2.existsSync(path2.join(path2.resolve(path2.dirname(filename), ".."), "config", "editions", "neutral.yaml"));
  if (!sourceRun) return null;
  let parsed;
  try {
    parsed = JSON.parse(fs2.readFileSync(file, "utf8"));
  } catch (error) {
    throw new Error(`HANA_SOURCE_EDITION_FILE points to an edition file that cannot be read as JSON (${file}): ${error instanceof Error ? error.message : String(error)}`);
  }
  const candidate = parsed;
  const { profileHash, ...payload } = candidate;
  const supportedKind2 = candidate.kind === "custom" || candidate.kind === "official-global" && isPublicDesktopEdition(candidate);
  if (candidate.schemaVersion !== 1 || !supportedKind2 || typeof profileHash !== "string" || createHash("sha256").update(canonicalJson(payload)).digest("hex") !== profileHash) {
    throw new Error(`HANA_SOURCE_EDITION_FILE points to an edition file that is invalid or unsupported (${file}); prepare it like shared/generated/edition.json.`);
  }
  return candidate;
}
var selected = sourceEditionOverride() ?? edition_default;
var supportedKind = selected.kind === "custom" || selected.kind === "official-global" && isPublicDesktopEdition(selected);
if (selected.schemaVersion !== 1 || !supportedKind || !/^[a-f0-9]{64}$/.test(selected.profileHash)) {
  throw new Error("Edition configuration is invalid or unsupported. Hana Cloud requires a custom edition or the maintained public profile; prepare a supported profile before starting or building Hana.");
}
var EDITION = freeze(selected);

// lib/remote-data/bounded-fetch.ts
var import_service_destination = __toESM(require_service_destination(), 1);

// shared/log-redactor.ts
var REDACTED = "[redacted]";
var SECRET_KEY_PATTERN = "api[_-]?key|apikey|api-key|secret[_-]?key|secret|access[_-]?token|refresh[_-]?token|auth[_-]?token|token|password|passwd|client[_-]?secret|bot[_-]?token|server[_-]?token";
var SECRET_ASSIGN_RE = new RegExp(`\\b(${SECRET_KEY_PATTERN})\\b\\s*[:=]\\s*(?:"[^"]*"|'[^']*'|[^\\s,"'\\]}]+)`, "gi");
var SENSITIVE_OBJECT_KEY_RE = /^(api[_-]?key|apikey|api-key|authorization|cookie|set-cookie|secret[_-]?key|secret|access[_-]?token|refresh[_-]?token|auth[_-]?token|token|password|passwd|client[_-]?secret|bot[_-]?token|server[_-]?token|private[_-]?key|credential|credentials|session[_-]?key|session[_-]?id|user[_-]?id|chat[_-]?id|sender[_-]?name|avatar[_-]?url|owner|download[_-]?param|filekey)$/i;
var URL_SECRET_QUERY_RE = /([?&](?:token|access_token|refresh_token|auth|authorization|api_key|apikey|api-key|key|secret|password|client_secret|code|appSurfaceSession|appIframeTicket)=)([^&#\s]+)/gi;
var APP_UI_SURFACE_TOKEN_RE = /(\/api\/apps\/[^/\s?#]+\/(?:ui|routes\/_runtime\/[^/\s?#]+)\/_surface\/)([^/\s?#]+)(?=\/)/gi;
var ENCODED_APP_UI_SURFACE_TOKEN_RE = /(%2Fapi%2Fapps%2F[^%&\s]+%2F(?:ui|routes%2F_runtime%2F[^%&\s]+)%2F_surface%2F)([^%&\s]+)(?=%2F)/gi;
var API_KEY_VALUE_RE = /\b(sk-[a-zA-Z0-9_-]{20,}|AKIA[A-Z0-9]{16}|gsk_[a-zA-Z0-9_-]{20,}|ghp_[a-zA-Z0-9]{36}|glpat-[a-zA-Z0-9_-]{20,}|xox[abpors]-[a-zA-Z0-9-]+)\b/g;
var EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
var CREDIT_CARD_RE = /\b(?:\d{4}[- ]?){3}\d{4}\b/g;
var UUID_RE = /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi;
var UUID_PLACEHOLDER_RE = /\uE000uuid_(\d+)\uE001/g;
var KEYED_DECIMAL_PREFIX_RE = /["\w]:[ ]?-?\d{1,15}\.$/;
var KEYED_DECIMAL_LOOKBACK = 20;
var CN_ID_CARD_RE = /\b\d{6}(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dXx]\b/g;
var SSN_RE = /\b\d{3}-\d{2}-\d{4}\b/g;
var LONG_RANDOM_RE = /(^|[^\w/.-])([A-Za-z0-9+/_=-]{40,})(?=$|[^\w/.-])/g;
var STUDIO_ID_RE = /\bstudio_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi;
var STUDIO_ID_PLACEHOLDER_RE = /\uE000studio_(\d+)\uE001/g;
var TASK_ID_UUID_BODY = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
var TASK_ID_RE = new RegExp(
  `\\b(?:(?:subagent-fork-run|workflow-fork-run|subagent-fork|subagent-run|workflow-run|background-task|task|bg|attempt)[-_]${TASK_ID_UUID_BODY}|(?:subagent|workflow)-\\d{10,16}-[a-z0-9]{4,12}|(?:task|bg|subagent|workflow)_[0-9a-f]{24,64})\\b`,
  "gi"
);
var TASK_ID_PLACEHOLDER_RE = /\uE000task_(\d+)\uE001/g;
function redactLogText(value, options = {}) {
  if (value == null) return "";
  let text = String(value);
  const studioIds = [];
  text = text.replace(STUDIO_ID_RE, (match) => `\uE000studio_${studioIds.push(match) - 1}\uE001`);
  const taskIds = [];
  text = text.replace(TASK_ID_RE, (match) => `\uE000task_${taskIds.push(match) - 1}\uE001`);
  text = redactKnownPaths(text, options);
  text = text.replace(/data:([^;,]+);base64,[A-Za-z0-9+/=]+/gi, "data:$1;base64,[redacted]");
  text = text.replace(/(https?:\/\/)([^:@\s/?#]+):([^@\s/?#]+)@/gi, "$1[credentials]@");
  text = text.replace(URL_SECRET_QUERY_RE, "$1[redacted]");
  text = text.replace(APP_UI_SURFACE_TOKEN_RE, "$1[redacted]");
  text = text.replace(ENCODED_APP_UI_SURFACE_TOKEN_RE, "$1[redacted]");
  text = text.replace(/\b(Authorization\s*[:=]\s*Bearer\s+)[^\s,;]+/gi, "$1[redacted]");
  text = text.replace(/\b(Bearer\s+)[A-Za-z0-9\-._~+/]+=*/gi, "$1[redacted]");
  text = text.replace(/\b(Cookie|Set-Cookie)\s*[:=]\s*[^\r\n]+/gi, "$1=[redacted]");
  text = text.replace(SECRET_ASSIGN_RE, (_m, key) => `${key}=[redacted]`);
  text = text.replace(API_KEY_VALUE_RE, REDACTED);
  text = redactCardNumbers(text);
  text = text.replace(CN_ID_CARD_RE, "[id_card]");
  text = text.replace(SSN_RE, "[ssn]");
  text = text.replace(EMAIL_RE, "[email]");
  text = text.replace(LONG_RANDOM_RE, "$1[token]");
  return text.replace(STUDIO_ID_PLACEHOLDER_RE, (_match, index) => studioIds[Number(index)] ?? "").replace(TASK_ID_PLACEHOLDER_RE, (_match, index) => taskIds[Number(index)] ?? "");
}
function redactCardNumbers(text) {
  const uuids = [];
  const shielded = text.replace(UUID_RE, (match) => `\uE000uuid_${uuids.push(match) - 1}\uE001`);
  return shielded.replace(CREDIT_CARD_RE, (match, offset, whole) => isKeyedDecimalFraction(match, offset, whole) ? match : "[credit_card]").replace(UUID_PLACEHOLDER_RE, (_match, index) => uuids[Number(index)] ?? "");
}
function isKeyedDecimalFraction(match, offset, whole) {
  return /^\d{16}$/.test(match) && KEYED_DECIMAL_PREFIX_RE.test(whole.slice(Math.max(0, offset - KEYED_DECIMAL_LOOKBACK), offset));
}
function redactKnownPaths(text, options) {
  let out = text;
  const paths = [];
  if (options.homeDir) paths.push([options.homeDir, "~"]);
  if (Array.isArray(options.extraPaths)) {
    for (const p of options.extraPaths) paths.push([p, "[path]"]);
  }
  for (const [rawPath, replacement] of paths) {
    if (!rawPath || typeof rawPath !== "string") continue;
    const variants = pathVariants(rawPath);
    for (const variant of variants) {
      out = out.split(variant).join(replacement);
      if (variant.startsWith("/")) {
        out = out.split(`file://${variant}`).join(`file://${replacement}`);
      }
    }
  }
  out = out.replace(/file:\/\/\/Users\/[^/\s]+/g, "file:///Users/[user]");
  out = out.replace(/\/Users\/[^/\s]+/g, "/Users/[user]");
  out = out.replace(/file:\/\/\/home\/[^/\s]+/g, "file:///home/[user]");
  out = out.replace(/\/home\/[^/\s]+/g, "/home/[user]");
  out = out.replace(/\b([A-Za-z]:\\Users\\)[^\\/\s]+/g, "$1[user]");
  out = out.replace(/\b([A-Za-z]:\/Users\/)[^\\/\s]+/g, "$1[user]");
  return out;
}
function pathVariants(rawPath) {
  const variants = /* @__PURE__ */ new Set([rawPath]);
  if (rawPath.includes("\\")) variants.add(rawPath.replace(/\\/g, "/"));
  if (rawPath.includes("/")) variants.add(rawPath.replace(/\//g, "\\"));
  return variants;
}
function redactLogValue(value, options = {}, state = {}) {
  const depth = state.depth || 0;
  const seen = state.seen || /* @__PURE__ */ new WeakSet();
  if (value == null) return value;
  if (typeof value === "string") return redactLogText(value, options);
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") return value;
  if (typeof value === "symbol" || typeof value === "function") return redactLogText(String(value), options);
  if (value instanceof Error) {
    const errCode = value.code;
    return {
      name: value.name,
      message: redactLogText(value.message, options),
      stack: value.stack ? redactLogText(value.stack, options) : void 0,
      code: errCode ? redactLogText(String(errCode), options) : void 0
    };
  }
  if (typeof value !== "object") return redactLogText(String(value), options);
  if (seen.has(value)) return "[Circular]";
  if (depth >= 8) return "[MaxDepth]";
  seen.add(value);
  if (Array.isArray(value)) {
    return value.map((item) => redactLogValue(item, options, { depth: depth + 1, seen }));
  }
  const out = {};
  for (const [key, item] of Object.entries(value)) {
    const cleanKey = redactLogLabel(key);
    if (SENSITIVE_OBJECT_KEY_RE.test(key)) {
      out[cleanKey] = REDACTED;
    } else {
      out[cleanKey] = redactLogValue(item, options, { depth: depth + 1, seen });
    }
  }
  return out;
}
function redactLogLabel(value) {
  return redactLogText(value == null ? "unknown" : String(value)).replace(/[^a-zA-Z0-9_.:-]+/g, "_").slice(0, 80) || "unknown";
}

// lib/log-arguments.ts
var MAX_STRING_CHARS = 4096;
var MAX_TOTAL_CHARS = 8192;
var MAX_DEPTH = 5;
var MAX_ARRAY_ITEMS = 50;
var MAX_OBJECT_KEYS = 50;
var MAX_NODES = 200;
var MAX_CAUSE_DEPTH = 3;
var LOG_FORMAT_FALLBACK = "[log arguments unavailable]";
function boundString(value) {
  if (value.length <= MAX_STRING_CHARS) return value;
  return `${value.slice(0, MAX_STRING_CHARS)}\u2026[truncated]`;
}
function collapseWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}
function constructorName(value) {
  try {
    const name = value.constructor?.name;
    return typeof name === "string" && name ? name : "Object";
  } catch {
    return "Object";
  }
}
function functionName(value) {
  try {
    return typeof value.name === "string" && value.name ? value.name : "anonymous";
  } catch {
    return "anonymous";
  }
}
function readPlainField(target, key) {
  try {
    let owner = target;
    while (owner) {
      const descriptor = Object.getOwnPropertyDescriptor(owner, key);
      if (descriptor) {
        if (typeof descriptor.get === "function") return void 0;
        return descriptor.value;
      }
      owner = Object.getPrototypeOf(owner);
    }
    return void 0;
  } catch {
    return void 0;
  }
}
function toText(value) {
  if (typeof value === "string") return value;
  if (value === void 0 || value === null) return "";
  return boundString(String(value));
}
function codeText(value) {
  if (typeof value === "string") return boundString(value);
  if (typeof value === "bigint") return `${value}n`;
  if (value === null) return "null";
  if (typeof value === "object") return "[object]";
  return String(value);
}
function renderError(error, budget, seenCauses) {
  const name = toText(readPlainField(error, "name")) || "Error";
  const message = toText(readPlainField(error, "message"));
  let text = message ? `${name}: ${message}` : name;
  const code = readPlainField(error, "code");
  if (code !== void 0 && code !== null && code !== "") {
    text += ` (code=${codeText(code)})`;
  }
  const causes = [];
  let cause = readPlainField(error, "cause");
  let depth = 0;
  while (cause !== void 0 && cause !== null) {
    if (depth >= MAX_CAUSE_DEPTH) {
      causes.push("[cause depth exceeded]");
      break;
    }
    if (typeof cause === "object" && seenCauses.has(cause)) {
      causes.push("[circular cause]");
      break;
    }
    if (cause instanceof Error) {
      seenCauses.add(cause);
      const causeName = toText(readPlainField(cause, "name")) || "Error";
      const causeMessage = toText(readPlainField(cause, "message"));
      causes.push(causeMessage ? `${causeName}: ${causeMessage}` : causeName);
      cause = readPlainField(cause, "cause");
    } else {
      causes.push(boundString(literal(renderValue(cause, budget, 0, /* @__PURE__ */ new Set()))));
      break;
    }
    depth += 1;
  }
  if (causes.length) text += ` <- Caused by: ${causes.join(" <- ")}`;
  return collapseWhitespace(text);
}
function renderValue(value, budget, depth, path2) {
  if (budget.nodes <= 0) return "[budget exceeded]";
  budget.nodes -= 1;
  if (value === null) return null;
  if (value === void 0) return "undefined";
  switch (typeof value) {
    case "string":
      return boundString(value);
    case "number":
      return Number.isFinite(value) ? value : String(value);
    case "boolean":
      return value;
    case "bigint":
      return `${value}n`;
    case "symbol":
      return String(value);
    case "function":
      return `[Function: ${functionName(value)}]`;
    default:
      break;
  }
  if (value instanceof Error) return renderError(value, budget, /* @__PURE__ */ new Set([value]));
  const object = value;
  if (path2.has(object)) return "[Circular]";
  if (depth >= MAX_DEPTH) return `[${constructorName(object)}]`;
  if (Array.isArray(object)) {
    path2.add(object);
    const items = Array.from(object);
    const shown = items.slice(0, MAX_ARRAY_ITEMS).map((item) => renderValue(item, budget, depth + 1, path2));
    if (items.length > MAX_ARRAY_ITEMS) {
      shown.push(`\u2026 (+${items.length - MAX_ARRAY_ITEMS} more)`);
    }
    path2.delete(object);
    return shown;
  }
  if (object instanceof Map) {
    path2.add(object);
    const entries = Array.from(object.entries());
    const shown = entries.slice(0, MAX_OBJECT_KEYS).map(
      ([key, item]) => `${literal(renderValue(key, budget, depth + 1, path2))} => ${literal(renderValue(item, budget, depth + 1, path2))}`
    );
    if (entries.length > MAX_OBJECT_KEYS) {
      shown.push(`\u2026 (+${entries.length - MAX_OBJECT_KEYS} more)`);
    }
    path2.delete(object);
    return `[Map ${shown.join(", ")}]`;
  }
  if (object instanceof Set) {
    path2.add(object);
    const items = Array.from(object.values());
    const shown = items.slice(0, MAX_OBJECT_KEYS).map((item) => literal(renderValue(item, budget, depth + 1, path2)));
    if (items.length > MAX_OBJECT_KEYS) {
      shown.push(`\u2026 (+${items.length - MAX_OBJECT_KEYS} more)`);
    }
    path2.delete(object);
    return `[Set ${shown.join(", ")}]`;
  }
  let keys;
  try {
    keys = Object.keys(object);
  } catch {
    return `[${constructorName(object)}]`;
  }
  path2.add(object);
  const out = {};
  const limit = Math.min(keys.length, MAX_OBJECT_KEYS);
  for (let index = 0; index < limit; index += 1) {
    if (budget.nodes <= 0) {
      out["\u2026"] = "[budget exceeded]";
      break;
    }
    const key = keys[index];
    let descriptor;
    try {
      descriptor = Object.getOwnPropertyDescriptor(object, key);
    } catch {
      descriptor = void 0;
    }
    out[key] = descriptor && typeof descriptor.get === "function" ? "[Getter]" : renderValue(descriptor ? descriptor.value : void 0, budget, depth + 1, path2);
  }
  if (keys.length > limit) out["\u2026"] = `(+${keys.length - limit} more)`;
  path2.delete(object);
  return out;
}
function literal(value) {
  return typeof value === "string" ? value : safeStringify(value);
}
function safeStringify(value) {
  try {
    const text = JSON.stringify(value);
    return text === void 0 ? String(value) : text;
  } catch {
    return "[unserializable]";
  }
}
function boundText(text, max) {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}\u2026[truncated]`;
}
function formatLogArguments(args, options = {}) {
  try {
    if (args == null) return "";
    const list = Array.from(args);
    const budget = { nodes: MAX_NODES };
    const parts = [];
    let used = 0;
    for (const arg of list) {
      let piece;
      try {
        const safe = renderValue(arg, budget, 0, /* @__PURE__ */ new Set());
        const redacted = redactLogValue(safe, options);
        piece = typeof redacted === "string" ? redacted : safeStringify(redacted);
      } catch {
        piece = "[unprintable argument]";
      }
      parts.push(piece);
      used += piece.length + 1;
      if (used >= MAX_TOTAL_CHARS) {
        parts.push("\u2026[truncated]");
        break;
      }
    }
    const joined = parts.join(" ");
    return boundText(redactLogText(joined, options), MAX_TOTAL_CHARS);
  } catch {
    return LOG_FORMAT_FALLBACK;
  }
}

// lib/debug-log.ts
var DEFAULT_MAX_BYTES = 5 * 1024 * 1024;
var DEFAULT_MAX_LINE_BYTES = 64 * 1024;
var _sink = null;
var _sinkFailureReported = false;
function route(type, module, msg) {
  const sink = _sink;
  if (!sink) return;
  try {
    sink.write(type, module || "unknown", String(msg));
  } catch (err) {
    if (!_sinkFailureReported) {
      _sinkFailureReported = true;
      try {
        console.warn(`[debug-log] sink write failed; further failures will be silent: ${err?.message || err}`);
      } catch {
      }
    }
  }
}
function createModuleLogger(module) {
  const write = (level, args) => {
    let text;
    try {
      text = formatLogArguments(args);
    } catch {
      text = LOG_FORMAT_FALLBACK;
    }
    const line = `[${module}] ${text}`;
    try {
      if (level === "error") console.error(line);
      else if (level === "warn") console.warn(line);
      else console.log(line);
    } catch {
    }
    route(level, module, text);
  };
  const info = (...args) => write("info", args);
  return {
    log: info,
    info,
    warn: (...args) => write("warn", args),
    error: (...args) => write("error", args)
  };
}

// lib/remote-data/bounded-fetch.ts
var moduleLog = createModuleLogger("remote-data/bounded-fetch");
var REDIRECT_STATUS_CODES = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var BoundedFetchError = class extends Error {
  code;
  constructor(message, code) {
    super(message);
    this.name = "BoundedFetchError";
    this.code = code;
  }
};
function assertHttps(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new BoundedFetchError(`invalid URL: ${url}`, "NON_HTTPS");
  }
  if (parsed.protocol !== "https:") {
    throw new BoundedFetchError(`refusing non-HTTPS URL: ${url}`, "NON_HTTPS");
  }
  return parsed;
}
function headersToRecord(headers) {
  const out = {};
  headers.forEach((value, key) => {
    out[key.toLowerCase()] = value;
  });
  return out;
}
async function readBoundedBody(body, maxResponseBytes, abort, signal, onChunk) {
  if (!body) return { body: Buffer.alloc(0), bytes: 0 };
  const reader = body.getReader();
  const chunks = [];
  let total = 0;
  const cancel = () => {
    void reader.cancel(signal.reason).catch(() => {
    });
  };
  signal.addEventListener("abort", cancel, { once: true });
  try {
    for (; ; ) {
      signal.throwIfAborted();
      const { done, value } = await reader.read();
      signal.throwIfAborted();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > maxResponseBytes) {
        abort();
        throw new BoundedFetchError(
          `response exceeded maxResponseBytes (${maxResponseBytes})`,
          "RESPONSE_TOO_LARGE"
        );
      }
      if (onChunk) await onChunk(value);
      else chunks.push(value);
    }
  } catch (error) {
    abort();
    try {
      await reader.cancel(error);
    } catch {
    }
    throw error;
  } finally {
    signal.removeEventListener("abort", cancel);
    try {
      reader.releaseLock();
    } catch {
    }
  }
  return { body: Buffer.concat(chunks), bytes: total };
}
function isProfileReadOnlySource(url) {
  return Object.values(EDITION.market.sources).some((source) => source === url) || EDITION.modelCatalog.url === url;
}
async function requestBounded({
  url,
  maxRedirects,
  maxResponseBytes,
  timeoutMs,
  fetchImpl = fetch,
  signal
}, onChunk) {
  const profileReadOnlyOrigin = EDITION.kind === "custom" && isProfileReadOnlySource(url) ? assertHttps(url).origin : null;
  let currentUrl = url;
  let hop = 0;
  for (; ; ) {
    signal?.throwIfAborted();
    assertHttps(currentUrl);
    const isProfileReadOnlyRedirect = profileReadOnlyOrigin !== null && new URL(currentUrl).origin === profileReadOnlyOrigin;
    if (EDITION.kind === "custom" && (0, import_service_destination.isOriginalService)(currentUrl) && !isProfileReadOnlySource(currentUrl) && !isProfileReadOnlyRedirect) {
      throw new BoundedFetchError("untrusted_service_destination", "INVALID_REDIRECT");
    }
    const controller = new AbortController();
    const timeoutSignal = AbortSignal.timeout(timeoutMs);
    const requestSignal = AbortSignal.any([controller.signal, timeoutSignal, ...signal ? [signal] : []]);
    let res;
    try {
      res = await fetchImpl(currentUrl, { redirect: "manual", signal: requestSignal });
    } catch (err) {
      signal?.throwIfAborted();
      throw new BoundedFetchError(
        `network request failed for ${currentUrl}: ${err instanceof Error ? err.message : String(err)}`,
        "NETWORK_ERROR"
      );
    }
    if (REDIRECT_STATUS_CODES.has(res.status)) {
      try {
        await res.body?.cancel();
      } catch {
      }
      if (hop >= maxRedirects) {
        throw new BoundedFetchError(`too many redirects (max ${maxRedirects}) fetching ${url}`, "TOO_MANY_REDIRECTS");
      }
      const location = res.headers.get("location");
      if (!location) {
        throw new BoundedFetchError(`redirect response from ${currentUrl} carried no Location header`, "INVALID_REDIRECT");
      }
      let nextUrl;
      try {
        nextUrl = new URL(location, currentUrl).href;
      } catch {
        throw new BoundedFetchError(`redirect Location header is not a valid URL: ${location}`, "INVALID_REDIRECT");
      }
      moduleLog.log(`following redirect ${hop + 1}/${maxRedirects}: ${currentUrl} -> ${nextUrl}`);
      currentUrl = nextUrl;
      hop += 1;
      continue;
    }
    const declaredLength = Number(res.headers.get("content-length"));
    if (Number.isFinite(declaredLength) && declaredLength > maxResponseBytes) {
      try {
        await res.body?.cancel();
      } catch {
      }
      throw new BoundedFetchError(
        `declared Content-Length ${declaredLength} exceeds maxResponseBytes (${maxResponseBytes})`,
        "RESPONSE_TOO_LARGE"
      );
    }
    const { body, bytes } = await readBoundedBody(res.body, maxResponseBytes, () => controller.abort(), requestSignal, onChunk);
    return { status: res.status, body, bytes, headers: headersToRecord(res.headers), finalUrl: currentUrl };
  }
}
async function fetchBounded(options) {
  const { status, body, headers, finalUrl } = await requestBounded(options);
  return { status, body, headers, finalUrl };
}
async function fetchBoundedToSink(options, onChunk) {
  const { status, bytes, headers, finalUrl } = await requestBounded(options, onChunk);
  return { status, bytes, headers, finalUrl };
}

// lib/plugin-versioning.ts
function parseVersionPart(value) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}
function parsePluginVersion(version) {
  const text = String(version || "0.0.0").trim();
  const match = /^v?(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/.exec(text);
  if (!match) return null;
  return {
    major: parseVersionPart(match[1]),
    minor: parseVersionPart(match[2]),
    patch: parseVersionPart(match[3]),
    prerelease: match[4] || "",
    raw: text
  };
}
function comparePrerelease(a, b) {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  const left = a.split(".");
  const right = b.split(".");
  const len = Math.max(left.length, right.length);
  for (let i = 0; i < len; i += 1) {
    const l = left[i];
    const r = right[i];
    if (l === void 0) return -1;
    if (r === void 0) return 1;
    const ln = /^\d+$/.test(l) ? Number.parseInt(l, 10) : null;
    const rn = /^\d+$/.test(r) ? Number.parseInt(r, 10) : null;
    if (ln !== null && rn !== null && ln !== rn) return ln > rn ? 1 : -1;
    if (ln !== null && rn === null) return -1;
    if (ln === null && rn !== null) return 1;
    if (l !== r) return l > r ? 1 : -1;
  }
  return 0;
}
function comparePluginVersions(a, b) {
  const left = parsePluginVersion(a);
  const right = parsePluginVersion(b);
  if (!left && !right) return String(a || "").localeCompare(String(b || ""), void 0, { numeric: true });
  if (!left) return -1;
  if (!right) return 1;
  for (const key of ["major", "minor", "patch"]) {
    if (left[key] !== right[key]) return left[key] > right[key] ? 1 : -1;
  }
  return comparePrerelease(left.prerelease, right.prerelease);
}

// scripts/extension-market-sync.mjs
var MARKET_SOURCE_ID = "official-global";
var MARKET_NAME = "Hana Global Market";
var API_BASE = "https://api.github.com";
var MAX_ENTRY_BYTES = 512 * 1024;
var MAX_API_BYTES = 2 * 1024 * 1024;
var MAX_REDIRECTS = 5;
var TIMEOUT_MS = 2e4;
var REPOSITORY_RE = /^[A-Za-z0-9-]{1,39}\/[A-Za-z0-9_.-]{1,100}$/;
var TAG_RE = /^[A-Za-z0-9][A-Za-z0-9._+-]{0,127}$/;
var SHA256_RE = /^[0-9a-f]{64}$/;
function isPlainObject2(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function exactKeys(value, keys, label) {
  const extra = Object.keys(value).filter((key) => !keys.includes(key));
  if (extra.length) throw new Error(`${label} has unsupported field(s): ${extra.join(", ")}`);
}
function readRegistry(raw) {
  if (!isPlainObject2(raw)) throw new Error("registry must be a JSON object");
  exactKeys(raw, ["schemaVersion", "entries"], "registry");
  if (raw.schemaVersion !== 1) throw new Error("registry.schemaVersion must be 1");
  if (!Array.isArray(raw.entries)) throw new Error("registry.entries must be an array");
  const seen = /* @__PURE__ */ new Set();
  return raw.entries.map((entry, index) => {
    const label = `registry.entries[${index}]`;
    if (!isPlainObject2(entry)) throw new Error(`${label} must be an object`);
    exactKeys(entry, ["kind", "id", "repository", "publisher"], label);
    if (!isExtensionKind(entry.kind)) throw new Error(`${label}.kind must be one of ${EXTENSION_KINDS.join(", ")}`);
    if (!isSafeExtensionId(entry.id)) throw new Error(`${label}.id is not a safe extension id`);
    const [owner, repo] = typeof entry.repository === "string" ? entry.repository.split("/") : [];
    if (typeof entry.repository !== "string" || !REPOSITORY_RE.test(entry.repository) || !/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(owner) || owner === "." || owner === ".." || repo === "." || repo === "..") {
      throw new Error(`${label}.repository must be a safe owner/repository name`);
    }
    if (typeof entry.publisher !== "string" || !entry.publisher.trim() || entry.publisher.length > 160) {
      throw new Error(`${label}.publisher must be a non-empty string no longer than 160 characters`);
    }
    const key = `${entry.kind}:${entry.id}`;
    if (seen.has(key)) throw new Error(`registry has duplicate enrollment ${key}`);
    seen.add(key);
    return { kind: entry.kind, id: entry.id, repository: entry.repository, publisher: entry.publisher.trim() };
  });
}
function enrollmentKey(record) {
  return `${record.kind}:${record.id}`;
}
function readApprovalRecord(approval, label) {
  if (!isPlainObject2(approval)) throw new Error(`${label} must be an object`);
  exactKeys(approval, ["kind", "id", "tag", "sha256", "readme"], label);
  if (!isExtensionKind(approval.kind)) throw new Error(`${label}.kind must be one of ${EXTENSION_KINDS.join(", ")}`);
  if (!isSafeExtensionId(approval.id)) throw new Error(`${label}.id is not a safe extension id`);
  if (typeof approval.tag !== "string" || !TAG_RE.test(approval.tag)) throw new Error(`${label}.tag must be a release tag of letters, digits, ".", "_", "+", or "-"`);
  if (typeof approval.sha256 !== "string" || !SHA256_RE.test(approval.sha256)) throw new Error(`${label}.sha256 must be 64 lowercase hexadecimal characters`);
  const readme = readApprovedReadme(approval, label);
  return { kind: approval.kind, id: approval.id, tag: approval.tag, sha256: approval.sha256, ...readme === null ? {} : { readme } };
}
function readApprovedReadme(approval, label) {
  if (approval.readme === void 0) return null;
  if (typeof approval.readme !== "string") throw new Error(`${label}.readme must be a string`);
  if (!approval.readme.trim()) throw new Error(`${label}.readme must be a non-empty Markdown string; delete the field to publish without a reviewed introduction`);
  const bytes = Buffer.byteLength(approval.readme, "utf8");
  if (bytes > MAX_MARKET_README_BYTES) throw new Error(`${label}.readme must be no longer than ${MAX_MARKET_README_BYTES} bytes`);
  return approval.readme;
}
function readApprovalList(raw) {
  if (!isPlainObject2(raw)) throw new Error("approvals must be a JSON object");
  exactKeys(raw, ["schemaVersion", "approvals"], "approvals");
  if (raw.schemaVersion !== 1) throw new Error("approvals.schemaVersion must be 1");
  if (!Array.isArray(raw.approvals)) throw new Error("approvals.approvals must be an array");
  const seen = /* @__PURE__ */ new Set();
  return raw.approvals.map((approval, index) => {
    const record = readApprovalRecord(approval, `approvals.approvals[${index}]`);
    if (seen.has(enrollmentKey(record))) throw new Error(`approvals has duplicate approval ${enrollmentKey(record)}`);
    seen.add(enrollmentKey(record));
    return record;
  });
}
function readApprovals(raw, registrations) {
  const enrolled = new Set(registrations.map(enrollmentKey));
  const approvals = /* @__PURE__ */ new Map();
  for (const record of readApprovalList(raw)) {
    if (!enrolled.has(enrollmentKey(record))) throw new Error(`approval ${enrollmentKey(record)} has no matching enrollment`);
    approvals.set(enrollmentKey(record), record);
  }
  return approvals;
}
function parseJson(buffer, label) {
  try {
    return JSON.parse(buffer.toString("utf8"));
  } catch {
    throw new Error(`${label} is not valid JSON`);
  }
}
function assertHttpSuccess(response, label) {
  if (response.status < 200 || response.status >= 300) {
    const rate = response.status === 403 ? " (check GitHub API rate limits or credentials)" : "";
    throw new Error(`${label}: GitHub API returned HTTP ${response.status}${rate}`);
  }
}
function releaseEntryFileName(registration) {
  return registration.kind === "skill" || registration.kind === "recipe" ? `${registration.kind}-${registration.id}.entry.json` : null;
}
function canonicalRepository(repository) {
  return `https://github.com/${repository}`;
}
function assertVersion(registration, version) {
  if (registration.kind !== "skill" && registration.kind !== "recipe" && !parsePluginVersion(version)) {
    throw new Error(`entry version ${JSON.stringify(version)} is not a semantic version`);
  }
}
function assetFileName(url) {
  if (typeof url !== "string" || !url.startsWith("{{BASE_URL}}/")) return null;
  const name = url.slice("{{BASE_URL}}/".length);
  return name && !name.includes("/") && !name.includes("\\") ? name : null;
}
function expectedEntryName(registration, version) {
  return releaseEntryFileName(registration) || `${registration.kind}-${registration.id}-${version}.entry.json`;
}
function validateRelease(release, label, expectedTag) {
  if (!isPlainObject2(release)) throw new Error(`${label} payload must be an object`);
  if (release.draft === true) throw new Error(`${label} is a draft`);
  if (release.prerelease === true) throw new Error(`${label} is a prerelease`);
  if (typeof release.tag_name !== "string" || !release.tag_name.trim()) throw new Error(`${label} has no tag name`);
  if (expectedTag !== void 0 && release.tag_name !== expectedTag) throw new Error(`${label} reports tag ${JSON.stringify(release.tag_name)}`);
  if (!Array.isArray(release.assets)) throw new Error(`${label} has no assets array`);
  return { assets: release.assets, tagName: release.tag_name };
}
function assertReleaseAsset(asset, repository, tagName, label) {
  if (!isPlainObject2(asset) || typeof asset.name !== "string" || !asset.name) throw new Error(`${label} asset is malformed`);
  if (typeof asset.browser_download_url !== "string") throw new Error(`${label} asset ${asset.name} has no browser download URL`);
  let url;
  try {
    url = new URL(asset.browser_download_url);
  } catch {
    throw new Error(`${label} asset ${asset.name} has an invalid download URL`);
  }
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(url.pathname);
  } catch {
    throw new Error(`${label} asset ${asset.name} has an invalid encoded path`);
  }
  const expectedPath = `/${repository}/releases/download/${tagName}/${asset.name}`;
  if (url.protocol !== "https:" || url.hostname !== "github.com" || url.port || url.username || url.password || decodedPath !== expectedPath || url.search || url.hash) {
    throw new Error(`${label} asset ${asset.name} is not an exact HTTPS download for enrolled repository ${repository}`);
  }
  return asset;
}
function findOnlyAsset(assets, name, label, repository, tagName, releaseLabel) {
  const matches = assets.filter((asset) => isPlainObject2(asset) && asset.name === name);
  if (matches.length === 0) throw new Error(`${releaseLabel} is missing ${label} asset ${name}`);
  if (matches.length > 1) throw new Error(`${releaseLabel} has ambiguous ${label} asset ${name}`);
  return assertReleaseAsset(matches[0], repository, tagName, label);
}
function validateEntry(entry, registration) {
  if (!isPlainObject2(entry)) throw new Error("entry metadata must be a JSON object");
  if (entry.kind !== registration.kind || entry.id !== registration.id) {
    throw new Error(`entry identity ${JSON.stringify(entry.kind)}:${JSON.stringify(entry.id)} does not match enrollment ${registration.kind}:${registration.id}`);
  }
  if (entry.publisher !== registration.publisher) throw new Error("entry publisher does not match reviewed enrollment");
  if (typeof entry.version !== "string" || !entry.version) throw new Error("entry version is missing");
  assertVersion(registration, entry.version);
  if ((registration.kind === "skill" || registration.kind === "recipe") && entry.version !== "0.0.0") {
    throw new Error("skill and recipe entries must use version 0.0.0");
  }
  if (!isPlainObject2(entry.archive)) throw new Error("entry archive must be an object");
  const zipName = assetFileName(entry.archive.url);
  if (!zipName || !zipName.endsWith(".zip")) throw new Error("entry archive.url must name a local {{BASE_URL}} ZIP asset");
  if (typeof entry.archive.sha256 !== "string" || !/^[0-9a-f]{64}$/.test(entry.archive.sha256)) {
    throw new Error("entry archive.sha256 must be 64 lowercase hexadecimal characters");
  }
  if (!Number.isInteger(entry.archive.size) || entry.archive.size <= 0 || entry.archive.size > MAX_MARKET_ARCHIVE_BYTES) {
    throw new Error(`entry archive.size must be a positive integer no larger than ${MAX_MARKET_ARCHIVE_BYTES}`);
  }
  if (entry.archive.format !== "zip") throw new Error("entry archive.format must be zip");
  return zipName;
}
function githubApiFetch(fetchImpl, token) {
  return async (input, init = {}) => {
    const rawUrl = typeof input === "string" || input instanceof URL ? String(input) : input.url;
    const url = new URL(rawUrl);
    const headers = new Headers(init.headers || {});
    headers.set("accept", "application/vnd.github+json");
    if (url.hostname !== "api.github.com") throw new Error(`refusing GitHub API request outside api.github.com: ${url.hostname}`);
    if (token) headers.set("authorization", `Bearer ${token}`);
    return fetchImpl(input, { ...init, headers });
  };
}
async function readRelease(registration, { tag, fetchImpl, token }) {
  const label = tag === void 0 ? "latest release" : `release ${tag}`;
  const selector = tag === void 0 ? "latest" : `tags/${encodeURIComponent(tag)}`;
  const response = await fetchBounded({
    url: `${API_BASE}/repos/${registration.repository}/releases/${selector}`,
    maxRedirects: 2,
    maxResponseBytes: MAX_API_BYTES,
    timeoutMs: TIMEOUT_MS,
    fetchImpl: githubApiFetch(fetchImpl, token)
  });
  assertHttpSuccess(response, `${registration.kind}/${registration.id} ${label}`);
  return { ...validateRelease(parseJson(response.body, `${label} metadata`), label, tag), label };
}
async function readEntryAsset(asset, registration, options) {
  const response = await fetchBounded({
    url: asset.browser_download_url,
    maxRedirects: MAX_REDIRECTS,
    maxResponseBytes: MAX_ENTRY_BYTES,
    timeoutMs: TIMEOUT_MS,
    fetchImpl: options.fetchImpl
  });
  assertHttpSuccess(response, `${registration.kind}/${registration.id} entry`);
  return parseJson(response.body, "entry metadata");
}
async function verifyArchive(asset, entry, registration, options) {
  if (!Number.isInteger(asset.size) || asset.size <= 0) throw new Error("release ZIP asset is missing a valid byte size");
  if (asset.size !== entry.archive.size) throw new Error("release ZIP asset size does not match entry metadata");
  const sha256 = crypto.createHash("sha256");
  const response = await fetchBoundedToSink({
    url: asset.browser_download_url,
    maxRedirects: MAX_REDIRECTS,
    maxResponseBytes: MAX_MARKET_ARCHIVE_BYTES,
    timeoutMs: TIMEOUT_MS,
    fetchImpl: options.fetchImpl
  }, async (chunk) => {
    sha256.update(chunk);
  });
  assertHttpSuccess(response, `${registration.kind}/${registration.id} ZIP`);
  if (response.bytes !== entry.archive.size) throw new Error("downloaded ZIP byte count does not match entry metadata");
  const actual = sha256.digest("hex");
  if (actual !== entry.archive.sha256) throw new Error("downloaded ZIP sha256 does not match entry metadata");
}
function projectEntry(entry, registration, archiveUrl) {
  const projected = {
    ...entry,
    publisher: registration.publisher,
    repository: canonicalRepository(registration.repository),
    archive: { ...entry.archive, url: archiveUrl }
  };
  delete projected.versions;
  delete projected.stats;
  delete projected.readme;
  delete projected.readmeUrl;
  delete projected.listedAt;
  return projected;
}
function indexPayloadBytes(index) {
  return Buffer.byteLength(`${JSON.stringify(index, null, 2)}
`, "utf8");
}
function assertIndexFitsClientPayload(index) {
  const bytes = indexPayloadBytes(index);
  if (bytes > MAX_MARKET_INDEX_BYTES) {
    throw new Error(`generated index is ${bytes} bytes, above the ${MAX_MARKET_INDEX_BYTES}-byte payload limit clients accept; trim README snapshots or entries`);
  }
}
function strictIndex(raw, label) {
  const result = validateMarketIndexV2(raw);
  if ("errors" in result) throw new Error(`${label} is invalid: ${result.errors.join("; ")}`);
  if (result.warnings.length) throw new Error(`${label} contains invalid item(s): ${result.warnings.join("; ")}`);
  if (result.index.sourceId !== MARKET_SOURCE_ID) throw new Error(`${label} sourceId must be ${MARKET_SOURCE_ID}`);
  return result.index;
}
function normalizeItem(item) {
  const index = strictIndex({
    schemaVersion: MARKET_INDEX_SCHEMA_VERSION,
    sourceId: MARKET_SOURCE_ID,
    name: MARKET_NAME,
    publishedAt: "2026-01-01T00:00:00.000Z",
    items: [item]
  }, "generated item");
  return index.items[0];
}
function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}
function sameArchive(a, b) {
  return a?.sha256 === b?.sha256 && a?.size === b?.size && a?.format === b?.format;
}
function historyFor(previous, candidate, registration) {
  if (!previous || previous.repository !== canonicalRepository(registration.repository)) return candidate;
  if (registration.kind === "skill" || registration.kind === "recipe") return candidate;
  const compared = comparePluginVersions(candidate.version, previous.version);
  if (compared < 0) throw new Error(`latest release version ${candidate.version} would downgrade published ${previous.version}`);
  if (compared === 0) {
    if (!sameArchive(candidate.archive, previous.archive)) throw new Error(`latest release version ${candidate.version} would replace an existing published ZIP`);
    return previous.versions?.length ? { ...candidate, versions: previous.versions } : candidate;
  }
  const records = [{ version: previous.version, ...previous.compatibility?.minAppVersion ? { minAppVersion: previous.compatibility.minAppVersion } : {}, archive: previous.archive }, ...previous.versions || []];
  const versions = records.sort((a, b) => comparePluginVersions(b.version, a.version));
  return { ...candidate, versions };
}
function deepEqual(a, b) {
  return stableJson(a) === stableJson(b);
}
async function readReleaseCandidate(registration, { approval, fetchImpl, token }) {
  const { assets, tagName, label } = await readRelease(registration, { tag: approval?.tag, fetchImpl, token });
  const fixedName = releaseEntryFileName(registration);
  const possibleEntries = fixedName ? [findOnlyAsset(assets, fixedName, "entry", registration.repository, tagName, label)] : assets.filter((asset) => isPlainObject2(asset) && typeof asset.name === "string" && asset.name.startsWith(`${registration.kind}-${registration.id}-`) && asset.name.endsWith(".entry.json"));
  if (!fixedName && possibleEntries.length !== 1) throw new Error(`${label} must contain exactly one entry metadata asset for ${registration.kind}-${registration.id}`);
  const entryAsset = assertReleaseAsset(possibleEntries[0], registration.repository, tagName, "entry");
  const entry = await readEntryAsset(entryAsset, registration, { fetchImpl, token });
  const expectedName = expectedEntryName(registration, entry.version);
  if (entryAsset.name !== expectedName) throw new Error(`entry asset must be named ${expectedName}`);
  const zipName = validateEntry(entry, registration);
  if (approval && entry.archive.sha256 !== approval.sha256) throw new Error(`${label} ZIP sha256 does not match the approved sha256`);
  const zipAsset = findOnlyAsset(assets, zipName, "ZIP", registration.repository, tagName, label);
  await verifyArchive(zipAsset, entry, registration, { fetchImpl, token });
  return { candidate: normalizeItem(projectEntry(entry, registration, zipAsset.browser_download_url)), tagName };
}
function releaseAssetLocation(archiveUrl, repository) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(new URL(archiveUrl).pathname);
  } catch {
    return null;
  }
  const prefix = `/${repository}/releases/download/`;
  if (!decodedPath.startsWith(prefix)) return null;
  const parts = decodedPath.slice(prefix.length).split("/");
  return parts.length === 2 && parts[0] && parts[1] ? { tag: parts[0], name: parts[1] } : null;
}
function publishedTag(item, repository) {
  if (!item || item.repository !== canonicalRepository(repository)) return null;
  return releaseAssetLocation(item.archive.url, repository)?.tag ?? null;
}
var MAX_RELEASE_PAGES = 10;
function validDownloadCount(asset, label) {
  if (!Number.isInteger(asset.download_count) || asset.download_count < 0) throw new Error(`${label} asset ${asset.name} has no valid download count`);
  return asset.download_count;
}
async function readStableReleases(registration, { fetchImpl, token, releases }) {
  const key = `${registration.repository}@*`;
  if (!releases.has(key)) releases.set(key, (async () => {
    const all = [];
    for (let page = 1; page <= MAX_RELEASE_PAGES; page += 1) {
      const response = await fetchBounded({
        url: `${API_BASE}/repos/${registration.repository}/releases?per_page=100&page=${page}`,
        maxRedirects: 2,
        maxResponseBytes: MAX_API_BYTES,
        timeoutMs: TIMEOUT_MS,
        fetchImpl: githubApiFetch(fetchImpl, token)
      });
      assertHttpSuccess(response, `${registration.kind}/${registration.id} release list`);
      const list = parseJson(response.body, "release list");
      if (!Array.isArray(list)) throw new Error("release list must be an array");
      all.push(...list);
      if (list.length < 100) return all.filter((release) => isPlainObject2(release) && release.draft !== true && release.prerelease !== true && Array.isArray(release.assets));
    }
    throw new Error(`release list has more than ${MAX_RELEASE_PAGES * 100} releases`);
  })());
  return releases.get(key);
}
async function readDownloadCount(item, registration, options) {
  const current = releaseAssetLocation(item.archive.url, registration.repository);
  if (!current) throw new Error(`archive ${item.archive.url} is not a release asset of ${registration.repository}`);
  if (registration.kind === "skill" || registration.kind === "recipe") {
    const pattern = new RegExp(`^${registration.kind}-${registration.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-[0-9a-f]{64}\\.zip$`);
    let total2 = 0;
    let foundCurrent = false;
    for (const release of await readStableReleases(registration, options)) {
      for (const asset of release.assets) {
        if (!isPlainObject2(asset) || typeof asset.name !== "string" || !pattern.test(asset.name)) continue;
        total2 += validDownloadCount(asset, `release ${release.tag_name}`);
        if (release.tag_name === current.tag && asset.name === current.name) foundCurrent = true;
      }
    }
    if (!foundCurrent) throw new Error(`release ${current.tag} is missing published asset ${current.name}`);
    return total2;
  }
  let total = 0;
  for (const archive of [item.archive, ...(item.versions || []).map((version) => version.archive)]) {
    const location = releaseAssetLocation(archive.url, registration.repository);
    if (!location) throw new Error(`archive ${archive.url} is not a release asset of ${registration.repository}`);
    const key = `${registration.repository}@${location.tag}`;
    if (!options.releases.has(key)) options.releases.set(key, readRelease(registration, { tag: location.tag, fetchImpl: options.fetchImpl, token: options.token }));
    const { assets, label } = await options.releases.get(key);
    const asset = assets.find((candidate) => isPlainObject2(candidate) && candidate.name === location.name);
    if (!asset) throw new Error(`${label} is missing published asset ${location.name}`);
    total += validDownloadCount(asset, label);
  }
  return total;
}
async function withDownloadStats(item, registration, previousStats, options, warnings) {
  try {
    const downloads = await readDownloadCount(item, registration, options);
    return { ...item, stats: { ...item.stats, downloads } };
  } catch (error) {
    warnings.push(`${registration.kind}/${registration.id}: download count unavailable, kept the previous value: ${error instanceof Error ? error.message : String(error)}`);
    const kept = { ...item, stats: previousStats };
    if (!previousStats) delete kept.stats;
    return kept;
  }
}
function withApprovedReadme(item, approval) {
  const next = { ...item };
  delete next.readmeUrl;
  if (approval.readme !== void 0) next.readme = approval.readme;
  else delete next.readme;
  return next;
}
function withListedAt(item, published, registration, nowIso) {
  const next = { ...item };
  const sameRepo = Boolean(published && published.repository === canonicalRepository(registration.repository));
  if (sameRepo) {
    if (typeof published.listedAt === "string") next.listedAt = published.listedAt;
    else delete next.listedAt;
  } else {
    next.listedAt = nowIso;
  }
  return next;
}
function reusablePublishedItem(item, registration, approval) {
  if (!item || item.publisher !== registration.publisher || item.archive.sha256 !== approval.sha256) return null;
  return publishedTag(item, registration.repository) === approval.tag ? item : null;
}
async function synchronizeMarket({ registry, approvals, previousIndex = null, fetchImpl = fetch, token, now = () => /* @__PURE__ */ new Date() }) {
  const registrations = readRegistry(registry);
  const approved = readApprovals(approvals, registrations);
  const previous = previousIndex === null ? null : strictIndex(previousIndex, "previous index");
  const previousItems = new Map((previous?.items || []).map((item) => [enrollmentKey(item), item]));
  const failures = [];
  const items = [];
  const pending = [];
  const warnings = [];
  const statsOptions = { fetchImpl, token, releases: /* @__PURE__ */ new Map() };
  const syncNow = now();
  const syncNowIso = syncNow.toISOString();
  for (const registration of registrations) {
    const approval = approved.get(enrollmentKey(registration));
    if (!approval) {
      pending.push(`${registration.kind}/${registration.id}`);
      continue;
    }
    const published = previousItems.get(enrollmentKey(registration));
    const reusable = reusablePublishedItem(published, registration, approval);
    if (reusable) {
      items.push(await withDownloadStats(withApprovedReadme(reusable, approval), registration, reusable.stats, statsOptions, warnings));
      continue;
    }
    try {
      const { candidate } = await readReleaseCandidate(registration, { approval, fetchImpl, token });
      const item = withListedAt(withApprovedReadme(historyFor(published, candidate, registration), approval), published, registration, syncNowIso);
      items.push(await withDownloadStats(item, registration, published?.stats, statsOptions, warnings));
    } catch (error) {
      failures.push(`${registration.kind}/${registration.id} (${registration.repository}): ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  if (failures.length) throw new Error(`market synchronization failed for ${failures.length} enrollment(s):
${failures.map((failure) => `- ${failure}`).join("\n")}`);
  items.sort((a, b) => a.kind === b.kind ? a.id.localeCompare(b.id) : a.kind.localeCompare(b.kind));
  const draft = {
    schemaVersion: MARKET_INDEX_SCHEMA_VERSION,
    sourceId: MARKET_SOURCE_ID,
    name: MARKET_NAME,
    publishedAt: previous?.publishedAt || syncNowIso,
    items
  };
  if (previous && !deepEqual({ ...draft, publishedAt: previous.publishedAt }, previous)) {
    const previousMs = Date.parse(previous.publishedAt);
    const requestedMs = syncNow.getTime();
    draft.publishedAt = new Date(Math.max(requestedMs, previousMs + 1)).toISOString();
  }
  const index = strictIndex(draft, "generated index");
  assertIndexFitsClientPayload(index);
  const unchanged = Boolean(previous && deepEqual(index, previous));
  return { index, unchanged, pending, warnings };
}
async function discoverReleases({ registry, approvals, previousIndex = null, onlyChangedFrom = null, fetchImpl = fetch, token }) {
  const registrations = readRegistry(registry);
  const approved = readApprovals(approvals, registrations);
  const previous = previousIndex === null ? null : strictIndex(previousIndex, "previous index");
  const previousItems = new Map((previous?.items || []).map((item) => [enrollmentKey(item), item]));
  const baseline = onlyChangedFrom === null ? null : new Map(readRegistry(onlyChangedFrom).map((record) => [enrollmentKey(record), record]));
  const proposals = [];
  const skipped = [];
  for (const registration of registrations) {
    if (baseline && deepEqual(baseline.get(enrollmentKey(registration)), registration)) continue;
    try {
      const { candidate, tagName } = await readReleaseCandidate(registration, { fetchImpl, token });
      if (approved.get(enrollmentKey(registration))?.sha256 === candidate.archive.sha256) continue;
      if (!TAG_RE.test(tagName)) throw new Error(`release tag ${JSON.stringify(tagName)} must use only letters, digits, ".", "_", "+", or "-"`);
      const published = previousItems.get(enrollmentKey(registration));
      historyFor(published, candidate, registration);
      proposals.push({ kind: registration.kind, id: registration.id, tag: tagName, sha256: candidate.archive.sha256, version: candidate.version });
    } catch (error) {
      skipped.push(`${registration.kind}/${registration.id} (${registration.repository}): ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return { proposals, skipped };
}
function writeIndexAtomically(outPath, index) {
  const directory = path.dirname(outPath);
  fs.mkdirSync(directory, { recursive: true });
  const pending = path.join(directory, `.${path.basename(outPath)}.${process.pid}.${crypto.randomUUID()}.pending`);
  try {
    fs.writeFileSync(pending, `${JSON.stringify(index, null, 2)}
`, "utf8");
    fs.renameSync(pending, outPath);
  } finally {
    fs.rmSync(pending, { force: true });
  }
}
var USAGE = [
  "Usage: extension-market-sync --registry registry.json --approvals approvals.json --previous index.v2.json --out index.v2.json [--check]",
  "       extension-market-sync --discover --registry registry.json --approvals approvals.json --previous index.v2.json [--changed-from base-registry.json]"
].join("\n");
function parseArgs(argv) {
  const args = { registry: null, approvals: null, previous: null, out: null, check: false, discover: false, changedFrom: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--registry") args.registry = argv[++i];
    else if (arg === "--approvals") args.approvals = argv[++i];
    else if (arg === "--previous") args.previous = argv[++i];
    else if (arg === "--out") args.out = argv[++i];
    else if (arg === "--check") args.check = true;
    else if (arg === "--discover") args.discover = true;
    else if (arg === "--changed-from") args.changedFrom = argv[++i];
    else throw new Error(`unknown argument ${arg}`);
  }
  const valid = args.registry && args.approvals && (args.discover ? !args.out && !args.check : args.out && !args.changedFrom);
  if (!valid) throw new Error(USAGE);
  return args;
}
function readJsonFile(file) {
  return JSON.parse(fs.readFileSync(path.resolve(file), "utf8"));
}
async function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    const outPath = args.discover ? null : path.resolve(args.out);
    const previousPath = args.previous ? path.resolve(args.previous) : outPath;
    if (args.previous && !fs.existsSync(previousPath)) throw new Error(`--previous does not exist: ${previousPath}`);
    const registry = readJsonFile(args.registry);
    const approvalsDocument = readJsonFile(args.approvals);
    const previous = previousPath && fs.existsSync(previousPath) ? readJsonFile(previousPath) : null;
    if (args.discover) {
      const { proposals, skipped } = await discoverReleases({
        registry,
        approvals: approvalsDocument,
        previousIndex: previous,
        onlyChangedFrom: args.changedFrom ? readJsonFile(args.changedFrom) : null,
        token: process.env.GITHUB_TOKEN
      });
      for (const { version, ...approval } of proposals) {
        console.log(`extension-market-sync: unapproved ${approval.kind}/${approval.id} version ${version}; approvals.json record: ${JSON.stringify(approval)}`);
      }
      for (const failure of skipped) console.log(`extension-market-sync: skipped ${failure}`);
      console.log(`extension-market-sync: ${proposals.length} unapproved release(s), ${skipped.length} skipped`);
      if (args.changedFrom && skipped.length) process.exitCode = 1;
      return;
    }
    const { index, unchanged, pending, warnings } = await synchronizeMarket({ registry, approvals: approvalsDocument, previousIndex: previous, token: process.env.GITHUB_TOKEN });
    if (pending.length) console.log(`extension-market-sync: awaiting approval: ${pending.join(", ")}`);
    for (const warning of warnings) console.warn(`extension-market-sync: warning: ${warning}`);
    if (args.check) console.log(`extension-market-sync: ${unchanged ? "no changes" : "index would change"} (${index.items.length} item(s))`);
    else if (unchanged && outPath === previousPath) console.log(`extension-market-sync: no changes (${index.items.length} item(s))`);
    else {
      writeIndexAtomically(outPath, index);
      console.log(`extension-market-sync: ${unchanged ? "copied" : "wrote"} ${outPath} (${index.items.length} item(s))`);
    }
  } catch (error) {
    console.error(`extension-market-sync: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url))) main();
export {
  MARKET_NAME,
  MARKET_SOURCE_ID,
  discoverReleases,
  readApprovals,
  readRegistry,
  synchronizeMarket,
  writeIndexAtomically
};
