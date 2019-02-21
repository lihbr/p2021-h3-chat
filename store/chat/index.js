import PouchDB from "pouchdb";

export const state = () => ({});

export const mutations = {};

export const actions = {
  init({ commit }) {
    // Remote
    const c_users = new PouchDB(
      `${process.env.api_url}/couchproxy/chat_users_public`
    );

    const c_channels = new PouchDB(
      `${process.env.api_url}/couchproxy/chat_channels`
    );

    // Local
    const p_channels = new PouchDB("channels");
    PouchDB.replicate(c_channels, p_channels);

    this.$axios
      .get("/couchproxy/_session")
      .then(data => {
        commit("user/setName", data.data.userCtx.name);

        const key = "chat_channel_member_";
        const channels = data.data.userCtx.roles
          .filter(c => c.includes(key))
          .map(c => c.replace(key, ""));

        return p_channels.allDocs({
          include_docs: true,
          keys: channels
        });
      })
      .then(data => {
        commit("user/setChannels", data.rows);
      })
      .catch(error => {
        console.error(error);
      });
  }
};
