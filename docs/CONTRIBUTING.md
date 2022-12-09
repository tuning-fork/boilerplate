# Contributing

Thank you for taking interest in contributing to Boilerplate! This document
includes details on the application architecture, general project/code
guidelines, and instructions on how to setup your local development environment.

## Table of Contents

* [Table of Contents](#table-of-contents)
* [Architecture](#architecture)
* [Workflow](#workflow)
  * [Branch Name Conventions](#branch-name-conventions)
    * [Types](#types)
  * [Commit Conventions](#commit-conventions)
  * [Pull Request Conventions](#pull-request-conventions)
* [Project Guidelines](#project-guidelines)
  * [File Structure](#file-structure)
* [Development Environment](#development-environment)
  * [Setup manually](#setup-manually)
    * [Prerequisites:](#prerequisites)
    * [Initial startup commands:](#initial-startup-commands)
* [Recommended Tools](#recommended-tools)

## Architecture

The overall architecture includes a React app that makes calls to a Rails API,
persisting data in a PostgreSQL database.

```mermaid
flowchart LR
  Frontend[React Frontend] --> API([Rails API]) --> DB[(PostgreSQL)]
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for details on how the application is
deployed to a production environment.

## Workflow

1. Fork the repo
   * *This step may be skipped if you are a core contributor with write
     permissions to the repository*
2. Create a new branch for your work
3. Make your changes and commit them
4. Pull the develop branch, resolve any conflicts, and then push up your branch
5. Create a pull request from your branch to the `develop` branch
   * [Link the pull request to the
     issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)
     for tracking
6. Review your pull request, leaving any helpful notes/comments/context
7. Assign at least one reviewer and respond to their feedback if any
8. Once the reviewer has approved, the PR can be merged

### Branch Name Conventions

It's recommended you follow the following format when creating branches for
consistency:

```
<type>/<issue-num>-<name>
```

#### Types

* `feature` - Work for features and enhancements
* `fix` - Work that fixes bugs
* `docs` - Work that affects documentation only
* `spike` - Exploratory changes used to investigate potential solutions or
  approaches
* `chore` - Miscellaneous changes such as clean up and configuration

Examples:

```
feature/123-add-grant-page
fix/167-users-not-able-to-login
docs/201-typo-in-readme
spike/333-explore-new-framework
chore/455-remove-unused-class
```

### Commit Conventions

It's recommended you make small, atomic commits as you make changes so that it's
easier to go back to a particular changes.

When making commit messages, limit the subject to 50 characters. When writing
the subject, imagine each commit started with: "In this commit, it will...".
E.g.:

```
Add dropdown component
Adjust navbar color
Extract method into separate class
```

For more complex changes capture the "why" and any other context in the commit
message body.

### Pull Request Conventions

Aim for small, isolated pull requests below 10 files changes. Anything bigger
becomes more difficult to spot issues.

If you notice changes that could be made, but aren't related to the ticket
you're working on, make a follow up issue so the change can be done in a
separate PR.

If a ticket requires significant work to complete, break the work across
multiple branches and pull requests to keep the diffs manageable. E.g.:

```
chore/123-extract-grant-logic-to-separate-class
chore/123-update-grant-logic-dependencies
chore/123-refactor-grant-logic
```

## Project Guidelines

TODO

### File Structure

TODO

## Development Environment

<!--
### Setup using Docker

If you have Docker (v20 and up recommended) installed, you can utilize the
following commands to start the application:
```sh
# Start frontend, api, and postgres
$ docker compose up
# Run initial database setup
$ docker compose exec api rails db:create db:migrate db:seed
```
-->

### Setup manually

#### Prerequisites:
* Node v16
* Ruby v2.7.5
* Bundler v2.2.32
* Rails v6
* Postgres v14

#### Initial startup commands:
```sh
# Inside api directory
$ bin/setup
$ bin/run # or bin/rails server
=> Booting Puma
boilerplate-api-1  | => Rails 6.0.3.7 application starting in development
boilerplate-api-1  | => Run `rails server --help` for more startup options
boilerplate-api-1  | Puma starting in single mode...
boilerplate-api-1  | * Version 4.3.12 (ruby 2.7.5-p203), codename: Mysterious Traveller
boilerplate-api-1  | * Min threads: 5, max threads: 5
boilerplate-api-1  | * Environment: development
boilerplate-api-1  | * Listening on tcp://0.0.0.0:3000

# Inside frontend directory
$ npm install
$ npm start
> boilerplate_rebuild_react_app@0.1.0 start
> vite

  vite v2.9.14 dev server running at:

  > Local:    http://localhost:3001/
  > Network:  http://172.20.0.4:3001/

  ready in 2189ms.
```

## Recommended Tools

* VSCode
