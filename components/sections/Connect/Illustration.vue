<template>
  <section class="illustration">
    <img :alt="global.app.name" class="logo" src="~/assets/img/logo.svg">
    {{ global.app.name }}
    <div class="hover">
      <img src="~/assets/img/signIn.svg" alt="background" class="background active">
      <img src="~/assets/img/signUp.svg" alt="background" class="background">
    </div>
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
  margin-right column

.logo
  height 80px
  vertical-align middle
  margin-right 5px

.hover
  position fixed
  bottom 5vh
  left column

  .background
    position absolute
    bottom 0
    left 0
    width "calc(50vw - %s)" % column
    opacity 0
    will-change opacity
    transition opacity .5s ease

    &.active
      transition opacity .35s ease .5s
      opacity 1

.hover:hover
  .background
    opacity 1
    transition opacity .35s ease .5s

    &.active
      opacity 0
      transition opacity .5s ease

</style>
