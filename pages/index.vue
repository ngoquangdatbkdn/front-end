<template>
  <div>
    <div class="search-area d-flex justify-content-center align-items-center">
      <div class="container row">
        <div class="form-group col-12 col-sm-6">
          <div class="input-group input-group-alternative">
            <input
              :placeholder="$t('common.keyword')"
              class="form-control"
              type="text"
            />
          </div>
        </div>
        <div class="form-group col-12 col-sm-4 d-flex ">
          <div class="input-group input-group-alternative">
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
        <h6 class="mb-0">{{ $t("common.job_list") }}</h6>
        <p class="text-primary mb-0">{{ $t("common.see_more") }}</p>
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
import CompanyModal from "~/modals/company_modal";
import JobListItem from "~/components/JobListItem.vue";
import CompanyListItem from "~/components/CompanyListItem.vue";

import { fbAuth } from "~/plugins/firebase";

import CompanyService from "~/services/company_service";

const UserInfo = namespace("userInfo");

@Component({
  components: {
    JobListItem,
    CompanyListItem
  },
  async asyncData() {
    const jobModalList: JobModal[] = [];
    for (let i: number = 0; i < 9; i++) {
      const jobModal: JobModal = new JobModal();
      jobModal.name = "Nhân viên bán thời gian";
      jobModal.company = "Cty Neolab";
      jobModal.location = "Đà Nẵng";
      jobModal.salaryRange = "200 - 433";
      jobModal.lastUpdate = "20 phút";
      jobModalList.push(jobModal);
    }
    const companyModalList: CompanyModal[] = [];
    for (let i: number = 0; i < 9; i++) {
      const companyModal: CompanyModal = new CompanyModal();
      companyModal.name = "Cty Neolab";
      companyModal.address = "Đà Nẵng";
      companyModal.minSalary = 200000;
      companyModal.maxSalary = 300000;
      companyModal.activeJob = "15 công việc";
      companyModalList.push(companyModal);
    }

    return {
      jobModalList,
      companyModalList
    };
  }
})
export default class Index extends Vue {
    // @UserInfo.Action set
    async mounted(){

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
  height: 300px;
}
</style>
