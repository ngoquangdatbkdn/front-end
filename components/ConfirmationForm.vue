<template>
  <card
    type="secondary"
    shadow
    header-classes="bg-white"
    body-classes="px-lg-5 py-lg-5"
    class="border-0"
  >
    <h6 slot="header" class="modal-title" id="modal-title-default">
      {{ title }}
    </h6>

    <p class="mb-0">
      {{ message }}
    </p>

    <template slot="footer">
      <div class="d-flex">
        <base-button v-if="false" type="primary">Save changes</base-button>
        <base-button
          type="link"
          class="ml-auto"
          @click="setShouldOpenConfirmation(false)"
          >OK
        </base-button>
      </div>
    </template>
  </card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
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
export default class ConfirmationForm extends Vue {
  get title(): string {
    if (!this.confirmation) return "";
    return this.confirmation.title;
  }
  get message(): string {
    if (!this.confirmation) return "";
    return this.confirmation.message;
  }
  @ConfirmationModal.State confirmation;

  @ConfirmationModal.Action setShouldOpenConfirmation;
}
</script>
