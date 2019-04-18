<template xmlns="http://www.w3.org/1999/html">
  <div class="col-12 col-sm-4 mt-4 ">
    <div class="py-3 px-4 border rounded">
      <div class="row">
        <span class="company-name  mr-auto">{{ companyModal.name }}</span>
      </div>
      <p class="location-name">{{ companyModal.location }}</p>
      <div class="row px-3">
        <div class="mr-auto">
          <div class="row align-items-center">
              <i class="fa fa-dollar pr-1"></i>
            <p class="sub-info">{{ companyModal.minSalary + ' - ' + companyModal.maxSalary }}</p>
          </div>
        </div>
        <p class="sub-info">{{ companyModal.activeJob }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import  CompanyModal  from "../modals/company_modal";

@Component({})
export default class CompanyListItem extends Vue {
  @Prop({ type: Object, required: true }) companyModal!: CompanyModal;
}
</script>

<style scoped>
.company-name {
  font-weight: bold;
  font-size: 18px;
}

.location-name {
  font-size: 16px;
}

.sub-info {
  font-size: 14px;
  margin-bottom: 0;
}
</style>
