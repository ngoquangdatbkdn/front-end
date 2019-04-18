import types from "~/store/loginModal/types";

export default function({ store, redirect, route }) {
  if (store.state.userInfo.userInfo === null && isGuardRoute(route)) {
    redirect("/#login");
  }
}

function isGuardRoute(route) {
  if (route.matched.some(record => record.path.indexOf("/create") > -1)) {
    return true;
  }
  return false;
}
