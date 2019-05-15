<template xmlns="http://www.w3.org/1999/html">
  <nuxt-link
    :to="
      localePath({
        name: 'companies-id',
        params: { id: company.id }
      })
    "
    active-class="none"
    exact
    class="col-12 col-sm-4 mt-4 "
  >
    <div class="p-3 border rounded">
      <div class="row align-items-center mx-0">
        <img :src="company.logo" class="company-logo mw-100 avatar mr-2 " />
        <span class="company-name  mr-auto">{{ company.name }}</span>
      </div>
      <p class="location-name mt-2">
        {{
          company.city['name_' +  $i18n.locale] +
            ", " +
            company.district['name_' + $i18n.locale] +
            ", " +
            company.address
        }}
      </p>
      <div class="row mx-0">
        <div class="mr-auto">
          <div class="row align-items-center mx-0">
            <i class="fa fa-dollar pr-1" />
            <p class="sub-info">
              {{ company.minSalary + " - " + company.maxSalary }}
            </p>
          </div>
        </div>
        <p class="sub-info">
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Company } from "../modals";

@Component({})
export default class CompanyListItem extends Vue {
  @Prop({ type: Object, required: true }) company!: Company;
}
</script>

<style scoped>
.company-name {
  font-weight: bold;
  font-size: 15px;
}

.location-name {
  font-size: 14px;
}

.sub-info {
  font-size: 14px;
  margin-bottom: 0;
}
</style>
