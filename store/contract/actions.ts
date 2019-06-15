import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { plainToClass } from "class-transformer";
import { RootState } from 'store'
import { ContractState } from './state'
import {Common} from '~/modals'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  // create(context: ActionContext<S, R>, contract: Common): void;
}

const actions: Actions<ContractState, RootState> = {
  async fetchList({commit, state}) {
    try{
      if(state.contracts.length != 0) return;
      let results: Object[] = await this.$axios.$get("/api/contracts");
      console.log("results " + JSON.stringify(results));
      const list = plainToClass(Common, results["data"]);
      commit(types.FETCH_LIST, list)
    } catch(error){
      console.log("error.response " + error.toString());
    } finally{
    }
  }
}

export default actions
