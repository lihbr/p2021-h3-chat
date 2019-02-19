<template>
  <section class="sign">
    <h1 v-html="current.title"/>
    <form @submit.prevent="sign">
      <InputField
        v-for="(field, index) of fields"
        :key="index"
        :id="field.id"
        v-model.lazy.trim="info[field.name]"
        :error="errors[field.name]"
        :placeholder="field.placeholder"
        :label="field.label"
        :type="field.type"
      />
      <Action :title="current.submit" :is-active="infoOk" filled type="submit">{{ current.submit }}</Action>
    </form>
    <div class="separator">
      <span>{{ data.separator }}</span>
    </div>
    <h2 v-html="current.subtitle"/>
    <Action :title="current.switch" is-active @click.native="switchCase">{{ current.switch }}</Action>
  </section>
</template>

<script>
import InputField from "~/components/display/Basic/InputField.vue";
import Action from "~/components/display/Basic/Action.vue";

export default {
  components: {
    InputField,
    Action
  },
  data() {
    return {
      key: "signIn",
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
    data() {
      return this.$store.state.lang.text.sections.connect.sign;
    },
    current() {
      return this.data[this.key];
    },
    fields() {
      const fields = [];

      for (const name in this.current.fields) {
        if (this.current.fields.hasOwnProperty(name)) {
          const field = this.current.fields[name];
          field.id = `${this.key}_${name}`;
          field.name = name;

          if (name === "password" || name === "confirm") {
            field.type = "password";
          } else if (name === "email") {
            field.type = "email";
          } else {
            field.type = "text";
          }

          fields.push(field);
        }
      }

      return fields;
    },
    infoOk() {
      let ok = true;

      for (const field of this.fields) {
        if (this.info[field.name].length === 0) {
          ok = false;
          break;
        }

        if (field.type === "email") {
          const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (!this.info[field.name].match(emailRegex)) {
            ok = false;
            break;
          }
        }
      }

      return ok;
    }
  },
  methods: {
    switchCase() {
      // Reset errors
      this.errors = {
        name: "",
        email: "",
        password: "",
        confirm: ""
      };

      return (this.key = this.key === "signUp" ? "signIn" : "signUp");
    },
    sign() {
      if (!this.infoOk) return;
      // Reset errors
      this.errors = {
        name: "",
        email: "",
        password: "",
        confirm: ""
      };

      this.$axios
        .post(`auth/${this.key.toLowerCase()}`, this.info)
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
