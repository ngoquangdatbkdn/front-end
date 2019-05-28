<template>
  <div class="bg-white pb-5 d-flex justify-content-center align-items-center flex-column">
    <div v-if="job!=null" class="d-flex justify-content-center align-items-center">
      <div class="container  row pt-4">
        <div class="mr-auto pb-4 col-12 col-md-12 row ">
          <div class="col-12 row">
            <img
              :src="job.company.logo"
              class="company-logo mw-100 logo rounded-circle"
            >
            <div class="pl-3">
              <h4 class="d-flex justify-content-center align-items-center">
                {{ job[`name`] }}
              </h4>
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
                <h5>
                  {{ job.company[`name`] }}
                </h5>
              </nuxt-link>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <p class="info-label mt-3 mb-0">
              {{ $t("job.salary_range") }}
            </p>
            <p class="font-weight-600">
              {{ job.minSalary + " - " + job.maxSalary }}
            </p>
            <p class="info-label mt-3 mb-0">
              {{ $t("job.contract_type") }}
            </p>
            <p v-if="job.contract" class="font-weight-600">
              {{ job.contract[$i18n.locale] }}
            </p>
            <p class="info-label mt-3 mb-0">
              {{ $t("job.workplace") }}
            </p>
            <p class="font-weight-600">
              {{
                job.address +
                  ", " +
                  job.district[$i18n.locale] +
                  ", " +
                  job.city[$i18n.locale]
              }}
            </p>
          </div>
          <div class="col-12 col-md-6">
            <img :src="job.coverImage" class="job-image mw-100 ">
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
<!--<img :src="job.coverImage" class="job-image mw-100 " />-->
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

const Job = namespace('job')

@Component({
  components: {
    JobDetailTabs
  },
  async fetch({ store, params }) {
    const id: string = params.id
    await store.dispatch("job/getJobByID", id);
  }
})
export default class JobDetail extends Vue {
  @Job.State job;
  async mounted() {
      console.log('this.job ' + JSON.stringify(this.job));
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
