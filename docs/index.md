# Getting Started

Welcome to **medhira-rn-styles-cache** - React Native styles caching with LRU cache.

## Installation

### Expo

```sh
npx expo install medhira-rn-styles-cache
```

### React Native

```sh
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

## Quick Start

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

## Features

- LRU-based style caching
- Style flattening for nested arrays
- Platform.select() handling
- Theme-aware caching
- Cache prewarming
- Cache clearing

## Requirements

- React Native 0.60+
- React 16+
- TypeScript (optional, but recommended)

## License

[MIT](./LICENSE)