# Sample SIWS app with Rust backend

This is a simple, small app that demonstrates SIWS using the [`siws-rs`](https://github.com/pileks/siws-rs) crate with a very simple Next app.

## Running the sample

Inside the `frontend` directory, run the Next app:

```sh
yarn

yarn dev
```

Inside the `backend` directory, run the Rust web server:

```sh
cargo run
```

Then, point your browser to `localhost:3000`, connect your wallet and try it out!

**Please note that all sign-in results are currently output to the console.**