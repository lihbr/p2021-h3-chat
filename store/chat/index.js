import PouchDB from "pouchdb";

export const state = () => ({});

export const mutations = {};

export const actions = {
  init({ commit, state }) {
    // Remote
    const c_users = new PouchDB(
      `${process.env.api_url}/couchproxy/chat_users_public`
    );

    const c_channels = new PouchDB(
      `${process.env.api_url}/couchproxy/chat_channels`
    );

    // Local
    const p_channels = new PouchDB("channels");
    const channelsSync = PouchDB.replicate(c_channels, p_channels, {
      live: true,
      retry: true
    });

    channelsSync.on("change", info => {
      if (info.ok) {
        for (const doc of info.docs) {
          if (doc.owner === state.user.name) {
            commit("user/addChannel", doc);
          }
        }
      }
    });

    this.$axios
      .get("/couchproxy/_session")
      .then(data => {
        commit("user/setName", data.data.userCtx.name);

        const key = "chat_channel_member_";
        const channels = data.data.userCtx.roles
          .filter(c => c.includes(key))
          .map(c => c.replace(key, ""));

        return c_channels.allDocs({
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
