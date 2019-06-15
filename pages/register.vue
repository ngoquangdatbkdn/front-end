<template>
  <div class="d-flex justify-content-center align-items-center login">
    <card
      v-if="!role"
      type="secondary"
      shadow
      header-classes="bg-white pb-5 card"
      body-classes="px-lg-5 py-lg-5"
      class="border-0"
    >
      <h5>{{$t('authentication.create_accountt_ask')}}</h5>
      <div class="d-flex flex-column">
        <a
          :class="`select-box ${selectedRole === 'COMPANY' ? 'selected' : ''}`"
          @click="selectRole('COMPANY')"
        >{{$t('authentication.company_role')}}</a>
        <a
          :class="`select-box ${selectedRole === 'CANDIDATE' ? 'selected' : ''}`"
          @click="selectRole('CANDIDATE')"
        >{{$t('authentication.candidate_role')}}</a>
        <a
          :class="`select-box ${selectedRole === 'TRANSLATOR' ? 'selected' : ''}`"
          @click="selectRole('TRANSLATOR')"
        >{{$t('authentication.translator_role')}}</a>
      </div>
      <div class="text-center">
        <base-button
          type="primary"
          class="mt-4"
          @click="confirmSelectRole"
        >{{ $t("authentication.register") }}</base-button>
      </div>
    </card>
    <card
      v-else
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
        <small v-if="error && error.length > 0" class="text-danger small">
          {{
          error
          }}
        </small>

        <div class="text-center d-flex flex-column">
          <a class="mt-4 mb-3 button" @click="onRegister">
            <span>{{ $t("authentication.register") }}</span>
          </a>
          <v-button :themeColor="'#2e2f30'" class="mt-4 mb-3 button" @click="onRegister">
            <span>{{ $t("authentication.register") }}</span>
          </v-button>

          <v-button :themeColor="'#999'" class="mt-4 mb-3 button" @click="onRegister">
            <span>{{ $t("authentication.register") }}</span>
          </v-button>

          <a class="mb-4 button-ghost" @click="backSelectRole">
            <span>{{ $t("common.back") }}</span>
          </a>
        </div>
      </ValidationObserver>
    </card>
    <modal v-if="showModal">
      <span slot="title">Register succeeded!</span>
      <span slot="content">{{$t('authentication.please_verify_email')}}</span>
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

import VSelectWithValidation from "~/components/forms/VSelectWithValidation.vue";
import VTextFieldType2WithValidation from "~/components/forms/VTextFieldType2WithValidation.vue";
import VButton from "~/components/VButton.vue";
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
    VSelectWithValidation,
    VButton
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
  selectedRole: string = "";
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
  backSelectRole() {
    this.selectedRole = "";
    this.role = "";
  }
  selectRole(role: string) {
    this.selectedRole = role;
  }
  confirmSelectRole() {
    this.role = this.selectedRole;
  }
  // classSelectRole(role: string): boolean {
  //   return this.selectedRole === role;
  // }
  onCloseModal() {
    this.showModal = false;
    this.$router.push("/login");
  }
  async onRegister() {
    console.log("role " + JSON.stringify(this.role));
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
.select-box {
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
  margin-top: 15px;
}
.select-box:hover {
  background-color: #82c1ed;
}
.select-box.selected {
  background-color: #82c1ed;
}
/* .button {
  padding: 15px;
  background-color: #82c1ed;
  border-radius: 10px;
}
.button > * {
  color: white;
}
.button:hover,
.button-ghost:hover {
  cursor: pointer;
  background-color: #82c1ed;
}
.button:hover > *,
.button-ghost:hover > * {
  color: white;
}
.button-ghost {
  padding: 15px;
  border: 1px solid #82c1ed;
  border-radius: 10px;
}
.button-ghost > * {
  color: #82c1ed;
} */
</style>
