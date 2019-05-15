<template>
  <ValidationObserver ref="obs" tag="div">
    <div class="page-title py-4 text-center">
      <h4 class="mb-0">
        {{ $t("candidate.update_candidate_background") }}
      </h4>
    </div>
    <div class="bg-white ">
      <div class="container  pt-5">
        <div class="row ">
          <div class="col-md-6 ">
            <p class="mb-0 font-weight-700 text-uppercase">
              {{ $t("candidate.candidate_certificate") }}
            </p>
            <p class="mb-3">
              {{ $t("candidate.candidate_certificate_description") }}
            </p>
          </div>
          <div class="col-md-6 d-flex flex-column">
            <card
              v-for="(certificate, index) in candidateModal.certificates"
              :key="'certificate' + index"
              type="secondary"
              shadow
              :class="
                `${
                  index > 0 ? 'mt-3' : ''
                } bg-white  form-group mb-0 d-flex flex-column`
              "
            >
              <button
                v-if="index > 0"
                type="button"
                data-dismiss="alert"
                aria-label="Close"
                class="close"
                @click="onRemoveAnCertificate(index)"
              >
                <span aria-hidden="true">×</span>
              </button>
              <div :class="`${index > 0 ? 'mt-3' : ''}  position-relative`">
                <v-text-field-with-validation
                  v-model="certificate.name"
                  rules="required"
                  type="text"
                  :label="$t('candidate.candidate_certificate_name')"
                  :name="$t('candidate.candidate_certificate_name')"
                  :placeholder="
                    $t('candidate.enter_candidate_certificate_name')
                  "
                  :is-half="true"
                />
              </div>
              <div class="pt-3  position-relative">
                <v-date-picker-with-validation
                  v-model="certificate.timeGot"
                  rules="required"
                  type="text"
                  :label="$t('candidate.candidate_certificate_time')"
                  :name="$t('candidate.candidate_certificate_time')"
                  :placeholder="
                    $t('candidate.enter_candidate_certificate_time')
                  "
                  :mode="'single'"
                  :is-half="true"
                />
              </div>
            </card>
            <button
              type="button"
              class="btn btn-primary my-4 align-self-center"
              @click="onAddAnCertificate()"
            >
              {{ $t("candidate.add_an_education") }}
            </button>
          </div>
        </div>
        <hr>
      </div>

      <div class="container  pt-5">
        <div class="row ">
          <div class="col-md-6 ">
            <p class="mb-0 font-weight-700 text-uppercase">
              {{ $t("candidate.candidate_education") }}
            </p>
            <p class="mb-3">
              {{ $t("candidate.candidate_education_description") }}
            </p>
          </div>
          <div class="col-md-6 d-flex flex-column">
            <card
              v-for="(education, index) in candidateModal.educations"
              :key="'education' + index"
              type="secondary"
              shadow
              :class="
                `${
                  index > 0 ? 'mt-3' : ''
                } bg-white  form-group mb-0 d-flex flex-column`
              "
            >
              <button
                v-if="index > 0"
                type="button"
                data-dismiss="alert"
                aria-label="Close"
                class="close"
                @click="onRemoveAnEducation(index)"
              >
                <span aria-hidden="true">×</span>
              </button>
              <div :class="`${index > 0 ? 'mt-3' : ''}  position-relative`">
                <v-text-field-with-validation
                  v-model="education.school"
                  rules="required"
                  type="text"
                  :label="$t('candidate.candidate_school')"
                  :name="$t('candidate.candidate_school')"
                  :placeholder="$t('candidate.enter_candidate_school')"
                  :is-half="true"
                />
              </div>
              <div class="pt-3  position-relative">
                <v-text-field-with-validation
                  v-model="education.major"
                  rules="required"
                  type="text"
                  :label="$t('candidate.candidate_major')"
                  :name="$t('candidate.candidate_major')"
                  :placeholder="$t('candidate.enter_candidate_major')"
                  :is-half="true"
                />
              </div>
              <div class="pt-3  position-relative">
                <v-date-picker-with-validation
                  v-model="education.range"
                  rules="required"
                  type="text"
                  :label="$t('candidate.candidate_education_time_range')"
                  :name="$t('candidate.candidate_education_time_range')"
                  :placeholder="
                    $t('candidate.enter_candidate_education_time_range')
                  "
                  :mode="'range'"
                  :is-half="true"
                />
              </div>
              <div class="pt-3  position-relative">
                <v-text-field-with-validation
                  v-model="education.result"
                  rules="required"
                  type="text"
                  :label="$t('candidate.candidate_education_result')"
                  :name="$t('candidate.candidate_education_result')"
                  :placeholder="
                    $t('candidate.enter_candidate_education_result')
                  "
                  :is-half="true"
                />
              </div>
            </card>
            <button
              type="button"
              class="btn btn-primary my-4 align-self-center"
              @click="onAddAnEducation()"
            >
              {{ $t("candidate.add_an_education") }}
            </button>
          </div>
        </div>
        <hr>
      </div>

      <div class="container  pt-5">
        <div class="row ">
          <div class="col-md-6 ">
            <p class="mb-0 font-weight-700 text-uppercase">
              {{ $t("candidate.candidate_skill_list") }}
            </p>
            <p class="mb-3">
              {{ $t("candidate.candidate_skill_list_description") }}
            </p>
          </div>
          <div class="col-md-6 d-flex flex-column">
            <card
              v-for="(skill, index) in candidateModal.skills"
              :key="'skill' + index"
              type="secondary"
              shadow
              :class="
                `${
                  index > 0 ? 'mt-3' : ''
                } bg-white  form-group mb-0 d-flex flex-column`
              "
            >
              <button
                v-if="index > 0"
                type="button"
                data-dismiss="alert"
                aria-label="Close"
                class="close"
                @click="onRemoveAnSkill(index)"
              >
                <span aria-hidden="true">×</span>
              </button>
              <div :class="`${index > 0 ? 'mt-3' : ''}  position-relative`">
                <v-text-field-with-validation
                  v-model="skill.name"
                  rules="required"
                  type="text"
                  :label="$t('candidate.candidate_skill')"
                  :name="$t('candidate.candidate_skill')"
                  :placeholder="$t('candidate.enter_candidate_skill')"
                  :is-half="true"
                />
              </div>
              <div class="pt-3  position-relative">
                <v-select-with-validation
                  v-model="skill.level"
                  rules="required|numeric"
                  :options="[1, 2, 3, 4, 5]"
                  :label="$t('candidate.candidate_skill_level')"
                  :name="$t('common.district')"
                  :is-half="true"
                  :option-label="$i18n.locale"
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
        <hr>
      </div>

      <div class="container  pt-5">
        <div class="row ">
          <div class="col-md-6 ">
            <p class="mb-0 font-weight-700 text-uppercase">
              {{ $t("candidate.candidate_language") }}
            </p>
            <p class="mb-3">
              {{ $t("candidate.candidate_language_description") }}
            </p>
          </div>
          <div class="col-md-6 d-flex flex-column">
            <card
              v-if="candidateModal.japaneseCertificate"
              type="secondary"
              shadow
              class="bg-white  form-group mb-0 d-flex flex-column"
            >
              <div class="pt-3  position-relative">
                <v-text-field-with-validation
                  v-model="candidateModal.japaneseCertificate.result"
                  rules="required|numeric"
                  type="number"
                  :label="$t('candidate.candidate_language_result')"
                  :name="$t('candidate.candidate_language_result')"
                  :placeholder="$t('candidate.enter_candidate_language_result')"
                  :is-half="true"
                />
              </div>
              <div class="pt-3  position-relative">
                <v-date-picker-with-validation
                  v-model="candidateModal.japaneseCertificate.timeGot"
                  rules="required"
                  type="text"
                  :label="$t('candidate.candidate_language_time')"
                  :name="$t('candidate.candidate_language_time')"
                  :placeholder="$t('candidate.enter_candidate_language_time')"
                  :mode="'single'"
                  :is-half="true"
                />
              </div>
            </card>
          </div>
        </div>
        <hr>
      </div>

      <div class="container  pt-5">
        <div class="row ">
          <div class="col-md-6 ">
            <p class="mb-0 font-weight-700 text-uppercase">
              {{ $t("candidate.candidate_language") }}
            </p>
            <p class="mb-3">
              {{ $t("candidate.candidate_language_description") }}
            </p>
          </div>
          <div class="col-md-6 d-flex flex-column">
            <card
              v-for="(language, index) in candidateModal.languages"
              :key="'language' + index"
              type="secondary"
              shadow
              :class="
                `${
                  index > 0 ? 'mt-3' : ''
                } bg-white  form-group mb-0 d-flex flex-column`
              "
            >
              <button
                v-if="index > 0"
                type="button"
                data-dismiss="alert"
                aria-label="Close"
                class="close"
                @click="onRemoveAnLanguage(index)"
              >
                <span aria-hidden="true">×</span>
              </button>
              <div :class="`${index > 0 ? 'mt-3' : ''}  position-relative`">
                <v-text-field-with-validation
                  v-model="language.name"
                  rules="required"
                  type="text"
                  :label="$t('candidate.candidate_language_name')"
                  :name="$t('candidate.candidate_language_name')"
                  :placeholder="$t('candidate.enter_candidate_language_name')"
                  :is-half="true"
                />
              </div>
              <div class="pt-3  position-relative">
                <v-text-field-with-validation
                  v-model="language.result"
                  rules="required|numeric"
                  type="number"
                  :label="$t('candidate.candidate_language_result')"
                  :name="$t('candidate.candidate_language_result')"
                  :placeholder="$t('candidate.enter_candidate_language_result')"
                  :is-half="true"
                />
              </div>
              <div class="pt-3  position-relative">
                <v-date-picker-with-validation
                  v-model="language.timeGot"
                  rules="required"
                  type="text"
                  :label="$t('candidate.candidate_language_time')"
                  :name="$t('candidate.candidate_language_time')"
                  :placeholder="$t('candidate.enter_candidate_language_time')"
                  :mode="'single'"
                  :is-half="true"
                />
              </div>
            </card>
            <button
              type="button"
              class="btn btn-primary my-4 align-self-center"
              @click="onAddAnLanguage()"
            >
              {{ $t("candidate.add_an_language") }}
            </button>
          </div>
        </div>
        <hr>
      </div>

      <div class="text-center pb-4">
        <button type="button" class="btn btn-primary my-4" @click="submit">
          {{ $t("candidate.update_candidate_background") }}
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
  collectedWardModalList: WardModal[] = [];

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

    this.candidateModal.japaneseCertificate = new LanguageModal()

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
