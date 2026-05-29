import { StyleSheet } from 'react-native';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { LRUCache } from 'lru-cache';
import { sha256 } from 'js-sha256';

const DEFAULT_MAX = 500;

export type SupportedStyle = ViewStyle | TextStyle | ImageStyle | object;

export type CachedStyle = ReturnType<
  typeof StyleSheet.create<{ style: ViewStyle }>
>['style'];

export type StyleCacheConfig = {
  max?: number;
};

export type StyleCacheStats = {
  size: number;
  max: number;
  themes: string[];
};

let maxSize = DEFAULT_MAX;
const caches = new Map<string, LRUCache<string, CachedStyle>>();

const getThemeCache = (theme: string): LRUCache<string, CachedStyle> => {
  let cache = caches.get(theme);
  if (!cache) {
    cache = new LRUCache<string, CachedStyle>({ max: maxSize });
    caches.set(theme, cache);
  }
  return cache;
};

const canonicalStringify = (value: unknown): string => {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(canonicalStringify).join(',')}]`;
  }
  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).sort();
  return `{${keys
    .map((key) => `${canonicalStringify(key)}:${canonicalStringify(obj[key])}`)
    .join(',')}}`;
};

const hashStyle = (style: object): string => sha256(canonicalStringify(style));

const normalizeStyle = (inputStyle: SupportedStyle): object => {
  const flattened = StyleSheet.flatten(
    inputStyle as Parameters<typeof StyleSheet.flatten>[0]
  );
  if (flattened == null || typeof flattened !== 'object') {
    return {};
  }
  return flattened;
};

const resizeThemeCaches = (): void => {
  for (const [theme, cache] of caches.entries()) {
    const next = new LRUCache<string, CachedStyle>({ max: maxSize });
    for (const [key, value] of cache) {
      next.set(key, value);
    }
    caches.set(theme, next);
  }
};

export const configureStyleCache = (config: StyleCacheConfig): void => {
  if (config.max !== undefined) {
    if (!Number.isInteger(config.max) || config.max < 1) {
      throw new RangeError('Style cache max must be a positive integer');
    }
    maxSize = config.max;
    resizeThemeCaches();
  }
};

export const getCachedStyle = (
  inputStyle: SupportedStyle,
  theme = 'default'
): CachedStyle | number => {
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

  const created = StyleSheet.create({ style: finalStyle as ViewStyle });
  const result = created.style;
  cache.set(key, result);
  return result;
};

export const getCachedStyles = (
  styleMap: Record<string, SupportedStyle | undefined>,
  theme = 'default'
): Record<string, CachedStyle | number> => {
  const result: Record<string, CachedStyle | number> = {};
  for (const key in styleMap) {
    const style = styleMap[key];
    if (style !== undefined) {
      result[key] = getCachedStyle(style, theme);
    }
  }
  return result;
};

export const clearStyleCache = (theme?: string): void => {
  if (theme !== undefined) {
    caches.get(theme)?.clear();
    caches.delete(theme);
    return;
  }
  caches.clear();
};

export const prewarmStyles = (
  styles: SupportedStyle[],
  theme = 'default'
): void => {
  styles.forEach((style) => {
    getCachedStyle(style, theme);
  });
};

export const getStyleCacheStats = (): StyleCacheStats => {
  let size = 0;
  for (const cache of caches.values()) {
    size += cache.size;
  }
  return {
    size,
    max: maxSize,
    themes: [...caches.keys()],
  };
};
