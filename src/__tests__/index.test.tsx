import { StyleSheet } from 'react-native';
import {
  clearStyleCache,
  configureStyleCache,
  getCachedStyle,
  getCachedStyles,
  getStyleCacheStats,
  prewarmStyles,
} from '../index';

describe('medhira-rn-styles-cache', () => {
  beforeEach(() => {
    clearStyleCache();
    configureStyleCache({ max: 500 });
  });

  describe('getCachedStyle', () => {
    it('returns the same reference for identical style objects', () => {
      const style = { width: 100, height: 50 };
      const first = getCachedStyle(style);
      const second = getCachedStyle({ height: 50, width: 100 });
      expect(first).toBe(second);
    });

    it('returns registered style IDs unchanged', () => {
      const registered = StyleSheet.create({ box: { flex: 1 } }).box;
      expect(getCachedStyle(registered)).toBe(registered);
    });

    it('uses separate cache entries per theme', () => {
      const style = { backgroundColor: 'white' };
      const light = getCachedStyle(style, 'light');
      const dark = getCachedStyle(style, 'dark');
      expect(light).not.toBe(dark);
    });

    it('flattens nested style arrays', () => {
      const base = { padding: 8 };
      const nested = getCachedStyle([base, { margin: 4 }]);
      const flat = getCachedStyle({ padding: 8, margin: 4 });
      expect(nested).toBe(flat);
    });
  });

  describe('getCachedStyles', () => {
    it('caches each key in the style map', () => {
      const styles = getCachedStyles({
        container: { flex: 1 },
        text: { fontSize: 14 },
      });
      expect(styles.container).toBe(getCachedStyle({ flex: 1 }));
      expect(styles.text).toBe(getCachedStyle({ fontSize: 14 }));
    });

    it('skips undefined entries', () => {
      const styles = getCachedStyles({
        kept: { width: 1 },
        removed: undefined,
      });
      expect(Object.keys(styles)).toEqual(['kept']);
    });
  });

  describe('prewarmStyles', () => {
    it('populates the cache before runtime use', () => {
      prewarmStyles([{ flex: 1 }, { padding: 10 }]);
      const stats = getStyleCacheStats();
      expect(stats.size).toBe(2);
    });
  });

  describe('clearStyleCache', () => {
    it('clears all themes when called without arguments', () => {
      getCachedStyle({ width: 1 }, 'light');
      getCachedStyle({ width: 2 }, 'dark');
      clearStyleCache();
      expect(getStyleCacheStats().size).toBe(0);
    });

    it('clears only the requested theme', () => {
      getCachedStyle({ width: 1 }, 'light');
      getCachedStyle({ width: 2 }, 'dark');
      clearStyleCache('light');
      const stats = getStyleCacheStats();
      expect(stats.size).toBe(1);
      expect(stats.themes).toEqual(['dark']);
    });
  });

  describe('configureStyleCache', () => {
    it('updates the maximum cache size', () => {
      configureStyleCache({ max: 2 });
      getCachedStyle({ width: 1 });
      getCachedStyle({ width: 2 });
      getCachedStyle({ width: 3 });
      expect(getStyleCacheStats().max).toBe(2);
      expect(getStyleCacheStats().size).toBeLessThanOrEqual(2);
    });

    it('throws for invalid max values', () => {
      expect(() => configureStyleCache({ max: 0 })).toThrow(RangeError);
    });
  });

  describe('getStyleCacheStats', () => {
    it('reports size, max, and active themes', () => {
      getCachedStyle({ flex: 1 }, 'light');
      getCachedStyle({ flex: 2 }, 'dark');
      expect(getStyleCacheStats()).toEqual({
        size: 2,
        max: 500,
        themes: expect.arrayContaining(['light', 'dark']),
      });
    });
  });
});
