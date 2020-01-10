# zakiii-website

[![](https://github.com/ZibanPirate/zakiii-website/workflows/Deploy%20The%20Full%20Stack/badge.svg)](https://github.com/ZibanPirate/zakiii-website/actions?query=workflow%3A%22Deploy+The+Full+Stack%22)

The code for [www.zakiii.com](https://www.zakiii.com)

## Table of Content

- [Table of Content](#table-of-content)
- [Installation](#installation)
  - [Clone the repo](#clone-the-repo)
  - [Install dependencies using yarn](#install-dependencies-using-yarn)
  - [Run The Website Locally](#run-the-website-locally)
    - [Using Terminal (The Hard Way)](#using-terminal-the-hard-way)
    - [Using VSCode Tasks (The Easy Way)](#using-vscode-tasks-the-easy-way)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Clone the repo

```shell
$ git clone https://github.com/ZibanPirate/zakiii-website.git
```

### Install dependencies using yarn

```shell
$ cd zakiii-websie
$ yarn
```

### Run The Website Locally

#### Using Terminal (The Hard Way)

**Inside** the project directory, you need to run **4** terminal commands **separately**.

- Frontend Webpack Dev Server

```shell
$ cd frontend && yarn dev
```

- Frontend Typescript Compiler

```shell
$ cd frontend/functions && yarn tsc:watch
```

- Frontend Server (Firebase)

```shell
$ cd frontend/functions && yarn fb
```

- Backend Server

```shell
$ cd backend && yarn dev
```

#### Using VSCode Tasks (The Easy Way)

This requires you to use VSCode as your IDE. Once you have VSCode setup, inside the project directory, you need to:
1) Create new file under `.vscode/` folder:

```shell
$ mkdir .vscode
$ touch .vscode/tasks.json
```

2) Copy this to content of `tasks.json` file:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Webpack dev server",
      "type": "npm",
      "script": "dev",
      "path": "frontend/",
      "problemMatcher": [],
      "presentation": {
        "group": "Frontend"
      }
    },
    {
      "label": "TSC in watch mode",
      "type": "npm",
      "script": "tsc:watch",
      "path": "frontend/functions/",
      "problemMatcher": [],
      "presentation": {
        "group": "Frontend Firebase"
      }
    },
    {
      "label": "Firebase serve",
      "type": "npm",
      "script": "fb",
      "path": "frontend/",
      "problemMatcher": [],
      "presentation": {
        "group": "Frontend Firebase"
      }
    },
    {
      "label": "Backend server",
      "type": "npm",
      "script": "dev",
      "path": "backend/",
      "problemMatcher": [],
      "presentation": {
        "group": "Backend"
      }
    },
    {
      "label": "Dev",
      "dependsOn": [
        "Webpack dev server",
        "TSC in watch mode",
        "Firebase serve",
        "Backend server"
      ],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

1) Finlay <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>B</kbd> (<kbd>⌘ Command</kbd>+<kbd>SHIFT</kbd>+<kbd>B</kbd> for MacOS), and the website should be up and running on your local machine.

## Contributing

To get started see [the contributing guidelines](https://github.com/ZibanPirate/zakiii-website/blob/master/.github/CONTRIBUTING.md).

**Unit test** :
Unit test are written in [Mocha](https://mochajs.org/). Please add a unit test for every new feature or bug fix. `yarn test` to run the test suite.

**Fix Typos** :
If you find a typo, please let me know, by creating a poll request, and that would be appreciated.

## License

Copyright (c) 2020 Zakaria Mansouri (twitter: [@zibanpirate](https://twitter.com/zibanpirate))
Licensed under the MIT license.
