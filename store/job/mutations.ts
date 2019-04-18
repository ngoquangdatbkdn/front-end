import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import JobModal from '~/modals/job_modal'
import { JobState} from './state'
import types from './types'

 const mutations: MutationTree<JobState> = {
  [types.CREATE] (state, jobModal: JobModal) {
      state.jobModal = jobModal;
  },
}

export default mutations