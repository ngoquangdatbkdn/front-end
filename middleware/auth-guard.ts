import types from "~/store/loginModal/types";

export default function({ store, redirect, route }) {
  console.log("store.state.auth.user " + JSON.stringify(store.state.auth.user));
  if (
    (isGuard(route, "jobs/create") || isGuard(route, "companies/create")) &&
    !checkRole(store, "COMPANY")
  ) {
    return redirect("/login#COMPANY");
  }
  if (isGuard(route, "candidates/create") && !checkRole(store, "CANDIDATE")) {
    return redirect("/login#CANDIDATE");
  }
}

function checkRole(store, role) {
  if (!store.state.auth.user) return false;
  if (store.state.auth.user.role != role) return false;
  return true;
}
function isGuard(route, path) {
  if (route.matched.some(record => record.path.indexOf(path) > -1)) {
    return true;
  }
  return false;
}
