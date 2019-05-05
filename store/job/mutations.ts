import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import JobModal from "~/modals/job_modal";
import { JobState } from "./state";
import types from "./types";

const mutations: MutationTree<JobState> = {
  [types.SET_JOB_MODAL](state, jobModal: JobModal) {
    state.jobModal = jobModal;
  },
  [types.SET_JOB_ID](state, jobID: string) {
    state.jobID = jobID;
  },
  [types.ADD_JOB](state, jobModal: JobModal) {
      state.jobModalList =  [jobModal, ...state.jobModalList];
  },
  [types.SET_JOB_MODAL_LIST](state, jobModalList: JobModal[]) {
    state.jobModalList = jobModalList;
  }
};

export default mutations;
