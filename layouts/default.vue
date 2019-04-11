<<template>
  <div>
    <div style="position: relative">
      <base-nav type="secondary" effect="light" expand>
        <NuxtLink :to="$i18n.path('')" class="Header__Link" exact>
          <a class="web-name  text-dark  d-none d-lg-block" href="#"
            >JAPAN WORD</a
          >
        </NuxtLink>
        <div class="row" slot="content-header" slot-scope="{ closeMenu }">
          <div class="col-6 collapse-brand">
            <NuxtLink :to="$i18n.path('')" class="Header__Link" exact>
              <a class="web-name  text-dark" href="#">JAPAN WORD</a>
            </NuxtLink>
          </div>
          <div class="col-6 collapse-close secondary">
            <close-button @click="closeMenu"></close-button>
          </div>
        </div>

        <ul class="navbar-nav ml-lg-auto">
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#">
              {{ $t("common.company") }}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#">
              {{ $t("common.translator") }}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#">
              {{ $t("common.create_cv") }}
            </a>
          </li>
          <li class="nav-link">
            <base-dropdown title="Settings">
              <a slot="title" type="default" class="dropdown-toggle">
                <img
                  v-if="$i18n.locale === 'vi'"
                  src="~/assets/icons/vietnam.png"
                />
                <img v-else src="~/assets/icons/japan.png" />
              </a>

              <li>
                <NuxtLink
                  :to="`/vi` + $route.fullPath.replace(/^\/[^\/]+/, '')"
                  active-class="none"
                  exact
                >
                  <a class="dropdown-item" href="#">
                    <img src="~/assets/icons/vietnam.png" />
                    {{ $t("common.vietnamese") }}
                  </a>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  :to="$route.fullPath.replace(/^\/[^\/]+/, '')"
                  active-class="none"
                  exact
                >
                  <a class="dropdown-item" href="#">
                    <img src="~/assets/icons/japan.png" />
                    {{ $t("common.japanese") }}
                  </a>
                </NuxtLink>
              </li>
            </base-dropdown>
          </li>
          <li
            class="pl-0 pl-lg-3 d-flex pt-3 pt-lg-0 justify-content-start align-items-center"
          >
            <base-button
              class="nav-item"
              type="primary"
              v-on:click="shouldOpenModal = true"
            >
              {{ $t("common.sign_in") }}
            </base-button>
          </li>
        </ul>
      </base-nav>
    </div>

    <modal
      :show.sync="shouldOpenModal"
      body-classes="p-0"
      modal-classes="modal-dialog-centered"
    >
      <login-form />
    </modal>
    <!--</header>-->
    <!--<div class="body">-->
    <Nuxt />
    <!--</div>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseNav from "@/argon-components/BaseNav.vue";
import BaseDropdown from "@/argon-components/BaseDropdown.vue";
import BaseButton from "@/argon-components/BaseButton.vue";
import CloseButton from "@/argon-components/CloseButton.vue";
import Modal from "@/argon-components/Modal.vue";

import LoginForm from "@/components/LoginForm.vue";

@Component({
  components: {
    BaseNav,
    BaseDropdown,
    BaseButton,
    CloseButton,
    Modal,
    LoginForm
  }
})
export default class DefaultLayout extends Vue {
  shouldOpenModal = false;
}
</script>

<style>
.body {
  margin-top: 100px;
}
.navbar-nav .dropdown-menu.show {
  margin-top: 0px;
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
  background-color: #fff;
  color: #2e2f30;
  letter-spacing: 0.5px;
  /*font-size: 14px;*/
  /*font-family: "Source Sans Pro", Arial, sans-serif;*/
  height: 100vh;
  margin: 0;
}
</style>
