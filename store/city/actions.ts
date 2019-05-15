import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { CityState } from './state'
import CityModal from '~/modals/city_modal'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  create(context: ActionContext<S, R>, cityModal: CityModal): void;
}

const actions: Actions<CityState, RootState> = {
  create({ commit }, cityModal: CityModal) {
    commit(types.CREATE, cityModal)
  }
}

export default actions
