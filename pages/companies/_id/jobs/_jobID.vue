<template>
  <div>
    <div class="d-flex justify-content-center align-items-center">
      <div class="container  row pt-4">
        <div class="mr-auto pb-4 col-12 col-md-5 ">
          <div class="row">
            <img
              :src="jobModal.logo"
              class="job-logo mw-100 avatar ml-3"
            />
            <h4 class="d-flex justify-content-center align-items-center pl-3">
              {{ jobModal.name }}
            </h4>
          </div>
          <p class="info-label mt-3 mb-0">{{ $t("job.salary_range") }}</p>
          <p class="font-weight-600">{{ jobModal.minSalary + ' - ' + jobModal.maxSalary }}</p>
          <p class="info-label mt-3 mb-0">{{ $t("job.contract_type") }}</p>
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
        <div
          class="col-12 col-md-2 justify-content-center justify-content-md-end d-flex"
        >
          <div class="col-12  d-flex flex-column">
            <button type="button" class="btn btn-primary mr-0">
              <span class="white-space-normal"> Đổi qua tiếng Việt</span>
            </button>
            <button type="button" class="btn btn-primary mt-4 mr-0">
              <span class="white-space-normal">
                {{ $t("job.update_job_info") }}</span
              >
            </button>

            <button type="button" class="btn btn-primary mt-4 mb-4">
              <span class="white-space-normal">
                {{ $t("common.translation_management") }}</span
              >
            </button>
          </div>
        </div>
        <div
          class="col-12 col-md-5 d-flex align-items-start justify-content-center"
        >
          <img :src="jobModal.coverImage" class="job-image mw-100 " />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

const Job = namespace("job");

@Component({
  components: {
  },
  async fetch({ store, params }) {
    const jobID: string = params.jobID;
    if (jobID) {
      await store.dispatch(`job/getJobByID`, jobID);
    }
  }
})
export default class JobDetail extends Vue {
  @Job.State jobModal;
  async mounted() {}
}
</script>

<style scoped></style>
