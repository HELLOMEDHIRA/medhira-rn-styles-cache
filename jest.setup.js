global.__DEV__ = true;

jest.mock('react-native', () => {
  let nextId = 1;

  const flatten = (style) => {
    if (style == null) {
      return {};
    }
    if (typeof style === 'number') {
      return style;
    }
    if (Array.isArray(style)) {
      return style.reduce((acc, item) => {
        if (Array.isArray(item)) {
          return { ...acc, ...flatten(item) };
        }
        if (item && typeof item === 'object') {
          return { ...acc, ...item };
        }
        return acc;
      }, {});
    }
    return style;
  };

  return {
    StyleSheet: {
      create: (styles) => {
        const created = {};
        for (const key of Object.keys(styles)) {
          created[key] = nextId++;
        }
        return created;
      },
      flatten,
    },
  };
});
