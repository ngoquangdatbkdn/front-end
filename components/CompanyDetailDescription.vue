<template xmlns="http://www.w3.org/1999/html">
    <div>
  <div v-if="company" v-html="company.introduction" />
  <div v-if="job && job.company" v-html="job.company.introduction" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { Job, Company } from "~/modals";


@Component({
  components: {}
})
export default class CompanyDetailTabs extends Vue {
    @Prop({ type: Object, required: false }) company!: Company;
    @Prop({ type: Object, required: false }) job!: Job;
}
</script>

<style scoped>
</style>
