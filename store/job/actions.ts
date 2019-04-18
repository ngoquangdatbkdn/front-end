import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";
import { JobState } from "./state";
import JobModal from "~/modals/job_modal";
import types from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  create(context: ActionContext<S, R>, jobModal: JobModal): void;
}

const actions: Actions<JobState, RootState> = {
  create({ commit }, jobModal: JobModal) {
    commit(types.CREATE, jobModal);
  }
};

export default actions;
