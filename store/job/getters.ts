import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { RootState } from 'store'
import { JobState } from './state'
// import Job from '~/modals/job'
const getters: GetterTree<JobState, RootState> = {
  getJob: (state) => {
    return state.job
  }
}
export default getters
