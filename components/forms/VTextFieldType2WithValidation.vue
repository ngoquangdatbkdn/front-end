<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="$attrs.name"
    :rules="rules"
    tag="div"
    class="form-group"
  >
    <base-input
      v-model="innerValue"
      v-bind="$attrs"
      :placeholder="$attrs.placeholder"
    />
    <small class="text-danger small">{{ errors[0] }}</small>
  </ValidationProvider>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { ValidationProvider } from 'vee-validate'

import BaseInput from '@/argon-components/BaseInput.vue'

@Component({
  components: {
    ValidationProvider,
    BaseInput
  },
  data: () => ({
    innerValue: ''
  })
})
export default class VTextFieldType2WithValidation extends Vue {
  innerValue: string = '';

  @Prop({ type: [Object, String], default: '' }) rules;
  @Prop({ default: null }) value;

  @Watch('innerValue')
  onInnerValueChanged(newVal: string, oldVal: string) {
    this.$emit('input', newVal)
  }

  @Watch('value')
  onValueChanged(newVal: string, oldVal: string) {
    this.innerValue = newVal
  }

  created() {
    if (this.value) {
      this.innerValue = this.value
    }
  }
}
</script>

<style scoped>
.form-group.input-group {
    margin-bottom: 0px;
}
</style>
