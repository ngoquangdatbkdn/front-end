<template>
  <ValidationObserver ref="obs" tag="div">
    <div class="page-title py-4 text-center">
      <h4 class="mb-0">{{ $t("company.update_company_info") }}</h4>
    </div>
    <div class="bg-white ">
      <div class="container  pt-5">
        <v-text-field-with-validation
          rules="required"
          v-model="companyModal.name"
          type="text"
          :label="$t('company.company_name')"
          :description="$t('company.company_name_description')"
          :name="$t('company.company_name')"
          :placeholder="$t('company.enter_company_name')"
        />
        <hr />

        <v-text-field-with-validation
          rules="required|numeric"
          v-model="companyModal.staffNumber"
          type="number"
          :label="$t('company.company_staff_amount')"
          :description="$t('company.company_staff_amount_description')"
          :name="$t('company.company_staff_amount')"
          :placeholder="$t('company.enter_company_staff_amount')"
        />
        <hr />

        <v-select-with-validation
          rules="required"
          v-model="companyModal.businessType"
          :options="businessTypeModalList"
          :label="$t('company.business_type')"
          :description="$t('company.business_type_description')"
          :name="$t('company.business_type')"
          :reduce="businessTypeModal => businessTypeModal.id"
          :optionLabel="$i18n.locale"
        />

        <hr />

        <div class="row ">
          <div class="col-md-6 ">
            <p class="mb-0 font-weight-700 text-uppercase">
              {{ $t("company.company_address") }}
            </p>
            <p class="mb-3">{{ $t("company.company_address_description") }}</p>
          </div>
          <div class="col-md-6 ">
            <div class="form-group mb-0">
              <v-select-with-validation
                rules="required"
                v-model="companyModal.city"
                :options="cityModalList"
                :label="$t('common.city')"
                :name="$t('common.city')"
                :isHalf="true"
                :optionLabel="$i18n.locale"
              />
              <div
                v-if="collectedDistrictModalList.length > 0"
                class="pt-3  position-relative"
              >
                <v-select-with-validation
                  rules="required"
                  v-model="companyModal.district"
                  :options="collectedDistrictModalList"
                  :label="$t('common.district')"
                  :name="$t('common.district')"
                  :isHalf="true"
                  :optionLabel="$i18n.locale"
                />
              </div>
              <div
                v-if="collectedWardModalList.length > 0"
                class="pt-3 position-relative"
              >
                <v-select-with-validation
                  rules="required"
                  v-model="companyModal.ward"
                  :options="collectedWardModalList"
                  :label="$t('common.ward')"
                  :name="$t('common.ward')"
                  :isHalf="true"
                  :optionLabel="$i18n.locale"
                />
              </div>
            </div>
          </div>
        </div>
        <hr />

        <v-file-upload-with-validation
          rules="required"
          v-model="companyModal.logo"
          :key="'company_logo'"
          :label="$t('company.company_logo')"
          :description="$t('company.company_logo_description')"
          :name="$t('company.company_logo')"
          :placeholder="$t('company.upload_company_logo')"
          :unique="'company_logo'"
        />
        <hr />

        <v-file-upload-with-validation
          rules="required"
          v-model="companyModal.coverImage"
          :key="'company_cover_image'"
          :label="$t('company.company_cover_image')"
          :description="$t('company.company_cover_image_description')"
          :name="$t('company.company_cover_image')"
          :placeholder="$t('company.upload_company_cover_image')"
          :unique="'company_cover_image'"
        />
        <hr />

        <v-editor-with-validation
          rules="required"
          v-model="companyModal.introduction"
          :label="$t('company.company_introduction')"
          :description="$t('company.company_introduction_description')"
          :name="$t('company.company_introduction')"
        />
        <hr />
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
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { State, Action, Getter, namespace } from "vuex-class";
import { ValidationObserver, ValidationProvider } from "vee-validate";

import VTextFieldWithValidation from "~/components/forms/VTextFieldWithValidation.vue";
import VSelectWithValidation from "~/components/forms/VSelectWithValidation.vue";
import VFileUploadWithValidation from "~/components/forms/VFileUploadWithValidation.vue";
import VEditorWithValidation from "~/components/forms/VEditorWithValidation.vue";

import { CompanyState } from "~/store/company/state";
import { CityState } from "~/store/city/state";
import CompanyModal from "~/modals/company_modal";
import CityModal from "~/modals/city_modal";
import DistrictModal from "~/modals/district_modal";
import WardModal from "~/modals/ward_modal";

import CompanyService from "~/services/company_service";

import { objectUrlToFile } from "~/utils/imageHelper";

// const namespace: string = "company";
// const Company = namespace("company");
const City = namespace("city");
const District = namespace("district");
const Ward = namespace("ward");
const BusinessType = namespace("businessType");
const Company = namespace("company");

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    VTextFieldWithValidation,
    VSelectWithValidation,
    VFileUploadWithValidation,
    VEditorWithValidation
  }
  // data() {
  //   const companyModal: CompanyModal = new CompanyModal();
  //   // companyModal. = ''
  //   return {
  //     companyModal,
  //     // companyName: "",
  //     // companyStaffNumber: "",
  //     // companyType: "",
  //     // companyIntroduction: "",
  //     firstFileList: [],
  //     secondFileList: []
  //   };
  // },
  // async asyncData() {
  //   return {
  //     // companyName: "",
  //     // companyStaffNumber: "",
  //     // companyType: "",
  //     // companyIntroduction: ""
  //   };
  // }
})
export default class CreateCompany extends Vue {
  companyModal: CompanyModal = new CompanyModal();
  // firstFileList: any[] = [];
  // secondFileList: any[] = [];
  collectedDistrictModalList: DistrictModal[] = [];
  collectedWardModalList: WardModal[] = [];

  @City.State cityModalList;
  @District.State districtModalList;
  @Ward.State wardModalList;
  @BusinessType.State businessTypeModalList;

  @Company.Action create;

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

  @Watch("companyModal.city")
  onCompanyCityValueChanged(newVal: CityModal, oldVal: CityModal) {
    if (newVal !== oldVal) {
      this.collectedDistrictModalList = this.districtModalList.filter(
        (districtModal: DistrictModal) =>
          districtModal.cityID === (newVal as CityModal).id
      );
    }
  }

  @Watch("companyModal.district")
  onCompanyDistrictValueChanged(newVal: DistrictModal, oldVal: DistrictModal) {
    if (newVal !== oldVal) {
      this.collectedWardModalList = this.wardModalList.filter(
        (wardModal: WardModal) =>
          wardModal.districtID === (newVal as DistrictModal).id
      );
    }
  }

  mounted() {}
  async submit() {
    const result = await (this.$refs.obs as any).validate();
    console.log("result " + result.toString());
    if (result) {
      const companyService: CompanyService = CompanyService.getInstance();
      const id: string = await companyService.createCompany(this.companyModal);
      this.$router.push(
        (this as any).localePath({
          name: "companies-id",
          params: { id }
        })
      );
    }
  }
}
</script>

<style scoped></style>
