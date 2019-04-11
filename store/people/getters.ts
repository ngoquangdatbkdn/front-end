import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import {Person, State} from './state'

const getters: GetterTree<State, RootState> = {
  selectedPerson: state => {
    const p = state.people.find(person => person.id === state.selected)
    return p ? p : { first_name: 'Please,', last_name: 'select someone' }
  }
}
export default getters;