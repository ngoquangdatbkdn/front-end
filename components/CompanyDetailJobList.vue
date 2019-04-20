<template xmlns="http://www.w3.org/1999/html">
  <div>
    <base-button class="nav-item" type="primary" v-on:click="createJob">
      {{ $t("job.add_job") }}
    </base-button>
    <div class="container row">
      <job-list-item
        v-for="(jobModal, index) of jobModalList"
        :key="index"
        :jobModal="jobModal"
      ></job-list-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";

import BaseButton from "~/argon-components/BaseButton.vue";
import CompanyModal from "../modals/company_modal";
import JobListItem from "~/components/JobListItem.vue";

const Company = namespace("company");
const Job = namespace("job");

@Component({
  components: {
    BaseButton,
      JobListItem
  }
})
export default class CompanyDetailJobList extends Vue {
  @Company.State companyModal;
  @Job.State jobModalList;
    mount(){
        // console.log('jobModalList')
        // console.log(this.jobModalList)
    }
  createJob() {
    this.$router.push(
      (this as any).localePath({
        name: "companies-id-jobs-create",
        params: { id: this.companyModal.id }
      })
    );
  }
}
</script>

<style scoped></style>
