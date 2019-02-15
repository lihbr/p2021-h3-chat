<template>
  <Container>
    <div class="wrapper">
      <h1>{{ code }}</h1>
      <h2>{{ error.message }}</h2>
      <nuxt-link to="/">Home page</nuxt-link>
    </div>
  </Container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({
        code: "Unknown",
        message: "Something happened, but we're taking care of it!"
      })
    }
  },
  computed: {
    code: function() {
      return this.error.statusCode || this.error.code;
    }
  }
};
</script>

<style scoped lang="stylus">
.wrapper
  margin 100px 0

a
  text-decoration underline
</style>
