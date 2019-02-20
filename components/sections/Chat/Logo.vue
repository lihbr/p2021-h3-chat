<template>
  <figure class="logo">
    <img :alt="global.app.name" src="~/assets/img/logo.svg">
    {{ global.app.name }}
  </figure>
</template>

<script>
export default {
  computed: {
    global() {
      return this.$store.state.lang.text.global;
    }
  }
};
</script>

<style scoped lang="stylus">
.logo
  fontsize(26px)
  line-height 35px
  font-weight 700
  color accent
  margin 30px 0
  text-align center
  pointer-events none

img
  width 40px
  display block
  margin 0 auto 5px auto
</style>
