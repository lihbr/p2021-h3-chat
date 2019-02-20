<template>
  <div class="connect">
    <figure class="illustration">
      <img :alt="global.app.name" class="logo" src="~/assets/img/logo.svg">
      {{ global.app.name }}
      <img
        :class="{switch: current === 'signin'}"
        src="~/assets/img/signIn.svg"
        alt="background"
        class="background"
      >
      <img
        :class="{switch: current === 'signup'}"
        src="~/assets/img/signUp.svg"
        alt="background"
        class="background"
      >
    </figure>
    <section ref="signContainer" class="sign">
      <transition name="fade" mode="out-in">
        <ConnectForm
          v-if="current === 'signin'"
          key="signin"
          :data="data.signIn"
          :callback="$route.params.slug"
          @switch-case="current = 'signup'"
        />
        <ConnectForm v-else key="signup" :data="data.signUp" @switch-case="current = 'signin'"/>
      </transition>
    </section>
  </div>
</template>

<script>
import Scrollbar from "~/assets/js/scrollbar";

import ConnectForm from "~/components/sections/Connect/Form.vue";

export default {
  layout: "connect",
  components: {
    ConnectForm
  },
  validate({ params }) {
    return /[a-z][a-z0-9_$()+/-]*/g.test(params.slug);
  },
  data() {
    return {
      current: "signin"
    };
  },
  computed: {
    global() {
      return this.$store.state.lang.text.global;
    },
    data() {
      return this.$store.state.lang.text.sections.connect.sign;
    }
  },
  mounted() {
    Scrollbar.init(this.$refs.signContainer);
  },
  destroyed() {
    Scrollbar.destroy(this.$refs.signContainer);
  }
};
</script>

<style scoped lang="stylus">
.connect
  flex 1
  margin 5vh column
  display flex
  align-items stretch
  justify-content center
  @media screen and (max-width: mobile)
    margin globalMargin * 0.5 0

.illustration
  fontsize(44px)
  line-height 60px
  font-weight 700
  color accent
  flex 1
  margin-right column
  position relative
  pointer-events none
  @media screen and (max-width: desktop)
    display none

.logo
  height 80px
  vertical-align middle
  margin-right 5px

.background
  position absolute
  bottom 0
  left 0
  width 100%
  max-height 90%
  opacity 0
  will-change opacity
  transition opacity .3s ease

  &.switch
    transition opacity .2s ease .3s
    opacity 1

.sign
  flex 0 1 column * 3
  height auto
  overflow visible !important
  @media screen and (max-width: mobile)
    flex 0 1 100%
    padding 0 globalMargin

.fade-enter-active, .fade-leave-active
  transition opacity .3s ease
  opacity 1
  will-change opacity

.fade-enter, .fade-leave-to
  opacity 0
</style>
