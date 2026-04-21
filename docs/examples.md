# Examples

## Basic Style Caching

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { getCachedStyle } from 'medhira-rn-styles-cache';

const BasicExample = () => {
  const cachedStyle = getCachedStyle({
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 10,
  });

  return (
    <View style={cachedStyle}>
      <Text>Hello World</Text>
    </View>
  );
};
```

## Dynamic Styles

```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getCachedStyle } from 'medhira-rn-styles-cache';

const DynamicExample = () => {
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
    </View>
  );
};
```

## Multiple Styles

```tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { getCachedStyles } from 'medhira-rn-styles-cache';

const MultipleStylesExample = () => {
  const styles = getCachedStyles({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    button: {
      backgroundColor: 'green',
      padding: 15,
      borderRadius: 8,
      margin: 10,
    },
    text: {
      color: 'black',
      fontSize: 16,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Multiple Styles</Text>
      <View style={styles.button}>
        <Text style={styles.text}>Press Me</Text>
      </View>
    </View>
  );
};
```

## Theme Support

```tsx
import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { getCachedStyles } from 'medhira-rn-styles-cache';

const ThemeExample = () => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? 'dark' : 'light';

  const styles = getCachedStyles(
    {
      container: {
        flex: 1,
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      },
      text: {
        color: isDark ? '#ffffff' : '#000000',
      },
    },
    theme
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Theme: {theme}</Text>
      <Switch value={isDark} onValueChange={setIsDark} />
    </View>
  );
};
```

## Platform-Specific Styles

```tsx
import React from 'react';
import { View, Platform } from 'react-native';
import { getCachedStyle } from 'medhira-rn-styles-cache';

const PlatformExample = () => {
  const style = getCachedStyle({
    ...Platform.select({
      ios: {
        marginTop: 20,
      },
      android: {
        marginTop: 10,
      }),
    }),
    width: '100%',
    height: 50,
  });

  return <View style={style} />;
};
```

## Prewarming Styles

```tsx
import { useEffect } from 'react';
import { getCachedStyle, prewarmStyles } from 'medhira-rn-styles-cache';

const App = () => {
  useEffect(() => {
    prewarmStyles([
      { flex: 1 },
      { padding: 10 },
      { padding: 20 },
      { margin: 5 },
      { margin: 10 },
    ]);
  }, []);

  return <View />;
};
```

## Clearing Cache

```tsx
import React from 'react';
import { View, Button } from 'react-native';
import { getCachedStyle, clearStyleCache } from 'medhira-rn-styles-cache';

const ClearCacheExample = () => {
  const handleClear = () => {
    clearStyleCache();
  };

  return (
    <View>
      <Button title="Clear Cache" onPress={handleClear} />
    </View>
  );
};
```

## With StyleSheet.create (Hybrid)

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getCachedStyle } from 'medhira-rn-styles-cache';

const HybridExample = () => {
  const staticStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  const dynamicStyle = getCachedStyle({
    backgroundColor: 'blue',
  });

  return <View style={[staticStyles.container, dynamicStyle]} />;
};
```