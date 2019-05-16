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
    <div class="card">
      <div class="row  mx-0">
        <img :src="company.logo" class="company-image" />
        <div class="d-flex flex-column">
          <span class="company-name  ">{{ company.name }}</span>
          <span class="sub-info">
            {{
              company.city["name_" + $i18n.locale] +
                ", " +
                company.district["name_" + $i18n.locale] +
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
import { Company } from "../modals";

@Component({})
export default class CompanyListItem extends Vue {
  @Prop({ type: Object, required: true }) company!: Company;
}
</script>

<style scoped>
.company-name {
  font-weight: 500;
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
  font-weight: 500;
  line-height: 20px;
  font-size: 14px;
  color: rgb(80, 88, 99);
  font-weight: 300;
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
