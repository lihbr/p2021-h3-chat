export const state = () => ({
  name: "",
  channels: []
});

export const mutations = {
  setName(state, name) {
    state.name = name;
  },
  setChannels(state, channels) {
    const docs = channels.map(c => {
      c.doc.href = `/channel/${c.doc.slug}`;
      return c.doc;
    });
    state.channels = docs;
  }
};
