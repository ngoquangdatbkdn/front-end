import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { BusinessTypeState } from './state'
import Common from '~/modals/business_type_modal'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  create(context: ActionContext<S, R>, businessType: Common): void;
}

const actions: Actions<BusinessTypeState, RootState> = {
  create({ commit }, businessType: Common) {
    commit(types.CREATE, businessType)
  }
}

export default actions
