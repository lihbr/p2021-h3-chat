<template>
  <div class="home">{{ $store.state.chat.user.name }}</div>
</template>

<script>
// import Logo from "~/components/sections/Chat/Logo.vue";

export default {
  components: {
    // Logo
  },
  mounted() {
    console.log(this.$store.state.chat.user.name);
  }
};
</script>

<style scoped lang="stylus">
</style>
