<template>
  <PopUp :title="channel.name" @close="$emit('close')">
    <form class="createChannel" @submit.prevent="createChannel">
      <template v-if="!channel.public">
        <InputField
          id="passwordInput"
          v-model.lazy.trim="info.password"
          :error="errors.password"
          :placeholder="data.fields.password.placeholder"
          :label="data.fields.password.label"
          type="password"
          small
        />
      </template>
      <p>{{ channel.public ? data.info : data.infoPrivate }}</p>
      <Action :title="data.accept" :is-active="infoOk" filled small type="submit">{{ data.accept }}</Action>
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
    },
    channel: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      info: {
        password: ""
      },
      errors: {
        password: ""
      }
    };
  },
  computed: {
    infoOk() {
      return this.channel.public || this.info.password.length > 0;
    }
  },
  methods: {
    createChannel() {
      if (!this.infoOk) return;

      this.errors = { password: "" };

      const payload = {
        name: this.channel.name
      };

      if (!this.channel.public) {
        payload.password = this.info.password;
      }

      this.$axios
        .post("chan/join", payload)
        .then(result => {
          this.$emit("close", true);
        })
        .catch(error => {
          this.errors.password = error.response.data.msg;
        });
    }
  }
};
</script>

<style scoped lang="stylus">
.inputField
  margin-bottom globalMargin

p
  fontsize(14px)
  line-height 19px

button
  margin-top globalMargin
</style>
