import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import CandidateModal from '~/modals/candidate_modal'
import { CandidateState } from './state'
import types from './types'

const mutations: MutationTree<CandidateState> = {
  [types.SET_COMPANY_MODAL](state, candidateModal: CandidateModal) {
    state.candidateModal = candidateModal
  },
  [types.SET_COMPANY_ID](state, candidateID: string) {
    state.candidateID = candidateID
  },
  [types.SET_COMPANY_MODAL_LIST](state, candidateModalList: CandidateModal[]) {
    state.candidateModalList = candidateModalList
  }
}

export default mutations
