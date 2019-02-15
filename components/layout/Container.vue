<template>
  <div class="container">
    <slot/>
  </div>
</template>

<style scoped lang="stylus">
.container
  margin 0 auto
  width calc(100% - 24vw)

  @media screen and (max-width: desktop)
    width "calc(100% - %s * 4)" % globalMargin
  @media screen and (max-width: tablet)
    width "calc(100% - %s * 2)" % globalMargin
</style>
