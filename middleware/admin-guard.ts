export default function ({ store, redirect }) {
    if (!store.state.auth.hasScope('admin')) {
        return redirect('/login')
    }
}
