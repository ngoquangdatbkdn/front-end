<template>
  <div>
    <div class="d-flex justify-content-center align-items-center">
      <div class="container  row">
        <div class="mr-auto pt-5 pb-4 col-12 col-md-5 ">
          <div class="row">
            <img
              :src="companyModal.logo"
              class="company-logo mw-100 avatar ml-3"
            />
            <h4 class="d-flex justify-content-center align-items-center pl-3">
              {{ companyModal.name }}
            </h4>
          </div>
          <p class="info-label mt-3 mb-0">{{ $t("company.staff_number") }}</p>
          <p class="font-weight-600">{{ companyModal.staffNumber }}</p>
          <p class="info-label mt-3 mb-0">{{ $t("company.business_type") }}</p>
          <p v-if="companyModal.businessType" class="font-weight-600">
            {{ companyModal.businessType[$i18n.locale] }}
          </p>
          <p class="info-label mt-3 mb-0">
            {{ $t("company.company_address") }}
          </p>
          <p v-if="companyModal.ward" class="font-weight-600">
            {{
              companyModal.ward[$i18n.locale] +
                ", " +
                companyModal.district[$i18n.locale] +
                ", " +
                companyModal.city[$i18n.locale]
            }}
          </p>
        </div>
        <div
          class="col-12 col-md-2 justify-content-center justify-content-md-end d-flex"
        >
          <div class="col-12  d-flex flex-column">
            <button type="button" class="btn btn-primary mt-5 mr-0">
              <span class="white-space-normal"> Đổi qua tiếng Việt</span>
            </button>
            <button type="button" class="btn btn-primary mt-4 mr-0">
              <span class="white-space-normal">
                {{ $t("company.update_company_info") }}</span
              >
            </button>

            <button type="button" class="btn btn-primary mt-4 mb-4">
              <span class="white-space-normal">
                {{ $t("common.translation_management") }}</span
              >
            </button>
          </div>
        </div>
        <div
          class="col-12 col-md-5 d-flex align-items-center justify-content-center"
        >
          <img :src="companyModal.coverImage" class="company-image mw-100 " />
        </div>
      </div>
    </div>
  </div>
</template>

<!--<div class="d-flex justify-content-center align-items-center bg-white">-->
<!--<div class="tab-content container pb-5 pt-4">-->
<!--<div-->
<!--id="nav-pills-tabs-component"-->
<!--class="tab-pane tab-example-result fade show active"-->
<!--role="tabpanel"-->
<!--aria-labelledby="nav-pills-tabs-component-tab"-->
<!--&gt;-->
<!--<CompanyTabList t="{t}" />-->
<!--<div class="tab-content" id="myTabContent">-->
<!--<div-->
<!--class="tab-pane fade active show"-->
<!--id="tabs-icons-text-2"-->
<!--role="tabpanel"-->
<!--aria-labelledby="tabs-icons-text-2-tab"-->
<!--&gt;-->
<!--<Content />-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { State, Action, Getter, namespace } from "vuex-class";
import CompanyService from "~/services/company_service";
import { Route } from "vue-router";

import { ValidationObserver, ValidationProvider } from "vee-validate";

import { CompanyState } from "~/store/company/state";
import { CityState } from "~/store/city/state";
import CompanyModal from "~/modals/company_modal";
// import CityModal from "~/modals/city_modal";

import { objectUrlToFile } from "~/utils/imageHelper";

const Company = namespace("company");

@Component({
  components: {},
  // async beforeRouteEnter(to, from, next) {
  //   next(async vm => {
  //       const companyId: string = vm.$route.params.id;
  //       if (companyId) {
  //         const companyService = CompanyService.getInstance();
  //         const companyModal: CompanyModal | null = await companyService.getCompanyByID(
  //           companyId
  //         );
  //         console.log("companyModal");
  //         console.log(companyModal);
  //         vm.companyModal = companyModal;
  //       }
  //   });
  // },
  // async data() {
  //   const companyId: string = this.$route.params.id;
  //   if (companyId) {
  //     const companyService = CompanyService.getInstance();
  //     const companyModal: CompanyModal | null = await companyService.getCompanyByID(
  //       companyId
  //     );
  //     console.log("companyModal");
  //     console.log(companyModal);
  //     return {
  //       companyModal
  //     };
  //   }
  //   return {};
  // },
  async asyncData({ params }) {
    const companyId: string = params.id;
    if (companyId) {
      const companyService = CompanyService.getInstance();
      const companyModal: CompanyModal | null = await companyService.getCompanyByID(
        companyId
      );
      console.log("companyModal");
      console.log(companyModal);
      return {
        companyModal
      };
    }
    return {};
  }
})
export default class CreateCompany extends Vue {
  // companyModal: CompanyModal;
  // @Company.State companyModal;
  async mounted() {
    // "ba5EQozBS9HkXmyTlpiF"
  }
  async submit() {
    // const result = await (this.$refs.obs as any).validate();
    // console.log("result " + result.toString());
    // this.$router.push(
    //   this.localePath({ name: "companies-id", params: { id: "faef" } })
    // );
    // if (result) {
    //   this.create(this.companyModal);
    // }
  }
}
</script>

<style scoped></style>
