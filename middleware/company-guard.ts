export default function ({ store, redirect }) {
    if (!store.state.auth.hasScope('company')) {
        return redirect('/login')
    }
}
