import { MutationTree } from "vuex";
import { UserState } from "./state";
import types from "./types";

const mutations: MutationTree<UserState> = {
  [types.SET_USER_INFO](state, userInfo: any) {
    state.userInfo = userInfo;
  }
};

export default mutations;
