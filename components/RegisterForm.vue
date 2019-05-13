<template>
  <card
    type="secondary"
    shadow
    header-classes="bg-white pb-5"
    body-classes="px-lg-5 py-lg-5"
    class="border-0"
  >
    <div class="text-muted text-center mb-3">
      <small> {{ $t("authentication.register_by") }}</small>
    </div>
    <div class="btn-wrapper text-center">
      <base-button type="neutral">
        <img
          slot="icon"
          src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Facebook-128.png"
        />
        Facebook
      </base-button>

      <base-button type="neutral">
        <img
          slot="icon"
          src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/common/google.svg"
        />
        Google
      </base-button>
    </div>
    <div class="text-center text-muted mb-4 mt-4">
      <small>{{ $t("authentication.or_register_by_account") }}</small>
    </div>
    <ValidationObserver ref="obs" tag="form">
      <v-text-field-type2-with-validation
        rules="required|email"
        v-model="email"
        type="email"
        :name="$t('authentication.email')"
        :placeholder="$t('authentication.enter_email')"
        :addon-left-icon="'ni ni-email-83'"
      />
      <v-text-field-type2-with-validation
        rules="required|min:8|max:32"
        v-model="password"
        type="password"
        :name="$t('authentication.password')"
        :placeholder="$t('authentication.enter_password')"
        :addon-left-icon="'ni ni-lock-circle-open'"
      />

      <small v-if="error.length > 0" class="text-danger small">{{
        error
      }}</small>
      <hr />
      <div class="pb-3 text-center">
        <small>{{ $t("common.select_role") }}</small>
      </div>

      <div class="row ">
        <div class="col-6 col-md-6  d-flex flex-column">
          <button
            type="button"
            @click="onUpdateRole('company')"
            :class="
              `btn btn-${
                role === 'company' ? '' : 'outline-'
              }info align-self-stretch`
            "
          >
            {{ $t("common.role_company") }}
          </button>
        </div>
        <div class="col-6 col-md-6  d-flex flex-column">
          <button
            type="button"
            @click="onUpdateRole('candidate')"
            :class="
              `btn btn-${
                role === 'candidate' ? '' : 'outline-'
              }info align-self-stretch`
            "
          >
            {{ $t("common.role_candidate") }}
          </button>
        </div>
        <div class="col-12 col-md-6 pt-3 d-flex flex-column">
          <button
            type="button"
            @click="onUpdateRole('translator')"
            :class="
              `btn btn-${
                role === 'translator' ? '' : 'outline-'
              }info align-self-stretch`
            "
          >
            {{ $t("common.role_translator") }}
          </button>
        </div>
      </div>
      <div class="text-center">
        <base-button type="default" class="my-4" @click="onSignUp">{{
          $t("authentication.register")
        }}</base-button>
      </div>
    </ValidationObserver>
  </card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
// import { auth } from "firebase/app";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { State, Action, Getter, namespace } from "vuex-class";

import VTextFieldType2WithValidation from "~/components/forms/VTextFieldType2WithValidation.vue";
import BaseInput from "~/argon-components/BaseInput.vue";
import BaseCheckbox from "~/argon-components/BaseCheckbox.vue";
import BaseButton from "~/argon-components/BaseButton.vue";
import Card from "~/argon-components/Card.vue";

// import { fbAuth } from "~/plugins/firebase";
import AuthenticationService from "~/services/authentication_service";
import UserInfoService from "~/services/user_info_service";
import UserInfoModal from "~/modals/user_info_modal";

const RegisterModal = namespace("registerModal");
const ConfirmationModal = namespace("confirmationModal");

@Component({
  components: {
    BaseInput,
    BaseCheckbox,
    BaseButton,
    Card,
    ValidationObserver,
    ValidationProvider,
    VTextFieldType2WithValidation
  }
})
export default class RegisterForm extends Vue {
  email: string = "";
  password: string = "";
  role: string = "company";
  error: string = "";

  @RegisterModal.Action setShouldOpenRegister;
  @ConfirmationModal.Action setShouldOpenConfirmation;
  @ConfirmationModal.Action setConfirmation;

  private openConfirmationModal() {
    this.setConfirmation({
      title: (this as any).$t("authentication.register_success"),
      message: (this as any).$t("authentication.please_verify_email")
    });
    this.setShouldOpenConfirmation(true);
  }
  onUpdateRole(role: string): void {
    this.role = role;
  }
  async onSignUp() {
    const result = await (this.$refs.obs as any).validate();
    if (result) {
      const authenticationService: AuthenticationService = AuthenticationService.getInstance();
      const userInfoService: UserInfoService = UserInfoService.getInstance();
      try {
        // const userCredential: auth.UserCredential = await authenticationService.signUp(
        //   this.email,
        //   this.password
        // );
        // await authenticationService.sendEmailVerification();
        // console.log("userCredential.user.uid");
        // const userInfoModal: UserInfoModal = new UserInfoModal();
        // if (userCredential && userCredential.user && userCredential.user.uid) {
        //   const id: string = userCredential.user.uid;
        //   userInfoModal.role = this.role;
        //   await userInfoService.createUserInfo(id, userInfoModal);
        // } else {
        //   throw "what the fuck???";
        // }
        this.setShouldOpenRegister(false);
        this.openConfirmationModal();
      } catch (e) {
        console.log("register error");
        console.log(e);
        this.error = e.message;
      }
    }
  }
}
</script>
