<template xmlns="http://www.w3.org/1999/html">
  <tabs fill class="flex-column flex-md-row container ">
    <tab id="job-detail" :name="$t('job.job_detail')" class="p-3 ">
      <h5>{{ $t("job.job_detail") }}</h5>
      <div v-html="benefits" />
      <hr />
      <h5>{{ $t("job.job_benefit") }}</h5>
      <div v-html="job[`benefit_${$i18n.locale}`]" />
    </tab>

    <tab id="job-requirement" :name="$t('job.job_requirement')" class="p-3 ">
      <h5>{{ $t("job.skill_requirement") }}</h5>
      <div v-html="job[`requiredSkill_${$i18n.locale}`]" />
      <hr />
      <h5>{{ $t("job.language_requirement") }}</h5>
      <div v-html="job[`requiredLanguage_${$i18n.locale}`]" />
    </tab>

    <!--<tab id="company-info" :name="$t('company.company_info')" class="p-3 ">-->
    <!--<company-detail-description />-->
    <!--</tab>-->
  </tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Tabs, Tab } from "vue-tabs-component";
import CompanyDetailDescription from "~/components/CompanyDetailDescription.vue";
import { JobTranslation } from "~/modals";

const Job = namespace("job");
const UserInfo = namespace("userInfo");

@Component({
  components: {
    Tabs,
    Tab,
    CompanyDetailDescription
  }
})
export default class JobDetailTabs extends Vue {
  @Job.State job;
  @UserInfo.State userInfo;

  get translation(): JobTranslation | undefined {
    if (this.job.translations == null) return;
    return this.job.translations.filter(
      (translation: JobTranslation) => translation.inUse == true
    )[0];
  }
  get isJapanese():boolean {return this.$i18n.locale == 'ja'}
  get benefits():string {
      if(this.isJapanese) return this.job.benefits
      const translation: JobTranslation | undefined = this.translation;
      if(!translation || !translation.benefits) return ''
      return translation.benefits
  }
  // get shouldShowTranslatorList(): boolean {
  //   if (!this.userInfo) return false
  //   if (this.userInfo.companyID !== this.companyModal.id) return false
  //   return true
  // }
}
</script>

<style scoped></style>
