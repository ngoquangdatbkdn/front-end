<template xmlns="http://www.w3.org/1999/html">
  <div>
    <base-button class="nav-item" type="primary" @click="createJob">
      {{ $t("job.add_job") }}
    </base-button>
    <div class="container row">
      <job-list-item
        v-for="(job, index) of jobs"
        :key="index"
        :job="job"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import BaseButton from '~/argon-components/BaseButton.vue'
import JobListItem from '~/components/JobListItem.vue'

const Company = namespace('company')
const Job = namespace('job')

@Component({
  components: {
    BaseButton,
    JobListItem
  }
})
export default class CompanyDetailJobList extends Vue {
  @Company.State companyModal;
  @Job.State jobs;
  mount() {
    console.log('jobs')
    console.log(this.jobs)
  }
  createJob() {
    this.$router.push(
      (this as any).localePath({
        name: 'companies-id-jobs-create',
        params: { id: this.companyModal.id }
      })
    )
  }
}
</script>

<style scoped></style>
