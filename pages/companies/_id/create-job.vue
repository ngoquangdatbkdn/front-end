<template>
  <div>
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
            v-model="job.levelID"
            rules="required"
            :options="levels"
            :label="$t('job.level')"
            :description="$t('job.level_description')"
            :name="$t('job.level')"
            :reduce="level => level.id"
            :option-label="$i18n.locale"
          />
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
            v-model="job.requiredEducation"
            rules="required"
            :label="$t('job.required_education')"
            :description="$t('job.required_education_description')"
            :name="$t('job.required_education')"
          />
          <hr>

          <v-editor-with-validation
            v-model="job.requiredExperience"
            rules="required"
            :label="$t('job.required_experience')"
            :description="$t('job.required_experience_description')"
            :name="$t('job.required_experience')"
          />
          <hr>

          <v-editor-with-validation
            v-model="job.requiredLanguage"
            rules="required"
            :label="$t('job.required_language')"
            :description="$t('job.required_language_description')"
            :name="$t('job.required_language')"
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
    <modal v-if="showModal">
      <span slot="title">{{modalLabel}}</span>
      <span slot="content">{{modalContent}}</span>
      <a slot="button1" type="primary" class="button" @click="onCloseModal">{{ "Close" }}</a>
    </modal>
  </div>
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
const Level = namespace("level");
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
      store.dispatch("contract/fetchList"),
      store.dispatch("level/fetchList")
    ]);
  },
  async asyncData({ $axios, params }) {
    let job = new Job();
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
  @Level.State levels;

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
    if (current == old) return;
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
    const validated = await (this.$refs.obs as any).validate();
    console.log("this.job " + JSON.stringify(this.job));
    if (validated) {
      try {
        const result = await this.$axios.post("api/jobs", {
          ...this.job,
          company_id: this.$route.params.id,
          level_id: this.job.levelID,
          city_id: this.job.cityID,
          district_id: this.job.districtID,
          cover_image: this.job.coverImage,
          contract_id: this.job.contractID,
          business_ids: this.job.businessIDs,
          min_salary: this.job.maxSalary,
          max_salary: this.job.minSalary,
          required_education: this.job.requiredEducation,
          required_experience: this.job.requiredExperience,
          required_language: this.job.requiredLanguage
        });
        console.log("result " + JSON.stringify(result));
        this.$router.push(
          (this as any).localePath({
            name: "jobs-id",
            params: { id: result["data"]["data"]["id"] }
          })
        );
      } catch (error) {
        this.showModal = true;
        this.modalLabel = "Error";
        var _error: string = "Unknown Error";

        if (error.response) {
          _error = error.response.data.code;
          console.log("error " + JSON.stringify(error.response.data));
        } else if (error.request) {
          // error = error.request;
        } else {
          // error = error.message;
        }
        const translatedError = this.$t(`error.${_error}`);
        this.modalContent = translatedError ? translatedError : _error;
      }
    }
  }
}
</script>

<style scoped></style>
