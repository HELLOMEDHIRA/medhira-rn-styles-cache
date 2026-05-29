# API Reference

Public exports from `medhira-rn-styles-cache`.

## Types

### `SupportedStyle`

```typescript
type SupportedStyle = ViewStyle | TextStyle | ImageStyle | object;
```

### `CachedStyle`

Registered style returned by `StyleSheet.create` (same reference type React Native uses for optimized styles).

### `StyleCacheConfig`

```typescript
type StyleCacheConfig = {
  max?: number;
};
```

### `StyleCacheStats`

```typescript
type StyleCacheStats = {
  size: number;
  max: number;
  themes: string[];
};
```

---

## `getCachedStyle`

Caches a single style object.

```typescript
function getCachedStyle(
  style: SupportedStyle,
  theme?: string
): CachedStyle | number;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `style` | `SupportedStyle` | — | Style object, array, or registered style ID |
| `theme` | `string` | `'default'` | Theme bucket for cache isolation |

**Returns:** Cached registered style, or the same number if `style` is already a registered ID.

```typescript
const box = getCachedStyle({ width: 100, height: 50 });
const dark = getCachedStyle({ backgroundColor: '#000' }, 'dark');
```

---

## `getCachedStyles`

Caches multiple named styles.

```typescript
function getCachedStyles(
  styleMap: Record<string, SupportedStyle | undefined>,
  theme?: string
): Record<string, CachedStyle | number>;
```

```typescript
const styles = getCachedStyles({
  container: { flex: 1 },
  text: { fontSize: 16 },
});
```

---

## `prewarmStyles`

Populates the cache ahead of time.

```typescript
function prewarmStyles(styles: SupportedStyle[], theme?: string): void;
```

```typescript
prewarmStyles([{ flex: 1 }, { padding: 10 }], 'default');
```

---

## `clearStyleCache`

Clears cached entries.

```typescript
function clearStyleCache(theme?: string): void;
```

| Call | Effect |
|------|--------|
| `clearStyleCache()` | Clears all theme buckets |
| `clearStyleCache('dark')` | Clears only the `dark` bucket |

---

## `configureStyleCache`

Sets LRU capacity per theme bucket.

```typescript
function configureStyleCache(config: StyleCacheConfig): void;
```

```typescript
configureStyleCache({ max: 1000 });
```

Throws `RangeError` if `max` is not a positive integer.

---

## `getStyleCacheStats`

Returns aggregate cache metrics.

```typescript
function getStyleCacheStats(): StyleCacheStats;
```

```typescript
const { size, max, themes } = getStyleCacheStats();
```
