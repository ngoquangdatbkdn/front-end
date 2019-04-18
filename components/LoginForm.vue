<template>
  <card
    type="secondary"
    shadow
    header-classes="bg-white pb-5"
    body-classes="px-lg-5 py-lg-5"
    class="border-0"
  >
    <div class="text-muted text-center mb-3">
      <small> {{ $t("authentication.login_by") }}</small>
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
      <small>{{ $t("authentication.or_login_by_account") }}</small>
    </div>
    <ValidationObserver ref="obs" tag="form">
      <v-text-field-type2-with-validation
        rules="required"
        v-model="email"
        type="email"
        :name="$t('authentication.email')"
        :placeholder="$t('authentication.enter_email')"
        :addon-left-icon="'ni ni-email-83'"
      />
      <v-text-field-type2-with-validation
        rules="required"
        v-model="password"
        type="password"
        :name="$t('authentication.password')"
        :placeholder="$t('authentication.enter_password')"
        :addon-left-icon="'ni ni-lock-circle-open'"
      />
      <base-checkbox>
        {{ $t("authentication.remember_me") }}
      </base-checkbox>
      <div class="text-center">
        <base-button type="primary" class="my-4" @click="onSignIn">{{
          $t("authentication.sign_in")
        }}</base-button>
      </div>
    </ValidationObserver>
  </card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { auth } from "firebase/app";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { State, Action, Getter, namespace } from "vuex-class";

import VTextFieldType2WithValidation from "~/components/forms/VTextFieldType2WithValidation.vue";
import BaseInput from "@/argon-components/BaseInput.vue";
import BaseCheckbox from "@/argon-components/BaseCheckbox.vue";
import BaseButton from "@/argon-components/BaseButton.vue";
import Card from "@/argon-components/Card.vue";

import { fbAuth } from "~/plugins/firebase";
import AuthenticationService from "~/services/authentication_service";

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
export default class LoginForm extends Vue {
  email: string = "";
  password: string = "";

  async onSignIn() {
    const result = await (this.$refs.obs as any).validate();
    if (result) {
      const authenticationService: AuthenticationService = AuthenticationService.getInstance();
      const userCredential: auth.UserCredential = await authenticationService.signIn(
        this.email,
        this.password
      );
    }
  }
}
</script>
