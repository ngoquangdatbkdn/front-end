<template xmlns="http://www.w3.org/1999/html">
  <nuxt-link
    :to="
      localePath({
        name: 'companies-id-jobs-jobID',
        params: { id: jobModal.companyID, jobID: jobModal.id }
      })
    "
    active-class="none"
    exact
    class="col-12 col-sm-4 mt-4 "
  >
    <div class="job-card">
      <div class="row m-0">
        <img
          class="company-image"
          src="https://media.glassdoor.com/sqlm/991971/seas-education-squarelogo-1531865950680.png"
          alt=""
        />
        <div class="d-flex flex-column">
          <span class="company-name ">Công ty Thiên Đại Minh Uy</span>
          <span class="job-name ">{{ jobModal[`name_${$i18n.locale}`] }}</span>

          <div class="row  mx-0 flex-nowrap">
            <p class="sub-info">
              {{
                jobModal.city[$i18n.locale] +
                  ", " +
                  jobModal.district[$i18n.locale]
              }}
            </p>
          </div>

          <div class="row mx-0">
            <div class="mr-auto">
              <div class="row mx-0 align-items-center">
                <p class="sub-info">
                  {{ "¥" + jobModal.minSalary + " - ¥" + jobModal.maxSalary }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<!--<div class="row mx-0 align-items-center">-->
<!--<i class="fa fa-clock-o pr-1"></i>-->
<!--<p class="sub-info">{{ jobModal.lastUpdate }}</p>-->
<!--</div>-->

<!--<p class="company-name">{{ jobModal.companyID }}</p>-->

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
  font-weight: 600;
  font-size: 15px;
  color: rgb(32, 38, 46);
}

.company-name {
  font-weight: 500;
  line-height: 20px;
  font-size: 15px;
  color: rgb(80, 88, 99);
}

.sub-info {
  font-size: 12px;
  margin-bottom: 0;
  color: rgb(80, 88, 99);
  font-weight: 500;
  line-height: 20px;
}
.company-image {
  height: 32px;
  width: 32px;
  margin-left: 8px;
  margin-right: 12px;
}
.job-card {
  border: 1px solid transparent;
  padding: 8px 0;
}
.job-card:hover {
  cursor: pointer;
  border: 1px solid #e7e7e7;
  box-shadow: 0 2px 6px 0 #dee0e3;
  border-radius: 3px;
}
</style>
