<template>
  <div :class="{self}" class="messagesGroup">
    <img :src="pp" :alt="data.author" :title="data.author" class="pp">
    <div class="wrapper">
      <Message v-for="(message, key) in data.messages" :key="key" :data="message"/>
    </div>
  </div>
</template>

<script>
import Message from "~/components/display/Basic/Message.vue";

export default {
  components: {
    Message
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    self: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    pp() {
      return `https://www.gravatar.com/avatar/${
        this.data.author
      }?d=retro&s=100`;
    }
  },
  watch: {
    handler: () => {
      console.log("ouiiii");
    },
    deep: true
  }
};
</script>

<style scoped lang="stylus">
.messagesGroup
  display flex
  align-items flex-end
  margin globalMargin * 0.25 0

.pp
  width 30px
  height 30px
  border-radius 50%

.wrapper
  max-width 600px
  display flex
  flex-flow column nowrap

:not(.self)

  .wrapper
    margin-left globalMargin * 0.5
    align-items flex-start

  .message
    background lighterGrey

.self
  flex-flow row-reverse nowrap

  .wrapper
    margin-right globalMargin * 0.5
    align-items flex-end

  .message
    background accent
    text-align right
    color white


</style>
