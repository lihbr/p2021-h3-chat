# h3-p2021-e19-chat

This is a school project at [HETIC](https://www.hetic.net/)

Visit site [here](https://chat.edhbr.fr)!

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Notes

- `auto_compaction: true` on local
- destroy local db on logout

## Planned features

- \_users > default config

  - signUp > express > done
  - logIn > express > done
  - logOut > pouchdb > wip
  - changePassword > express > done
  - editProfile > pouchdb > wip

- channels > everybody read, some can write something

  - createChannels > express > wip
    { name, slug, owner, hash}
  - listChannels > pouchdb > wip
  - joinChannel > express > wip
  - leaveChannel > express > wip

* channels\_:slug > role + everybody read, some can write something > sync/change
  - readMessages > pouchdb > wip
  - postMessages > pouchdb > wip

> express: create needed endpoint that check auth with given token and then execute admin task

## TODO

- Login via mail
- Express validator
- Leave channel
