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
  },
  addChannel(state, channel) {
    if (!state.channel.find(i => i.slug === channel.slug)) {
      channel.href = `/channel/${channel.slug}`;
      state.channels = [...state.channels, channel];
    }
  }
};
