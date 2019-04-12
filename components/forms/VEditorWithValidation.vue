<template>
  <ValidationProvider
    :name="$attrs.name"
    :rules="rules"
    v-slot="{ errors }"
    tag="div"
    class="row "
  >
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
          <froala
            :tag="'textarea'"
            :config="config"
            v-model="innerValue"
          ></froala>
        </no-ssr>
        <small class="text-danger small">{{ errors[0] }}</small>
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
    innerValue: '',
    config: {
      events: {
        "froalaEditor.initialized": function() {
          console.log("initialized");
        }
      },
      placeholderText: '',
      charCounterCount: false,
      toolbarButtons: [
        "bold",
        "italic",
        "underline",
        "paragraphStyle",
        "lineHeight",
        "insertLink"
      ]
    }
  })
})
export default class VEditorWithValidation extends Vue {
  innerValue: string = '';

  @Prop({ type: [Object, String], default: "" }) rules;
  @Prop({ type: [String], default: '' }) value;

  @Watch("innerValue")
  onInnerValueChanged(newVal: string, oldVal: string) {
    this.$emit("input", newVal);
  }

  @Watch("value")
  onValueChanged(newVal: string, oldVal: string) {
    this.innerValue = newVal;
  }

  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }

}
</script>
