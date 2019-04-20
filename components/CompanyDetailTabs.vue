<template xmlns="http://www.w3.org/1999/html">
  <tabs fill class="flex-column flex-md-row container ">
    <tab :name="$t('company.company_info')">
      <company-detail-description></company-detail-description>
    </tab>

    <tab :name="$t('job.job_list')">
      <company-detail-job-list></company-detail-job-list>
    </tab>

    <tab v-if="shouldShowTranslatorList" :name="$t('translator.translator_list')">
      <p class="description">
        Raw denim you probably haven't heard of them jean shorts Austin.
        Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
        cliche tempor, williamsburg carles vegan helvetica. Reprehenderit
        butcher retro keffiyeh dreamcatcher synth.
      </p>
    </tab>
  </tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {  namespace } from "vuex-class";
import { Tabs, Tab } from "vue-tabs-component";
import CompanyDetailDescription from "~/components/CompanyDetailDescription.vue";
import CompanyDetailJobList from "~/components/CompanyDetailJobList.vue";

const Company = namespace("company");
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
    @Company.State companyModal;
    @UserInfo.State userInfo;
    get shouldShowTranslatorList(): boolean{
        if(!this.userInfo) return false;
        if(this.userInfo.companyID !== this.companyModal.id) return false;
        return true
    }
}
</script>

<style scoped></style>
