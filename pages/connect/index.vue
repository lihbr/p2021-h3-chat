<template>
  <div class="connect">
    <Illustration/>
    <Sign/>
  </div>
</template>

<script>
import Illustration from "~/components/sections/Connect/Illustration.vue";
import Sign from "~/components/sections/Connect/Sign.vue";

export default {
  components: {
    Illustration,
    Sign
  }
};
</script>

<style scoped lang="stylus">
.connect
  margin verticalMargin column
  display flex
  align-items stretch
  justify-content center
  width 100%
  @media screen and (max-width: mobile)
    margin verticalMargin globalMargin

.illustration
  flex 1
  @media screen and (max-width: desktop)
    display none

.sign
  flex 0 1 column * 3
  @media screen and (max-width: mobile)
    flex 0 1 auto
</style>
