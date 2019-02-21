import PouchDB from "pouchdb";
import slugify from "slugify";

const slugOpt = {
  replacement: "_",
  remove: /[^a-z0-9_$()+\/-\s]/g,
  lower: true
};

export const state = () => ({
  results: []
});

export const mutations = {
  setResults(state, results) {
    const docs = results.filter(c => c.id.indexOf("_design/")).map(c => {
      c.doc.href = `/channel/${c.doc.slug}`;
      return c.doc;
    });
    state.results = docs;
  }
};

export const actions = {
  search({ commit }, query) {
    const c_channels = new PouchDB(
      `${process.env.api_url}/couchproxy/chat_channels`
    );

    // Local
    const p_channels = new PouchDB("channels");
    PouchDB.replicate(c_channels, p_channels);

    console.log(slugify(query, slugOpt));

    p_channels
      .allDocs({
        include_docs: true,
        startkey: slugify(query, slugOpt),
        limit: 10
      })
      .then(data => {
        commit("setResults", data.rows);
      })
      .catch(error => {
        console.error(error);
      });
  }
};
