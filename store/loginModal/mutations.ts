import { MutationTree } from "vuex";
import { LoginModalState } from "./state";
import types from "./types";

const mutations: MutationTree<LoginModalState> = {
  [types.SET_SHOULD_OPEN](state, shouldOpen: boolean) {
    state.shouldOpen = shouldOpen;
  }
};

export default mutations;
