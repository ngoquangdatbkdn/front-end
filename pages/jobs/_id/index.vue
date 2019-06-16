<template>
  <div class="bg-white pb-5 d-flex justify-content-center align-items-center flex-column">
    <div v-if="job!=null" class="d-flex justify-content-center align-items-center container">
      <div class="row pt-4 container">
        <div class="mr-auto pb-4 col-12 col-md-12 row">
          <div class="col-12 row">
            <img :src="job.company.logo" class="company-logo mw-100 logo rounded-circle">
            <div class="pl-3">
              <h4 class="d-flex justify-content-center align-items-center">{{ job[`name`] }}</h4>
              <nuxt-link
                :to="
                  localePath({
                    name: 'companies-id',
                    params: { id: job.company.id }
                  })
                "
                active-class="none"
                exact
              >
                <h5>{{ job.company[`name`] }}</h5>
              </nuxt-link>
            </div>
            <a
              v-if="$auth.user.property_id === job.company.id"
              class="edit-button"
              @click="onNavigateToUpdate()"
            >
              <span aria-hidden="true">
                <i class="fa fa-edit" aria-hidden="true"/>
              </span>
            </a>
          </div>
          <div class="col-12 col-md-6">
            <p class="info-label mt-3 mb-0">{{ $t("job.salary_range") }}</p>
            <p class="font-weight-600">{{ job.minSalary + " - " + job.maxSalary }}</p>
            <p class="info-label mt-3 mb-0">{{ $t("job.contract_type") }}</p>
            <p class="font-weight-600">{{ contract[$i18n.locale] }}</p>
            <p class="info-label mt-3 mb-0">{{ $t("job.workplace") }}</p>
            <p class="font-weight-600">
              {{
              job.address +
              ", " +
              district[$i18n.locale] +
              ", " +
              city[$i18n.locale]
              }}
            </p>
          </div>
          <div class="col-12 col-md-6">
            <img :src="job.coverImage" class="job-image mw-100">
          </div>
        </div>
      </div>
    </div>
    <job-detail-tabs :job="job"/>
  </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { plainToClass } from "class-transformer";

import JobDetailTabs from "~/components/JobDetailTabs.vue";
import { Job } from "~/modals";

const City = namespace("city");
const District = namespace("district");
const Business = namespace("business");
const Level = namespace("level");
const Contract = namespace("contract");

@Component({
  components: {
    JobDetailTabs
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
    let result: Object = await $axios.$get(`/api/jobs/${params.id}`);
    let job: Job = plainToClass(Job, result["data"]);
    return {
      job
    };
  },
  head() {
    return {
      title: this.job.name
    };
  }
})
export default class JobDetail extends Vue {
  job: Job = new Job();

  @City.State cities;
  @District.State districts;
  @Business.State businesses;
  @Contract.State contracts;
  @Level.State levels;

  onNavigateToUpdate() {
    return this.$router.push(
      (this as any).localePath({
        name: "jobs-id-update",
        params: { id: this.$route.params.id }
      })
    );
  }
  mounted() {
    console.log("this.job " + JSON.stringify(this.job));
  }

  get city() {
    return this.cities.filter(city => city.id === this.job.cityID)[0];
  }
  get district() {
    return this.districts.filter(
      district => district.id === this.job.districtID
    )[0];
  }
  get contract() {
    return this.contracts.filter(
      contract => contract.id === this.job.contractID
    )[0];
  }
  get level() {
    return this.levels.filter(level => level.id === this.job.levelID)[0];
  }
  get bussinesses() {
    return this.businesses.filter(
      business => (this.job as any).businessIDs.indexOf(business.id) > -1
    );
  }
}
</script>

<style scoped>
.logo {
  border: solid 4px #f0f0f0;
  width: 70px;
  height: 70px;
}
</style>
