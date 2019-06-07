<<template>
  <div>
    <div style="position: relative" class="navigation-bar">
      <base-nav type="secondary" effect="light" expand>
        <nuxt-link
          :to="localePath('index')"
          class="web-name  text-dark  d-none d-lg-block"
          exact
        >
          JAPAN WORD
        </nuxt-link>
        <div slot="content-header" slot-scope="{ closeMenu }" class="row">
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
            <close-button @click="closeMenu" />
          </div>
        </div>

        <ul class="navbar-nav ml-lg-auto">
          <li class="nav-item">
            <a class="nav-link nav-link-icon" @click="onNavigateToCompany()">
              {{ $t("common.company") }}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon">
              {{ $t("common.translator") }}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon" @click="onNavigateToCandidate()">
              {{ $t("common.create_cv") }}
            </a>
          </li>
          <li
            v-if="userInfo"
            class="pl-0 pl-lg-3 d-flex pt-3 pt-lg-0 justify-content-start align-items-center"
          >
            <p class="mb-0">
              {{ userInfo.email }}
            </p>
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
            <div v-if="!$auth.loggedIn" >
                <a class="nav-item text-button" @click="navigateLogin">
              {{ $t("authentication.sign_in") }}
            </a>
                <a class="nav-item text-button" @click="navigateRegister">
              {{ $t("authentication.register") }}
            </a>
              </div> 
          
            <span v-if="$auth.loggedIn"  >
              Hello, {{$auth.user.name}}!
            </span>
          </li>
        </ul>
      </base-nav>
    </div>


    <div class="body">
    <main>
      <Nuxt />
    </main>
    </div>
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

// import AuthenticationService from "~/services/authentication_service";

const LoginModal = namespace("loginModal");
const RegisterModal = namespace("registerModal");
const ConfirmationModal = namespace("confirmationModal");
const UserInfo = namespace("userInfo");

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

  @Watch("shouldOpen")
  onShouldOpenValueChange(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue && newValue === false) {
      // this.cleanLoginHashInRouteFullPath();
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
    // const authenticationService: AuthenticationService = AuthenticationService.getInstance();
    // await authenticationService.signOut();
    this.$router.replace(
      (this as any).localePath({
        name: "index"
      })
    );
  }
  // mounted(){
  //   console.log("storage " + this.$auth.user);
  // }
  onNavigateToCompany() {
    if (this.userInfo && this.userInfo.companyID) {
      return this.$router.push(
        (this as any).localePath({
          name: "companies-id",
          params: { id: this.userInfo.companyID }
        })
      );
    }
    return this.$router.push(
      (this as any).localePath({ name: "companies-create" })
    );
  }
  navigateLogin() {
    this.$router.push(
      (this as any).localePath({
        name: "login"
      })
    );
  }
  navigateRegister() {
    this.$router.push(
      (this as any).localePath({
        name: "register"
      })
    );
  }
  onNavigateToCandidate() {
    // if (this.userInfo && this.userInfo.companyID) {
    //   return this.$router.push(
    //     (this as any).localePath({
    //       name: "candidates-id",
    //       params: { id: this.userInfo.companyID }
    //     })
    //   );
    // }
    return this.$router.push(
      (this as any).localePath({ name: "candidates-create-basic" })
    );
  }
}
</script>

<style>
/* .body {
  padding-top: 70px;
} */
.navbar-nav .dropdown-menu.show {
  margin-top: 15px;
  left: -16px !important;
}
.web-name {
  font-size: 18px;
  font-weight: bold;
}

.navigation-bar {
  position: fixed !important;
  width: 100vw;
  z-index: 2;
}
.text-button:hover {
  cursor: pointer;
}
</style>
