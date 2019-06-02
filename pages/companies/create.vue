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

        <v-select-with-validation
          v-model="company.businessType.id"
          rules="required"
          :options="businessTypes"
          :label="$t('company.business_type')"
          :description="$t('company.business_type_description')"
          :name="$t('company.business_type')"
          :reduce="businessTypeModal => businessTypeModal.id"
          :option-label="$i18n.locale"
        />

        <hr>

        <div class="row">
          <div class="col-md-6">
            <p class="mb-0 font-weight-700 text-uppercase">{{ $t("company.company_address") }}</p>
            <p class="mb-3">{{ $t("company.company_address_description") }}</p>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-0">
              <v-select-with-validation
                v-model="company.city.id"
                rules="required"
                :options="cities"
                :label="$t('common.city')"
                :name="$t('common.city')"
                :isHalf="true"
                :option-label="$i18n.locale"
              />
              <div class="pt-3 position-relative">
                <v-select-with-validation
                  v-model="company.district.id"
                  rules="required"
                  :options="collectedCommonList"
                  :label="$t('common.district')"
                  :name="$t('common.district')"
                  :isHalf="true"
                  :option-label="$i18n.locale"
                />
              </div>
              <div class="pt-3 position-relative">
                <v-select-with-validation
                  v-model="Company.ward"
                  rules="required"
                  :options="collectedWardModalList"
                  :label="$t('common.ward')"
                  :name="$t('common.ward')"
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


const City = namespace("city");
const District = namespace("district");
const BusinessType = namespace("businessType");
const UserInfo = namespace("userInfo");

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
export default class CreateCompany extends Vue {
  company: Company = new Company();
  // collectedCommonList: Common[] = [];


  @City.State cities;
  @District.State districts;
  @BusinessType.State businessTypes;

  // @Watch("Company.city")
  // onCompanyCityValueChanged(newVal: Common, oldVal: Common) {
  //   if (newVal !== oldVal) {
  //     this.collectedCommonList = this.districts.filter(
  //       (district: Common) =>
  //         district.cityID === (newVal as Common).id
  //     );
  //   }
  // }

  @Watch("Company.district")
  onCompanyDistrictValueChanged(newVal: Common, oldVal: Common) {
    if (newVal !== oldVal) {
      // this.collectedWardModalList = this.wardModalList.filter(
      //   (wardModal: WardModal) =>
      //     wardModal.districtID === (newVal as Common).id
      // )
    }
  }

  mounted() {
    this.company = new Company();
    // this.SET_COMPANY_ID(null)
  }
  async submit() {
    const result = await (this.$refs.obs as any).validate();
    // console.log("result " + result.toString());
    if (result) {
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
      this.$router.push(
        (this as any).localePath({
          name: "companies-id",
          params: { id: this.company.id }
        })
      );
    }
  }
}
</script>

<style scoped></style>
