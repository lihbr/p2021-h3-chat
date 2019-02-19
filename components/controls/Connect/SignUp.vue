<template>
  <form class="signIn" @submit.prevent="signUp">
    <h2 v-html="data.subtitle"/>
    <Action :title="data.submit" :is-active="infoOk" type="submit">{{ data.submit }}</Action>
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
        email: "",
        password: "",
        confirm: ""
      },
      errors: {
        name: "",
        email: "",
        password: "",
        confirm: ""
      }
    };
  },
  computed: {
    infoOk() {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return (
        this.info.name.length > 0 &&
        this.info.email.match(emailRegex) &&
        this.info.password.length > 0 &&
        this.info.confirm.length > 0
      );
    }
  },
  methods: {
    signIn() {
      if (!this.infoOk) return;

      this.errors = { name: "" };

      this.$axios
        .post("auth/signun", this.info)
        .then(result => {
          this.$router.push("/");
        })
        .catch(error => {
          this.errors.name = error.response.data.msg;
        });
    }
  }
};
</script>

<style scoped lang="stylus">
.sign
  z-index 0

h2
  fontsize(24px)
  line-height 30px
  font-weight 700
  color accent
</style>
