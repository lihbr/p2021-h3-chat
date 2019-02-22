export const state = () => ({
  messages: [],
  lastUpdate: Date.now(),
  channel: null
});

export const mutations = {
  setChannel(state, channel) {
    state.channel = channel;
  },
  clearMessages(state) {
    state.messages = [];
  },
  addMessage(state, { _id, author, date, msg, edited }) {
    if (!_id.includes("_design/") && _id && author && date && msg) {
      const newArr = [...state.messages];

      if (newArr.length && newArr[newArr.length - 1].author === author) {
        newArr[newArr.length - 1].messages[_id] = {
          date,
          msg,
          edited
        };
      } else {
        const messages = {};
        messages[_id] = { date, msg, edited };

        newArr.push({
          author,
          messages
        });
      }

      state.lastUpdate = Date.now();
      state.messages = newArr;
    }
  }
};

export const actions = {
  async getChannel({ commit }, route = "") {
    try {
      const { data } = await this.$axios.get(
        `/couchproxy/chat_channels/${route}`
      );

      commit("setChannel", data);
    } catch (error) {
      return this.$router.push("/");
    }
  }
};
