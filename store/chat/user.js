export const state = () => ({
  name: "",
  channels: []
});

export const mutations = {
  setName(state, name) {
    console.log(name);
    state.name = name;
  },
  setChannels(state, channels) {
    console.log(channels);
    const key = "chat_channel_member_";
    state.channels = channels
      .filter(c => c.includes(key))
      .map(c => c.replace(key, ""));
  }
};
