<template>
  <div>
    <div class="search-area d-flex justify-content-center align-items-center">
      <div class="container row">
        <div class="form-group col-12 col-sm-6">
          <div class="input-group input-group-alternative">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fa fa-search"></i></span>
            </div>
            <input
              :placeholder="$t('common.keyword')"
              class="form-control"
              type="text"
            />
          </div>
        </div>
        <div class="form-group col-12 col-sm-4 d-flex ">
          <div class="input-group input-group-alternative">
            <div class="input-group-prepend">
              <span class="input-group-text"
                ><i class="fa fa-map-marker"></i
              ></span>
            </div>
            <input
              :placeholder="$t('common.all_major')"
              class="form-control"
              type="text"
            />
          </div>
        </div>
        <div class="col-12 col-sm-2 text-center">
          <button class="btn btn-primary" type="button">
            {{ $t("common.search") }}
          </button>
        </div>
      </div>
    </div>

    <section
      class="bg-white d-flex justify-content-center align-items-center pb-4 pt-5 flex-column"
    >
      <div
        class="container row px-4 justify-content-between align-items-center"
      >
        <h6 class="mb-0">{{ $t("job.job_list") }}</h6>
          <nuxt-link
                  :to="localePath('companies')"
                  class="web-name  text-dark"
                  exact
          >
              {{ $t("common.see_more") }}
          </nuxt-link>
      </div>
      <div class="container row">
        <job-list-item
          v-for="(jobModal, index) of jobModalList"
          :key="index"
          :jobModal="jobModal"
        ></job-list-item>
      </div>
    </section>

    <section
      class="bg-white d-flex justify-content-center align-items-center pb-4 pt-5 flex-column"
    >
      <div
        class="container row px-4 justify-content-between align-items-center"
      >
        <h6 class="mb-0">{{ $t("common.company_list") }}</h6>
        <p class="text-primary mb-0">{{ $t("common.see_more") }}</p>
      </div>
      <div class="container row">
        <company-list-item
          v-for="(companyModal, index) of companyModalList"
          :key="index"
          :companyModal="companyModal"
        ></company-list-item>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { State, Action, Getter, namespace } from "vuex-class";

import JobModal from "~/modals/job_modal";
import CityModal from "~/modals/city_modal";
import DistrictModal from "~/modals/district_modal";
import CompanyModal from "~/modals/company_modal";
import JobListItem from "~/components/JobListItem.vue";
import CompanyListItem from "~/components/CompanyListItem.vue";

import { fbAuth } from "~/plugins/firebase";

import CompanyService from "~/services/company_service";

const UserInfo = namespace("userInfo");
const LoginModal = namespace("loginModal");
const Company = namespace("company");
const Job = namespace("job");

@Component({
  components: {
    JobListItem,
    CompanyListItem
  },
  async fetch({ store, params }) {
    await store.dispatch("company/getCompanyList", {
      limitation: 6,
      wheres: [
        {
          field: "shouldShow",
          operator: "==",
          value: true
        }
      ]
    });
    const cityModal: CityModal = new CityModal();
    cityModal.ja = "Da Nang";
    cityModal.vi = "Da Nang";
    const districtModal: DistrictModal = new DistrictModal();
    districtModal.vi = "Hai Chau";
    districtModal.ja = "Hai Chau";
    // jobModalList
    const jobModal: JobModal = new JobModal();
    jobModal.name_ja = "Lập trình viên React";
    jobModal.name_vi = "Lập trình viên React";
    jobModal.city = cityModal;
    jobModal.district = districtModal;
    jobModal.minSalary = 30000;
    jobModal.maxSalary = 70000;
    await store.dispatch("job/addJobToList", jobModal);
    await store.dispatch("job/addJobToList", jobModal);
    await store.dispatch("job/addJobToList", jobModal);
    await store.dispatch("job/addJobToList", jobModal);
    await store.dispatch("job/addJobToList", jobModal);
    await store.dispatch("job/addJobToList", jobModal);
    await store.dispatch("job/addJobToList", jobModal);
    await store.dispatch("job/addJobToList", jobModal);
    await store.dispatch("job/addJobToList", jobModal);
    // await store.dispatch("job/getJobList", {
    //     limitation: 6,
    //     // wheres: [
    //     //     {
    //     //         field: "shouldShow",
    //     //         operator: "==",
    //     //         value: true
    //     //     }
    //     // ]
    // });
  }
})
export default class Index extends Vue {
  @LoginModal.Action setShouldOpen;
  @Company.State companyModalList;
  @Job.State jobModalList;
  // @Company.Action getCompanyList;
  // @UserInfo.Action set
  async mounted() {
    // if(this.$route.hash === "#login"){
    //    this.setShouldOpen(true)
    // }
    // const companyService = CompanyService.getInstance();
    // const companyModal: CompanyModal | null = await companyService.getCompanyByID("ba5EQozBS9HkXmyTlpiF")
    // console.log('companyModal');
    // console.log(companyModal);
  }
  // jobModalList: JobModal[] = [];
  // companyModalList: CompanyModal[] = [];
}
</script>

<style scoped>
.search-area {
  margin-top: 50px;
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
</style>
