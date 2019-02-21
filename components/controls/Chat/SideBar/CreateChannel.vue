<template>
  <PopUp :title="data.title" @close="$emit('close')">
    <form class="createChannel" @submit.prevent="createChannel">
      <InputField
        id="nameInput"
        v-model.lazy.trim="info.name"
        :error="errors.name"
        :placeholder="data.fields.name.placeholder"
        :label="data.fields.name.label"
        type="text"
        small
      />
      <InputField
        id="privateInput"
        v-model="info.private"
        :error="errors.private"
        :label="data.fields.private.label"
        :description="data.fields.private.description"
        type="checkbox"
        small
      />
      <template v-if="info.private">
        <InputField
          id="passwordInput"
          v-model.lazy.trim="info.password"
          :error="errors.password"
          :placeholder="data.fields.password.placeholder"
          :label="data.fields.password.label"
          type="password"
          small
        />
        <InputField
          id="confirmInput"
          v-model.lazy.trim="info.confirm"
          :error="errors.confirm"
          :placeholder="data.fields.confirm.placeholder"
          :label="data.fields.confirm.label"
          type="password"
          small
        />
      </template>
      <Action :title="data.submit" :is-active="infoOk" filled small type="submit">{{ data.submit }}</Action>
    </form>
  </PopUp>
</template>

<script>
import { slug } from "~/assets/js/utils";

import PopUp from "~/components/display/Basic/PopUp.vue";
import InputField from "~/components/display/Basic/InputField.vue";
import Action from "~/components/display/Basic/Action.vue";

export default {
  components: {
    PopUp,
    InputField,
    Action
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      info: {
        name: "",
        private: false,
        password: "",
        confirm: ""
      },
      errors: {
        name: "",
        private: "",
        password: "",
        confirm: ""
      }
    };
  },
  computed: {
    infoOk() {
      let ok = true;

      if (!this.info.name.length) ok = false;
      else if (this.info.private) {
        if (!this.info.password.length) ok = false;
        else if (!this.info.confirm.length) ok = false;
        else if (this.info.password !== this.info.confirm) ok = false;
      }

      return ok;
    }
  },
  methods: {
    createChannel() {
      if (!this.infoOk) return;

      this.errors = { name: "", private: "", password: "", confirm: "" };

      const payload = {
        name: this.info.name
      };

      if (this.info.private) {
        payload.password = this.info.password;
        payload.confirm = this.info.confirm;
      }

      this.$axios
        .post("chan/create", payload)
        .then(result => {
          this.$emit("close");
          this.$router.push(`/channel/${slug(payload.name)}`);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped lang="stylus">
button
  margin-top globalMargin
</style>
