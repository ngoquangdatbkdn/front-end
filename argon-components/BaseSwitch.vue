<template>
    <label class="custom-toggle">
        <input type="checkbox"
               v-model="model"
              >
        <span class="custom-toggle-slider rounded-circle"></span>
    </label>
</template>
<script>
export default {
  name: "base-switch",
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      default: false,
      description: "Switch value"
    }
  },
  computed: {
    model: {
      get() {
        // console.log('value get')
        // console.log(this.value)
        return this.value;
      },
      set(value) {
        // console.log('value set')
        // console.log(value)
        this.$emit("input", value);
      }
    }
  }
};
</script>
<style>
</style>
