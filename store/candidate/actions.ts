import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";
import CandidateService from "~/services/candidate_service";
import { CandidateState } from "./state";
import CandidateModal from "~/modals/candidate_modal";
import types from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  createCandidate(context: ActionContext<S, R>, candidateModal: CandidateModal): void;
  getCandidateByID(context: ActionContext<S, R>, candidateID: string): void;
}

const actions: Actions<CandidateState, RootState> = {
  async createCandidate({ commit }, candidateModal: CandidateModal) {
    const candidateService: CandidateService = CandidateService.getInstance();
    const candidateID: string = await candidateService.createCandidate(candidateModal);
    commit(types.SET_COMPANY_ID, candidateID);
  },
  async getCandidateByID({ commit }, candidateID: string) {
    const candidateService = CandidateService.getInstance();
    const candidateModal: CandidateModal | null = await candidateService.getCandidateByID(
      candidateID
    );
    commit(types.SET_COMPANY_MODAL, candidateModal);
  },
  async getCandidateList({ commit }, queryParams: any) {
    const candidateService = CandidateService.getInstance();
    const candidateModalList:
      | CandidateModal[]
      | null = await candidateService.getCandidateList(queryParams);
    commit(types.SET_COMPANY_MODAL_LIST, candidateModalList);
  },
  async updateShouldShowCandidate({ commit, state }, shouldShow: boolean) {
      console.log('here')
    const candidateService = CandidateService.getInstance();
    const candidateID: string | undefined = state.candidateModal.id;
    await candidateService.updateShouldShowCandidate(candidateID, shouldShow);
    // commit(types.SET_COMPANY_MODAL_LIST, candidateModalList);
  }
};

export default actions;
