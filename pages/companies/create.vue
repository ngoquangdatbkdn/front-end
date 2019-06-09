<template>
  <ValidationObserver ref="obs" tag="div">
    <div class="page-title py-4 text-center">
      <h4 class="mb-0">{{ $t("company.update_company_info") }}</h4>
    </div>
    <div class="bg-white">
      <div class="container pt-5">
        <v-text-field-with-validation
          v-model="company.ja"
          rules="required"
          type="text"
          :label="$t('company.company_name')"
          :description="$t('company.company_name_description')"
          :name="$t('company.company_name')"
          :placeholder="$t('company.enter_company_name')"
        />
        <hr>

        <v-text-field-with-validation
          v-model="company.scale"
          rules="required|numeric"
          type="number"
          :label="$t('company.company_staff_amount')"
          :description="$t('company.company_staff_amount_description')"
          :name="$t('company.company_staff_amount')"
          :placeholder="$t('company.enter_company_staff_amount')"
        />
        <hr>

        <div class="container pt-5">
          <div class="row">
            <div class="col-md-6">
              <p class="mb-0 font-weight-700 text-uppercase">{{ $t('company.business_type')}}</p>
              <p class="mb-3">{{ $t('company.business_type_description')}}</p>
            </div>
            <div class="col-md-6 d-flex flex-column">
              <card
                v-for="(business, index) in company.businesses"
                :key="'business' + index"
                type="secondary"
                shadow
                :class="
                `${
                  index > 0 ? 'mt-3' : ''
                } bg-white  form-group mb-0 d-flex flex-column`
              "
              >
                <button
                  v-if="index > 0"
                  type="button"
                  data-dismiss="alert"
                  aria-label="Close"
                  class="close"
                  @click="onRemoveBusiness(index)"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <div :class="`${index > 0 ? 'mt-3' : ''}  position-relative`">
                  <v-select-with-validation
                    v-model="business.id"
                    rules="required"
                    :options="showableBusinesses"
                    @onSelect="onSelectBusiness"
                    :label="$t('company.business_type')"
                    :description="$t('company.business_type_description')"
                    :name="$t('company.business_type')"
                    :reduce="business=>{console.log(JSON.stringify(business)); return business.id;}"
                    :option-label="$i18n.locale"
                    :isHalf="true"
                  />
                </div>
              </card>
              <button
                v-if="showableBusinesses.length > 0 
                && company.businesses.length < changableBusinesses.length"
                type="button"
                class="btn btn-primary my-4 align-self-center"
                @click="onAddBusiness()"
              >{{ $t("candidate.add_an_education") }}</button>
            </div>
          </div>
        </div>

        <hr>

        <div class="row">
          <div class="col-md-6">
            <p class="mb-0 font-weight-700 text-uppercase">{{ $t("company.company_address") }}</p>
            <p class="mb-3">{{ $t("company.company_address_description") }}</p>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-0">
              <v-select-with-validation
                v-model="company.city"
                rules="required"
                :options="filteredCities"
                :label="$t('common.city')"
                :name="$t('common.city')"
                :isHalf="true"
                :option-label="$i18n.locale"
              />
              <div class="pt-3 position-relative">
                <v-select-with-validation
                  v-model="company.district"
                  rules="required"
                  :options="filteredDistricts"
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

        <v-file-upload-with-validation
          :key="'company_logo'"
          v-model="company.logo"
          rules="required"
          :label="$t('company.company_logo')"
          :description="$t('company.company_logo_description')"
          :name="$t('company.company_logo')"
          :placeholder="$t('company.upload_company_logo')"
          :unique="'company_logo'"
        />
        <hr>

        <v-file-upload-with-validation
          :key="'company_cover_image'"
          v-model="company.coverImage"
          rules="required"
          :label="$t('company.company_cover_image')"
          :description="$t('company.company_cover_image_description')"
          :name="$t('company.company_cover_image')"
          :placeholder="$t('company.upload_company_cover_image')"
          :unique="'company_cover_image'"
        />
        <hr>

        <v-editor-with-validation
          v-model="company.introduction"
          rules="required"
          :label="$t('company.company_introduction')"
          :description="$t('company.company_introduction_description')"
          :name="$t('company.company_introduction')"
        />
        <hr>
      </div>

      <div class="text-center pb-4">
        <button
          type="button"
          class="btn btn-primary my-4"
          @click="submit"
        >{{ $t("company.update_company_info") }}</button>
      </div>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { ValidationObserver, ValidationProvider } from "vee-validate";

import VTextFieldWithValidation from "~/components/forms/VTextFieldWithValidation.vue";
import VSelectWithValidation from "~/components/forms/VSelectWithValidation.vue";
import VFileUploadWithValidation from "~/components/forms/VFileUploadWithValidation.vue";
import VEditorWithValidation from "~/components/forms/VEditorWithValidation.vue";

import { Company, Common } from "~/modals";
import { fips } from "crypto";

const City = namespace("city");
const District = namespace("district");
const Business = namespace("business");
const UserInfo = namespace("userInfo");

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    VTextFieldWithValidation,
    VSelectWithValidation,
    VFileUploadWithValidation,
    VEditorWithValidation
    // VArrayInput
  },
  async fetch({ store, params }) {
    if (store.state.district.districts.length == 0) {
      await store.dispatch("district/fetchList");
    }
    if (store.state.city.cities.length == 0) {
      await store.dispatch("city/fetchList");
    }
    if (store.state.business.businesses.length == 0) {
      await store.dispatch("business/fetchList");
    }
  },
  async asyncData({ $axios }) {
    const company = new Company();
    company.name = "fdafda";
    company.city = new Common();
    company.district = new Common();
    company.businesses = [];
    return {
      company
    };
  }
})
export default class CreateCompany extends Vue {
  company: Company = new Company();
  filteredDistricts: Common[] = [];
  changableBusinesses: Common[] = [];

  @City.State cities;
  @District.State districts;
  @Business.State businesses;

  get filteredCities() {
    const locale: string = this.$i18n.locale;
    var country;
    if (locale == "ja") {
      country = "Nhật Bản";
    } else if (locale == "vi") {
      country = "Việt Nam";
    }
    const filtedList = this.cities.filter(
      (city: Common) => (city as any).country.vi == country
    );
    filtedList.sort((a: Common, b: Common) => (a[locale] > b[locale] ? 1 : -1));
    return filtedList;
  }

  get showableBusinesses() {
    return this.changableBusinesses.filter(
      business => (business as any).isShow
    );
  }

  onAddBusiness() {
    (this as any).company.businesses.push(new Common());
    this.company = {
      ...this.company,
      businesses: this.company.businesses
    };
  }
  onSelectBusiness(_business: Common) {
    this.changableBusinesses = this.changableBusinesses.map(business => ({
      ...business,
      isShow: business.id === _business.id ? false : (business as any).isShow
    }));
  }
  onRemoveBusiness(index: string) {
    (this as any).company.businesses.splice(index, 1);
    this.company = {
      ...this.company,
      businesses: this.company.businesses
    };
    this.changableBusinesses = this.changableBusinesses.map(business => ({
      ...business,
      isShow: business.id === index ? true : (business as any).isShow
    }));
  }

  @Watch("company.city", { immediate: true, deep: true })
  onSelectCity(current: Common, old: Common) {
    const locale: string = this.$i18n.locale;
    const filtedList = this.districts.filter(
      (district: Common) =>
        (district as any).city.id == (this.company as any).city.id
    );
    filtedList.sort((a: Common, b: Common) => (a[locale] > b[locale] ? 1 : -1));
    this.filteredDistricts = filtedList;
    this.company.district = new Common();
  }

  mounted() {
    this.changableBusinesses = this.businesses.map(business => ({
      ...business,
      isShow: true
    }));
    (this as any).company.businesses.push(new Common());
  }
  async submit() {
    const data = await (this.$refs.obs as any).validate();
    console.log("company " + JSON.stringify(this.company));
    // console.log("result " + result.toString());
    if (data) {
      // this.Company.shouldShow = false
      // this.Company.vi = this.Company.ja
      // this.Company.introduction_vi = this.Company.introduction_ja
      // await this.createCompany(this.Company)
      // console.log("this.userInfo");
      // console.log(this.userInfo);
      // await this.updateUserInfoCompanyID({
      //   userID: this.userInfo.id,
      //   companyID: this.companyID
      // })
      // await this.getUserInfoByID(this.userInfo.id)
      try {
        const result = await this.$axios.post("api/companies", data);
        console.log("result " + JSON.stringify(result));
        //    this.$router.push(
        // (this as any).localePath({
        //   name: "companies-id",
        //   params: { id: this.company.id }
        // })
      } catch (error) {
        // this.error = e.message;
        if (error.response) {
          // error = error.response.data.data.code;
        } else if (error.request) {
          // error = error.request;
        } else {
          // error = error.message;
        }
      }
    }
  }
}
</script>

<style scoped></style>
