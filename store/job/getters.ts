import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";
import { JobState } from "./state";
// import JobModal from '~/modals/job_modal'
const getters: GetterTree<JobState, RootState> = {
  getJob: state => {
    return state.jobModal;
  }
};
export default getters;
