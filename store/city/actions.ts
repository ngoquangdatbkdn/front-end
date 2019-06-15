import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { plainToClass } from "class-transformer";
import { RootState } from 'store'

import { CityState } from './state'
import {Common} from '~/modals'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  // create(context: ActionContext<S, R>, city: Common): void;
}

const actions: Actions<CityState, RootState> = {
  async fetchList({commit, state}) { 
    try{
      if(state.cities.length != 0) return;
      let results: Object[] = await this.$axios.$get("/api/cities");
      const list = plainToClass(Common, results["data"]);
      commit(types.FETCH_LIST, list)
    } catch(error){
      console.log("error.response " + error.toString());
    } finally{
    }
  }
}

export default actions
