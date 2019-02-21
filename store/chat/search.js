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

export const actions = {};
