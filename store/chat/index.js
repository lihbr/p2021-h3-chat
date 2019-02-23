import PouchDB from "pouchdb";

export const state = () => ({
  inited: false
});

export const mutations = {
  inited(state) {
    state.inited = true;
  }
};

export const actions = {
  init({ state, commit }) {
    // Remote
    const c_users = new PouchDB(
      `${process.env.api_url}/couchproxy/chat_users_public`
    );

    const c_channels = new PouchDB(
      `${process.env.api_url}/couchproxy/chat_channels`
    );

    // Local
    const p_channels = new PouchDB("channels");

    commit("inited");
  }
};
