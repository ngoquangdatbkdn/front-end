<<template>
  <div>
    <div style="position: relative">
      <base-nav type="secondary" effect="light" expand>
        <nuxt-link
          :to="localePath('index')"
          class="web-name  text-dark  d-none d-lg-block"
          exact
        >
          JAPAN WORD
        </nuxt-link>
        <div class="row" slot="content-header" slot-scope="{ closeMenu }">
          <div class="col-6 collapse-brand">
            <nuxt-link
              :to="localePath('index')"
              class="web-name  text-dark"
              exact
            >
              JAPAN WORD
            </nuxt-link>
          </div>
          <div class="col-6 collapse-close secondary">
            <close-button @click="closeMenu"></close-button>
          </div>
        </div>

        <ul class="navbar-nav ml-lg-auto">
          <li v-if="isNotInSession || isCompanySession" class="nav-item">
            <a @click="onNavigateToCompany()" class="nav-link nav-link-icon">
              {{ $t("common.company") }}
            </a>
          </li>
          <li v-if="isNotInSession" class="nav-item">
            <a class="nav-link nav-link-icon" href="#">
              {{ $t("common.translator") }}
            </a>
          </li>
          <li v-if="isNotInSession || isCandidateSession" class="nav-item">
            <a
              @click="onNavigateToCandidate()"
              class="nav-link nav-link-icon"
              href="#"
            >
              {{ $t("common.create_cv") }}
            </a>
          </li>
          <li
            v-if="userInfo"
            class="pl-0 pl-lg-3 d-flex pt-3 pt-lg-0 justify-content-start align-items-center"
          >
            <p class="mb-0">{{ userInfo.email }}</p>
          </li>
          <li class="nav-link">
            <base-dropdown>
              <a slot="title" type="default" class="dropdown-toggle">
                <img
                  v-if="$i18n.locale === 'vi'"
                  src="~/assets/icons/vietnam.png"
                />
                <img v-else src="~/assets/icons/japan.png" />
              </a>
              <nuxt-link
                :to="switchLocalePath('vi')"
                active-class="none"
                exact
                class="dropdown-item"
              >
                <img src="~/assets/icons/vietnam.png" />
                {{ $t("common.vietnamese") }}
              </nuxt-link>
              <nuxt-link
                :to="switchLocalePath('ja')"
                active-class="none"
                exact
                class="dropdown-item"
              >
                <img src="~/assets/icons/japan.png" />
                {{ $t("common.japanese") }}
              </nuxt-link>
            </base-dropdown>
          </li>
          <li
            class="pl-0 pl-lg-3 d-flex pt-3 pt-lg-0 justify-content-start align-items-center"
          >
            <base-button
              v-if="!userInfo"
              class="nav-item"
              type="default"
              v-on:click="openRegisterModal"
            >
              {{ $t("authentication.register") }}
            </base-button>
            <base-button
              v-else
              class="nav-item"
              outline
              type="primary"
              @click="onSignOut"
            >
              {{ $t("authentication.sign_out") }}
            </base-button>
          </li>
          <li
            v-if="!userInfo"
            class="pl-0 pl-lg-3 d-flex pt-3 pt-lg-0 justify-content-start align-items-center"
          >
            <base-button
              class="nav-item"
              outline
              type="primary"
              v-on:click="openLoginModal"
            >
              {{ $t("authentication.sign_in") }}
            </base-button>
          </li>
        </ul>
      </base-nav>
    </div>

    <modal
      v-bind:show="shouldOpen"
      v-on:update:show="setShouldOpen($event)"
      body-classes="p-0"
      modal-classes="modal-dialog-centered"
    >
      <login-form />
    </modal>
    <modal
      v-bind:show="shouldOpenRegister"
      v-on:update:show="setShouldOpenRegister($event)"
      body-classes="p-0"
      modal-classes="modal-dialog-centered"
    >
      <register-form />
    </modal>

    <modal
      v-bind:show="shouldOpenConfirmation"
      v-on:update:show="setShouldOpenConfirmation($event)"
      body-classes="p-0"
      modal-classes="modal-dialog-centered"
    >
      <confirmation-form />
    </modal>
    <!--</header>-->
    <!--<div class="body">-->
    <main>
      <Nuxt />
    </main>
    <!--</div>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter, namespace } from "vuex-class";

import BaseNav from "~/argon-components/BaseNav.vue";
import BaseDropdown from "~/argon-components/BaseDropdown.vue";
import BaseButton from "~/argon-components/BaseButton.vue";
import CloseButton from "~/argon-components/CloseButton.vue";
import Modal from "~/argon-components/Modal.vue";

import LoginForm from "~/components/LoginForm.vue";
import RegisterForm from "~/components/RegisterForm.vue";
import ConfirmationForm from "~/components/ConfirmationForm.vue";

const LoginModal = namespace("loginModal");
const RegisterModal = namespace("registerModal");
const ConfirmationModal = namespace("confirmationModal");
const UserInfo = namespace("userInfo");

import AuthenticationService from "~/services/authentication_service";

@Component({
  components: {
    BaseNav,
    BaseDropdown,
    BaseButton,
    CloseButton,
    Modal,
    LoginForm,
    RegisterForm,
    ConfirmationForm
  }
})
export default class DefaultLayout extends Vue {
  @UserInfo.State userInfo;

  @LoginModal.State shouldOpen;
  @LoginModal.Action setShouldOpen;

  @RegisterModal.State shouldOpenRegister;
  @RegisterModal.Action setShouldOpenRegister;

  @ConfirmationModal.State shouldOpenConfirmation;
  @ConfirmationModal.Action setShouldOpenConfirmation;

  @Watch("$route.hash")
  onCurrentRouteHasChange(newValue: string, oldValue: string) {
    if (newValue !== oldValue && newValue === "#login") {
      if (this.shouldOpen === false) {
        this.setShouldOpen(true);
      }
    }
  }

  @Watch("shouldOpen")
  onShouldOpenValueChange(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue && newValue === false) {
      this.cleanLoginHashInRouteFullPath();
    }
    // this.$router.replace('/')
  }
  get isNotInSession(): boolean {
    if (!this.userInfo) return true;
    return false;
  }
  get isCompanySession(): boolean {
    if (!this.userInfo) return false;
    if (this.userInfo.role !== "company") return false;
    return true;
  }
  get isCandidateSession(): boolean {
    if (!this.userInfo) return false;
    if (this.userInfo.role !== "candidate") return false;
    return true;
  }
  async onSignOut() {
    const authenticationService: AuthenticationService = AuthenticationService.getInstance();
    await authenticationService.signOut();
    this.$router.replace(
      (this as any).localePath({
        name: "index"
      })
    );
  }

  openRegisterModal() {
    this.setShouldOpenRegister(true);
  }
  cleanLoginHashInRouteFullPath(): string {
    const cleanRoutePath: string = this.$router.currentRoute.fullPath.replace(
      this.$router.currentRoute.hash,
      ""
    );
    this.$router.replace(cleanRoutePath);
    return cleanRoutePath;
  }
  openLoginModal() {
    // if (this.$router.currentRoute.hash === "#login") {
    const cleanRoutePath: string = this.cleanLoginHashInRouteFullPath();
    // }
    const loginRoutePath: string = cleanRoutePath + "#login";
    this.$router.replace(loginRoutePath);
  }
  onNavigateToCompany() {
    if (this.userInfo && this.userInfo.companyID)
      return this.$router.push(
        (this as any).localePath({
          name: "companies-id",
          params: { id: this.userInfo.companyID }
        })
      );
    return this.$router.push(
      (this as any).localePath({ name: "companies-create" })
    );
  }
  onNavigateToCandidate() {
    if (this.userInfo && this.userInfo.companyID)
      return this.$router.push(
        (this as any).localePath({
          name: "candidates-id",
          params: { id: this.userInfo.companyID }
        })
      );
    return this.$router.push(
      (this as any).localePath({ name: "candidates-create" })
    );
  }
}
</script>

<style>
.body {
  margin-top: 100px;
}
.navbar-nav .dropdown-menu.show {
  margin-top: 15px;
  left: -16px !important;
}
.web-name {
  font-size: 18px;
  font-weight: bold;
}
/**, *:before, *:after {*/
/*padding: 0;*/
/*margin: 0;*/
/*box-sizing: border-box;*/
/*}*/
html,
body {
  background: #ced4da !important;
  color: #2e2f30;
  letter-spacing: 0.5px;
  /*font-size: 14px;*/
  /*font-family: "Source Sans Pro", Arial, sans-serif;*/
  height: 100vh;
  margin: 0;
}
</style>
