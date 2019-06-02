import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { DistrictState } from './state'
// import {Common} from '~/modals'
const getters: GetterTree<DistrictState, RootState> = {
  getDistricts: (state) => {
    return state.districts
  }
}
export default getters
