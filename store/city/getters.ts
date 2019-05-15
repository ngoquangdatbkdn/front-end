import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { CityState } from './state'
// import CityModal from '~/modals/city_modal'
const getters: GetterTree<CityState, RootState> = {
  getCityModalList: (state) => {
    return state.cityModalList
  }
}
export default getters
