<template>
  <button :class="{isActive, filled}" class="action">
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    filled: {
      type: Boolean,
      default: () => false
    },
    isActive: {
      type: Boolean,
      default: () => true
    }
  }
};
</script>

<style scoped lang="stylus">
.action
  height auto
  width 100%
  fontsize(18px)
  font-weight 500
  border-radius 5px
  text-align center
  padding 14px 0
  border 2px solid accent
  color accent
  opacity .8
  transition opacity .3s ease
  will-change opacity
  cursor pointer
  pointer-events none

.isActive
  opacity .99
  pointer-events auto

.filled
  color white
  background accent

</style>
