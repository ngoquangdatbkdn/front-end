<template>
  <div>
    <div class="search-area d-flex justify-content-center align-items-center">
      <div class="container row">
        <div class="form-group col-12 col-sm-6">
          <div class="input-group input-group-alternative">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-search"/>
              </span>
            </div>
            <input :placeholder="$t('common.keyword')" class="form-control" type="text">
          </div>
        </div>
        <div class="form-group col-12 col-sm-4 d-flex">
          <div class="input-group input-group-alternative">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-map-marker"/>
              </span>
            </div>
            <input :placeholder="$t('common.all_major')" class="form-control" type="text">
          </div>
        </div>
        <div class="col-12 col-sm-2 text-center">
          <button class="btn btn-primary" type="button">{{ $t("common.search") }}</button>
        </div>
      </div>
    </div>

    <section
      class="bg-white d-flex justify-content-center align-items-center pb-4 pt-5 flex-column"
    >
      <div class="container row px-4 justify-content-between align-items-center">
        <h6 class="mb-3 list-label">{{ $t("job.job_list") }}</h6>
        <nuxt-link
          :to="localePath('jobs')"
          class="text-dark see-more"
          exact
        >{{ $t("common.see_more") }}</nuxt-link>
      </div>
      <div class="container row">
        <job-list-item v-for="(job, index) of jobs" :key="index" :job="job"/>
      </div>
    </section>
    <div class="bg-white pt-4 pb-3">
      <div class="container bg-white">
        <div class="hr"></div>
      </div>
    </div>

    <section
      class="bg-white d-flex justify-content-center align-items-center pb-4 pt-5 flex-column"
    >
      <div class="container row px-4 justify-content-between align-items-center">
        <h6 class="mb-3 list-label">{{ $t("common.company_list") }}</h6>
        <nuxt-link
          :to="localePath('companies')"
          class="text-dark see-more"
          exact
        >{{ $t("common.see_more") }}</nuxt-link>
      </div>
      <div class="container row">
        <company-list-item v-for="(company, index) of companies" :key="index" :company="company"/>
      </div>
    </section>
    <footer class="bg-white"></footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { State, Action, Getter, namespace } from "vuex-class";
import { plainToClass } from "class-transformer";

import JobListItem from "~/components/JobListItem.vue";
import CompanyListItem from "~/components/CompanyListItem.vue";
import { Job, Company } from "~/modals";

const UserInfo = namespace("userInfo");
const LoginModal = namespace("loginModal");
// const Company = namespace("company");
// const Job = namespace("job");

@Component({
  components: {
    JobListItem,
    CompanyListItem
  },
  async fetch({ store, params }) {
    await Promise.all([
      store.dispatch("district/fetchList"),
      store.dispatch("city/fetchList")
    ]);
  },
  async asyncData({ $axios }) {
    let results = await Promise.all([
      $axios.$get("/api/companies"),
      $axios.$get("/api/jobs")
    ]);
    const companies = plainToClass(Company, results[0]["data"]);
    const jobs = plainToClass(Job, results[1]["data"]);
    return {
      companies,
      jobs
    };
  },
  head() {
    return {
      title: this.$t("common.homepage")
    };
  }
})
export default class Index extends Vue {
  @LoginModal.Action setShouldOpen;
  companies: Company[] = [];
  jobs: Job[] = [];

  async mounted() {
    console.log("companies " + JSON.stringify(this.companies));
    // console.log("jobs " + JSON.stringify(this.jobs));
  }
}
</script>

<style scoped>
.list-label {
  font-size: 16px;
  font-weight: 700;
}
.see-more {
  text-decoration: underline;
  font-size: 14px;
}
.search-area {
  /* margin-top: 50px; */
  padding-top: 50px;
  padding-bottom: 10px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("https://www.glassdoor.com/employers/app/uploads/sites/2/fly-images/32988/smb-desktop_1280x2560_2x-2560x1280.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
}
@media only screen and (min-width: 768px) {
  .search-area {
    padding-top: 170px;
    padding-bottom: 150px;
    background-position: center;
  }
}
.hr {
  border-top: 0.0625rem solid rgba(0, 0, 0, 0.1);
}
footer {
  height: 100px;
}
</style>
