<template>
  <div class="illustration">
    <img :alt="global.app.name" src="~/assets/img/logo.svg">
    {{ global.app.name }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      pass: ""
    };
  },
  computed: {
    data() {
      return this.$store.state.lang.text.sections.connect.illustration;
    },
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
  font-weight bold
  color accent
  background url("~assets/img/connectBG.png") no-repeat
  background-position 50% 100%
  background-size contain
  margin-right column

  img
    height 80px
    vertical-align middle
    margin-right 5px
</style>
