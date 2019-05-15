import types from '~/store/loginModal/types'

export default function ({ store, redirect, route }) {
  if (store.state.userInfo.userInfo === null && isGuardRoute(route)) {
    // redirect("/#login");
  }
}

function isGuardRoute(route) {
  if (
    route.matched.some(
      record =>
        record.path.indexOf('companies/create') > -1 ||
        record.path.indexOf('jobs/create') > -1 ||
        record.path.indexOf('candidates/create') > -1
    )
  ) {
    return true
  }
  return false
}
