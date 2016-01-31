# git-issue-viewer

![license](https://img.shields.io/badge/license-MIT-blue.svg)

A Simple Git Issues Viewer made with React and fluxible

## Installation

```bash
$ npm install
$ npm run dev
```
Now hit `http://localhost:3000` on your browser.

## Run Unit Tests

```bash
$ npm test
```

### Directory Structure

    .
    ├── build                       # Compiled js and css files
    ├── actions                     # all the `action` source files
    ├── assets                      # consists of static assets such as icons, images, etc
    ├── components                  # all the `react` components
    ├── configs                     # config files
    ├── lang                        # all the files consisting of internationalized messages 
    ├── lib                         # Any utility files
    ├── services                    # all the `service` source files
    ├── stores                      # all the `fluxible` stores
    ├── styles                      # all `css`, `scss` files for styling
    ├── tests                       # all the tests for all files
    ├── app.js                      # express main application
    ├── client.js                   # express `client`
    ├── server.js                   # express `server`
    ├── start.js                    # another entrypoint for app
    ├── package.json                # all the requirements
    ├── webpack.config.js           # webpack config for running the app on browser
    ├── LICENSE                     # License file
    └── README.md                   # Readme
    
## Description

Coming Soon

## Screenshots

**Issue List Page:**

![Issue List Page]
(http://i.imgur.com/n12HBGU.png)

**Issue Details Page:**

![Issue Details Page]
(http://i.imgur.com/L8v5lCm.png)

**Error Page:**

![Error Page]
(http://i.imgur.com/3kNf18e.png)

**In Transition:**

![In Transition]
(http://i.imgur.com/R42gAO4.png)

## Known Issues

As Github has rate limiting, and since this application is not authenticated. After 60 requests/hr, you might come across 
application not running because github requests being forbidden.

More Details: https://developer.github.com/v3/#rate-limiting

## License

This software is free to use under MIT license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/itssumitrai/git-issue-viewer/blob/master/LICENSE
