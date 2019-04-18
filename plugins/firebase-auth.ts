import firebase from 'firebase/app'
import { fbAuth } from "~/plugins/firebase";
import types from "~/store/userInfo/types";

export default context => {
  const { store } = context;
  return new Promise((resolve, reject) => {
    fbAuth.onAuthStateChanged((user: firebase.User | any) => {
        // console.log('user ');
        // console.log(user);
      if (user) {
        return resolve(store.commit(`userInfo/${types.SET_USER_INFO}`, user.toJSON()));
      }
      return resolve(store.commit(`userInfo/${types.SET_USER_INFO}`, null));
    });
  });
};
