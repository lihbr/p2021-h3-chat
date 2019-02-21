/**
 * Imports
 */
// Misc
const bcrypt = require("bcrypt");
const slugify = require("slugify");

// Inner
const couch = require("../helpers/couch.serv");
const { slugOpt, _usersPrefix } = require("../helpers/misc.var");
const { _design_chan_locker } = require("../design/_design_chan_locker");

/**
 * Config
 */

/**
 * Exists
 */
exports.exists = async ({ name }) => {
  let ok = false,
    result;

  const options = {
    db: "chat_channels",
    params: {
      key: slugify(name, slugOpt),
      limit: 1
    },
    admin: true
  };

  try {
    result = await couch.list(options);
    result = result.rows;
  } catch (error) {
    return { ok, error };
  }

  ok = result.length > 0;

  return {
    ok,
    status: ok ? 409 : 404,
    msg: ok ? "channel exists" : "channel does not exist"
  };
};

/**
 * Get
 */
exports.get = async ({ name }) => {
  let ok = false,
    result;

  const options = {
    db: "chat_channels",
    doc: slugify(name, slugOpt),
    admin: true
  };

  try {
    result = await couch.get(options);
  } catch (error) {
    return { ok, error };
  }

  ok = true;

  return { ok, msg: "channel found", data: result };
};

/**
 * Create
 */
exports.create = async ({ name, password }, isPublic, owner) => {
  const channel = {
    name,
    slug: slugify(name, slugOpt),
    public: isPublic,
    hash: null,
    owner
  };

  // Create hash if not public
  if (!isPublic) {
    try {
      channel.hash = await bcrypt.hash(password, 10);
    } catch (error) {
      return new Promise((resolve, reject) => reject(error));
    }
  }

  // Create channel database
  const channelCreate = {
    db: `chat_channel_${channel.slug}`,
    admin: true
  };

  // Register channel in chat_channels
  const channelRegister = {
    db: "chat_channels",
    doc: channel.slug,
    body: channel,
    admin: true
  };

  // Create channel permissions design doc
  const channelCreateDD = {
    db: channelCreate.db,
    doc: "_design/chan_locker",
    body: {
      validate_doc_update: _design_chan_locker
    },
    admin: true
  };

  // Create channel access role
  const channelSetSecurity = {
    db: channelCreate.db,
    doc: "_security",
    body: {
      admins: {
        names: [],
        roles: []
      },
      members: {
        names: [],
        roles: [`chat_channel_member_${channel.slug}`]
      }
    },
    admin: true
  };

  // Give access to owner
  const giveOwnerAccess = {};

  return new Promise((resolve, reject) => {
    couch
      .put(channelCreate)
      .then(() => {
        return couch.put(channelRegister);
      })
      .then(() => {
        return Promise.all([
          couch.put(channelCreateDD),
          couch.put(channelSetSecurity),
          couch.put(userSetSecurity)
        ]);
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * Join
 */
exports.join = (user, channelSlug) => {
  const channelOpt = {
    db: `chat_channel_${channelSlug}`,
    doc: "_security",
    admin: true
  };

  const userOpt = {
    db: "_users",
    doc: `${_usersPrefix}:${user}`,
    admin: true
  };

  const channelRole = `chat_channel_member_${channelSlug}`;

  return Promise.all([
    new Promise((resolve, reject) => {
      couch
        .get(channelOpt)
        .then(data => {
          if (!data.members.names.includes(user)) {
            data.members.names.push(user);
            channelOpt.body = data;
            return couch.put(channelOpt);
          }
          resolve({ ok: true });
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    }),
    new Promise((resolve, reject) => {
      couch
        .get(userOpt)
        .then(data => {
          if (!data.roles.includes(channelRole)) {
            data.roles.push(channelRole);
            userOpt.body = data;
            return couch.put(userOpt);
          }
          resolve({ ok: true });
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    })
  ]);
};
