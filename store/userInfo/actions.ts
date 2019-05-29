import { ActionTree, ActionContext } from 'vuex'
import { RootState } from 'store'
// import { User } from "firebase/app";
import UserInfoModal from '~/modals/user_info_modal'
// import UserInfoService from '~/services/user_info_service'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  setUserInfo(context: ActionContext<S, R>, userInfo: UserInfoModal): void;
}

const actions: Actions<boolean, RootState> = {
  setUserInfo({ commit }, userInfo: UserInfoModal) {
    commit(types.SET_USER_INFO, userInfo)
  }
  // async getUserInfoByID({ commit, state }, userID: string) {
  //   const userInfoService = UserInfoService.getInstance();
  //   const userInfoModal: UserInfoModal | null = new UserInfoModal();
  //   // console.log('user info state')
  //   // console.log(state)
  //   if (!state) throw "why there are no state user info";
  //   commit(types.SET_USER_INFO, { ...(state as Object), ...userInfoModal });
  // },
  // async getUserInfoFromUser({ commit }, user: User) {
  //   const userInfoService = UserInfoService.getInstance();
  //   const userInfoModal: UserInfoModal | null = new UserInfoModal();
  //   commit(types.SET_USER_INFO, userInfoModal);
  // },
  // async updateUserInfoCompanyID(
  //   { commit },
  //   { userID, companyID }: { userID: string; companyID: string }
  // ) {
  //   const userInfoService = UserInfoService.getInstance();
  //   // await userInfoService.updateUserInfoCompanyID(userID, companyID);
  // }
}

export default actions
