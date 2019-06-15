<template>
  <ValidationObserver ref="obs" tag="div">
    <div class="page-title py-4 text-center">
      <h4 class="mb-0">{{ $t("job.update_job_info") }}</h4>
    </div>
    <div class="bg-white">
      <div class="container pt-5">
        <v-text-field-with-validation
          v-model="job.name"
          rules="required"
          type="text"
          :label="$t('job.job_name')"
          :description="$t('job.job_name_description')"
          :name="$t('job.job_name')"
          :placeholder="$t('job.enter_job_name')"
        />
        <hr>

        <div class="row">
          <div class="col-md-6">
            <p class="mb-0 font-weight-700 text-uppercase">{{ $t("job.salary_range") }}</p>
            <p class="mb-3">{{ $t("job.salary_range_description") }}</p>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-0">
              <v-text-field-with-validation
                v-model="job.minSalary"
                rules="required|numeric"
                type="number"
                :label="$t('job.min_salary')"
                :name="$t('job.min_salary')"
                :placeholder="$t('job.enter_min_salary')"
                :isHalf="true"
              />
              <div class="pt-3 position-relative">
                <v-text-field-with-validation
                  v-model="job.maxSalary"
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
          v-model="job.contractID"
          rules="required"
          :options="contracts"
          :label="$t('job.contract_type')"
          :description="$t('job.contract_type_description')"
          :name="$t('job.contract_type')"
          :reduce="contract => contract.id"
          :option-label="$i18n.locale"
        />

        <hr>

        <div class="row">
          <div class="col-md-6">
            <p class="mb-0 font-weight-700 text-uppercase">{{ $t("job.workplace") }}</p>
            <p class="mb-3">{{ $t("job.workplace_description") }}</p>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-0">
              <v-select-with-validation
                  v-model="job.cityID"
                  rules="required"
                  :options="filteredCities"
                  :label="$t('common.city')"
                  :name="$t('common.city')"
                  :isHalf="true"
                  :option-label="$i18n.locale"
                  :reduce="city=> city.id"
                />
                <div class="pt-3 position-relative">
                  <v-select-with-validation
                    v-model="job.districtID"
                    rules="required"
                    :options="filteredDistricts"
                    :label="$t('common.district')"
                    :name="$t('common.district')"
                    :isHalf="true"
                    :option-label="$i18n.locale"
                    :reduce="district=> district.id"
                  />
                </div>
                <div class="pt-3 position-relative">
                  <v-text-field-with-validation
                    v-model="job.address"
                    rules="required"
                    type="text"
                    :label="$t('job.job_address')"
                    :description="$t('job.job_address_description')"
                    :name="$t('job.job_address')"
                    :placeholder="$t('job.enter_job_address')"
                    :isHalf="true"
                  />
                </div>
            </div>
          </div>
        </div>
        <hr>

        <v-editor-with-validation
          v-model="job.desc"
          rules="required"
          :label="$t('job.job_detail')"
          :description="$t('job.job_detail_description')"
          :name="$t('job.job_detail')"
        />
        <hr>

        <v-editor-with-validation
          v-model="job.benefits"
          rules="required"
          :label="$t('job.job_benefit')"
          :description="$t('job.job_benefit_description')"
          :name="$t('job.job_benefit')"
        />
        <hr>

        <v-editor-with-validation
          v-model="job.required_education"
          rules="required"
          :label="$t('job.skill_requirement')"
          :description="$t('job.skill_requirement_description')"
          :name="$t('job.skill_requirement')"
        />
        <hr>

        <v-editor-with-validation
          v-model="job.required_experience"
          rules="required"
          :label="$t('job.language_requirement')"
          :description="$t('job.language_requirement_description')"
          :name="$t('job.language_requirement')"
        />
        <hr>
        
        <v-editor-with-validation
          v-model="job.required_language"
          rules="required"
          :label="$t('job.language_requirement')"
          :description="$t('job.language_requirement_description')"
          :name="$t('job.language_requirement')"
        />
        <hr>

        <v-file-upload-with-validation
          :key="'job_cover_image'"
          v-model="job.coverImage"
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
        <button
          type="button"
          class="btn btn-primary my-4"
          @click="submit"
        >{{ $t("job.update_job_info") }}</button>
      </div>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { plainToClass } from "class-transformer";
import { ValidationObserver, ValidationProvider } from "vee-validate";

import VTextFieldWithValidation from "~/components/forms/VTextFieldWithValidation.vue";
import VSelectWithValidation from "~/components/forms/VSelectWithValidation.vue";
import VFileUploadWithValidation from "~/components/forms/VFileUploadWithValidation.vue";
import VEditorWithValidation from "~/components/forms/VEditorWithValidation.vue";
import { Job, Company, Common } from "~/modals";

const City = namespace("city");
const District = namespace("district");
const Business = namespace("business");
const Contract = namespace("contract");
const UserInfo = namespace("userInfo");

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    VTextFieldWithValidation,
    VSelectWithValidation,
    VFileUploadWithValidation,
    VEditorWithValidation
  },
  async fetch({ store, params }) {
    await Promise.all([
      store.dispatch("district/fetchList"),
      store.dispatch("city/fetchList"),
      store.dispatch("business/fetchList"),
      store.dispatch("contract/fetchList")
    ]);
  },
  async asyncData({ $axios, params }) {
    let job = new Job();
    job.companyID = params.id;
    return {
      job
    };
  },
  head() {
    return {
      title: this.$t("job.create_job_info")
    };
  }
})
export default class JobCreateJob extends Vue {
  // company: Company = new Company();
  filteredDistricts: Common[] = [];
  changableBusinesses: Common[] = [];

  showModal: boolean = false;
  modalLabel: string = "";
  modalContent: string = "";

  @City.State cities;
  @District.State districts;
  @Business.State businesses;
  @Contract.State contracts;

  onCloseModal() {
    this.showModal = false;
  }

  get filteredCities() {
    const locale: string = this.$i18n.locale;
    var countryCode;
    if (locale == "ja") {
      countryCode = "jp";
    } else if (locale == "vi") {
      countryCode = "vn";
    }
    const filtedList = this.cities.filter(
      (city: Common) => (city as any).country_code == countryCode
    );
    filtedList.sort((a: Common, b: Common) =>
      a[countryCode] > b[countryCode] ? 1 : -1
    );
    return filtedList;
  }

@Watch("job.cityID", { immediate: true, deep: true })
  onSelectCity(current: string, old: string) {
    if(current == old) return
    this.job.districtID = null;
    if (!(this.job as any).cityID) return;
    const locale: string = this.$i18n.locale;
    const filtedList = this.districts.filter(
      (district: Common) => (district as any).city.id == this.job.cityID
    );
    filtedList.sort((a: Common, b: Common) => (a[locale] > b[locale] ? 1 : -1));
    this.filteredDistricts = filtedList;
    console.log("filtedList " + JSON.stringify(filtedList));
  }

  async mounted() {
    console.log("this.contracts " + JSON.stringify(this.contracts));
  }
  async submit() {
    const result = await (this.$refs.obs as any).validate();
    if (result) {
      // this.job.companyID = this.$router.currentRoute.params.id
      // this.job.vi = this.job.ja
      // this.job.description_vi = this.job.description_ja
      // this.job.requiredLanguage_vi = this.job.requiredLanguage_ja
      // this.job.requiredSkill_vi = this.job.requiredSkill_ja
      // this.job.benefit_vi = this.job.benefit_ja
      // console.log(this.job);
      // const id: string = await this.createJob(this.job);
      // await this.createJob(this.job)
      // this.$router.push(
      // (this as any).localePath({
      //   name: 'jobs-id',
      //   params: { id: this.id }
      // })
      // )
      // console.log("id");
      // console.log(id);
    }
  }
}
</script>

<style scoped></style>
