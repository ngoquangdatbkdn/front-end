<template>
  <ValidationObserver ref="obs" tag="div">
    <div class="page-title py-4 text-center">
      <h4 class="mb-0">{{ $t("candidate.create_candidate_info") }}</h4>
    </div>
    <div class="bg-white ">
      <div class="container  pt-5">
        <div class="row ">
          <div class="col-md-6 ">
            <p class="mb-0 font-weight-700 text-uppercase">
              {{ $t("candidate.candidate_address") }}
            </p>
            <p class="mb-3">
              {{ $t("candidate.candidate_address_description") }}
            </p>
          </div>
          <div class="col-md-6 d-flex flex-column">
            <card
              type="secondary"
              shadow
              v-for="(skill, index) in candidateModal.skills"
              :key="'skill' + index"
              :class="`${index > 0 ? 'mt-3' : ''} bg-white  form-group mb-0 d-flex flex-column`"
            >
              <button
                type="button"
                data-dismiss="alert"
                aria-label="Close"
                class="close"
                v-if="index > 0"
                @click="onRemoveAnSkill(index)"
              >
                <span aria-hidden="true">×</span>
              </button>
              <div :class="`${index > 0 ? 'mt-3' : ''}  position-relative`">
                <v-select-with-validation
                  rules="required"
                  v-model="skill.name"
                  :options="cityModalList"
                  :label="$t('common.city')"
                  :name="$t('common.city')"
                  :isHalf="true"
                  :optionLabel="$i18n.locale"
                />
              </div>
              <div class="pt-3  position-relative">
                <v-select-with-validation
                  rules="required"
                  v-model="skill.level"
                  :options="collectedDistrictModalList"
                  :label="$t('common.district')"
                  :name="$t('common.district')"
                  :isHalf="true"
                  :optionLabel="$i18n.locale"
                />
              </div>
            </card>
            <button
              type="button"
              class="btn btn-primary my-4 align-self-center"
              @click="onAddAnSkill()"
            >
              {{ $t("candidate.add_an_skill") }}
            </button>
          </div>
        </div>
        <hr />
      </div>

      <div class="text-center pb-4">
        <button type="button" class="btn btn-primary my-4" @click="submit">
          {{ $t("candidate.create_candidate_info") }}
        </button>
      </div>
    </div>
  </ValidationObserver>
</template>

<!--<v-text-field-with-validation-->
<!--rules="required"-->
<!--v-model="candidateModal.fullName"-->
<!--type="text"-->
<!--:label="$t('candidate.candidate_full_name')"-->
<!--:description="$t('candidate.candidate_full_name_description')"-->
<!--:name="$t('candidate.candidate_full_name')"-->
<!--:placeholder="$t('candidate.enter_candidate_full_name')"-->
<!--/>-->
<!--<hr />-->

<!--<v-date-picker-with-validation-->
<!--rules="required"-->
<!--v-model="candidateModal.dob"-->
<!--type="text"-->
<!--:label="$t('candidate.candidate_date_of_birth')"-->
<!--:description="$t('candidate.candidate_date_of_birth_description')"-->
<!--:name="$t('candidate.candidate_date_of_birth')"-->
<!--:placeholder="$t('candidate.enter_candidate_date_of_birth')"-->
<!--/>-->
<!--<hr />-->

<!--<v-text-field-with-validation-->
<!--rules="required|email"-->
<!--v-model="candidateModal.email"-->
<!--type="text"-->
<!--:label="$t('candidate.candidate_email')"-->
<!--:description="$t('candidate.candidate_email_description')"-->
<!--:name="$t('candidate.candidate_email')"-->
<!--:placeholder="$t('candidate.enter_candidate_email')"-->
<!--/>-->
<!--<hr />-->

<!--<div class="row ">-->
<!--<div class="col-md-6 ">-->
<!--<p class="mb-0 font-weight-700 text-uppercase">-->
<!--{{ $t("candidate.candidate_address") }}-->
<!--</p>-->
<!--<p class="mb-3">-->
<!--{{ $t("candidate.candidate_address_description") }}-->
<!--</p>-->
<!--</div>-->
<!--<div class="col-md-6 ">-->
<!--<div class="form-group mb-0">-->
<!--<v-select-with-validation-->
<!--rules="required"-->
<!--v-model="candidateModal.city"-->
<!--:options="cityModalList"-->
<!--:label="$t('common.city')"-->
<!--:name="$t('common.city')"-->
<!--:isHalf="true"-->
<!--:optionLabel="$i18n.locale"-->
<!--/>-->
<!--<div-->
<!--v-if="collectedDistrictModalList.length > 0"-->
<!--class="pt-3  position-relative"-->
<!--&gt;-->
<!--<v-select-with-validation-->
<!--rules="required"-->
<!--v-model="candidateModal.district"-->
<!--:options="collectedDistrictModalList"-->
<!--:label="$t('common.district')"-->
<!--:name="$t('common.district')"-->
<!--:isHalf="true"-->
<!--:optionLabel="$i18n.locale"-->
<!--/>-->
<!--</div>-->
<!--<div-->
<!--v-if="collectedWardModalList.length > 0"-->
<!--class="pt-3 position-relative"-->
<!--&gt;-->
<!--<v-select-with-validation-->
<!--rules="required"-->
<!--v-model="candidateModal.ward"-->
<!--:options="collectedWardModalList"-->
<!--:label="$t('common.ward')"-->
<!--:name="$t('common.ward')"-->
<!--:isHalf="true"-->
<!--:optionLabel="$i18n.locale"-->
<!--/>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--<hr />-->

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { ValidationObserver, ValidationProvider } from "vee-validate";

import Card from "~/argon-components/Card.vue";

import VTextFieldWithValidation from "~/components/forms/VTextFieldWithValidation.vue";
import VSelectWithValidation from "~/components/forms/VSelectWithValidation.vue";
import VFileUploadWithValidation from "~/components/forms/VFileUploadWithValidation.vue";
import VEditorWithValidation from "~/components/forms/VEditorWithValidation.vue";
import VDatePickerWithValidation from "~/components/forms/VDatePickerWithValidation.vue";

import CandidateModal from "~/modals/candidate_modal";
import CityModal from "~/modals/city_modal";
import DistrictModal from "~/modals/district_modal";
import WardModal from "~/modals/ward_modal";
import LevelModal from "~/modals/level_modal";

import CandidateService from "~/services/candidate_service";

const City = namespace("city");
const District = namespace("district");
const Ward = namespace("ward");
const BusinessType = namespace("businessType");
const Candidate = namespace("candidate");
const UserInfo = namespace("userInfo");

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    VTextFieldWithValidation,
    VSelectWithValidation,
    VFileUploadWithValidation,
    VEditorWithValidation,
    VDatePickerWithValidation,
    Card
  }
})
export default class CreateCandidate extends Vue {
  candidateModal: CandidateModal = new CandidateModal();
  collectedDistrictModalList: DistrictModal[] = [];
  collectedWardModalList: WardModal[] = [];

  @City.State cityModalList;
  @District.State districtModalList;
  @Ward.State wardModalList;
  @BusinessType.State businessTypeModalList;

  @Candidate.Action createCandidate;
  @UserInfo.Action updateUserInfoCandidateID;
  @UserInfo.Action getUserInfoByID;

  @Candidate.State candidateID;
  @UserInfo.State userInfo;

  @Candidate.Mutation SET_COMPANY_ID;

  @Watch("candidateModal.city")
  onCandidateCityValueChanged(newVal: CityModal, oldVal: CityModal) {
    if (newVal !== oldVal) {
      this.collectedDistrictModalList = this.districtModalList.filter(
        (districtModal: DistrictModal) =>
          districtModal.cityID === (newVal as CityModal).id
      );
    }
  }

  @Watch("candidateModal.district")
  onCandidateDistrictValueChanged(
    newVal: DistrictModal,
    oldVal: DistrictModal
  ) {
    if (newVal !== oldVal) {
      this.collectedWardModalList = this.wardModalList.filter(
        (wardModal: WardModal) =>
          wardModal.districtID === (newVal as DistrictModal).id
      );
    }
  }

  mounted() {
    this.candidateModal = new CandidateModal();
    this.candidateModal.skills = [];
    this.candidateModal.skills.push(new LevelModal());
    this.SET_COMPANY_ID(null);
  }
  async submit() {
    const result = await (this.$refs.obs as any).validate();
    // console.log("result " + result.toString());
    console.log("this.candidateModal " + this.candidateModal.toString());
    if (result) {
      // this.candidateModal.shouldShow = false;
      //
      // await this.createCandidate(this.candidateModal);
      // await this.updateUserInfoCandidateID({
      //   userID: this.userInfo.id,
      //   candidateID: this.candidateID
      // });
      // await this.getUserInfoByID(this.userInfo.id);
      // this.$router.push(
      //   (this as any).localePath({
      //     name: "companies-id",
      //     params: { id: this.candidateID }
      //   })
      // );
    }
  }
  onAddAnSkill() {
    (this as any).candidateModal.skills.push(new LevelModal());
    this.candidateModal = {
      ...this.candidateModal,
      skills: this.candidateModal.skills
    };
  }
  onRemoveAnSkill(index: string) {
    (this as any).candidateModal.skills.splice(index, 1);
    this.candidateModal = {
      ...this.candidateModal,
      skills: this.candidateModal.skills
    };
  }
}
</script>

<style scoped></style>
