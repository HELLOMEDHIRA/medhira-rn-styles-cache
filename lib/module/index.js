"use strict";

import { StyleSheet } from 'react-native';
import { LRUCache } from 'lru-cache';
import { sha256 } from 'js-sha256';
const DEFAULT_MAX = 500;
let maxSize = DEFAULT_MAX;
const caches = new Map();
const getThemeCache = theme => {
  let cache = caches.get(theme);
  if (!cache) {
    cache = new LRUCache({
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
const hashStyle = style => sha256(canonicalStringify(style));
const normalizeStyle = inputStyle => {
  const flattened = StyleSheet.flatten(inputStyle);
  if (flattened == null || typeof flattened !== 'object') {
    return {};
  }
  return flattened;
};
const resizeThemeCaches = () => {
  for (const [theme, cache] of caches.entries()) {
    const next = new LRUCache({
      max: maxSize
    });
    for (const [key, value] of cache) {
      next.set(key, value);
    }
    caches.set(theme, next);
  }
};
export const configureStyleCache = config => {
  if (config.max !== undefined) {
    if (!Number.isInteger(config.max) || config.max < 1) {
      throw new RangeError('Style cache max must be a positive integer');
    }
    maxSize = config.max;
    resizeThemeCaches();
  }
};
export const getCachedStyle = (inputStyle, theme = 'default') => {
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
  const created = StyleSheet.create({
    style: finalStyle
  });
  const result = created.style;
  cache.set(key, result);
  return result;
};
export const getCachedStyles = (styleMap, theme = 'default') => {
  const result = {};
  for (const key in styleMap) {
    const style = styleMap[key];
    if (style !== undefined) {
      result[key] = getCachedStyle(style, theme);
    }
  }
  return result;
};
export const clearStyleCache = theme => {
  if (theme !== undefined) {
    caches.get(theme)?.clear();
    caches.delete(theme);
    return;
  }
  caches.clear();
};
export const prewarmStyles = (styles, theme = 'default') => {
  styles.forEach(style => {
    getCachedStyle(style, theme);
  });
};
export const getStyleCacheStats = () => {
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
//# sourceMappingURL=index.js.map