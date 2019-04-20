<template>
  <div class="bg-white pb-5">
    <div class="d-flex justify-content-center align-items-start">
      <section class="position-absolute cover-image-wrapper">
        <!--<img :src="companyModal.coverImage" class="company-image cover-image " />-->
        <div
          class="cover-image "
          v-bind:style="{
            backgroundImage: 'url(' + companyModal.coverImage + ')'
          }"
        ></div>
      </section>
      <div class="container row pt-4 ">
        <section class="mr-auto pb-4 col-12 content ">
          <div class="col-12 col-md-12 d-flex flex-row align-items-start">
              <img
                :src="companyModal.logo"
                class="company-logo mw-100 logo rounded-circle"
              />
            <p
              class="d-flex h3 justify-content-center align-items-center pl-3 pt-4 mt-2"
            >
              {{ companyModal.name }}
            </p>
          </div>
          <div
            class="col-12 col-md-12 mt-2 mt-md-3 pt-3 row bg-white rounded px-0 mx-0 "
          >
            <div class="col-12 col-md-4 ">
              <p class="info-label mt-2 mb-0">
                {{ $t("company.staff_number") }}
              </p>
              <p class="font-weight-600">{{ companyModal.staffNumber }}</p>
            </div>
            <div class="col-12 col-md-4 ">
              <p class="info-label mt-2 mb-0">
                {{ $t("company.business_type") }}
              </p>
              <p v-if="companyModal.businessType" class="font-weight-600">
                {{ companyModal.businessType[$i18n.locale] }}
              </p>
            </div>
            <div class="col-12 col-md-4 ">
              <p class="info-label mt-2 mb-0">
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
          </div>
        </section>


      </div>
    </div>
    <company-detail-tabs></company-detail-tabs>
  </div>
</template>



<!--<section class="col-12 col-md-12 justify-content-center d-flex px-0">-->
    <!--<div class="col-12  row d-flex ">-->
        <!--<div-->
                <!--class=" my-2 col-12 col-md-3 d-flex flex-column justify-content-stretch"-->
        <!--&gt;-->
            <!--<button type="button" class="btn btn-primary " outline>-->
                <!--<span class="white-space-normal">-->
                  <!--{{ $t("company.update_company_info") }}</span-->
                <!--&gt;-->
            <!--</button>-->
        <!--</div>-->

        <!--<div class=" my-2 col-12 col-md-3 ">-->
            <!--<div-->
                    <!--class="d-flex bg-white p-3 rounded d-flex justify-content-between "-->
            <!--&gt;-->
                <!--<span class="mb-3">{{-->
                  <!--$t("company.publish_company_info")-->
                <!--}}</span>-->
                <!--<div>-->
                    <!--<base-switch v-model="shouldPublish.status"></base-switch>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
<!--</section>-->


<!--<div-->
<!--class=" my-2 col-12 col-md-3 d-flex flex-column justify-content-stretch"-->
<!--&gt;-->
<!--<button type="button" class="btn btn-primary  " outline>-->
<!--<span class="white-space-normal">-->
<!--{{ $t("common.translation_management") }}</span-->
<!--&gt;-->
<!--</button>-->
<!--</div>-->

<!--<div-->
<!--class=" my-2 col-12 col-md-3 d-flex flex-column justify-content-stretch"-->
<!--&gt;-->
<!--<button type="button" class="btn btn-primary " outline>-->
<!--<span class="white-space-normal">{{""}}</span>-->
<!--</button>-->
<!--</div>-->

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import CompanyDetailTabs from "~/components/CompanyDetailTabs.vue";
import BaseSwitch from "~/argon-components/BaseSwitch.vue";

const Company = namespace("company");

@Component({
  components: {
    CompanyDetailTabs,
    BaseSwitch
  },
  async fetch({ store, params }) {
    const companyID: string = params.id;
    if (companyID) {
      await store.dispatch(`company/getCompanyByID`, companyID);
      await store.dispatch(`job/getJobListByCompanyID`, companyID);
    }
  }
})
export default class CompanyDetail extends Vue {
  shouldPublish = {
    status: false
  };
  @Company.State companyModal;

  @Company.Action updateShouldShowCompany;

  @Watch("shouldPublish.status")
  onsShouldPublishValueChanged(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      this.updateShouldShowCompany(newValue);
      console.log("shouldPublish");
      console.log(newValue);
    }
  }
  async mounted() {
    console.log("this.companyModal.shouldShow");
    // console.log(this.companyModal.shouldShow);
    // this.shouldPublish = this.companyModal.shouldShow;
  }
}
</script>

<style scoped>
.cover-image-wrapper {
  /*position: absolute;*/
  /*top: 0;*/
  /*left: 0;*/
  /*right: 0;*/
  /*bottom: 0;*/
  /*overflow: hidden;*/
}
.cover-image {
  width: 100vw;
  height: 300px;
  background-repeat: no-repeat;
  /*background-attachment: fixed;*/
  background-position: center;
}
.content {
  margin-top: 250px;
}
.logo {
    border :solid 4px #f0f0f0;
  width: 100px;
  height: 100px;

}
</style>
