# Contributing

Thank you for helping improve **medhira-rn-styles-cache**.

## Development setup

```sh
git clone https://github.com/HELLOMEDHIRA/medhira-rn-styles-cache.git
cd medhira-rn-styles-cache
npm install
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm test` | Run Jest tests |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run prepare` | Build `lib/` via react-native-builder-bob |

## Pull requests

1. Fork and create a feature branch.
2. Add or update tests for behavior changes.
3. Run `npm run lint`, `npm run typecheck`, and `npm test`.
4. Update public docs in `docs/` when the API or behavior changes.
5. Do not document internal implementation details in `docs/api.md`.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/). Examples:

- `feat: add cache stats export`
- `fix: stable hash for nested objects`
- `docs: update architecture diagram`

## Documentation

Docs are built with MkDocs Material and published on Read the Docs.

```sh
pip install -r requirements.txt
mkdocs serve
```

## Releases

Maintainers use `npm run release` (release-it). Version bumps follow semver; release notes are published on GitHub Releases.
