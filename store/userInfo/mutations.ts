import { MutationTree } from "vuex";
import { UserState } from "./state";
import UserInfoModal from '~/modals/user_info_modal'
import types from "./types";

const mutations: MutationTree<UserState> = {
  [types.SET_USER_INFO](state, userInfo: UserInfoModal) {
    state.userInfo = userInfo;
  }
};

export default mutations;
