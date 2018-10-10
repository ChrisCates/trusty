# Trusty

## Simple code gen and templating tool that uses LevelDB

[![Build Status](https://travis-ci.org/ChrisCates/trusty.svg?branch=master)](https://travis-ci.org/ChrisCates/trusty)
[![Coverage Status](https://coveralls.io/repos/github/ChrisCates/trusty/badge.svg?branch=master)](https://coveralls.io/github/ChrisCates/trusty?branch=master)

### Usage

Trusty is accessible via npm or yarn:

```bash
yarn global add trusty # or npm install trusty --global
```

You can then invoke commands through the `trusty` command:

```bash
# Help information
trusty --help

# Specify Trusty DB Path (default is ~/.trusty)
trusty --db $HOME/.trusty 

# Save a file or folder as a template
trusty --save CustomNGTemplate --dir /path/to/file/or/folder

# Use a template in cwd
trusty --use CustomNGTemplate --dir .

# Inspect structure of a template
trusty --inspect CustomNGTemplate

# List all available templates
trusty --list

# Purge Trusty Database
trusty --purge
```

### Developing yourself

Requires Node/NPM LTS:

```bash
# Install node_modules
yarn # or npm install

# Run tests
yarn test
```

#### Additional Notes

* MIT Licensed :heart: