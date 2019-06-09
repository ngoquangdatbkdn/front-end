import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { CityState } from './state'
// import {Common} from '~/modals'
const getters: GetterTree<CityState, RootState> = {
  // getCities: (state) => {
  //   return state.cities
  // }
}
export default getters
