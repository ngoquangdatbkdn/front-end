export default function ({ store, redirect }) {
    if (!store.state.auth.hasScope('candidate')) {
        return redirect('/login')
    }
}
