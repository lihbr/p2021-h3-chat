import PouchDB from "pouchdb";

const db = {
  couch: {},
  pouch: {}
};

export const state = () => ({
  currentUser: {}
});

export const mutations = {};

export const actions = {
  init(state) {
    db.couch.users = new PouchDB(`${process.env.couch_serv}/chat_users_public`);
    db.couch.channels = new PouchDB(`${process.env.couch_serv}/chat_channels`);

    console.clear();
    console.log(this.$cookies.getAll());
    this.$axios
      .get(`${process.env.couch_serv}/_session`, { withCredentials: true })
      .then(data => {
        console.log(`${process.env.couch_serv}/_session`);
        console.log(data.data.userCtx);
      })
      .catch(error => {
        console.error(error);
      });
    console.log("couch inited");
  }
};
