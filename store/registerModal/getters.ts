import { GetterTree } from 'vuex'
import { RootState } from 'store'
import { RegisterModalState } from './state'

const getters: GetterTree<RegisterModalState, RootState> = {
  getShouldOpen: (state) => {
    return state.shouldOpenRegister
  }
}
export default getters
