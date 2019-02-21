<template>
  <div class="home">Channel</div>
</template>

<script>
// import Logo from "~/components/sections/Chat/Logo.vue";

export default {
  components: {
    // Logo
  },
  validate({ params }) {
    return true || (params.slug && /[a-z][a-z0-9_$()+/-]*/g.test(params.slug));
  },
  mounted() {
    //
  }
};
</script>

<style scoped lang="stylus">
</style>
