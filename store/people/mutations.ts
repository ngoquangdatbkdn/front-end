import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { Person, State } from './state'
import types from './types'

const mutations: MutationTree<State> = {
  [types.SELECT](state, id: number) {
    state.selected = id
  },
  [types.SET](state, people: Person[]) {
    state.people = people
  }
}

export default mutations
