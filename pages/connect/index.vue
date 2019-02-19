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
  layout: "connect",
  components: {
    Illustration,
    Sign
  }
};
</script>

<style scoped lang="stylus">
.connect
  flex 1
  margin verticalMargin column
  display flex
  align-items stretch
  justify-content center
  @media screen and (max-width: mobile)
    margin globalMargin * 0.5 globalMargin
    align-items center

.illustration
  flex 1
  @media screen and (max-width: desktop)
    display none

.sign
  flex 0 1 column * 3
  @media screen and (max-width: mobile)
    flex 0 1 auto
</style>
