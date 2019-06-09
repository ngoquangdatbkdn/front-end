import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { plainToClass } from "class-transformer";
import { RootState } from 'store'
import { DistrictState } from './state'
import {Common} from '~/modals'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  // create(context: ActionContext<S, R>, district: Common): void;
}

const actions: Actions<DistrictState, RootState> = {
  async fetchList({commit}) { 
    try{
      let results: Object[] = await this.$axios.$get("/api/districts");
      const list = plainToClass(Common, results["data"]);
      commit(types.FETCH_LIST, list)
    } catch(error){
      console.log("error.response " + error.toString());
    } finally{
    }
  }
}

export default actions
