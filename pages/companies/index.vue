<template>
  <div class="main">
    <div class="container">
      <div class="row col-12 m-0">
        <v-select
          class="col-12 col-lg-3  p-0  m-2"
          :options="contractTypes"
          :clearable="false"
          :clearSearchOnSelect="false"
          :searchable="false"
          :value="selectedContractType"
          @input="setSelectedContractType"
        >
          <template slot="option" slot-scope="option">
            <div
              class="option d-flex flex-row justify-content-between align-items-center"
              v-if="option.label === selectedContractType.label"
            >
              <span> {{ option.label }} ({{ option.amount }}) </span>
              <i class="fa fa-check" />
            </div>
            <div v-else class="option">
              <span> {{ option.label }} ({{ option.amount }}) </span>
            </div>
          </template>
          <template slot="selected-option" slot-scope="option">
            <div class="option">
              <span> {{ option.label }} ({{ option.amount }}) </span>
            </div>
          </template>
        </v-select>
        <select-slider
          class="col-12 col-lg-3 p-0  m-2"
          :searchable="false"
          :closeOnSelect="false"
          :clearable="false"
          :clearSearchOnSelect="false"
          :range="salaryRangeLimitation"
          :value="salaryRange"
          @input="setSalaryRange"
        ></select-slider>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import SelectSlider from "~/components/SelectSlider.vue";
@Component({
  components: {
    SelectSlider
  }
})
export default class Index extends Vue {
  salaryRange = [0, 30000];
  salaryRangeLimitation = [0, 90000];
  contractTypes = [
    { label: "Any type", amount: 214 },
    { label: "Full time", amount: 200 },
    { label: "Part time", amount: 10 },
    { label: "Contract", amount: 3 },
    { label: "Temporary", amount: 1 }
  ];
  selectedContractType = { label: "Any type", amount: 214 };
  setSelectedContractType(contractType) {
    console.log("contractType " + JSON.stringify(contractType));
    if (this) this.selectedContractType = { ...contractType };
  }
  setSalaryRange(salaryRange: number[]) {
    this.salaryRange = [...salaryRange];
  }
  async mounted() {}
}
</script>

<style scoped>
.main {
  margin-top: 70px;
  background: white;
  padding-bottom: 1000px;
}
.option {
  /*width: 240px;*/
}
</style>
