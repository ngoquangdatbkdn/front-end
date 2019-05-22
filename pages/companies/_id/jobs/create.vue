<template>
  <ValidationObserver ref="obs" tag="div">
    <div class="page-title py-4 text-center">
      <h4 class="mb-0">
        {{ $t("job.update_job_info") }}
      </h4>
    </div>
    <div class="bg-white ">
      <div class="container  pt-5">
        <v-text-field-with-validation
          v-model="jobModal.name_ja"
          rules="required"
          type="text"
          :label="$t('job.job_name')"
          :description="$t('job.job_name_description')"
          :name="$t('job.job_name')"
          :placeholder="$t('job.enter_job_name')"
        />
        <hr>

        <div class="row ">
          <div class="col-md-6 ">
            <p class="mb-0 font-weight-700 text-uppercase">
              {{ $t("job.salary_range") }}
            </p>
            <p class="mb-3">
              {{ $t("job.salary_range_description") }}
            </p>
          </div>
          <div class="col-md-6 ">
            <div class="form-group mb-0">
              <v-text-field-with-validation
                v-model="jobModal.minSalary"
                rules="required|numeric"
                type="number"
                :label="$t('job.min_salary')"
                :name="$t('job.min_salary')"
                :placeholder="$t('job.enter_min_salary')"
                :isHalf="true"
              />
              <div class="pt-3  position-relative">
                <v-text-field-with-validation
                  v-model="jobModal.maxSalary"
                  rules="required|numeric"
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
        <hr>

        <v-select-with-validation
          v-model="jobModal.contractType"
          rules="required"
          :options="contractTypeModalList"
          :label="$t('job.contract_type')"
          :description="$t('job.contract_type_description')"
          :name="$t('job.contract_type')"
          :reduce="businessTypeModal => businessTypeModal.id"
          :option-label="$i18n.locale"
        />

        <hr>

        <div class="row ">
          <div class="col-md-6 ">
            <p class="mb-0 font-weight-700 text-uppercase">
              {{ $t("job.workplace") }}
            </p>
            <p class="mb-3">
              {{ $t("job.workplace_description") }}
            </p>
          </div>
          <div class="col-md-6 ">
            <div class="form-group mb-0">
              <v-select-with-validation
                v-model="jobModal.city"
                rules="required"
                :options="cityModalList"
                :label="$t('common.city')"
                :name="$t('common.city')"
                :isHalf="true"
                :option-label="$i18n.locale"
              />
              <div
                class="pt-3  position-relative"
              >
                <v-select-with-validation
                  v-model="jobModal.district"
                  rules="required"
                  :options="collectedDistrictModalList"
                  :label="$t('common.district')"
                  :name="$t('common.district')"
                  :isHalf="true"
                  :option-label="$i18n.locale"
                />
              </div>
            </div>
          </div>
        </div>
        <hr>

        <v-editor-with-validation
          v-model="jobModal.description_ja"
          rules="required"
          :label="$t('job.job_detail')"
          :description="$t('job.job_detail_description')"
          :name="$t('job.job_detail')"
        />
        <hr>

        <v-editor-with-validation
          v-model="jobModal.benefit_ja"
          rules="required"
          :label="$t('job.job_benefit')"
          :description="$t('job.job_benefit_description')"
          :name="$t('job.job_benefit')"
        />
        <hr>

        <v-editor-with-validation
          v-model="jobModal.requiredSkill_ja"
          rules="required"
          :label="$t('job.skill_requirement')"
          :description="$t('job.skill_requirement_description')"
          :name="$t('job.skill_requirement')"
        />
        <hr>

        <v-editor-with-validation
          v-model="jobModal.requiredLanguage_ja"
          rules="required"
          :label="$t('job.language_requirement')"
          :description="$t('job.language_requirement_description')"
          :name="$t('job.language_requirement')"
        />
        <hr>

        <v-file-upload-with-validation
          :key="'job_cover_image'"
          v-model="jobModal.coverImage"
          rules="required"
          :label="$t('job.job_cover_image')"
          :description="$t('job.job_cover_image_description')"
          :name="$t('job.job_cover_image')"
          :placeholder="$t('job.upload_job_cover_image')"
          :unique="'job_cover_image'"
        />
        <hr>
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
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import VTextFieldWithValidation from '~/components/forms/VTextFieldWithValidation.vue'
import VSelectWithValidation from '~/components/forms/VSelectWithValidation.vue'
import VFileUploadWithValidation from '~/components/forms/VFileUploadWithValidation.vue'
import VEditorWithValidation from '~/components/forms/VEditorWithValidation.vue'

import CityModal from '~/modals/city_modal'
import DistrictModal from '~/modals/district_modal'
import WardModal from '~/modals/ward_modal'
import JobModal from '~/modals/job_modal'

const Job = namespace('job')
const City = namespace('city')
const District = namespace('district')
const Ward = namespace('ward')
const ContractType = namespace('contractType')

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
export default class JobCreateJob extends Vue {
  jobModal: JobModal = new JobModal();
  collectedDistrictModalList: DistrictModal[] = [];
  collectedWardModalList: WardModal[] = [];

  @Job.State jobID;
  @Job.Action createJob;

  @City.State cityModalList;
  @District.State districtModalList;
  @Ward.State wardModalList;
  @ContractType.State contractTypeModalList;

  @Watch('jobModal.city')
  onJobCityValueChanged(newVal: CityModal, oldVal: CityModal) {
    if (newVal !== oldVal) {
      this.collectedDistrictModalList = this.districtModalList.filter(
        (districtModal: DistrictModal) =>
          districtModal.cityID === (newVal as CityModal).id
      )
    }
  }

  @Watch('jobModal.district')
  onJobDistrictValueChanged(newVal: DistrictModal, oldVal: DistrictModal) {
    if (newVal !== oldVal) {
      this.collectedWardModalList = this.wardModalList.filter(
        (wardModal: WardModal) =>
          wardModal.districtID === (newVal as DistrictModal).id
      )
    }
  }

  async mounted() {}
  async submit() {
    const result = await (this.$refs.obs as any).validate()
    if (result) {
      this.jobModal.companyID = this.$router.currentRoute.params.id
      this.jobModal.name_vi = this.jobModal.name_ja
      this.jobModal.description_vi = this.jobModal.description_ja
      this.jobModal.requiredLanguage_vi = this.jobModal.requiredLanguage_ja
      this.jobModal.requiredSkill_vi = this.jobModal.requiredSkill_ja
      this.jobModal.benefit_vi = this.jobModal.benefit_ja
      // console.log(this.jobModal);
      // const id: string = await this.createJob(this.jobModal);
      await this.createJob(this.jobModal)
      this.$router.push(
        (this as any).localePath({
          name: 'companies-id-jobs-jobID',
          params: { id: this.jobModal.companyID, jobID: this.jobID }
        })
      )
      // console.log("id");
      // console.log(id);
    }
  }
}
</script>

<style scoped></style>
