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
    const channelsSync = PouchDB.replicate(c_channels, p_channels, {
      live: true,
      retry: true,
      checkpoint: "target"
    });

    // channelsSync.on("change", info => {
    //   console.log("info");
    //   if (info.ok) {
    //     for (const doc of info.docs) {
    //       if (doc.owner === state.user.name) {
    //         commit("user/addChannel", doc);
    //       }
    //     }
    //   }
    // });

    commit("inited");
  }
};
