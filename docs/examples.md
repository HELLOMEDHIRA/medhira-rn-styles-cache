# Examples

## Basic style caching

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { getCachedStyle } from 'medhira-rn-styles-cache';

const boxStyle = getCachedStyle({
  width: 100,
  height: 100,
  backgroundColor: 'blue',
  borderRadius: 10,
});

export function BasicExample() {
  return (
    <View style={boxStyle}>
      <Text>Hello World</Text>
    </View>
  );
}
```

## Dynamic styles

```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getCachedStyle } from 'medhira-rn-styles-cache';

export function DynamicExample() {
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
      <Button title="Increment" onPress={() => setCount((c) => c + 1)} />
    </View>
  );
}
```

## Multiple styles

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { getCachedStyles } from 'medhira-rn-styles-cache';

const styles = getCachedStyles({
  container: { flex: 1, padding: 20 },
  text: { fontSize: 16, color: 'black' },
});

export function MultipleStylesExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Multiple Styles</Text>
    </View>
  );
}
```

## Theme support

```tsx
import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { getCachedStyles, clearStyleCache } from 'medhira-rn-styles-cache';

export function ThemeExample() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? 'dark' : 'light';

  const styles = getCachedStyles(
    {
      container: {
        flex: 1,
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      },
      text: { color: isDark ? '#ffffff' : '#000000' },
    },
    theme
  );

  const onToggle = (value: boolean) => {
    setIsDark(value);
    clearStyleCache(isDark ? 'light' : 'dark');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Theme: {theme}</Text>
      <Switch value={isDark} onValueChange={onToggle} />
    </View>
  );
}
```

## Platform-specific styles

```tsx
import React from 'react';
import { View, Platform } from 'react-native';
import { getCachedStyle } from 'medhira-rn-styles-cache';

const platformStyle = getCachedStyle({
  ...Platform.select({
    ios: { marginTop: 20 },
    android: { marginTop: 10 },
  }),
  width: '100%',
  height: 50,
});

export function PlatformExample() {
  return <View style={platformStyle} />;
}
```

## Prewarming

```tsx
import { useEffect } from 'react';
import { prewarmStyles } from 'medhira-rn-styles-cache';

export function usePrewarmStyles() {
  useEffect(() => {
    prewarmStyles([
      { flex: 1 },
      { padding: 10 },
      { margin: 5 },
    ]);
  }, []);
}
```

## Configure cache size

```tsx
import { configureStyleCache, getCachedStyle } from 'medhira-rn-styles-cache';

configureStyleCache({ max: 200 });

const style = getCachedStyle({ flex: 1 });
```

## Hybrid with static StyleSheet

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getCachedStyle } from 'medhira-rn-styles-cache';

const staticStyles = StyleSheet.create({
  container: { flex: 1 },
});

const dynamicStyle = getCachedStyle({ backgroundColor: 'blue' });

export function HybridExample() {
  return <View style={[staticStyles.container, dynamicStyle]} />;
}
```
