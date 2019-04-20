<template xmlns="http://www.w3.org/1999/html">
    <div v-html="companyModal.introduction"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {  namespace } from "vuex-class";
import CompanyModal from "../modals/company_modal";

const Company = namespace("company");

@Component({
  components: {}
})
export default class CompanyDetailTabs extends Vue {
    @Company.State companyModal;
}
</script>

<style scoped>
</style>
