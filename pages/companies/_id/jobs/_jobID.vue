<template>
  <div class="bg-white pb-5">
    <div class="d-flex justify-content-center align-items-center">
      <div class="container  row pt-4">
        <div class="mr-auto pb-4 col-12 col-md-12 row ">
          <div class="col-12 row">
            <img
              :src="companyModal.logo"
              class="company-logo mw-100 logo rounded-circle"
            >
            <div class="pl-3">
              <h4 class="d-flex justify-content-center align-items-center">
                {{ jobModal[`name_${$i18n.locale}`] }}
              </h4>
              <nuxt-link
                :to="
                  localePath({
                    name: 'companies-id',
                    params: { id: companyModal.id }
                  })
                "
                active-class="none"
                exact
              >
                <h5>
                  {{ companyModal[`name_${$i18n.locale}`] }}
                </h5>
              </nuxt-link>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <p class="info-label mt-3 mb-0">
              {{ $t("job.salary_range") }}
            </p>
            <p class="font-weight-600">
              {{ jobModal.minSalary + " - " + jobModal.maxSalary }}
            </p>
            <p class="info-label mt-3 mb-0">
              {{ $t("job.contract_type") }}
            </p>
            <p v-if="jobModal.contractType" class="font-weight-600">
              {{ jobModal.contractType[$i18n.locale] }}
            </p>
            <p class="info-label mt-3 mb-0">
              {{ $t("job.workplace") }}
            </p>
            <p v-if="jobModal.ward" class="font-weight-600">
              {{
                jobModal.ward[$i18n.locale] +
                  ", " +
                  jobModal.district[$i18n.locale] +
                  ", " +
                  jobModal.city[$i18n.locale]
              }}
            </p>
          </div>
          <div class="col-12 col-md-6">
            <img :src="jobModal.coverImage" class="job-image mw-100 ">
          </div>
        </div>
      </div>
    </div>
    <job-detail-tabs />
  </div>
</template>

<!--<div-->
<!--class="col-12 col-md-5 d-flex align-items-start justify-content-center"-->
<!--&gt;-->
<!--<img :src="jobModal.coverImage" class="job-image mw-100 " />-->
<!--</div>-->

<!--<div-->
<!--class="col-12 col-md-2 justify-content-center justify-content-md-end d-flex"-->
<!--&gt;-->
<!--<div class="col-12  d-flex flex-column">-->
<!--<button type="button" class="btn btn-primary mr-0">-->
<!--<span class="white-space-normal"> Đổi qua tiếng Việt</span>-->
<!--</button>-->
<!--<button type="button" class="btn btn-primary mt-4 mr-0">-->
<!--<span class="white-space-normal">-->
<!--{{ $t("job.update_job_info") }}</span-->
<!--&gt;-->
<!--</button>-->

<!--<button type="button" class="btn btn-primary mt-4 mb-4">-->
<!--<span class="white-space-normal">-->
<!--{{ $t("common.translation_management") }}</span-->
<!--&gt;-->
<!--</button>-->
<!--</div>-->
<!--</div>-->

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import JobDetailTabs from '~/components/JobDetailTabs.vue'

const Company = namespace('company')
const Job = namespace('job')

@Component({
  components: {
    JobDetailTabs
  },
  async fetch({ store, params }) {
    const companyID: string = params.id
    const jobID: string = params.jobID
    if (jobID) {
      await store.dispatch(`company/getCompanyByID`, companyID)
      await store.dispatch(`job/getJobByID`, jobID)
    }
  }
})
export default class JobDetail extends Vue {
  @Job.State jobModal;
  @Company.State companyModal;
  async mounted() {}
}
</script>

<style scoped>
.logo {
  border: solid 4px #f0f0f0;
  width: 70px;
  height: 70px;
}
</style>
