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
    class="col-12 col-sm-4 mt-4"
  >
    <div class="card">
      <div class="row m-0 d-flex flex-row flex-nowrap">
        <img :src="company.logo" class="company-image">
        <div class="d-flex flex-column flex-1">
          <span class="company-name">{{ company.name }}</span>
          <span class="sub-info">
            {{
            city[$i18n.locale] +
            ", " +
            district[$i18n.locale] +
            ", " +
            company.address
            }}
          </span>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { Company } from "~/modals";

const City = namespace("city");
const District = namespace("district");

@Component({})
export default class CompanyListItem extends Vue {
  @Prop({ type: Object, required: true }) company!: Company;
  @City.State cities;
  @District.State districts;

  get city() {
    return this.cities.filter(city => city.id === this.company.cityID)[0];
  }
  get district() {
    return this.districts.filter(
      district => district.id === this.company.districtID
    )[0];
  }
  mounted() {}
}
</script>

<style scoped>
.company-name {
  font-weight: 700;
  line-height: 20px;
  font-size: 14px;
  color: rgb(80, 88, 99);
}

.company-image {
  height: 32px;
  width: 32px;
  margin-left: 8px;
  margin-right: 12px;
}
.sub-info {
  font-weight: 400;
  line-height: 20px;
  font-size: 13px;
  color: rgb(80, 88, 99);
}

.card {
  border: 1px solid transparent;
  padding: 8px 0;
}
.card:hover {
  cursor: pointer;
  border: 1px solid #e7e7e7;
  box-shadow: 0 2px 6px 0 #dee0e3;
  border-radius: 3px;
}
</style>
