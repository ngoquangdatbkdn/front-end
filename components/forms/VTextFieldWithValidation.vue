<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="$attrs.name"
    :rules="rules"
    tag="div"
  >
    <div v-if="!$attrs.isHalf" class="row ">
      <div class="col-md-6 ">
        <p class="mb-0 font-weight-700 text-uppercase">
          {{ $attrs.label }}
        </p>
        <p class="mb-3">
          {{ $attrs.description }}
        </p>
      </div>
      <div class="col-md-6 ">
        <div class="form-group mb-0">
          <input
            v-model="innerValue"
            v-bind="$attrs"
            :placeholder="$attrs.placeholder"
            class="form-control"
          >
          <small class="text-danger small">{{ errors[0] }}</small>
        </div>
      </div>
    </div>

    <div v-else-if="$attrs.isHalf === true">
      <div class="form-group mb-0">
        <small class="mb-1 font-weight-500 text-uppercase">
          {{ $attrs.label }}
        </small>
        <input
          v-model="innerValue"
          v-bind="$attrs"
          :placeholder="$attrs.placeholder"
          class="form-control"
        >
        <small class="text-danger small">{{ errors[0] }}</small>
      </div>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { ValidationProvider } from 'vee-validate'

@Component({
  components: {
    ValidationProvider
  },
  data: () => ({
    innerValue: ''
  })
})
export default class VTextFieldWithValidation extends Vue {
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
