<template>
  <aside class="sideBar">
    <Logo/>
    <Search/>
    <List for="channels"/>
    <List for="pms"/>
  </aside>
</template>

<script>
import Logo from "~/components/sections/Chat/Logo.vue";
import Search from "~/components/sections/Chat/Search.vue";
import List from "~/components/sections/Chat/List.vue";

export default {
  components: {
    Logo,
    Search,
    List
  }
};
</script>

<style scoped lang="stylus">
.sideBar
  background lighterGrey
</style>
