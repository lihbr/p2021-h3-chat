<template>
  <section ref="signContainer" class="sign">
    <transition name="fade" mode="out-in">
      <ConnectForm
        v-if="current === 'signin'"
        key="signin"
        :data="data.signIn"
        @switch-case="current = 'signup'"
      />
      <ConnectForm v-else key="signup" :data="data.signUp" @switch-case="current = 'signin'"/>
    </transition>
  </section>
</template>

<script>
import Scrollbar from "smooth-scrollbar";

import ConnectForm from "~/components/controls/Connect/Form.vue";

export default {
  components: {
    ConnectForm
  },
  data() {
    return {
      current: "signup"
    };
  },
  computed: {
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
section.sign
  height auto
  overflow visible !important

.fade-enter-active, .fade-leave-active
  transition opacity .3s ease
  opacity 1
  will-change opacity

.fade-enter, .fade-leave-to
  opacity 0
</style>
