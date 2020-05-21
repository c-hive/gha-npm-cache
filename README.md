# gha-npm-cache

#### 1-liner npm install cache for GitHub Actions

_Did you know you're not supposed to cache the `node_modules` folder?_

Status and support

- &#x2714; stable
- &#x2714; supported
- &#x2714; ongoing development

[![CI](/../../workflows/CI/badge.svg?branch=master)](/../../actions)

GitHub Action caches improve build times and reduce network dependencies. However, writing the correct cache logic is [tricky](https://github.com/actions/cache/blob/9ab95382c899bf0953a0c6c1374373fc40456ffe/examples.md#node---npm). You need to understand how the [cache action](https://github.com/actions/cache) (keys and restore keys) work. Did you know you're not supposed to cache the `node_modules` folder? The setup is different per OS and takes a lot of space in your workflows. Not anymore!

`gha-npm-cache` is a simple 1-liner that covers all use-cases, correctly:
- Caches the NPM cache directory instead of `node-modules` [as recommended](https://github.com/actions/cache/blob/9ab95382c899bf0953a0c6c1374373fc40456ffe/examples.md#node---npm)
- Works on Ubuntu, MacOS and Windows
- Restore keys take the OS into account [as recommended](https://github.com/actions/cache/blob/9ab95382c899bf0953a0c6c1374373fc40456ffe/examples.md#node---npm)
- Builds on the [native cache functionality of GitHub Actions](https://github.com/actions/toolkit/tree/master/packages/cache), same as [v2 of the generic cache action](https://github.com/actions/cache/issues/55#issuecomment-629433225)

## Usage

Add this step before `npm install`:
```yml
uses: c-hive/gha-npm-cache@v1
```

For example:

`.github/workflows/ci.yml`
```yml
name: CI

on: [push]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1

    - uses: c-hive/gha-npm-cache@v1

    - name: Install JS dependencies
      run: npm install
    - name: Test
      run: npm run test
```

## Conventions

This project follows [C-Hive guides](https://github.com/c-hive/guides) for code style, way of working and other development concerns.

## License

The project is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
