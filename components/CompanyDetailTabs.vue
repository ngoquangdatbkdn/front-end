<template xmlns="http://www.w3.org/1999/html">
  <tabs fill class="flex-column flex-md-row container">
    <tab id="company-info" :name="$t('company.company_info')">
      <company-detail-description :company="company" />
    </tab>
    <tab id="job-list" :name="$t('job.job_list')">
      <company-detail-job-list :company="company"/>
    </tab>
  </tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Tabs, Tab } from "vue-tabs-component";
import CompanyDetailDescription from "~/components/CompanyDetailDescription.vue";
import CompanyDetailJobList from "~/components/CompanyDetailJobList.vue";
import { Company } from "../modals";

const UserInfo = namespace("userInfo");

@Component({
  components: {
    Tabs,
    Tab,
    CompanyDetailDescription,
    CompanyDetailJobList
  }
})
export default class CompanyDetailTabs extends Vue {
  @Prop(Object) readonly company!: Company;
  @UserInfo.State userInfo;
   mounted() {
    // console.log("this.company"+ JSON.stringify(this.company));
    // console.log(this.company);
    // console.log(this.jobs);
  }
  get shouldShowTranslatorList(): boolean {
    if (!this.userInfo) return false;
    if (this.userInfo.companyID !== this.company.id) return false;
    return true;
  }
}
</script>

<style scoped></style>
