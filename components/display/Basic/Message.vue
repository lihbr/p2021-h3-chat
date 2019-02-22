<template>
  <article class="message">{{ data.msg }}</article>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped lang="stylus">
.message
  padding globalMargin * 0.5
  border-radius 5px
  margin globalMargin * 0.25 0
</style>
