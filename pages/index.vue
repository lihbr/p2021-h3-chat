<template>
  <div class="home" @click="test">{{ $store.state.chat.user.name }}</div>
</template>

<script>
// import Logo from "~/components/sections/Chat/Logo.vue";

export default {
  components: {
    // Logo
  },
  mounted() {},
  methods: {
    test() {
      console.log(this.$store.state.chat.user.channels);
    }
  }
};
</script>

<style scoped lang="stylus">
</style>
