<template>
  <div class="">
    fdafadfd
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State, Action, Getter, namespace } from 'vuex-class'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import VTextFieldWithValidation from '~/components/forms/VTextFieldWithValidation.vue'
import VSelectWithValidation from '~/components/forms/VSelectWithValidation.vue'
import VFileUploadWithValidation from '~/components/forms/VFileUploadWithValidation.vue'
import VEditorWithValidation from '~/components/forms/VEditorWithValidation.vue'

import { CompanyState } from '~/store/company/state'
import { CityState } from '~/store/city/state'
import JobModal from '~/modals/job_modal'
// import CityModal from "~/modals/city_modal";

import { objectUrlToFile } from '~/utils/imageHelper'

// const namespace: string = "company";
// const Company = namespace("company");
const City = namespace('city')
const District = namespace('district')
const Ward = namespace('ward')
const ContractType = namespace('contractType')
const Job = namespace('job')

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    VTextFieldWithValidation,
    VSelectWithValidation,
    VFileUploadWithValidation,
    VEditorWithValidation
  }
})
export default class CreateJob extends Vue {
    jobModal: JobModal = new JobModal();
  firstFileList: any[] = [];
  secondFileList: any[] = [];

  @City.State cityModalList;
  @District.State districtModalList;
  @Ward.State wardModalList;
  @ContractType.State contractTypeModalList;

  @Job.Action create;

  // @Watch("firstFileList")
  // onFirstFileListValueChanged(newVal: Array<File>, oldVal: Array<File>) {
  //   if (newVal !== oldVal) {
  //     if (newVal[0]) {
  //       this.companyModal.logo = (newVal[0] as any).url;
  //       // objectUrlToFile((newVal[0] as any).url).then((file: File) => {
  //       //   this.secondFileList = [];
  //       //   this.secondFileList.push(file);
  //       // });
  //     } else {
  //       this.companyModal.logo = undefined;
  //     }
  //   }
  // }
  //
  // @Watch("secondFileList")
  // onSecondFileListValueChanged(newVal: Array<File>, oldVal: Array<File>) {
  //   if (newVal !== oldVal) {
  //     if (newVal[0]) {
  //       this.companyModal.coverImage = (newVal[0] as any).url;
  //     } else {
  //       this.companyModal.coverImage = undefined;
  //     }
  //   }
  // }

  mounted() {}
  async submit() {
    const result = await (this.$refs.obs as any).validate()
    console.log('result ' + result.toString())
    if (result) {
      this.jobModal.shouldShow = false
      this.create(this.jobModal)
      this.$router.push(
        (this as any).localePath({
          name: 'companies-id',
          params: { id: 'faef' }
        })
      )
    }
  }
}
</script>

<style scoped></style>
