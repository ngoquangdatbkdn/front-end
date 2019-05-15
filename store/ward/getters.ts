import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { WardState } from './state'
// import WardModal from '~/modals/ward_modal'
const getters: GetterTree<WardState, RootState> = {
  getWardModalList: (state) => {
    return state.wardModalList
  }
}
export default getters
