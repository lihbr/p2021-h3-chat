<template>
  <main ref="messagesContainer" class="messages">
    <div class="wrapper">
      <MessagesGroup
        v-for="(message, index) in messagesFixed"
        :key="index"
        :data="message"
        :self="message.author === userName"
      />
    </div>
  </main>
</template>

<script>
import Scrollbar from "~/assets/js/scrollbar";

import MessagesGroup from "~/components/controls/Chat/Window/MessagesGroup.vue";

export default {
  components: {
    MessagesGroup
  },
  data() {
    return {
      container: null,
      messagesFixed: []
    };
  },
  computed: {
    userName() {
      return this.$store.state.chat.user.name;
    },
    lastUpdate() {
      return this.$store.state.chat.current.lastUpdate;
    },
    messages() {
      return this.$store.state.chat.current.messages;
    }
  },
  watch: {
    messages(val) {
      this.messagesFixed = JSON.parse(JSON.stringify(this.messages));

      if (this.container) {
        this.container.update();
        const limit = this.container.limit.y;
        if (limit - this.container.offset.y < 400) {
          setTimeout(() => {
            this.container.setPosition(0, limit * 2);
          }, 100);
        }
      }
    }
  },
  mounted() {
    this.messagesFixed = JSON.parse(JSON.stringify(this.messages));

    this.container = Scrollbar.init(this.$refs.messagesContainer);
    setTimeout(() => {
      const limit = this.container.limit.y;
      this.container.setPosition(0, limit);
    }, 100);
  },
  destroyed() {
    Scrollbar.destroy(this.$refs.messagesContainer);
  }
};
</script>

<style scoped lang="stylus">
.messages
  padding 0 globalMargin globalMargin globalMargin
  overflow hidden

.wrapper
  padding-bottom globalMargin
</style>
