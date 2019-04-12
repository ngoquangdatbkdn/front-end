<template>
  <ValidationProvider
    :name="$attrs.name"
    :rules="rules"
    v-slot="{ errors }"
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
          <no-ssr>
            <v-select :label="$attrs.optionLabel" :options="$attrs.options"  v-model="innerValue">
              <div slot="no-options">{{$t('common.no_options')}}</div>
            </v-select>
            <small class="text-danger small">{{ errors[0] }}</small>
          </no-ssr>
        </div>
      </div>
    </div>
    <div v-else-if="$attrs.isHalf === true">
      <small class="mb-0 font-weight-500 text-uppercase">
        {{ $attrs.label }}
      </small>
      <div class="form-group mb-0">
        <no-ssr>
          <v-select :label="$attrs.optionLabel" :options="$attrs.options"  v-model="innerValue">
            <div slot="no-options">{{$t('common.no_options')}}</div>
          </v-select>
          <small class="text-danger small">{{ errors[0] }}</small>
        </no-ssr>
      </div>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";

@Component({
  components: {
    ValidationProvider
  },
  data: () => ({
    innerValue: null
  })
})
export default class VSelectWithValidation extends Vue {
  innerValue: any = null;

  @Prop({ type: [Object, String], default: "" }) rules;
  @Prop({ type: [Object, String], default: null }) value;

  @Watch("innerValue")
  onInnerValueChanged(newVal: any, oldVal: any) {
    this.$emit("input", newVal);
  }

  @Watch("value")
  onValueChanged(newVal: any, oldVal: any) {
    this.innerValue = newVal;
  }

  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
}
</script>

<style >
.v-select .selected-tag{
    padding: 0;
    margin: 0;
}
</style>
