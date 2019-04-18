<template>
  <ValidationObserver ref="obs" tag="div">
    <div class="page-title py-4 text-center">
      <h4 class="mb-0">{{ $t("job.update_job_info") }}</h4>
    </div>
    <div class="bg-white ">
      <div class="container  pt-5">
        <v-text-field-with-validation
          rules="required"
          v-model="jobModal.name"
          type="text"
          :label="$t('job.job_name')"
          :description="$t('job.job_name_description')"
          :name="$t('job.job_name')"
          :placeholder="$t('job.enter_job_name')"
        />
        <hr />

        <v-select-with-validation
          rules="required"
          v-model="jobModal.contractType"
          :options="contractTypeModalList"
          :label="$t('job.contract_type')"
          :description="$t('job.contract_type_description')"
          :name="$t('job.contract_type')"
          optionLabel="name"
        />
        <hr />

        <div class="row ">
          <div class="col-md-6 ">
            <p class="mb-0 font-weight-700 text-uppercase">
              {{ $t("job.salary_range") }}
            </p>
            <p class="mb-3">{{ $t("job.salary_range_description") }}</p>
          </div>
          <div class="col-md-6 ">
            <div class="form-group mb-0">
              <v-text-field-with-validation
                rules="required|numeric"
                v-model="jobModal.minSalary"
                type="number"
                :label="$t('job.min_salary')"
                :name="$t('job.min_salary')"
                :placeholder="$t('job.enter_min_salary')"
                :isHalf="true"
              />
              <div class="mt-3">
                <v-text-field-with-validation
                  rules="required|numeric"
                  v-model="jobModal.maxSalary"
                  type="number"
                  :label="$t('job.max_salary')"
                  :name="$t('job.max_salary')"
                  :placeholder="$t('job.enter_max_salary')"
                  :isHalf="true"
                />
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div class="row ">
          <div class="col-md-6 ">
            <p class="mb-0 font-weight-700 text-uppercase">
              {{ $t("job.workplace") }}
            </p>
            <p class="mb-3">{{ $t("job.workplace_description") }}</p>
          </div>
          <div class="col-md-6 ">
            <div class="form-group mb-0">
              <v-select-with-validation
                rules="required"
                v-model="jobModal.city"
                :options="cityModalList"
                :label="$t('common.city')"
                :name="$t('common.city')"
                :isHalf="true"
                optionLabel="name"
              />
              <div class="pt-3  position-relative">
                <v-select-with-validation
                  rules="required"
                  v-model="jobModal.district"
                  :options="districtModalList"
                  :label="$t('common.district')"
                  :name="$t('common.district')"
                  :isHalf="true"
                  optionLabel="name"
                />
              </div>
              <div class="pt-3 position-relative">
                <v-select-with-validation
                  rules="required"
                  v-model="jobModal.ward"
                  :options="wardModalList"
                  :label="$t('common.ward')"
                  :name="$t('common.ward')"
                  :isHalf="true"
                  optionLabel="name"
                />
              </div>
            </div>
          </div>
        </div>
        <hr />

        <v-editor-with-validation
          rules="required"
          v-model="jobModal.detail"
          :label="$t('job.job_detail')"
          :description="$t('job.job_detail_description')"
          :name="$t('job.job_detail')"
        />
        <hr />

        <v-editor-with-validation
          rules="required"
          v-model="jobModal.requiredSkill"
          :label="$t('job.skill_requirement')"
          :description="$t('job.skill_requirement_description')"
          :name="$t('job.skill_requirement')"
        />
        <hr />

        <v-editor-with-validation
          rules="required"
          v-model="jobModal.requiredLanguage"
          :label="$t('job.language_requirement')"
          :description="$t('job.language_requirement_description')"
          :name="$t('job.language_requirement')"
        />
        <hr />

        <v-editor-with-validation
          rules="required"
          v-model="jobModal.benefit"
          :label="$t('job.job_benefit')"
          :description="$t('job.job_benefit_description')"
          :name="$t('job.job_benefit')"
        />
        <hr />
      </div>

      <div class="text-center pb-4">
        <button type="button" class="btn btn-primary my-4" @click="submit">
          {{ $t("job.update_job_info") }}
        </button>
      </div>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { State, Action, Getter, namespace } from "vuex-class";
import { ValidationObserver, ValidationProvider } from "vee-validate";

import VTextFieldWithValidation from "~/components/forms/VTextFieldWithValidation.vue";
import VSelectWithValidation from "~/components/forms/VSelectWithValidation.vue";
import VFileUploadWithValidation from "~/components/forms/VFileUploadWithValidation.vue";
import VEditorWithValidation from "~/components/forms/VEditorWithValidation.vue";

import { CompanyState } from "~/store/company/state";
import { CityState } from "~/store/city/state";
import JobModal from "~/modals/job_modal";
// import CityModal from "~/modals/city_modal";

import { objectUrlToFile } from "~/utils/imageHelper";

// const namespace: string = "company";
// const Company = namespace("company");
const City = namespace("city");
const District = namespace("district");
const Ward = namespace("ward");
const ContractType = namespace("contractType");
const Job = namespace("job");

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
    const result = await (this.$refs.obs as any).validate();
    console.log("result " + result.toString());
    if (result) {
      this.create(this.jobModal);
      this.$router.push(
        (this as any).localePath({
          name: "companies-id",
          params: { id: "faef" }
        })
      );
    }
  }
}
</script>

<style scoped></style>
