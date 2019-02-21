<template>
  <div class="popUp" @click.self="$emit('close')">
    <section>
      <header>
        <h3>{{ title }}</h3>
        <Close class="close" @click.native="$emit('close')"/>
      </header>
      <slot/>
    </section>
  </div>
</template>

<script>
import Close from "~/assets/icons/close.vue";

export default {
  components: {
    Close
  },
  props: {
    title: {
      type: String,
      default: () => ""
    }
  }
};
</script>

<style scoped lang="stylus">
.popUp
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  background rgba(black, 0.15)

section
  max-width 360px
  flex 1
  background white
  padding globalMargin
  border-radius 5px
  position relative

header
  display flex
  align-items center
  justify-content space-between

h3
  fontsize(24px)
  line-height 33px
  font-weight 500

.close
  cursor pointer
</style>
