export const state = () => ({
  name: null,
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

export const actions = {
  async get({ commit }, route = "") {
    try {
      const user = await this.$axios.get("/couchproxy/_session");

      if (user.data.userCtx.name) {
        commit("setName", user.data.userCtx.name);

        const key = "chat_channel_member_";
        const channels = user.data.userCtx.roles
          .filter(c => c.includes(key))
          .map(c => c.replace(key, ""));

        const options = {
          keys: channels
        };

        const { data } = await this.$axios.post(
          "/couchproxy/chat_channels/_all_docs?include_docs=true",
          options
        );

        commit("setChannels", data.rows);
        return 200;
      } else {
        return this.$router.push(`/connect${route ? `/${route}` : ""}`);
      }
    } catch (error) {
      return console.error(error);
    }
  }
};
