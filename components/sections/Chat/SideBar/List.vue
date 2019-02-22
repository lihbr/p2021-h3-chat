<template>
  <section class="list">
    <header>
      <h3 class="uppercase">{{ data.label }}</h3>
    </header>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <nuxt-link :to="item.href" :title="item.name">
          <Public v-if="item.public"/>
          <Private v-else/>
          {{ item.name }}
        </nuxt-link>
      </li>
    </ul>
    <a class="add" @click="addPopup = true">
      <Add/>
      {{ data.add.cta }}
    </a>
    <transition name="fade" mode="out-in">
      <CreateChannel
        v-if="addPopup && listFor === 'channels'"
        key="createChannel"
        :data="data.add"
        @close="addPopup = false"
      />
    </transition>
  </section>
</template>

<script>
import CreateChannel from "~/components/controls/Chat/SideBar/CreateChannel.vue";

import Public from "~/assets/icons/public.vue";
import Private from "~/assets/icons/private.vue";
import Add from "~/assets/icons/add.vue";

export default {
  components: {
    CreateChannel,
    Public,
    Private,
    Add
  },
  props: {
    listFor: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      addPopup: false
    };
  },
  computed: {
    data() {
      return this.$store.state.lang.text.sections.chat.list[this.listFor];
    },
    items() {
      return this.$store.state.chat.user[this.listFor];
    }
  }
};
</script>

<style scoped lang="stylus">
header
  padding 0 globalMargin
  margin globalMargin * 1.5 0 globalMargin * 0.75 0

h3
  fontsize(16px)
  font-weight 600
  line-height 22px
  color black

img
  width 40px
  display block
  margin 0 auto 5px auto

li
  height auto

a
  fontsize(16px)
  line-height 22px
  padding 9px globalMargin
  display block
  color grey

  &:not(.nuxt-link-active):hover
    background rgba(grey, .1)

  svg
    fill grey
    vertical-align sub
    margin-right 5px

.nuxt-link-active
  color white
  background accent

  svg
    fill white


.add
  font-weight 900
  color accent
  cursor pointer

  svg
    margin 2px 3px 4px 3px
    vertical-align sub
    margin-right 5px
</style>
