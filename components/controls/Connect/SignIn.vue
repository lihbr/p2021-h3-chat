<template>
  <form class="signIn" @submit.prevent="signIn">
    <h1 v-html="data.title"/>
    <InputField
      id="signInName"
      v-model.lazy.trim="info.name"
      :error="errors.name"
      :placeholder="data.fields.name.placeholder"
      :label="data.fields.name.label"
      type="text"
    />
    <InputField
      id="signInPassword"
      v-model.lazy.trim="info.password"
      :placeholder="data.fields.password.placeholder"
      :label="data.fields.password.label"
      type="password"
    />
    <Action :title="data.submit" :is-active="infoOk" filled type="submit">{{ data.submit }}</Action>
  </form>
</template>

<script>
import InputField from "~/components/display/Basic/InputField.vue";
import Action from "~/components/display/Basic/Action.vue";

export default {
  components: {
    InputField,
    Action
  },
  props: {
    data: {
      type: Object,
      default: () => ""
    }
  },
  data() {
    return {
      info: {
        name: "",
        password: ""
      },
      errors: {
        name: ""
      }
    };
  },
  computed: {
    infoOk() {
      return this.info.name.length > 0 && this.info.password.length > 0;
    }
  },
  methods: {
    signIn() {
      if (!this.infoOk) return;

      this.errors = { name: "" };

      this.$axios
        .post("auth/signin", this.info)
        .then(result => {
          this.$router.push("/");
        })
        .catch(error => {
          console.log(this.errors);
          console.log(error.response.data.msg);
          this.errors.name = error.response.data.msg;
        });
    }
  }
};
</script>

<style scoped lang="stylus">
.sign
  z-index 0

h1
  fontsize(46px)
  line-height 53px
  font-weight bold
  color accent
</style>
