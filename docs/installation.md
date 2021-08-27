# what to install

## general stuff
### install
```bash
# general deps
sudo apt update
sudo apt install gcc g++ pkg-config libudev-dev libssl-dev make libclang-dev

#npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install --lts

#rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
rustup component add rustfmt
cargo install cargo-bpf
```

### verify
```shell
npm --version
rustc --version
```

## solana stuff
### install
```shell
sh -c "$(curl -sSfL https://release.solana.com/v1.7.8/install)"

npm i -g mocha
npm i -g @project-serum/anchor@0.13.2

cargo install --git https://github.com/project-serum/anchor --tag v0.13.2 anchor-cli --locked
```

add the following to `~/.bashrc`
```shell
node_exec=$(which node)
export NODE_PATH=${node_exec%/node}/../lib/node_modules/
```

### verify
```shell
npm list -g --depth 0 | grep anchor
anchor --version
```

## validate on a real project
```shell
anchor init anchor-test-proj
cd anchor-test-proj
anchor test

# the project should get built and deployed to the local blockchain
# an empty test should succeed
```

## update once needed
```shell
solana-install update #may be a bit outdated tho, better to use installation script
rest of them - just use installation scripts with updated versions
```

## sources
- https://github.com/nvm-sh/nvm#install--update-script
- https://project-serum.github.io/anchor/getting-started/installation.html#install-rust
