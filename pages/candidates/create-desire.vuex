<template>
  <ValidationObserver ref="obs" tag="div">
    <div class="page-title py-4 text-center">
      <h4 class="mb-0">
        {{ $t("candidate.update_candidate_desire") }}
      </h4>
    </div>
    <div class="bg-white ">
      <div class="container  pt-5">
        <v-select-with-validation
          v-model="candidateModal.wantedContractType"
          rules="required"
          :options="contractTypeModalList"
          :label="$t('candidate.candidate_wanted_contract_type')"
          :description="
            $t('candidate.candidate_wanted_contract_type_description')
          "
          :name="$t('candidate.candidate_wanted_contract_type')"
          :reduce="businessModal => businessModal.id"
          :option-label="$i18n.locale"
        />
        <hr>
      </div>

      <div class="container  pt-5">
        <v-select-with-validation
          v-model="candidateModal.wantedJobTitle"
          rules="required"
          :options="contractTypeModalList"
          :label="$t('candidate.candidate_wanted_job_title')"
          :description="$t('candidate.candidate_wanted_job_title_description')"
          :name="$t('candidate.candidate_wanted_job_title')"
          :reduce="businessModal => businessModal.id"
          :option-label="$i18n.locale"
        />
        <hr>
      </div>

      <div class="container  pt-5">
        <v-select-with-validation
          v-model="candidateModal.wantedJobRank"
          rules="required"
          :options="contractTypeModalList"
          :label="$t('candidate.candidate_wanted_job_rank')"
          :description="$t('candidate.candidate_wanted_job_rank_description')"
          :name="$t('candidate.candidate_wanted_job_rank')"
          :reduce="businessModal => businessModal.id"
          :option-label="$i18n.locale"
        />
        <hr>
      </div>

      <div class="container  pt-5">
        <v-text-field-with-validation
          v-model="candidateModal.wantedSalary"
          rules="required|numeric"
          type="number"
          :label="$t('candidate.candidate_wanted_salary')"
          :description="$t('candidate.candidate_wanted_salary_description')"
          :name="$t('candidate.candidate_wanted_salary')"
          :placeholder="$t('candidate.enter_candidate_wanted_salary')"
        />
        <hr>
      </div>

      <div class="text-center pb-4">
        <button type="button" class="btn btn-primary my-4" @click="submit">
          {{ $t("candidate.update_candidate_desire") }}
        </button>
      </div>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import Card from '~/argon-components/Card.vue'

import VTextFieldWithValidation from '~/components/forms/VTextFieldWithValidation.vue'
import VSelectWithValidation from '~/components/forms/VSelectWithValidation.vue'
import VFileUploadWithValidation from '~/components/forms/VFileUploadWithValidation.vue'
import VEditorWithValidation from '~/components/forms/VEditorWithValidation.vue'
import VDatePickerWithValidation from '~/components/forms/VDatePickerWithValidation.vue'

import CandidateModal from '~/modals/candidate_modal'
import CityModal from '~/modals/city_modal'
import DistrictModal from '~/modals/district_modal'
import WardModal from '~/modals/ward_modal'
import LevelModal from '~/modals/level_modal'
import EducationModal from '~/modals/education_modal'
import CertificateModal from '~/modals/certificate_modal'
import LanguageModal from '~/modals/language_modal'

// import CandidateService from '~/services/candidate_service'

const City = namespace('city')
const District = namespace('district')
const Ward = namespace('ward')
const business = namespace('business')
const Candidate = namespace('candidate')
const UserInfo = namespace('userInfo')
const ContractType = namespace('contractType')

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
  @business.State businessModalList;
  @ContractType.State contractTypeModalList;

  @Candidate.Action createCandidate;
  @UserInfo.Action updateUserInfoCandidateID;
  @UserInfo.Action getUserInfoByID;

  @Candidate.State candidateID;
  @UserInfo.State userInfo;

  @Candidate.Mutation SET_COMPANY_ID;

  @Watch('candidateModal.city')
  onCandidateCityValueChanged(newVal: CityModal, oldVal: CityModal) {
    if (newVal !== oldVal) {
      this.collectedDistrictModalList = this.districtModalList.filter(
        (districtModal: DistrictModal) =>
          districtModal.cityID === (newVal as CityModal).id
      )
    }
  }

  @Watch('candidateModal.district')
  onCandidateDistrictValueChanged(
    newVal: DistrictModal,
    oldVal: DistrictModal
  ) {
    if (newVal !== oldVal) {
      this.collectedWardModalList = this.wardModalList.filter(
        (wardModal: WardModal) =>
          wardModal.districtID === (newVal as DistrictModal).id
      )
    }
  }

  mounted() {
    this.candidateModal = new CandidateModal()
    this.candidateModal.skills = []
    this.candidateModal.skills.push(new LevelModal())

    this.candidateModal.educations = []
    this.candidateModal.educations.push(new EducationModal())

    this.candidateModal.certificates = []
    this.candidateModal.certificates.push(new CertificateModal())

    this.candidateModal.languages = []
    this.candidateModal.languages.push(new LanguageModal())

    this.SET_COMPANY_ID(null)
  }
  async submit() {
    const result = await (this.$refs.obs as any).validate()
    // console.log("result " + result.toString());
    console.log('this.candidateModal ' + JSON.stringify(this.candidateModal))
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
    (this as any).candidateModal.skills.push(new LevelModal())
    this.candidateModal = {
      ...this.candidateModal,
      skills: this.candidateModal.skills
    }
  }
  onRemoveAnSkill(index: string) {
    (this as any).candidateModal.skills.splice(index, 1)
    this.candidateModal = {
      ...this.candidateModal,
      skills: this.candidateModal.skills
    }
  }
  onAddAnEducation() {
    (this as any).candidateModal.educations.push(new EducationModal())
    this.candidateModal = {
      ...this.candidateModal,
      educations: this.candidateModal.educations
    }
  }
  onRemoveAnEducation(index: string) {
    (this as any).candidateModal.educations.splice(index, 1)
    this.candidateModal = {
      ...this.candidateModal,
      educations: this.candidateModal.educations
    }
  }
  onAddAnCertificate() {
    (this as any).candidateModal.certificates.push(new CertificateModal())
    this.candidateModal = {
      ...this.candidateModal,
      certificates: this.candidateModal.certificates
    }
  }
  onRemoveAnCertificate(index: string) {
    (this as any).candidateModal.certificates.splice(index, 1)
    this.candidateModal = {
      ...this.candidateModal,
      certificates: this.candidateModal.certificates
    }
  }
  onAddAnLanguage() {
    (this as any).candidateModal.languages.push(new LanguageModal())
    this.candidateModal = {
      ...this.candidateModal,
      languages: this.candidateModal.languages
    }
  }
  onRemoveAnLanguage(index: string) {
    (this as any).candidateModal.languages.splice(index, 1)
    this.candidateModal = {
      ...this.candidateModal,
      languages: this.candidateModal.languages
    }
  }
}
</script>

<style scoped></style>
