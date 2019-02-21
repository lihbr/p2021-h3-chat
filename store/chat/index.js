import PouchDB from "pouchdb";

const db = {
  couch: {},
  pouch: {}
};

export const state = () => ({});

export const mutations = {};

export const actions = {
  init({ commit }) {
    db.couch.users = new PouchDB(`${process.env.couch_serv}/chat_users_public`);
    db.couch.channels = new PouchDB(`${process.env.couch_serv}/chat_channels`);

    this.$axios.defaults.withCredentials = true;

    this.$axios
      .get(`${process.env.couch_serv}/_session`, { withCredentials: true })
      .then(data => {
        commit("user/setName", data.data.userCtx.name);
        commit("user/setChannels", data.data.userCtx.roles);
        console.log(data.data.userCtx);
      })
      .catch(error => {
        console.error(error);
      });
  }
};
