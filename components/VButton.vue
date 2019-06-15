<template xmlns="http://www.w3.org/1999/html">
  <a :class='`button `' :style="`--theme-color:${themeColor}`" @click="onClick">
    <slot>default content</slot>
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class VButton extends Vue {
  @Prop({ type: String, default: "" }) themeColor;
  @Prop({ type: String, default: "" }) class;
  onClick() {
    this.$emit("click");
  }
}
</script>

<style scoped>
.button {
  padding: 15px;
  background-color: var(--theme-color);
  border-radius: 10px;
}
.button > * {
  color: white;
}
.button:hover {
  cursor: pointer;
  background-color: var(--theme-color);
}
</style>
