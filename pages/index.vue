<template>
  <div>
    <h1>HOME</h1>
    <span>{{ name }}</span>
    <span>{{ pass }}</span>
    <form @submit.prevent>
      <input v-model="name" type="text" placeholder="name">
      <input v-model="pass" type="text" placeholder="pass">
      <input type="submit">
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
// import Component from '~/components/Component.vue'

export default {
  components: {
    // Component
  },
  data() {
    return {
      name: "",
      pass: ""
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped lang="stylus">
</style>
