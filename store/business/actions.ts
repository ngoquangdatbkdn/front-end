import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { plainToClass } from "class-transformer";
import { BusinessState } from './state'
import Common from '~/modals/business_type_modal'
import types from './types'

export interface Actions<S, R> extends ActionTree<S, R> {
  // create(context: ActionContext<S, R>, business: Common): void;
}

const actions: Actions<BusinessState, RootState> = {
  async fetchList({commit, state}) { 
    try{
      if(state.businesses.length != 0) return;
      let results: Object[] = await this.$axios.$get("/api/businesses");
      const list = plainToClass(Common, results["data"]);
      commit(types.FETCH_LIST, list)
    } catch(error){
      console.log("error.response " + error.toString());
    } finally{
    }
  }
}

export default actions
