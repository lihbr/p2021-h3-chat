<template>
  <header class="info">
    <section>
      <h2>
        <Public v-if="channel.public"/>
        <Private v-else/>
        {{ channel.name }}
      </h2>
      <small>{{ info }}</small>
    </section>
  </header>
</template>

<script>
import Public from "~/assets/icons/public.vue";
import Private from "~/assets/icons/private.vue";

export default {
  components: {
    Public,
    Private
  },
  props: {
    channel: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    data() {
      return this.$store.state.lang.text.sections.chat.channel.info;
    },
    info() {
      return `${this.data.owner} ${this.channel.owner}`;
    }
  }
};
</script>

<style scoped lang="stylus">
header
  padding globalMargin globalMargin globalMargin * 0.7 globalMargin
  border-bottom 2px solid lighterGrey

h2
  fontsize(26px)
  line-height 35px
  font-weight 600
  color darkGrey

  svg
    fill accent
    width 30px
    height 30px
    vertical-align sub
    margin-right 5px

small
  fontsize(14px)
  line-height 19px
  color grey
</style>
