<template>
  <div class="form">
    <form @submit.prevent="sign">
      <h1 v-html="data.title"/>
      <InputField
        v-if="data.fields.name"
        id="nameInput"
        v-model.lazy.trim="info.name"
        :error="errors.name"
        :placeholder="data.fields.name.placeholder"
        :label="data.fields.name.label"
        type="text"
      />
      <InputField
        v-if="data.fields.email"
        id="emailInput"
        v-model.lazy.trim="info.email"
        :error="errors.email"
        :placeholder="data.fields.email.placeholder"
        :label="data.fields.email.label"
        type="email"
      />
      <InputField
        v-if="data.fields.password"
        id="passwordInput"
        v-model.lazy.trim="info.password"
        :error="errors.password"
        :placeholder="data.fields.password.placeholder"
        :label="data.fields.password.label"
        type="password"
      />
      <InputField
        v-if="data.fields.confirm"
        id="confirmInput"
        v-model.lazy.trim="info.confirm"
        :error="errors.confirm"
        :placeholder="data.fields.confirm.placeholder"
        :label="data.fields.confirm.label"
        type="password"
      />
      <Action :title="data.submit" :is-active="infoOk" filled type="submit">{{ data.submit }}</Action>
    </form>
    <div class="separator">
      <span>{{ data.separator }}</span>
    </div>
    <h2 v-html="data.subtitle"/>
    <Action :title="data.switch" is-active @click.native="$emit('switch-case')">{{ data.switch }}</Action>
  </div>
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
      default: () => ({})
    },
    callback: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      info: { name: "", email: "", password: "", confirm: "" },
      errors: { name: "", email: "", password: "", confirm: "" }
    };
  },
  computed: {
    infoOk() {
      let ok = true;

      if (this.data.fields.name && this.info.name.length === 0) ok = false;
      else if (this.data.fields.email) {
        if (this.info.email.length === 0) {
          ok = false;
        } else {
          const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!this.info.email.match(emailRegex)) ok = false;
        }
      }
      if (this.data.fields.password && this.info.password.length === 0)
        ok = false;
      else if (this.data.fields.confirm && this.info.confirm.length === 0)
        ok = false;

      return ok;
    }
  },
  methods: {
    sign() {
      if (!this.infoOk) return;

      this.errors = { name: "", email: "", password: "", confirm: "" };

      this.$axios
        .post(`auth/${this.data.action}`, this.info)
        .then(result => {
          this.$router.push(
            `/${this.callback ? `channel/${this.callback}` : ""}`
          );
        })
        .catch(error => {
          this.errors.name = error.response.data.msg;
        });
    }
  }
};
</script>

<style scoped lang="stylus">
.form
  padding-bottom 10px

h1
  fontsize(46px)
  line-height 53px
  font-weight 700
  color accent

form
  .action
    margin-top 30px

.separator
  position relative
  text-align center
  margin 30px 0
  color grey

  &::before
    content ""
    position absolute
    top calc(50% - .5px)
    left 0
    display block
    width 100%
    height 1px
    background grey
    z-index -1

  span
    display inline-block
    background white
    padding 0 10px

h2
  fontsize(24px)
  line-height 30px
  font-weight 700
  color accent
  margin-bottom 30px
</style>
