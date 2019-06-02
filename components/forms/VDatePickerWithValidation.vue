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
          <base-input addon-left-icon="ni ni-calendar-grid-58">
            <flat-picker
              v-model="innerValue"
              :config="{ allowInput: true, mode: `${$attrs.mode}` }"
              class="form-control datepicker"
              v-bind="$attrs"
            />
          </base-input>
          <small class="text-danger small">{{ errors[0] }}</small>
        </div>
      </div>
    </div>
    <div v-else-if="$attrs.isHalf === true">
      <div class="form-group mb-0">
        <small class="mb-1 font-weight-500 text-uppercase">
          {{ $attrs.label }}
        </small>
        <base-input addon-left-icon="ni ni-calendar-grid-58">
          <flat-picker
            v-model="innerValue"
            :config="{ allowInput: true, mode: `${$attrs.mode}` }"
            class="form-control datepicker"
            v-bind="$attrs"
          />
        </base-input>
        <small class="text-danger small">{{ errors[0] }}</small>
      </div>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { ValidationProvider } from 'vee-validate'
import flatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

import BaseInput from '~/argon-components/BaseInput.vue'

@Component({
  components: {
    ValidationProvider,
    flatPicker,
    BaseInput
  },
  data: () => ({
    innerValue: ''
  })
})
export default class VDatePickerWithValidation extends Vue {
  innerValue: string = '';

  @Prop({ type: [Object, String], default: '' }) rules;
  @Prop({ default: null }) value;

  @Watch('innerValue')
  onInnerValueChanged(newVal: string, oldVal: string) {
    // console.log('newVal ' + newVal.toString())
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

<style >
    .form-group  .form-group.input-group{
        margin-bottom: 0;
    }
</style>
