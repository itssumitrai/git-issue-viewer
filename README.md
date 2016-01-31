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
$ npm test               # run lint + tests
$ npm run lint           # run only lint
$ npm run devtest        # run only tests
```

### Directory Structure

    .
    ├── build                       # Compiled js and css files
    ├── actions                     # all the `action` source files
    ├── assets                      # consists of static assets such as icons, images, etc
    ├── components                  # all the `react` components
    ├── configs                     # config files
    ├── lang                        # all the files consisting of internationalized messages (react-intl)
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

There are 3 different pages in total:
- **IssueList Page:** Lists all issues for a given repository
- **IssueDetail Page:** Show details for a given issue
- **Error Page:** Error page

This app uses `fluxible`, more details: https://github.com/yahoo/fluxible
Some details on this project specific components:

- **Actions:**
  - **createIssueList:** gets data for list of issues from `Issue service`, and loads the `IssueList` store
  - **getIssue:** gets data for issue details from `Issue service`, and loads the `Issue` store

- **Service:**
  - **Issue:** makes the http request and gets data from github apis for both issue list and issue details

- **Stores:**
  - **Issue:** stores issue details and makes it available for the `IssueDetail` component
  - **IssueList:** stores list of issues and makes it available for the `IssueList` component

- **Components:**
  - **IssueDetail:** renders the Issue Detail Page
  - **IssueList:** renders the Issue List Page
  - **Error:** renders the Error page

Other primitive components are kept in directories specific to the page. for eg: `IssueDetail` directory has primitive components required on `IssueDetail` page. While `Shared` directory keeps components shared by different pages.

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
