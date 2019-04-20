import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import CompanyModal from "~/modals/company_modal";
import { CompanyState } from "./state";
import types from "./types";

const mutations: MutationTree<CompanyState> = {
  [types.SET_COMPANY_MODAL](state, companyModal: CompanyModal) {
    state.companyModal = companyModal;
  },
  [types.SET_COMPANY_ID](state, companyID: string) {
    state.companyID = companyID;
  },
  [types.SET_COMPANY_MODAL_LIST](state, companyModalList: CompanyModal[]) {
    state.companyModalList = companyModalList;
  }
};

export default mutations;
