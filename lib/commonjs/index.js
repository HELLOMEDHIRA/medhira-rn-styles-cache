"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prewarmStyles = exports.getStyleCacheStats = exports.getCachedStyles = exports.getCachedStyle = exports.configureStyleCache = exports.clearStyleCache = void 0;
var _reactNative = require("react-native");
var _lruCache = require("lru-cache");
var _jsSha = require("js-sha256");
const DEFAULT_MAX = 500;
let maxSize = DEFAULT_MAX;
const caches = new Map();
const getThemeCache = theme => {
  let cache = caches.get(theme);
  if (!cache) {
    cache = new _lruCache.LRUCache({
      max: maxSize
    });
    caches.set(theme, cache);
  }
  return cache;
};
const canonicalStringify = value => {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(canonicalStringify).join(',')}]`;
  }
  const obj = value;
  const keys = Object.keys(obj).sort();
  return `{${keys.map(key => `${canonicalStringify(key)}:${canonicalStringify(obj[key])}`).join(',')}}`;
};
const hashStyle = style => (0, _jsSha.sha256)(canonicalStringify(style));
const normalizeStyle = inputStyle => {
  const flattened = _reactNative.StyleSheet.flatten(inputStyle);
  if (flattened == null || typeof flattened !== 'object') {
    return {};
  }
  return flattened;
};
const resizeThemeCaches = () => {
  for (const [theme, cache] of caches.entries()) {
    const next = new _lruCache.LRUCache({
      max: maxSize
    });
    for (const [key, value] of cache) {
      next.set(key, value);
    }
    caches.set(theme, next);
  }
};
const configureStyleCache = config => {
  if (config.max !== undefined) {
    if (!Number.isInteger(config.max) || config.max < 1) {
      throw new RangeError('Style cache max must be a positive integer');
    }
    maxSize = config.max;
    resizeThemeCaches();
  }
};
exports.configureStyleCache = configureStyleCache;
const getCachedStyle = (inputStyle, theme = 'default') => {
  if (typeof inputStyle === 'number') {
    return inputStyle;
  }
  const finalStyle = normalizeStyle(inputStyle);
  const cache = getThemeCache(theme);
  const key = hashStyle(finalStyle);
  const cached = cache.get(key);
  if (cached !== undefined) {
    return cached;
  }
  const created = _reactNative.StyleSheet.create({
    style: finalStyle
  });
  const result = created.style;
  cache.set(key, result);
  return result;
};
exports.getCachedStyle = getCachedStyle;
const getCachedStyles = (styleMap, theme = 'default') => {
  const result = {};
  for (const key in styleMap) {
    const style = styleMap[key];
    if (style !== undefined) {
      result[key] = getCachedStyle(style, theme);
    }
  }
  return result;
};
exports.getCachedStyles = getCachedStyles;
const clearStyleCache = theme => {
  if (theme !== undefined) {
    caches.get(theme)?.clear();
    caches.delete(theme);
    return;
  }
  caches.clear();
};
exports.clearStyleCache = clearStyleCache;
const prewarmStyles = (styles, theme = 'default') => {
  styles.forEach(style => {
    getCachedStyle(style, theme);
  });
};
exports.prewarmStyles = prewarmStyles;
const getStyleCacheStats = () => {
  let size = 0;
  for (const cache of caches.values()) {
    size += cache.size;
  }
  return {
    size,
    max: maxSize,
    themes: [...caches.keys()]
  };
};
exports.getStyleCacheStats = getStyleCacheStats;
//# sourceMappingURL=index.js.map