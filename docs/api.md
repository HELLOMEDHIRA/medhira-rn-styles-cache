# API Reference

## Functions

### getCachedStyle

Caches a single style object using LRU cache.

```typescript
function getCachedStyle(
  style: SupportedStyle,
  theme?: string
): any
```

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| style | ViewStyle \| TextStyle \| ImageStyle \| object | Yes | - | The style object to cache |
| theme | string | No | 'default' | Theme identifier for separate caches |

**Returns:** The cached style object

**Example:**

```typescript
const cached = getCachedStyle({ width: 100, height: 50 });
```

---

### getCachedStyles

Caches multiple style objects at once.

```typescript
function getCachedStyles(
  styleMap: Record<string, SupportedStyle>,
  theme?: string
): Record<string, any>
```

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| styleMap | Record<string, SupportedStyle> | Yes | - | Map of style names to style objects |
| theme | string | No | 'default' | Theme identifier for separate caches |

**Returns:** Record of cached styles

**Example:**

```typescript
const styles = getCachedStyles({
  container: { flex: 1 },
  button: { backgroundColor: 'blue' },
  text: { color: 'white' },
});
```

---

### prewarmStyles

Pre-populates the cache with style objects.

```typescript
function prewarmStyles(
  styles: SupportedStyle[],
  theme?: string
): void
```

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| styles | SupportedStyle[] | Yes | - | Array of styles to cache |
| theme | string | No | 'default' | Theme identifier |

**Example:**

```typescript
prewarmStyles([
  { flex: 1 },
  { padding: 10 },
  { margin: 5 },
]);
```

---

### clearStyleCache

Clears all cached styles from the LRU cache.

```typescript
function clearStyleCache(): void
```

**Example:**

```typescript
clearStyleCache();
```

---

## Type Definitions

### SupportedStyle

```typescript
type SupportedStyle = ViewStyle | TextStyle | ImageStyle | object;
```

---

## Internal Functions

### flattenStyle

Flattens nested style arrays into a single object.

```typescript
function flattenStyle(style: any): object
```

### applyPlatformSelect

Handles Platform.select() in style objects.

```typescript
function applyPlatformSelect(style: any): any
```

### hashStyle

Creates a SHA256 hash of style for cache key.

```typescript
function hashStyle(style: object, theme: string): string
```

