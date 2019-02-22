<template>
  <form class="submit" @submit.prevent="send">
    <div class="wrapper">
      <div
        ref="messageContent"
        class="content"
        contenteditable
        @input="message = $event.target.innerText"
        @keydown.exact.enter="send"
      />
      <button class="send" type="submit">
        <Send/>
      </button>
      <div v-if="showPlaceholder" class="placeholder">{{ placeholder }}</div>
    </div>
  </form>
</template>

<script>
import PouchDB from "pouchdb";

import Send from "~/assets/icons/send.vue";

export default {
  components: {
    Send
  },
  props: {
    channel: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      message: "",
      channelDB: null
    };
  },
  computed: {
    data() {
      return this.$store.state.lang.text.sections.chat.channel.submit;
    },
    currentChannel() {
      return this.$store.state.chat.current.channel;
    },
    placeholder() {
      return `${this.data.placeholder} ${this.channel.name}`;
    },
    userName() {
      return this.$store.state.chat.user.name;
    },
    showPlaceholder() {
      return this.message.length === 0 || this.message === "\n";
    }
  },
  mounted() {
    this.channelDB = new PouchDB(
      `${process.env.api_url}/couchproxy/chat_channel_${
        this.currentChannel.slug
      }`
    );
  },
  methods: {
    send(e) {
      e.preventDefault();

      if (!this.showPlaceholder) {
        const now = Date.now();

        const options = {
          _id: `${now}_${Math.random()}`,
          author: this.userName,
          date: now,
          msg: this.message,
          edited: false
        };

        this.channelDB
          .put(options)
          .then(data => {})
          .catch(error => {
            console.error(error);
          });

        this.message = "";
        this.$refs.messageContent.innerText = "";
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.submit
  margin 0 globalMargin globalMargin * 0.5 globalMargin

.wrapper
  fontsize(16px)
  line-height 18px
  position relative

.content
  border-radius 5px
  border 1px solid softerGrey
  padding globalMargin * 0.5 globalMargin * 2 globalMargin * 0.5 globalMargin
  color darkGrey
  min-height 40px

  &:focus
    border-color accent
    outline none

.placeholder
  position absolute
  bottom 10px
  left globalMargin
  color grey
  pointer-events none

.send
  position absolute
  right 10px
  bottom 12px
  cursor pointer

  svg
    fill softerGrey

    &:hover
      fill accent
</style>
