<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules" tag="div">
    <div v-if="!$attrs.isHalf" class="row">
      <div class="col-md-6">
        <p class="mb-0 font-weight-700 text-uppercase">{{ $attrs.label }}</p>
        <p class="mb-3">{{ $attrs.description }}</p>
      </div>
      <div class="col-md-6">
        <div class="form-group mb-0">
          <no-ssr>
            <v-select
              v-model="innerValue"
              :label="$attrs['option-label']"
              :reduce="$attrs.reduce"
              :options="$attrs.options"
            >
              <div slot="no-options">{{ $t('common.no_options') }}</div>
            </v-select>
            <small class="text-danger small">{{ errors[0] }}</small>
          </no-ssr>
        </div>
      </div>
    </div>
    <div v-else-if="$attrs.isHalf === true">
      <small class="mb-1 font-weight-500 text-uppercase">{{ $attrs.label }}</small>
      <div class="form-group mb-0">
        <no-ssr>
          <v-select
            v-model="innerValue"
            :label="$attrs['option-label']"
            :reduce="$attrs.reduce"
            :options="$attrs.options"
          >
            <div slot="no-options">{{ $t('common.no_options') }}</div>
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

  @Prop({ type: [Object, String, Number], default: "" }) rules;
  @Prop({ type: [Object, String, Number], default: null }) value;

  @Watch("innerValue")
  onInnerValueChanged(newVal: any, oldVal: any) {
    console.log("newVal zz" + JSON.stringify(newVal));
    this.$emit("input", newVal);
    this.$emit("onSelect", newVal);
  }

  @Watch("value")
  onValueChanged(newVal: any, oldVal: any) {
     console.log("newVal xx" + JSON.stringify(newVal));
    // console.log("newVal value" + JSON.stringify(newVal));
    this.innerValue = newVal;
  }
  mounted() {
    // console.log("$attrs.ions " +JSON.stringify(this.$attrs.options));
    // console.log("reduce " + this.$attrs.reduce);
  }
  created() {
    if (this.value) {
      // console.log("this.value " + JSON.stringify(this.value));
      this.innerValue = this.value;
    }
  }
 
}
</script>

<style >
.v-select .selected-tag {
  padding: 0;
  margin: 0;
}
</style>
