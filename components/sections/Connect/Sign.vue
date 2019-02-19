<template>
  <div class="sign">
    <SignIn :data="data.signIn"/>
    <div class="separator">
      <span>{{ data.separator }}</span>
    </div>
    <SignUp :data="data.signUp"/>
  </div>
</template>

<script>
import SignIn from "~/components/controls/Connect/SignIn.vue";
import SignUp from "~/components/controls/Connect/SignUp.vue";

export default {
  components: {
    SignIn,
    SignUp
  },
  computed: {
    data() {
      return this.$store.state.lang.text.sections.connect.sign;
    },
    global() {
      return this.$store.state.lang.text.global;
    }
  }
};
</script>

<style scoped lang="stylus">
.sign
  z-index 0

.separator
  position relative
  text-align center
  margin 30px 0
  color grey

  &::before
    content ""
    position absolute
    top calc(50% - .5px)
    left 0
    display block
    width 100%
    height 1px
    background grey
    z-index -1

  span
    display inline-block
    background white
    padding 0 10px
</style>
