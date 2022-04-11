# How to Test Node.js Integrations with Jest

This repo provides a sample Node.js REST API that makes calls out to an external GraphQL endpoint and returns the Graph data to the user. 

Sample [tests](test/routes/hikes.test.js) are included that mock the GraphQL integration. Mocks are defined using the [Jest Testing Framework](https://jestjs.io/). 

## Install

Install the dependencies with the following command:

```
npm install
```

## Launch REST API Locally

To run a build and launch the development server, execute:

```
npm start
```

### Routes

Once completed, the app should be avialable at the following routes:

#### GET http://localhost:3000/hikes/

Returns a list of recent hikes.

#### GET http://localhost:3000/hikes/123

Returns data describing hike `123`.

#### GET http://localhost:3000/hikes/123/photos

Returns a list of photos taken during hike `123`.

## Tests

Unit tests can be executed with by running the following command:

```
npm test
```

### VSCode Debugging

Tests can be executed with a debugger in VS Code using the [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) extension. If running VS Code in WSL mode, make sure the Jest Runner extension is installed and enabled for use with WSL.

## Development

This application was bootstrapped with [Express Application Generator](https://expressjs.com/en/starter/generator.html), and was developed with Node.js version v16.13.1

## Supplemental Blog Post
Here is a blog post I created that explains the setup and testing in further detail: https://taylor.callsen.me/testing-node-js-integrations-with-jest/