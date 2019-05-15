<template>
  <label class="custom-toggle">
    <input
      v-model="model"
      type="checkbox"
    >
    <span class="custom-toggle-slider rounded-circle" />
  </label>
</template>
<script>
export default {
  name: 'BaseSwitch',
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      default: false,
      description: 'Switch value'
    }
  },
  computed: {
    model: {
      get() {
        // console.log('value get')
        // console.log(this.value)
        return this.value
      },
      set(value) {
        // console.log('value set')
        // console.log(value)
        this.$emit('input', value)
      }
    }
  }
}
</script>
<style>
</style>
