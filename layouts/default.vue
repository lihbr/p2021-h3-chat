<template>
  <div class="globalContainer">
    <SideBar/>
    <nuxt/>
  </div>
</template>

<script>
import SideBar from "~/components/sections/SideBar.vue";

export default {
  components: {
    SideBar
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

.sideBar
  flex 0 1 column * 2
</style>
