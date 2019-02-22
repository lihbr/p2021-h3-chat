<template>
  <aside class="sideBar">
    <Logo/>
    <Search/>
    <div ref="listsContainer" class="lists">
      <List list-for="channels"/>
      <!-- <List list-for="pms"/> -->
    </div>
  </aside>
</template>

<script>
import Scrollbar from "~/assets/js/scrollbar";

import Logo from "~/components/sections/Chat/SideBar/Logo.vue";
import Search from "~/components/sections/Chat/SideBar/Search.vue";
import List from "~/components/sections/Chat/SideBar/List.vue";

export default {
  components: {
    Logo,
    Search,
    List
  },
  mounted() {
    // Scrollbar.init(this.$refs.listsContainer);
  },
  destroyed() {
    Scrollbar.destroy(this.$refs.listsContainer);
  }
};
</script>

<style scoped lang="stylus">
.sideBar
  background lighterGrey

.lists
  overflow auto
  height 100%
</style>
