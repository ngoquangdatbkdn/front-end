export default function ({ store, redirect }) {
  console.log("here");
  console.log("user " + JSON.stringify(store.state.auth));
  if (store.state.auth.loggedIn) {
    return redirect('/login')
  }
}
