import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { LevelState } from './state'
// import {Common} from '~/modals'
const getters: GetterTree<LevelState, RootState> = {
  // getLevels: (state) => {
  //   return state.levels
  // }
}
export default getters
