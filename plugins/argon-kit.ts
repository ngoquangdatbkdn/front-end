import Vue from 'vue';
import "@/assets/vendor/nucleo/css/nucleo.css";
import "@/assets/vendor/font-awesome/css/font-awesome.css";
import "@/assets/scss/argon.scss";

import Badge from "../argon-components/Badge.vue";
import BaseAlert from "../argon-components/BaseAlert.vue";
import BaseButton from "../argon-components/BaseButton.vue";
import BaseCheckbox from "../argon-components/BaseCheckbox.vue";
import BaseInput from "../argon-components/BaseInput.vue";
import BasePagination from "../argon-components/BasePagination.vue";
import BaseProgress from "../argon-components/BaseProgress.vue";
import BaseRadio from "../argon-components/BaseRadio.vue";
import BaseSlider from "../argon-components/BaseSlider.vue";
import BaseSwitch from "../argon-components/BaseSwitch.vue";
import Card from "../argon-components/Card.vue";
import Icon from "../argon-components/Icon.vue";
// import globalComponents from "./globalComponents";
// import globalDirectives from "./globalDirectives";

//
// export default {
//   install(Vue) {
//     Vue.use(globalComponents);
//     // Vue.use(globalDirectives);
//
//   }
// };

Vue.component(Badge.name, Badge);
Vue.component(BaseAlert.name, BaseAlert);
Vue.component(BaseButton.name, BaseButton);
Vue.component(BaseInput.name, BaseInput);
Vue.component(BaseCheckbox.name, BaseCheckbox);
Vue.component(BasePagination.name, BasePagination);
Vue.component(BaseProgress.name, BaseProgress);
Vue.component(BaseRadio.name, BaseRadio);
Vue.component(BaseSlider.name, BaseSlider);
Vue.component(BaseSwitch.name, BaseSwitch);
Vue.component(Card.name, Card);
Vue.component(Icon.name, Icon);
