<template>
  <div>
    idk
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import {  namespace } from "vuex-class";
import CompanyService from "~/services/company_service";
import CompanyModal from "~/modals/company_modal";
import CompanyDetailTabs from "~/components/CompanyDetailTabs.vue";
import types from "~/store/company/types";

const Company = namespace("company");

@Component({
  components: {
    CompanyDetailTabs
  },
})
export default class CreateJob extends Vue {
  @Company.Action getCompanyByID;
  @Company.State companyModal;
  async mounted() {}
  async submit() {}
}
</script>

<style scoped></style>
