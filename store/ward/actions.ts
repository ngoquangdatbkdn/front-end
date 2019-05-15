import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { WardState } from './state'
import WardModal from '~/modals/ward_modal'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  create(context: ActionContext<S, R>, wardModal: WardModal): void;
}

const actions: Actions<WardState, RootState> = {
  create({ commit }, wardModal: WardModal) {
    commit(types.CREATE, wardModal)
  }
}

export default actions
