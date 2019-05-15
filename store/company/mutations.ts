import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { Company, Companies } from "~/modals";
import { CompanyState } from "./state";
import types from "./types";

const mutations: MutationTree<CompanyState> = {
  [types.SET_COMPANY](state, company: Company) {
    state.company = company;
  },
  [types.SET_COMPANY_ID](state, companyID: string) {
    state.companyID = companyID;
  },
  [types.SET_COMPANIES](state, companies: Companies) {
    state.companies = companies;
  }
};

export default mutations;
