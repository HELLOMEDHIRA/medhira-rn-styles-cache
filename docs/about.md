# About

## MEDHIRA

**Engineering Intelligence Across Everything**

MEDHIRA builds open-source libraries for mobile and web developers with a focus on clear documentation and maintainable APIs.

## medhira-rn-styles-cache

A lightweight React Native library that caches dynamic styles using LRU eviction and stable hashing.

### Problem

Apps that build style objects from props, themes, or layout often call `StyleSheet.create` repeatedly for the same shape. That adds allocation and registration work on hot paths.

### Solution

- Flatten input with `StyleSheet.flatten`
- Hash flattened styles with canonical JSON + SHA-256
- Store results in per-theme LRU caches
- Return the same registered style reference for equivalent inputs

### Performance notes

- Fewer redundant `StyleSheet.create` calls
- Bounded memory via LRU `max` (configurable)
- Theme-scoped clears for theme switches

## Contributing

See [CONTRIBUTING.md](https://github.com/HELLOMEDHIRA/medhira-rn-styles-cache/blob/main/CONTRIBUTING.md) on GitHub.

## Support

- Email: [hello.medhira@gmail.com](mailto:hello.medhira@gmail.com)
- Issues: [GitHub](https://github.com/HELLOMEDHIRA/medhira-rn-styles-cache/issues)

## License

[MIT](https://github.com/HELLOMEDHIRA/medhira-rn-styles-cache/blob/main/LICENSE)

---

Made with care by [MEDHIRA](https://medhira.readthedocs.io/en/latest/)
