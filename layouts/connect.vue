<template>
  <div class="globalContainerConnect">
    <nuxt/>
  </div>
</template>

<style lang="stylus">
html
  font-family mainFont
  font-size 16px
  word-spacing 1px
  -ms-text-size-adjust 100%
  -webkit-text-size-adjust 100%
  -moz-osx-font-smoothing grayscale
  -webkit-font-smoothing antialiased
  box-sizing border-box
  color black
  background white

.globalContainerConnect
  height 100vh
  width 100%
  display flex
  flex-flow column nowrap
  justify-content space-between
  overflow hidden

  // @media screen and (max-width: mobile)
  //   overflow inherit
  //   width inherit
  //   weight inherit
</style>
