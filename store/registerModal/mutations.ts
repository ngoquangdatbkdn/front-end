import { MutationTree } from 'vuex'
import { RegisterModalState } from './state'
import types from './types'

const mutations: MutationTree<RegisterModalState> = {
  [types.SET_SHOULD_OPEN](state, shouldOpenRegister: boolean) {
    state.shouldOpenRegister = shouldOpenRegister
  }
}

export default mutations
