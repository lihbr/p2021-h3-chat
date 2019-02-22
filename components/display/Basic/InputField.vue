<template>
  <div :class="{small, checkbox: type === 'checkbox'}" class="inputField">
    <template v-if="type !== 'checkbox'">
      <label v-if="label" :for="id">{{ label }}</label>
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        :name="id"
        @input="$emit('input', $event.target.value)"
      >
      <div class="error" v-html="error"/>
    </template>
    <template v-else>
      <input
        :id="id"
        :type="type"
        :value="value"
        :name="id"
        @input="$emit('input', $event.target.checked)"
      >
      <label v-if="label" :for="id">{{ label }}</label>
      <p>{{ description }}</p>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: () => ""
    },
    type: {
      type: String,
      default: () => "text"
    },
    placeholder: {
      type: String,
      default: () => ""
    },
    value: {
      type: [String, Boolean],
      default: () => ""
    },
    label: {
      type: String,
      default: () => ""
    },
    error: {
      type: String,
      default: () => ""
    },
    description: {
      type: String,
      default: () => ""
    },
    small: {
      type: Boolean,
      default: () => false
    }
  }
};
</script>

<style scoped lang="stylus">
.inputField
  margin-top 30px
  position relative

label, input, p
  fontsize(18px)
  line-height 25px
  display block
  color grey
  width 100%

label
  margin-bottom 10px

input
  border 1px solid lightGrey
  border-radius 5px
  padding 12px 20px 11px 20px
  transition color .2s ease, border-color .2s ease
  color grey
  &:focus, &:not(:placeholder-shown)
    border-color accent
    color accent

input[type=password]
  fontsize(10px)
  letter-spacing 1px

.error
  fontsize(14px)
  color errorRed
  font-style italic
  position absolute
  top 105%
  left 0

.checkbox
  input
    display none

  label
    color black
    position relative
    padding-left 24px
    cursor pointer

    &::before
      content ""
      position absolute
      left 2px
      top calc(50% - 10px)
      height 16px
      width 16px
      display block
      border-radius 4px
      border 1px solid lightGrey
      transition background .3s ease

  input:checked + label::before
      background accent

.small
  margin-top 20px

  label, input, p
    fontsize(14px)
    line-height 19px

  input
    padding 10px 20px 9px 20px

  .error
    fontsize(12px)
</style>
