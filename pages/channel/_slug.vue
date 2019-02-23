<template>
  <div v-if="inited" class="channel">
    <transition name="fate" mode="out-in">
      <JoinChannel
        v-if="!joined"
        key="joinChannel"
        :data="data.join"
        :channel="currentChannel"
        @close="joinClose"
      />
    </transition>
    <div class="wrapper">
      <Info :channel="currentChannel"/>
      <Messages v-if="joined"/>
      <Submit :channel="currentChannel"/>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import PouchDB from "pouchdb";

import Info from "~/components/sections/Chat/Window/Info.vue";
import Messages from "~/components/sections/Chat/Window/Messages.vue";
import Submit from "~/components/sections/Chat/Window/Submit.vue";

import JoinChannel from "~/components/controls/Chat/JoinChannel.vue";

export default {
  middleware: "connectChannel",
  components: {
    Info,
    Messages,
    Submit,
    JoinChannel
  },
  validate({ params }) {
    return true || (params.slug && /[a-z][a-z0-9_$()+/-]*/g.test(params.slug));
  },
  data() {
    return {
      inited: false,
      joined: false
    };
  },
  computed: {
    currentChannel() {
      return this.$store.state.chat.current.channel;
    },
    userChannels() {
      return this.$store.state.chat.user.channels;
    },
    sync() {
      return this.$store.state.chat.current.sync;
    },
    data() {
      return this.$store.state.lang.text.sections.chat.channel;
    }
  },
  watch: {
    currentChannel() {
      this.join();
    }
  },
  mounted() {
    this.join();
  },
  methods: {
    ...mapMutations({
      clearMessages: "chat/current/clearMessages",
      addMessage: "chat/current/addMessage",
      setSync: "chat/current/setSync"
    }),
    ...mapActions({
      getUser: "chat/user/get"
    }),
    join() {
      if (!this.inited) {
        if (this.sync) {
          console.log("oui");
          this.sync.cancel();
        }
        if (!this.userChannels.find(d => d.slug === this.currentChannel.slug)) {
          this.joined = false;
        } else {
          this.clearMessages();

          const channel = new PouchDB(
            `chat_channel_${this.currentChannel.slug}`
          );

          const remote = new PouchDB(
            `${process.env.api_url}/couchproxy/chat_channel_${
              this.currentChannel.slug
            }`
          );

          channel.info((err, info) => {
            channel
              .changes({
                since: 0,
                live: true,
                include_docs: true
              })
              .on("change", info => {
                if (info.doc) {
                  this.addMessage(info.doc);
                }
              });
          });

          const sync = PouchDB.sync(channel, remote, {
            live: true,
            retry: true,
            checkpoint: "target"
          });

          this.setSync(sync);

          this.joined = true;
        }
        this.inited = true;
      }
    },
    joinClose(success = false) {
      if (!success) {
        this.$router.push("/");
      } else {
        this.joined = true;
        this.getUser(this.$route.params.slug);
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.wrapper
  display flex
  flex-flow column nowrap
  justify-content space-between
  height 100%

.messages
  flex 1
</style>
