<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-4 card"
            body-classes="px-lg-4 py-lg-4"
            class="border-0"
          >
            <div class="title">
              <slot name="title">default header</slot>
            </div>

            <div class="content">
              <slot name="content">default body</slot>
            </div>

            <div class="buttons">
              <slot name="footer">
                <slot name="button1"></slot>
                <slot name="button2"></slot>
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
  transition: opacity 0.01s ease;
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

.title{
  text-align: center;
}
.title span {
  font-size: 24px;
  font-weight: 600
}
.content{
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}
.content span {
  font-size: 16px;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.buttons a{
  background-color: rgb(214, 214, 214);
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0px 10px;
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
