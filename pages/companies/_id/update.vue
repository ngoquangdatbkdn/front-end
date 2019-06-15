<template>
  <div>
    <ValidationObserver ref="obs" tag="div">
      <div class="page-title py-4 text-center">
        <h4 class="mb-0">{{ $t("company.update_company_info") }}</h4>
      </div>
      <div class="bg-white">
        <div class="container pt-5">
          <v-text-field-with-validation
            v-model="company.name"
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
                  v-for="(businessID, index) in company.businessIDs"
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
                      v-model="company.businessIDs[index]"
                      rules="required"
                      :options="showableBusinesses"
                      @onSelect="onSelectBusiness"
                      :label="$t('company.business_type')"
                      :description="$t('company.business_type_description')"
                      :name="$t('company.business_type')"
                      :reduce="business=>business.id"
                      :option-label="$i18n.locale"
                      :isHalf="true"
                    />
                  </div>
                </card>
                <button
                  v-if="showableBusinesses.length > 0 
                && company.businessIDs.length < changableBusinesses.length"
                  type="button"
                  class="btn btn-primary my-4 align-self-center"
                  @click="onAddBusiness()"
                >{{ $t("company.add_an_business") }}</button>
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
                  v-model="company.cityID"
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
                    v-model="company.districtID"
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
                    v-model="company.address"
                    rules="required"
                    type="text"
                    :label="$t('company.company_address')"
                    :description="$t('company.company_address_description')"
                    :name="$t('company.company_address')"
                    :placeholder="$t('company.enter_company_address')"
                    :isHalf="true"
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
import { classToPlain } from "class-transformer";

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
    await Promise.all([
      store.dispatch("district/fetchList"),
      store.dispatch("city/fetchList"),
      store.dispatch("business/fetchList")
    ]);
  },
  async asyncData({ $axios, params }) {
    const companyID: string = params.id;
    let company = new Company();
    let result: Object = await $axios.$get(`/api/companies/${params.id}`);
    company = plainToClass(Company, result["data"]);

    return {
      company
    };
  },
  head() {
    return {
      title: this.$t("company.update_company_info")
    };
  }
})
export default class CreateCompany extends Vue {
  company: Company = new Company();
  filteredDistricts: Common[] = [];
  changableBusinesses: Common[] = [];

  showModal: boolean = false;
  modalLabel: string = "";
  modalContent: string = "";

  @City.State cities;
  @District.State districts;
  @Business.State businesses;

  onCloseModal() {
    this.showModal = false;
  }
  Ï;
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

  get showableBusinesses() {
    return this.changableBusinesses.filter(
      business => (business as any).isShow
    );
  }

  onAddBusiness() {
    (this as any).company.businessIDs.push(null);
    this.company = {
      ...this.company,
      businessIDs: this.company.businessIDs
    };
  }
  onSelectBusiness(businessID: String) {
    // this.changableBusinesses = this.changableBusinesses.map(business => ({
    //   ...business,
    //   isShow: business.id === businessID ? false : (business as any).isShow
    // }));
  }
  onRemoveBusiness(index: string) {
    // let index = 0;
    // const IDs = (this as any).company.businessIDs;
    // for(let ID in IDs){
    //   if(ID != businessID) break;
    //   index++
    // }
    console.log("index " + index.toString());
    (this as any).company.businessIDs.splice(index, 1);
    this.company = {
      ...this.company,
      businessIDs: this.company.businessIDs
    };
    this.changableBusinesses = this.changableBusinesses.map(business => ({
      ...business,
      isShow: business.id === index ? true : (business as any).isShow
    }));
  }

  @Watch("company.cityID", { immediate: true, deep: true })
  onSelectCity(current: string, old: string) {
    if (current == old) return;
    if (current == null && old == undefined) return;
    this.company.districtID = null;
    if (!(this.company as any).cityID) return;
    const locale: string = this.$i18n.locale;
    const filtedList = this.districts.filter(
      (district: Common) => (district as any).city.id == this.company.cityID
    );
    filtedList.sort((a: Common, b: Common) => (a[locale] > b[locale] ? 1 : -1));
    this.filteredDistricts = filtedList;
    console.log("filtedList " + JSON.stringify(filtedList));
  }
  @Watch("company.districtID", { immediate: true, deep: true })
  onSelectDistrict(current: string, old: string) {
    console.log("current " + current);
    console.log("old " + old);
  }

  mounted() {
    this.changableBusinesses = this.businesses.map(business => ({
      ...business,
      isShow: true
    }));
    console.log("this.company " + JSON.stringify(this.company));
    // this.company.cityID = "1179d94d-78a1-4975-a7c6-464b58f5a6b6";
  }
  async submit() {
    const ok = await (this.$refs.obs as any).validate();
    console.log("this.company " + JSON.stringify(this.company));
    if (ok) {
      try {
        // this.company.businesses = (this.company as any).businesses.map(
        //   business => business.instance
        // );
        // (this.company as any).country = (this.company.city as any).country;
        (this.company as any).cover_image = this.company.coverImage;
        console.log("company " + JSON.stringify(classToPlain(this.company)));
        const result = await this.$axios.patch("api/companies", {
          ...this.company,
          city_id: this.company.cityID,
          business_ids: this.company.businessIDs,
          district_id: this.company.districtID
        });
        console.log("result " + JSON.stringify(result));
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
