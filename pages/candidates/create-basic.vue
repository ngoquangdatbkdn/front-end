<template>
  <ValidationObserver ref="obs" tag="div">
    <div class="page-title py-4 text-center">
      <h4 class="mb-0">
        {{ $t("candidate.create_candidate_info") }}
      </h4>
    </div>
    <div class="bg-white ">
      <div class="container  pt-5">
        <v-text-field-with-validation
          v-model="candidateModal.fullName"
          rules="required"
          type="text"
          :label="$t('candidate.candidate_full_name')"
          :description="$t('candidate.candidate_full_name_description')"
          :name="$t('candidate.candidate_full_name')"
          :placeholder="$t('candidate.enter_candidate_full_name')"
        />
        <hr>

        <v-select-with-validation
          v-model="candidateModal.gender"
          rules="required"
          :options="genderList"
          :label="$t('common.gender')"
          :description="$t('common.gender_description')"
          :name="$t('common.gender')"
          :option-label="$i18n.locale"
        />
        <hr>
        <v-date-picker-with-validation
          v-model="candidateModal.dob"
          rules="required"
          type="text"
          :label="$t('candidate.candidate_date_of_birth')"
          :description="$t('candidate.candidate_date_of_birth_description')"
          :name="$t('candidate.candidate_date_of_birth')"
          :placeholder="$t('candidate.enter_candidate_date_of_birth')"
          :mode="'single'"
        />
        <hr>

        <v-text-field-with-validation
          v-model="candidateModal.email"
          rules="required|email"
          type="text"
          :label="$t('candidate.candidate_email')"
          :description="$t('candidate.candidate_email_description')"
          :name="$t('candidate.candidate_email')"
          :placeholder="$t('candidate.enter_candidate_email')"
        />
        <hr>

        <div class="row ">
          <div class="col-md-6 ">
            <p class="mb-0 font-weight-700 text-uppercase">
              {{ $t("candidate.candidate_address") }}
            </p>
            <p class="mb-3">
              {{ $t("candidate.candidate_address_description") }}
            </p>
          </div>
          <div class="col-md-6 ">
            <div class="form-group mb-0">
              <v-select-with-validation
                v-model="candidateModal.city"
                rules="required"
                :options="cityModalList"
                :label="$t('common.city')"
                :name="$t('common.city')"
                :isHalf="true"
                :option-label="$i18n.locale"
              />
              <div
                class="pt-3  position-relative"
              >
                <v-select-with-validation
                  v-model="candidateModal.district"
                  rules="required"
                  :options="collectedDistrictModalList"
                  :label="$t('common.district')"
                  :name="$t('common.district')"
                  :isHalf="true"
                  :option-label="$i18n.locale"
                />
              </div>
              <div
                class="pt-3 position-relative"
              >
                <v-text-field-with-validation
                  v-model="candidateModal.addressDetail"
                  rules="required"
                  type="text"
                  :label="$t('common.address_detail')"
                  :name="$t('common.address_detail')"
                  :placeholder="$t('common.enter_address_detail')"
                  :isHalf="true"
                />
              </div>
            </div>
          </div>
        </div>
        <hr>

        <v-file-upload-with-validation
          :key="'candidate_avatar'"
          v-model="candidateModal.avatar"
          rules="required"
          :label="$t('candidate.candidate_avatar')"
          :description="$t('candidate.candidate_avatar_description')"
          :name="$t('candidate.candidate_avatar')"
          :placeholder="$t('candidate.upload_candidate_avatar')"
          :unique="'candidate_avatar'"
        />
        <hr>

        <v-editor-with-validation
          v-model="candidateModal.summary"
          rules="required"
          :label="$t('candidate.candidate_summary')"
          :description="$t('candidate.candidate_summary_description')"
          :name="$t('candidate.candidate_summary')"
        />

        <hr>
      </div>

      <div class="text-center pb-4 d-flex flex-column align-items-center">
        <button
          type="button"
          class="btn btn-primary mt-4 mb-3"
          @click="submitThenNavigateBackgroundCreation"
        >
          {{ $t("candidate.continue_create_candidate_info") }}
        </button>

        <button
          type="button"
          class="btn btn-outline-primary mb-4"
          @click="submit"
        >
          {{ $t("candidate.just_create_basic_info") }}
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

import CandidateService from '~/services/candidate_service'

const City = namespace('city')
const District = namespace('district')
const Ward = namespace('ward')
const BusinessType = namespace('businessType')
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
  genderList: string[] = [];

  @City.State cityModalList;
  @District.State districtModalList;
  @Ward.State wardModalList;
  @BusinessType.State businessTypeModalList;
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

  mounted() {
    this.genderList = []
    // if(this.$t){
    //     this.genderList.push(this.$t("common.male"));
    //     this.genderList.push(this.$t("common.female"));
    //     this.genderList.push(this.$t("common.other_gender"));
    // }
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
    console.log('result ' + result.toString())
    console.log('this.candidateModal ' + JSON.stringify(this.candidateModal))
    if (result) {
      // this.candidateModal.shouldShow = false;
      //
      this.candidateModal.id = this.userInfo.id
      await this.createCandidate(this.candidateModal)
      this.$router.push(
        (this as any).localePath({
          name: 'candidates-id',
          params: { id: this.candidateID }
        })
      )
    }
  }
  async submitThenNavigateBackgroundCreation() {
    // await this.submit();
    this.$router.push(
      (this as any).localePath({
        name: 'candidates-create-background',
        params: { id: this.candidateID }
      })
    )
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
