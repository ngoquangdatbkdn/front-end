<template>
  <div class="bg-white pb-5 d-flex flex-column">
    <div class="d-flex justify-content-center align-items-start">
      <section class="position-absolute cover-image-wrapper">
        <!--<img :src="company.coverImage" class="company-image cover-image " />-->
        <div
          class="cover-image"
          :style="{
            backgroundImage: 'url(' + company.coverImage + ')'
          }"
        />
      </section>
      <div class="container row pt-4 px-0">
        <section class="mr-auto pb-4 col-12 content">
          <div class="col-12 col-md-12 d-flex flex-row align-items-start">
            <img :src="company.logo" class="company-logo mw-100 logo rounded-circle">
            <p
              class="d-flex h3 justify-content-center align-items-center pl-3 pt-4 mt-2"
            >{{ company.name }}</p>
          </div>
          <div
            class="col-12 col-md-12 mt-2 mt-md-3 pt-2 row px-0 mx-0 rounded border-secondary border border-3 p-3"
          >
            <div class="col-12 col-md-4 pt-2 border-right">
              <p class="info-label mb-0">{{ $t("company.staff_number") }}</p>
              <p class="font-weight-600 mb-0 scale">{{ company.scale }}</p>
            </div>
            <div class="col-12 col-md-4 pt-2 border-right">
              <p class="info-label mb-0">{{ $t("company.business_type") }}</p>
              <p v-for="business in company.businesses"
                :key="business.id"
                class="font-weight-600 mb-0"
              >* {{ business[$i18n.locale] }}</p>
            </div>
            <div class="col-12 col-md-4 pt-2">
              <p class="info-label mb-0">{{ $t("company.company_address") }}</p>
              <p class="font-weight-600 mb-0">
                {{
                company.address +
                ", " +
                company.district[$i18n.locale] +
                ", " +
                company.city[$i18n.locale]
                }}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <company-detail-tabs/>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { plainToClass } from "class-transformer";

import CompanyDetailTabs from "~/components/CompanyDetailTabs.vue";
import BaseSwitch from "~/argon-components/BaseSwitch.vue";

import { Company, Job } from "../../modals";

@Component({
  components: {
    CompanyDetailTabs,
    BaseSwitch
  },
  // async fetch({ store, params }) {

  //   if (companyID) {
  //     await store.dispatch(`company/getCompanyByID`, companyID);
  //     await store.dispatch(`job/getJobsByCompanyID`, companyID);
  //   }
  // },
  async asyncData({ $axios, params }) {
    const companyID: string = params.id;
    console.log("companyID " + companyID.toString());

    let result: Object = await $axios.$get("/api/companies/1");
    let company: Company = plainToClass(Company, result["data"]);

    let results: Object[] = await $axios.$get("/api/jobs");
    const jobs = plainToClass(Job, results["data"]);

    return {
      jobs,
      company
    };
  }
})
export default class CompanyDetail extends Vue {
  shouldPublish = {
    status: false
  };
  company: Company = new Company();
  jobs: Job[] = [];

  async mounted() {
    console.log("this.company.shouldShow");
    console.log(this.company);
    console.log(this.jobs);
  }
}
</script>

<style scoped>
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
  border: solid 4px #f0f0f0;
  width: 100px;
  height: 100px;
  background: white;
}
.scale {
  font-size: 24px;
}
</style>
