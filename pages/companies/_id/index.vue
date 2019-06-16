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
            <a class="page-link" aria-label="Next" @click="onNavigateToUpdate()">
              <span aria-hidden="true">
                <i class="fa fa-angle-right" aria-hidden="true"/>
              </span>
            </a>
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
              <p
                v-for="business in bussinesses"
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
                district[$i18n.locale] +
                ", " +
                city[$i18n.locale]
                }}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <company-detail-tabs :company="company"/>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { plainToClass } from "class-transformer";

import CompanyDetailTabs from "~/components/CompanyDetailTabs.vue";
import BaseSwitch from "~/argon-components/BaseSwitch.vue";

import { Company, Job } from "../../../modals";

const City = namespace("city");
const District = namespace("district");
const Business = namespace("business");
const UserInfo = namespace("userInfo");

@Component({
  components: {
    CompanyDetailTabs,
    BaseSwitch
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

    let results: Object[] = await $axios.$get("/api/jobs");
    const jobs = plainToClass(Job, results["data"]);
    return {
      jobs,
      company
    };
  },
  head() {
    return {
      title: this.company.name
    };
  }
})
export default class CompanyDetail extends Vue {
  @City.State cities;
  @District.State districts;
  @Business.State businesses;

  shouldPublish = {
    status: false
  };
  jobs: Job[] = [];

  get city() {
    return this.cities.filter(city => city.id === this.company.cityID)[0];
  }
  get district() {
    return this.districts.filter(
      district => district.id === this.company.districtID
    )[0];
  }
  get bussinesses() {
    return this.businesses.filter(
      business => (this.company as any).businessIDs.indexOf(business.id) > -1
    );
  }
  onNavigateToUpdate() {
    return this.$router.push(
      (this as any).localePath({
        name: "companies-id-update",
        params: { id: this.$route.params.id }
      })
    );
  }
  async mounted() {}
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
