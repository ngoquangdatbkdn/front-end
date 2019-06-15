<template xmlns="http://www.w3.org/1999/html">
  <nuxt-link
    v-if="job"
    :to="
      localePath({
        name: 'jobs-id',
        params: { id: job.id }
      })
    "
    active-class="none"
    exact
    class="col-12 col-sm-4 mt-4 "
  >
    <div class="job-card">
      <div class="row m-0 d-flex flex-row flex-nowrap">
        <img
          class="company-image "
          src="https://media.glassdoor.com/sqlm/991971/seas-education-squarelogo-1531865950680.png"
          alt=""
        />
        <div class="d-flex flex-column flex-1">
          <span class="job-name ">{{ job.name }}</span>
          <span  class="company-name "
            >{{ job.company }} -

            <span class="address">
              {{
                city[$i18n.locale] +
                  ", " +
                  district[$i18n.locale] +
                  ", " +
                  job.address
              }}
            </span>
          </span>

          <div class="row mx-0">
            <div class="mr-auto">
              <div class="row mx-0 align-items-center">
                <p class="salary">
                  {{ "¥" + job.minSalary + " - ¥" + job.maxSalary }}
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
<!--<p class="sub-info">{{ job.lastUpdate }}</p>-->
<!--</div>-->

<!--<p class="company-name">{{ job.companyID }}</p>-->

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Job } from "../modals";
import Card from "~/argon-components/Card.vue";

const City = namespace("city");
const District = namespace("district");

@Component({
  components: {
    Card
  }
})
export default class JobListItem extends Vue {
  @Prop({ type: Object, required: true }) job!: Job;
  @City.State cities;
  @District.State districts;

  get city() {
    return this.cities.filter(city => city.id === this.job.cityID)[0];
  }
  get district() {
    return this.districts.filter(
      district => district.id === this.job.districtID
    )[0];
  }
  mounted(){
    console.log("job " + JSON.stringify(this.job));
    console.log("city " + JSON.stringify(this.city));
    console.log("district " + JSON.stringify(this.district));
  }
}
</script>

<style scoped>
.job-name {
  font-weight: 900;
  font-size: 15px;
    color: #000;
}

.company-name {
  font-weight: 500;
  line-height: 20px;
  font-size: 14px;
  color: rgb(80, 88, 99);
}

.address {
}

.salary {
  font-size: 14px;
    margin-top: 5px;
  margin-bottom: 0;
  color: #a7a7a7;
  font-weight: 600;
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
.flex-1 {
  flex: 1;
}
</style>
