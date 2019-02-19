<template>
  <div class="inputField">
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
      type: String,
      default: () => ""
    },
    label: {
      type: String,
      default: () => ""
    },
    error: {
      type: String,
      default: () => ""
    }
  }
};
</script>

<style scoped lang="stylus">
.inputField
  margin-top 30px
  position relative

label, input
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
  &:focus
    border-color grey
    color black

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
</style>
