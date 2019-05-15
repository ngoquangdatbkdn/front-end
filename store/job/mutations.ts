import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import {Job} from '~/modals'
import { JobState } from './state'
import types from './types'

const mutations: MutationTree<JobState> = {
  [types.SET_JOB](state, job: Job) {
    state.job = job
  },
  [types.SET_JOB_ID](state, jobID: string) {
    state.jobID = jobID
  },
  [types.ADD_JOB](state, job: Job) {
    state.jobs = [job, ...state.jobs]
  },
  [types.SET_JOBS](state, jobs: Job[]) {
    state.jobs = jobs
  }
}

export default mutations
