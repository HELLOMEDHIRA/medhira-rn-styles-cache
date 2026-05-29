# Getting Started

**medhira-rn-styles-cache** caches dynamic React Native styles using an LRU cache and stable hashing, so repeated style shapes reuse the same `StyleSheet.create` output.

## Installation

### Expo

```sh
npx expo install medhira-rn-styles-cache
```

### React Native

```sh
npm install medhira-rn-styles-cache
```

## Quick start

```tsx
import { View } from 'react-native';
import { getCachedStyle } from 'medhira-rn-styles-cache';

const boxStyle = getCachedStyle({
  width: isWide ? 200 : 100,
  padding: 12,
});

export function Box() {
  return <View style={boxStyle} />;
}
```

## Features

- LRU caching with configurable `max` (default 500)
- Stable cache keys (property order independent)
- Per-theme LRU buckets
- `StyleSheet.flatten` for nested style arrays
- Prewarm and clear helpers

## Requirements

- React Native **0.60+** (developed against **0.85.x**)
- React **16+** (developed against **19.x**)
- TypeScript optional

## Next steps

- [Architecture](architecture.md) — how caching works
- [API Reference](api.md) — public exports only
- [Examples](examples.md) — common patterns

## License

[MIT](https://github.com/HELLOMEDHIRA/medhira-rn-styles-cache/blob/main/LICENSE)
