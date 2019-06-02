<template>
  <ValidationObserver ref="obs" tag="div">
    <div class="page-title py-4 text-center">
      <h4 class="mb-0">
        {{ $t("company.update_company_info") }}
      </h4>
    </div>
    <div class="bg-white ">
      <div class="container  pt-5">
        <v-text-field-with-validation
          v-model="Company.ja"
          rules="required"
          type="text"
          :label="$t('company.company_name')"
          :description="$t('company.company_name_description')"
          :name="$t('company.company_name')"
          :placeholder="$t('company.enter_company_name')"
        />
        <hr>

        <v-text-field-with-validation
          v-model="Company.staffNumber"
          rules="required|numeric"
          type="number"
          :label="$t('company.company_staff_amount')"
          :description="$t('company.company_staff_amount_description')"
          :name="$t('company.company_staff_amount')"
          :placeholder="$t('company.enter_company_staff_amount')"
        />
        <hr>

        <v-select-with-validation
          v-model="Company.businessType"
          rules="required"
          :options="businessTypeModalList"
          :label="$t('company.business_type')"
          :description="$t('company.business_type_description')"
          :name="$t('company.business_type')"
          :reduce="businessTypeModal => businessTypeModal.id"
          :option-label="$i18n.locale"
        />

        <hr>

        <div class="row ">
          <div class="col-md-6 ">
            <p class="mb-0 font-weight-700 text-uppercase">
              {{ $t("company.company_address") }}
            </p>
            <p class="mb-3">
              {{ $t("company.company_address_description") }}
            </p>
          </div>
          <div class="col-md-6 ">
            <div class="form-group mb-0">
              <v-select-with-validation
                v-model="Company.city"
                rules="required"
                :options="cityModalList"
                :label="$t('common.city')"
                :name="$t('common.city')"
                :isHalf="true"
                :option-label="$i18n.locale"
              />
              <div
                v-if="collectedDistrictModalList.length > 0"
                class="pt-3  position-relative"
              >
                <v-select-with-validation
                  v-model="Company.district"
                  rules="required"
                  :options="collectedDistrictModalList"
                  :label="$t('common.district')"
                  :name="$t('common.district')"
                  :isHalf="true"
                  :option-label="$i18n.locale"
                />
              </div>
              <div
                v-if="collectedWardModalList.length > 0"
                class="pt-3 position-relative"
              >
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
          v-model="Company.logo"
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
          v-model="Company.coverImage"
          rules="required"
          :label="$t('company.company_cover_image')"
          :description="$t('company.company_cover_image_description')"
          :name="$t('company.company_cover_image')"
          :placeholder="$t('company.upload_company_cover_image')"
          :unique="'company_cover_image'"
        />
        <hr>

        <v-editor-with-validation
          v-model="Company.introduction_ja"
          rules="required"
          :label="$t('company.company_introduction')"
          :description="$t('company.company_introduction_description')"
          :name="$t('company.company_introduction')"
        />
        <hr>
      </div>

      <div class="text-center pb-4">
        <button type="button" class="btn btn-primary my-4" @click="submit">
          {{ $t("company.update_company_info") }}
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

import {Company} from '~/modals'
import CityModal from '~/modals/city_modal'
import DistrictModal from '~/modals/district_modal'
import WardModal from '~/modals/ward_modal'

// import CompanyService from '~/services/company_service'

const City = namespace('city')
const District = namespace('district')
// const Ward = namespace('ward')
const BusinessType = namespace('businessType')
// const Company = namespace('company')
const UserInfo = namespace('userInfo')

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
  Company: Company = new Company();
  collectedDistrictModalList: DistrictModal[] = [];
  collectedWardModalList: WardModal[] = [];

  @City.State cityModalList;
  @District.State districtModalList;
  // @Ward.State wardModalList;
  @BusinessType.State businessTypeModalList;

  // @Company.Action createCompany;
  // @UserInfo.Action updateUserInfoCompanyID;
  // @UserInfo.Action getUserInfoByID;

  // @Company.State companyID;
  // @UserInfo.State userInfo;

  // @Company.Mutation SET_COMPANY_ID;

  @Watch('Company.city')
  onCompanyCityValueChanged(newVal: CityModal, oldVal: CityModal) {
    if (newVal !== oldVal) {
      this.collectedDistrictModalList = this.districtModalList.filter(
        (districtModal: DistrictModal) =>
          districtModal.cityID === (newVal as CityModal).id
      )
    }
  }

  @Watch('Company.district')
  onCompanyDistrictValueChanged(newVal: DistrictModal, oldVal: DistrictModal) {
    if (newVal !== oldVal) {
      this.collectedWardModalList = this.wardModalList.filter(
        (wardModal: WardModal) =>
          wardModal.districtID === (newVal as DistrictModal).id
      )
    }
  }

  mounted() {
    this.Company = new Company()
    // this.SET_COMPANY_ID(null)
  }
  async submit() {
    const result = await (this.$refs.obs as any).validate()
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
          name: 'companies-id',
          params: { id: this.companyID }
        })
      )
    }
  }
}
</script>

<style scoped></style>
