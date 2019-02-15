<template>
  <span class="smartLink">
    <nuxt-link v-if="isRelative" :to="href" :title="realTitle">
      <slot/>
    </nuxt-link>
    <a
      v-else
      :href="href"
      :title="realTitle"
      :target="target === 'blank' ? '_blank' : ''"
      :rel="target === 'blank' ? 'noopener' : ''"
    >
      <slot/>
    </a>
  </span>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: () => ""
    },
    title: {
      type: String,
      default: () => ""
    },
    target: {
      type: String,
      default: () => ""
    }
  },
  computed: {
    isRelative: function() {
      const regex = /^([a-z0-9]*:|.{0})\/\/.*$/gim; // match if absolute
      return this.href.match(regex) === null;
    },
    realTitle: function() {
      return this.title || this.$slots.default[0].text || "";
    }
  }
};
</script>
