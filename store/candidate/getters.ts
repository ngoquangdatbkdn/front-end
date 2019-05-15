import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { CandidateState } from './state'
// import CandidateModal from '~/modals/candidate_modal'
const getters: GetterTree<CandidateState, RootState> = {
  getCandidate: (state) => {
    return state.candidateModal
  }
}
export default getters
