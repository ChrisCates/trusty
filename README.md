# Trusty

## Fully featured code generation and templating tool

### By Chris Cates

#### Compiling

1. Install Rust `stable`:

```bash
# Requires cURL for POSIX/Linux
curl https://sh.rustup.rs -sSf | sh

# For Windows go to: https://rustup.rs/
```

2. Run `cargo build` and move it to your bin or add it to your `$PATH`:

```bash
# Build the binary
cargo build

# Move it to your bin
mv target/debug/trusty /usr/local/bin/trusty

# Or just run it from the target folder
./target/debug/trusty
```

#### Usage

Trusty is accessible via npm or yarn:

```bash
# Through npm
sudo npm install trusty --global

# Trough yarn
yarn global add trusty
```

You can then invoke commands through the `trusty` command:

```bash
# Emit help information
trusty

# or
trusty --help

# Save a template file
trusty save template file ./myfile.txt --name SpecialText

# Save a template folder
trusty save template folder ./myfolder --name SpecialFolder

# Copy the SpecialText file to a specified location
trusty use file SpecialText ./thisFolder

# Copy the SpecialFolder to a specified location
trusty use folder SpecialFolder ./

# List all available files
trusty list files

# List all available folders
trusty list folders

# Remove SpecialFile
trusty remove file SpecialText

# Remove SpecialFolder
trusty remove folder SpecialFolder
```

#### Additional Notes

* MIT Licensed :heart: