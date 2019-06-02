import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { plainToClass } from "class-transformer";
import { RootState } from 'store'

import { CityState } from './state'
import {Common} from '~/modals'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  create(context: ActionContext<S, R>, city: Common): void;
}

const actions: Actions<CityState, RootState> = {
  create({ commit }, city: Common) {
    commit(types.CREATE, city)
  },
  async getCities({ commit }, queryParams: any){
    const result: any = await this.$axios.$get("/api/cities");
    const cities  = plainToClass(Common , result['data']);
    commit(types.SET_CITIES, cities);
  }
}

export default actions
