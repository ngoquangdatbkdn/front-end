<template>
  <div class="d-flex justify-content-center align-items-center login">
    <card
      type="secondary"
      shadow
      header-classes="bg-white pb-5 card"
      body-classes="px-lg-5 py-lg-5"
      class="border-0"
    >
      <div class="text-muted text-center mb-3">
        <small>{{ $t("authentication.login_by") }}</small>
      </div>
      <div class="btn-wrapper text-center">
        <base-button type="neutral">
          <img
            slot="icon"
            src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/common/google.svg"
          >
          Google
        </base-button>
      </div>
      <div class="text-center text-muted mb-4 mt-4">
        <small>{{ $t("authentication.or_login_by_account") }}</small>
      </div>
      <ValidationObserver ref="obs" tag="form">
        <v-text-field-type2-with-validation
          v-model="name"
          rules="required"
          type="text"
          :name="$t('authentication.name')"
          :placeholder="$t('authentication.enter_name')"
          :addon-left-icon="'fa fa-user'"
        />
        <v-text-field-type2-with-validation
          v-model="email"
          rules="required|email"
          type="email"
          :name="$t('authentication.email')"
          :placeholder="$t('authentication.enter_email')"
          :addon-left-icon="'ni ni-email-83'"
        />
        <v-text-field-type2-with-validation
          v-model="password"
          rules="required|min:8|max:32"
          type="password"
          :name="$t('authentication.password')"
          :placeholder="$t('authentication.enter_password')"
          :addon-left-icon="'ni ni-lock-circle-open'"
        />

        <v-select-with-validation
          v-model="role"
          rules="required"
          :options="roles"
          :reduce="_role => _role.alias"
          :isHalf="true"
          :option-label="'vi'"
        />

        <small v-if="error && error.length > 0" class="text-danger small">
          {{
          error
          }}
        </small>

        <div class="text-center">
          <base-button
            type="primary"
            class="my-4"
            @click="onRegister"
          >{{ $t("authentication.register") }}</base-button>
        </div>
      </ValidationObserver>
    </card>
    <modal v-if="showModal">
      <h4 slot="header">Register succeeded!</h4>
      <h5 slot="body">{{$t('authentication.please_verify_email')}}</h5>
      <base-button
        slot="button"
        type="primary"
        class="mt-4"
        @click="onCloseModal"
      >{{ $t("authentication.sign_in") }}</base-button>
    </modal>
  </div>
</template>

<!--<base-button type="neutral">-->
<!--<img-->
<!--slot="icon"-->
<!--src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Facebook-128.png"-->
<!--&gt;-->
<!--Facebook-->
<!--</base-button>-->

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { namespace } from "vuex-class";

import VSelectWithValidation from '~/components/forms/VSelectWithValidation.vue'
import VTextFieldType2WithValidation from "~/components/forms/VTextFieldType2WithValidation.vue";
import BaseInput from "~/argon-components/BaseInput.vue";
import BaseCheckbox from "~/argon-components/BaseCheckbox.vue";
import BaseButton from "~/argon-components/BaseButton.vue";
import Card from "~/argon-components/Card.vue";

// const LoginModal = namespace("loginModal");
// const ConfirmationModal = namespace("confirmationModal");
// const UserInfo = namespace("userInfo");

@Component({
  components: {
    BaseInput,
    BaseCheckbox,
    BaseButton,
    Card,
    ValidationObserver,
    ValidationProvider,
    VTextFieldType2WithValidation,
    VSelectWithValidation
  },
  middleware: "guest-guard",
  async fetch({ store, params, $axios }) {
    // const result: any = await $axios.$post("/api/auth/login", {
    //   firstName: "Fred",
    //   lastName: "Flintstone"
    // });
    // console.log("result " + JSON.stringify(result));
  }
})
export default class Register extends Vue {
  name: string = "";
  email: string = "";
  password: string = "";
  role: string = "";
  roles: Object[] = [
    {
      alias: "COMPANY",
      vi: "Tài khoản công ty",
      ja: "Tài khoản công ty (nhật)"
    },
    {
      alias: "CANDIDATE",
      vi: "Tài khoản người tìm việc",
      ja: "Tài khoản người tìm việc (nhật)"
    }
  ];
  error: string = "";
  showModal: boolean = false;

  // private openConfirmationModal() {
  //   this.setConfirmation({
  //     title: (this as any).$t("authentication.email_has_not_been_verified"),
  //     message: (this as any).$t("authentication.please_verify_email")
  //   });
  //   this.setShouldOpenConfirmation(true);
  // }

  onCloseModal() {
    this.showModal = false;
    this.$router.push("/login");
  }
  async onRegister() {
    console.log("role " + JSON.stringify(this.role) );
    const result = await (this.$refs.obs as any).validate();
    if (result) {
      try {
        // const role: string = this.$route.hash
        //   ? this.$route.hash.substr(1, this.$route.hash.length)
        //   : "";
        await this.$axios.$post("/api/register", {
          email: this.email,
          password: this.password,
          name: this.name,
          role: (this.role as any).alias
        });
        this.showModal = true;
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.data.code;
        } else if (error.request) {
          this.error = error.request;
        } else {
          this.error = error.message;
        }
      }
    }
  }
}
</script>

<style scoped>
.login {
  height: calc(100vh - 76px);
}
.card {
  min-width: 400px;
  border-radius: 5px;
  /* top: 50%;
   left: 50%; */
  /* margin-right: -50%; */
  /* transform: translate(-50%, -50%) */
  /* margin-top: 100px; */
}
@media only screen and (max-width: 768px) {
  .card {
    min-width: calc(100% - 20px);
    border-radius: 5px;
  }
}
</style>
