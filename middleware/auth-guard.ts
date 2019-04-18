import types from "~/store/loginModal/types";

export default function({ store, redirect, route }) {
    console.log('isGuardRoute(route) ' + isGuardRoute(route));
  if (store.state.userInfo === null && isGuardRoute(route)) {
    store.commit(`loginModal/${types.SET_SHOULD_OPEN}`, true);
    redirect('/');
  }
}

function isGuardRoute(route) {
  if (route.matched.some(record => record.path.indexOf("/create"))) {
    return true;
  }
}
