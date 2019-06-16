<template xmlns="http://www.w3.org/1999/html">
  <div>
     <a v-if="isMyCompany" class="edit-button" @click="onNavigateToCreateJob()">
              <span aria-hidden="true">
                <i class="fa fa-edit" aria-hidden="true"/>
              </span>
            </a>
    <!-- <base-button class="nav-item" type="primary" @click="createJob">
      {{ $t("job.add_job") }}
    </base-button> -->
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
import {Company, Job} from '~/modals'

@Component({
  components: {
    BaseButton,
    JobListItem
  },
  async asyncData({ $axios, params }) {
    console.log('fetch from back end');
    // const companyID: string = params.id;
    // console.log("companyID " + companyID.toString());

    // let result: Object = await $axios.$get("/api/companies/1");
    // let company: Company = plainToClass(Company, result["data"]);

    // let results: Object[] = await $axios.$get("/api/jobs");
    // const jobs = plainToClass(Job, results["data"]);

    // return {
    //   jobs,
    //   company
    // };
  },
})
export default class CompanyDetailJobList extends Vue {
   @Prop(Object) readonly company!: Company;
   @Prop(Boolean) readonly isMyCompany!: boolean;
  jobs: Job[] = [];
  mount() {
    // console.log('jobs')
    // console.log(this.jobs)
  }
  onNavigateToCreateJob() {
    this.$router.push(
      (this as any).localePath({
        name: 'companies-id-create-job',
        params: { id: this.company.id }
      })
    )
  }
}
</script>

<style scoped>
</style>
