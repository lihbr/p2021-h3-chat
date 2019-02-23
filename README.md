# CEVNchat

This is a school project at [HETIC](https://www.hetic.net/)

Visit site [here](https://cevn.chat)!

<!-- TOC -->

- [CEVNchat](#cevnchat)
  - [Features](#features)
  - [WIP Features](#wip-features)
  - [Planned Features](#planned-features)
  - [Technologies](#technologies)
    - [Front](#front)
    - [Back](#back)
  - [Project structure](#project-structure)
    - [Project's root](#projects-root)
    - [Server](#server)
  - [CouchDB structure](#couchdb-structure)
  - [API](#api)
    - [Sign Up](#sign-up)
    - [Sign In](#sign-in)
    - [Change Password](#change-password)
    - [Create Channel](#create-channel)
    - [Join Channel](#join-channel)
  - [Build Setup](#build-setup)
  - [TODO](#todo)

<!-- /TOC -->

## Features

Following features are the ones that are integrated **both** on the frontend and on the backend

- User
  - Sign in
  - Sign up
- Channel
  - Search
  - Create public/private ones
  - Join public/private ones
  - Share link to invite
  - Send messages

## WIP Features

Following features are the ones that are either implemented on the frontend **or** the backend

- User
  - Change Password _(backend only)_

## Planned Features

The following features are **some** of the planned ones

- User
  - Edit profile informations
  - Sign in with email
  - Log out button
- Channel
  - Edit profile informations
  - Leave channel

## Technologies

### Front

- **[Vue.js](https://vuejs.org/)**, a JavasScript Framework for building User Interfaces
- **[Nuxt.js](https://fr.nuxtjs.org/)**, a Vue.js Framework mainly providing a common project structure for Vue.js and handling Server Side Rendering
- **[Vuex](https://vuex.vuejs.org/)**, a state management pattern and library for Vue.js
- **[PouchDB](https://pouchdb.com/)**, a Front End database library

### Back

- [Node.js](https://nodejs.org/en/), aJavascript runtime
- [Express.js](https://expressjs.com/), a Node.js Framework
- [CouchDB](http://couchdb.apache.org/), a NoSQL Database

## Project structure

### Project's root

```bash
./
├─── assets > resources available for webpack compiler
├─── components > vue.js components
├─── layouts > vue.js components used by nuxt.js for layouts
├─── middlewares > scripts run by nuxt.js (either server or client side) when requesting a page
├─── pages > vue.js components used by nuxt.js for crating vue router
├─── plugins > javascript plugins used by vue.js / nuxt.js
├─── server > express server (see below)
├─── static > resources available from ./ once in production (www)
├─── store > vuex store for state management
└─── nuxt.config.js > nuxt.js configuration object
```

### Server

```bash
./server
├───controllers > handling requests / responses
├───design > couchdb designs
├───helpers > helpers functions
├───middlewares > not used
├───models > database interactions
└───routes > routes declaration
```

## CouchDB structure

- **\_users**, CouchDB native users
  - Features `_design_lock_email.js` design document
- **chat_users_pulic**, users public information database, act as a users register
  - Features `_design_lock_md5.js` design document
  - Features `_design_lock_owner.js` design document
- **chat_channels**, channels public information, act as a channels register
  - Features `_design_public_name_slug_hash.js` design document
- **chat_channel_SLUG**, channel personal database holding messages
  - Features `_design_chan_locker.js` design documents

## API

### Sign Up

> Perform sign up then sign in if success

**Request:**

```http
POST /api/auth/signup HTTP/1.1
Accept: application/json
Host: localhost:5984

{
  "name": "demo",
  "email": "demo@demo.demo",
  "password": "demoPassword",
  "confirm": "demoPassword"
}
```

**Response:**

```json
{
  "status": 200,
  "msg": "User logged in.",
  "data": {
    "ok": true,
    "name": "demo",
    "roles": ["member"]
  }
}
```

### Sign In

**Request:**

```http
POST /api/auth/signin HTTP/1.1
Accept: application/json
Host: localhost:5984

{
  "name": "demo",
  "password": "demoPassword"
}
```

**Response:**

```json
{
  "status": 200,
  "msg": "User logged in.",
  "data": {
    "ok": true,
    "name": "demo2",
    "roles": ["member", "chat_channel_member_SLUG", "..."]
  }
}
```

### Change Password

**Request:**

```http
POST /api/auth/changepassword HTTP/1.1
Accept: application/json
Host: localhost:5984

{
  "name": "demo",
  "password": "demoPassword",
  "newPassword": "demoNewPassword",
  "confirm": "demoNewPassword"
}
```

**Response:**

```json
{
  "status": 200,
  "msg": "Password changed.",
  "data": null
}
```

### Create Channel

> Perform create channel then join it if success

**Request:**

```http
POST /api/chan/create HTTP/1.1
Accept: application/json
Host: localhost:5984

{
  "name": "demoChannel",
  "password": "demoPassword > optional",
  "confirm": "demoNewPassword > optional"
}
```

**Response:**

```json
{
  "status": 200,
  "msg": "Joined channel.",
  "data": {
    "ok": true
  }
}
```

### Join Channel

**Request:**

```http
POST /api/chan/join HTTP/1.1
Accept: application/json
Host: localhost:5984

{
  "name": "demoChannel",
  "password": "demoPassword > if private",
}
```

**Response:**

```json
{
  "status": 200,
  "msg": "Joined channel.",
  "data": {
    "ok": true
  }
}
```

## Build Setup

```bash
# clone project
$ git clone PROJECT_URL

# install dependencies
$ yarn install
# or (slower)
$ npm install

# setup a .env file at ./ (see sample.env)

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## TODO

- Integrate express validator
- Destroy local db on logout
