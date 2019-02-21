<template>
  <form :class="{deployed: results.length}" class="search">
    <Magnifier/>
    <input
      :placeholder="data.placeholder"
      v-model.trim="searchInput"
      type="text"
      size="10"
      @input="search"
    >
    <ul>
      <li v-for="(item, index) in results" :key="index">
        <nuxt-link :to="item.href" :title="item.name">
          <Public v-if="item.public"/>
          <Private v-else/>
          {{ item.name }}
        </nuxt-link>
      </li>
    </ul>
  </form>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { debounce } from "~/assets/js/utils";

import Public from "~/assets/icons/public";
import Private from "~/assets/icons/private";
import Magnifier from "~/assets/icons/magnifier";

export default {
  components: {
    Public,
    Private,
    Magnifier
  },
  data() {
    return {
      searchInput: ""
    };
  },
  computed: {
    data() {
      return this.$store.state.lang.text.sections.chat.search;
    },
    results() {
      return this.$store.state.chat.search.results;
    }
  },
  methods: {
    ...mapMutations({
      setResults: "chat/search/setResults"
    }),
    ...mapActions({
      chatSearch: "chat/search/search"
    }),
    search() {
      if (this.searchInput.length < 3) {
        this.setResults([]);
      } else {
        this.chatSearch(this.searchInput);
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.search
  margin globalMargin
  background softGrey
  border-radius 5px
  padding 7px 10px
  display flex
  align-items center
  position relative

input
  fontsize(12px)
  line-height 16px
  margin-left 4px
  flex 0 1 80%

ul
  position absolute
  left 0
  top calc(100% - 4px)
  width 100%
  padding-top 5px
  display none
  background softGrey
  border-radius 0 0 5px 5px

  &::before
    content ""
    position absolute
    top 4px
    left 8px
    width calc(100% - 16px)
    height 1px
    background softerGrey
    display block

.deployed input:focus + ul
    display block

a
  fontsize(14px)
  line-height 19px
  padding 9px 8px
  display block
  color grey

  &:not(.nuxt-link-active):hover
    background rgba(accent, .1)

  svg
    fill grey
    vertical-align bottom
    margin-right 5px
</style>
