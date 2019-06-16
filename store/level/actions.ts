import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { plainToClass } from "class-transformer";
import { RootState } from 'store'
import { LevelState } from './state'
import {Common} from '~/modals'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  // create(context: ActionContext<S, R>, level: Common): void;
}

const actions: Actions<LevelState, RootState> = {
  async fetchList({commit, state}) {
    try{
      if(state.levels.length != 0) return;
      let results: Object[] = await this.$axios.$get("/api/levels");
      const list = plainToClass(Common, results["data"]);
      commit(types.FETCH_LIST, list)
    } catch(error){
      console.log("error.response " + error.toString());
    } finally{
    }
  }
}

export default actions
