<template>
  <div class="globalContainer">
    <SideBar/>
    <nuxt/>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import SideBar from "~/components/sections/Chat/SideBar.vue";

export default {
  components: {
    SideBar
  },
  mounted() {
    this.chatInit();
  },
  methods: {
    ...mapActions({
      chatInit: "chat/init"
    })
  }
};
</script>

<style lang="stylus">
html
  font-family mainFont
  font-size 16px
  word-spacing 1px
  -ms-text-size-adjust 100%
  -webkit-text-size-adjust 100%
  -moz-osx-font-smoothing grayscale
  -webkit-font-smoothing antialiased
  box-sizing border-box
  color black
  background white

.globalContainer
  height 100vh
  width 100%
  display flex
  flex-flow row nowrap
  justify-content space-between
  overflow hidden

.sideBar
  flex 0 0 globalColumn * 2

.channel
  flex 1
</style>
