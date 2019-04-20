import { MutationTree } from "vuex";
import { ConfirmationModalState } from "./state";
import types from "./types";

const mutations: MutationTree<ConfirmationModalState> = {
  [types.SET_SHOULD_OPEN](state, shouldOpenConfirmation: boolean) {
    state.shouldOpenConfirmation = shouldOpenConfirmation;
  },
  [types.SET_CONFIRMATION](state, confirmation: any) {
    state.confirmation = confirmation;
  }
};

export default mutations;
