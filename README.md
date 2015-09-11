# Test Suite

## How to use

1. `$ mkdir <your project>-test`
2. `$ cd <your project>-test`
3. `$ git init`
4. `$ git submodule add <git reference to your project> lib/<your project>`
5. `$ git submodule add https://github.com/xinxinw1/test-suite lib/test-suite`
6. `$ git submodule update --init --recursive`
7. Copy `index.example.html` and `tests.example.js` from `lib/test-suite` to the main `<your project>-test` dir.
8. Rename them to `index.html` and `tests.js`
9. Open `index.html`

