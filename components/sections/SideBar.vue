<template>
  <aside class="sideBar">
    <Logo/>
  </aside>
</template>

<script>
import Logo from "~/components/sections/Chat/Logo.vue";

export default {
  components: {
    Logo
  }
};
</script>

<style scoped lang="stylus">
.sideBar
  background lighterGrey
</style>
