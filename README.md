# Test Suite

## How to use

1. Make a new git repo `<your project>-test`.
2. `$ git submodule add <git reference to your project> lib/<your project>`
3. `$ git submodule add https://github.com/xinxinw1/test-suite lib/test-suite`
4. `$ git submodule update --init --recursive`
5. Copy `index.example.html` and `tests.example.js` from `lib/test-suite` to the main `<your project>-test` dir.
6. Rename them to `index.html` and `tests.js`
7. Run `index.html`

