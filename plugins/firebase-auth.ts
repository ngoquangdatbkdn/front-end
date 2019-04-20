import { User } from "firebase/app";
import { fbAuth } from "~/plugins/firebase";
import types from "~/store/userInfo/types";
import UserInfoModal from "~/modals/user_info_modal";
import UserInfoService from "~/services/user_info_service";
import AuthenticationService from "~/services/authentication_service";

export default context => {
  const { store } = context;
  return new Promise((resolve, reject) => {
    fbAuth.onAuthStateChanged(async (user: User | any) => {
      // console.log('user ');
      // console.log(user);
      if (!user || (user && !user.emailVerified)) {
        return resolve(store.commit(`userInfo/${types.SET_USER_INFO}`, null));
      }
      // const userInfoService: UserInfoService = UserInfoService.getInstance();
      // const userInfoModal: UserInfoModal = await userInfoService.getUserInfoFromUser(
      //   user
      // );
      return resolve(
        store.dispatch(`userInfo/getUserInfoFromUser`, user)
        // store.commit(`userInfo/${types.SET_USER_INFO}`, userInfoModal)
      );
    });
  });
};
