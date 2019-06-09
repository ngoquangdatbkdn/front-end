// <template>
//   <div class="container pt-5">
//     <div class="row">
//       <div class="col-md-6">
//         <p class="mb-0 font-weight-700 text-uppercase">{{ $attrs.label }}</p>
//         <p class="mb-3">{{ $attrs.description }}</p>
//       </div>
//       <div class="col-md-6 d-flex flex-column">
//         <card
//           v-for="(innerValue, index) in innerValues"
//           :key="'value' + index"
//           type="secondary"
//           shadow
//           :class="
//                 `${
//                   index > 0 ? 'mt-3' : ''
//                 } bg-white  form-group mb-0 d-flex flex-column`
//               "
//         >
//           <button
//             v-if="index > 0"
//             type="button"
//             data-dismiss="alert"
//             aria-label="Close"
//             class="close"
//             @click="onRemoveItem(index)"
//           >
//             <span aria-hidden="true">×</span>
//           </button>
//           <div :class="`${index > 0 ? 'mt-3' : ''}  position-relative`">
//             <slot  v-bind:innerValue="innerValue">default input</slot>
//           </div>
//         </card>
//         <button
//           type="button"
//           class="btn btn-primary my-4 align-self-center"
//           @click="onAddItem()"
//         >{{ $attrs.addLabel }}</button>
//       </div>
//     </div>
//     <hr>
//   </div>
// </template>

// <script lang="ts">
// import { Vue, Component, Prop, Watch } from "vue-property-decorator";
// import { classToClass } from "class-transformer";

// @Component({
//   components: {},
//   data: () => ({
//     innerValues: []
//   })
// })
// export default class VArrayInput extends Vue {
//   innerValues: Object[] = [];
//   clonableObject: Object = {};

//   @Prop({ default: [] }) value;

//   @Watch("innerValues")
//   onInnerValueChanged(newVal: string, oldVal: string) {
//     // console.log('newVal ' + newVal.toString())
//     this.$emit("input", newVal);
//   }

//   @Watch("value")
//   onValueChanged(newVal: [], oldVal: []) {
//     this.innerValues = newVal;
//   }
//   onRemoveItem(index: number) {
//     this.innerValues.splice(index, 1);
//     this.innerValues = [...this.innerValues];
//   }
//   onAddItem() {
//     this.innerValues.push(classToClass(this.clonableObject));
//     this.innerValues = [...this.innerValues];
//   }
//   created() {
//     if (this.value) {
//       this.innerValues = this.value;
//       if(this.innerValues.length === 0){
//           this.innerValues.push(classToClass(this.clonableObject));
//       }
//     }
//   }
// }
// </script>

// <style >
// </style>
