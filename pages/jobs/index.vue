<template>
  <div>
    idk
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import CompanyDetailTabs from '~/components/CompanyDetailTabs.vue'

const Company = namespace('company')

@Component({
  components: {
    CompanyDetailTabs
  },
})
export default class CreateJob extends Vue {
  @Company.State companyModal;
  async mounted() {}
  async submit() {}
}
</script>

<style scoped></style>
