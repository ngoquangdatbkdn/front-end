<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5 card"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <div class="modal-header">
              <slot name="header">default header</slot>
            </div>

            <div class="modal-body">
              <slot name="body">default body</slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <slot name="button">default body</slot>
                <!-- <button class="modal-default-button" @click="$emit('close')">OK</button> -->
              </slot>
            </div>
          </card>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import BaseButton from "~/argon-components/BaseButton.vue";
import Card from "~/argon-components/Card.vue";

@Component({
  components: {
    BaseButton,
    Card
  }
})
export default class LoginForm extends Vue {}
</script>

<style scope>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;

}

.modal-body {
  /* margin: 10px 0; */
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
