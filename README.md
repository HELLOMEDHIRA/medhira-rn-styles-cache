# medhira-rn-styles-cache

MEDHIRA - React Native styles caching with LRU cache

![medhira](https://raw.githubusercontent.com/HELLOMEDHIRA/medhira/main/assets/medhira-logo.png)

**Engineering Intelligence Across Everything**

[![npm package](https://img.shields.io/npm/v/medhira-rn-styles-cache.svg)](https://www.npmjs.com/package/medhira-rn-styles-cache)
[![npm downloads](https://img.shields.io/npm/dm/medhira-rn-styles-cache.svg)](https://www.npmjs.com/package/medhira-rn-styles-cache)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```sh
# Expo
npx expo install medhira-rn-styles-cache

# React Native
npm install --save medhira-rn-styles-cache
```

## Why Use Style Caching?

In React Native, `StyleSheet.create()` is used to create optimized style objects. However, when you use dynamic styles or style objects that change frequently, each render can create new style objects, causing unnecessary re-renders and performance issues.

This library provides:

- **LRU Cache** (Least Recently Used) with configurable max size
- **Style flattening** - automatically flattens nested style arrays
- **Platform select support** - handles Platform.select() automatically
- **Hash-based caching** - uses SHA256 for consistent cache keys
- **Theme support** - different caches per theme

## Usage

### Basic Usage

```tsx
import { getCachedStyle } from 'medhira-rn-styles-cache';

const MyComponent = () => {
  const dynamicStyle = {
    width: someVariable ? 100 : 200,
    height: 50,
    backgroundColor: 'blue',
  };

  const cachedStyle = getCachedStyle(dynamicStyle);

  return <View style={cachedStyle} />;
};
```

### Multiple Styles

```tsx
import { getCachedStyles } from 'medhira-rn-styles-cache';

const styles = getCachedStyles({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

// Use like: style={styles.button}
```

### Clearing Cache

```tsx
import { clearStyleCache } from 'medhira-rn-styles-cache';

// Clear all cached styles
clearStyleCache();
```

### Prewarming Styles

```tsx
import { prewarmStyles } from 'medhira-rn-styles-cache';

// Pre-populate cache with frequently used styles
prewarmStyles([
  { flex: 1 },
  { padding: 10 },
  { margin: 5 },
]);
```

### Theme Support

```tsx
import { getCachedStyle, getCachedStyles } from 'medhira-rn-styles-cache';

// Light theme
const lightStyle = getCachedStyle({ backgroundColor: 'white' }, 'light');

// Dark theme
const darkStyle = getCachedStyle({ backgroundColor: 'black' }, 'dark');

// Different caches per theme
const themeStyles = getCachedStyles({
  container: { backgroundColor: 'white' },
  text: { color: 'black' },
}, 'light');
```

## API Reference

### getCachedStyle

Caches a single style object.

```typescript
function getCachedStyle(style: ViewStyle | TextStyle | ImageStyle, theme?: string): Style
```

### getCachedStyles

Caches multiple style objects at once.

```typescript
function getCachedStyles(styleMap: Record<string, Style>, theme?: string): Record<string, Style>
```

### prewarmStyles

Pre-populates the cache with style objects.

```typescript
function prewarmStyles(styles: Style[], theme?: string): void
```

### clearStyleCache

Clears all cached styles.

```typescript
function clearStyleCache(): void
```

## Performance Benefits

- Reduces memory allocations
- Prevents unnecessary style recreations
- LRU eviction prevents memory bloat
- Theme-aware caching for dynamic theming

## Example

```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getCachedStyle, clearStyleCache } from 'medhira-rn-styles-cache';

const App = () => {
  const [count, setCount] = useState(0);

  const dynamicStyle = getCachedStyle({
    width: 100 + count * 10,
    height: 50,
    backgroundColor: count % 2 === 0 ? 'blue' : 'red',
  });

  return (
    <View style={{ padding: 20 }}>
      <View style={dynamicStyle}>
        <Text>Count: {count}</Text>
      </View>
      <Button title="Increment" onPress={() => setCount(c => c + 1)} />
      <Button title="Clear Cache" onPress={clearStyleCache} />
    </View>
  );
};

export default App;
```

## Contributing

Contribution are always welcome, no matter how large or small!

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project.

Please feel free to drop us an email at [MEDHIRA](mailto:hello.medhira@gmail.com?subject=[GitHub])

## Sponsor & Support

To keep this library maintained and up-to-date please consider [sponsoring it on GitHub](https://github.com/sponsors/medhira). Or if you are looking for a private support or help in customizing the experience, then reach out to us on LinkedIn [https://www.linkedin.com/in/smuniharish](https://www.linkedin.com/company/medhira).

## License

[MIT](./LICENSE)

---

Made with love by [MEDHIRA](https://medhira.io)