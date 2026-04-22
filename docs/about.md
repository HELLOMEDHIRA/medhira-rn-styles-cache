# About

## MEDHIRA

**Engineering Intelligence Across Everything**

MEDHIRA is a technology company focused on building intelligent solutions across multiple platforms. We develop and maintain open-source libraries and frameworks for the developer community.

### Our Mission

To provide high-quality, well-documented libraries that make developers' lives easier. We believe in:

- Clean, maintainable code
- Comprehensive documentation
- Breaking barriers in development
- Community-driven growth

## medhira-rn-styles-cache

A React Native library that provides LRU-based caching for styles to improve performance in mobile applications.

### Why This Library?

React Native applications often face performance challenges when:

- Using dynamic styles that change on every render
- Creating StyleSheet objects repeatedly
- Using complex nested style compositions
- Implementing theme switching

This library solves these problems by:

- Caching style objects using LRU (Least Recently Used) algorithm
- Automatically flattening nested style arrays
- Handling Platform.select() automatically
- Providing theme-aware caching

### Features

- **LRU Cache**: Efficient cache with limit of 500 entries
- **Style Flattening**: Automatically flattens nested arrays
- **Platform Support**: Handles Platform.select() automatically
- **Theme Support**: Separate caches for different themes
- **SHA256 Hashing**: Consistent cache keys

### How It Works

1. **Input**: Style object is passed to `getCachedStyle()`
2. **Flattening**: Nested style arrays are flattened
3. **Hashing**: SHA256 hash is generated from style + theme
4. **Lookup**: Cache is checked for existing entry
5. **Creation**: If not cached, StyleSheet.create() is called
6. **Storage**: Result is stored in LRU cache

### Performance Benefits

- Reduces memory allocations
- Prevents unnecessary style recreations
- LRU eviction prevents memory bloat
- Theme-aware caching for dynamic theming

## Contributing

We welcome contributions from the community! Whether you've found a bug, have a feature request, or want to contribute code, please check out our [GitHub repository](https://github.com/HELLOMEDHIRA/medhira-rn-styles-cache).

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Build: `npm run prepare`

## Support

If you need help or have questions:

- Email: [hello.medhira@gmail.com](mailto:hello.medhira@gmail.com)
- GitHub Issues: [https://github.com/HELLOMEDHIRA/medhira-rn-styles-cache/issues](https://github.com/HELLOMEDHIRA/medhira-rn-styles-cache/issues)
- LinkedIn: [@medhira](https://www.linkedin.com/in/smuniharish)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](./LICENSE) file for details.

---

Made with love by [MEDHIRA](https://medhira.readthedocs.io/en/latest/)