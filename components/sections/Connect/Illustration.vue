<template>
  <section class="illustration">
    <img :alt="global.app.name" src="~/assets/img/logo.svg">
    {{ global.app.name }}
  </section>
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
.illustration
  fontsize(44px)
  line-height 60px
  font-weight 700
  color accent
  background url("~assets/img/signIn.svg") no-repeat
  background-position 50% 100%
  background-size contain
  margin-right column

  img
    height 80px
    vertical-align middle
    margin-right 5px
</style>
