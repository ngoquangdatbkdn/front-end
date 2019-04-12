<template xmlns="http://www.w3.org/1999/html">
  <div class="col-12 col-sm-4 mt-4 ">
    <div class="p-3 border rounded">
      <span class="job-name ">{{ jobModal.name }}</span>
      <p class="company-name">{{ jobModal.company }}</p>
      <div class="row align-items-center mx-0">
        <i class="fa fa-location-arrow pr-1"></i>
        <p class="sub-info">{{ jobModal.location }}</p>
      </div>

      <div class="row mx-0">
        <div class="mr-auto">
          <div class="row mx-0 align-items-center">
              <i class="fa fa-dollar pr-1"></i>
            <p class="sub-info">{{ jobModal.salaryRange }}</p>
          </div>
        </div>
          <div class="row mx-0 align-items-center">
              <i class="fa fa-clock-o pr-1"></i>
              <p class="sub-info">{{ jobModal.lastUpdate }}</p>
          </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import JobModal from "../modals/job_modal";
import Card from "~/argon-components/Card.vue";

@Component({
  components: {
    Card
  }
})
export default class JobListItem extends Vue {
  @Prop({ type: Object, required: true }) jobModal!: JobModal;
}
</script>

<style scoped>
.job-name {
  font-weight: bold;
  font-size: 18px;
}

.company-name {
  font-size: 16px;
}

.sub-info {
  font-size: 14px;
  margin-bottom: 0;
}
</style>
