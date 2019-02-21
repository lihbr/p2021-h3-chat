<template>
  <button :class="{isActive, filled, small}" class="action">
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
    },
    small: {
      type: Boolean,
      default: () => false
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
  text-transform uppercase

.isActive
  opacity .99
  pointer-events auto

.filled
  color white
  background accent

.small
  fontsize(14px)
  line-height 19px
  padding 9px 0 8px 0

</style>
