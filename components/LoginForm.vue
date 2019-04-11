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
    <form role="form">
      <base-input
        alternative
        class="mb-3"
        placeholder="Email"
        addon-left-icon="ni ni-email-83"
      >
      </base-input>
      <base-input
        alternative
        type="password"
        placeholder="Password"
        addon-left-icon="ni ni-lock-circle-open"
      >
      </base-input>
      <base-checkbox>
          {{ $t("authentication.remember_me") }}
      </base-checkbox>
      <div class="text-center">
        <base-button type="primary" class="my-4">{{ $t("common.sign_in") }}</base-button>
      </div>
    </form>
  </card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import BaseInput from "@/argon-components/BaseInput.vue";
import BaseCheckbox from "@/argon-components/BaseCheckbox.vue";
import BaseButton from "@/argon-components/BaseButton.vue";
import Card from "@/argon-components/Card.vue";

@Component({
  components: {
    BaseInput,
    BaseCheckbox,
    BaseButton,
    Card
  }
})
export default class LoginForm extends Vue {}
</script>
