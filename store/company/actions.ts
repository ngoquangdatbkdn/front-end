import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";
import { CompanyState } from "./state";
import CompanyModal from "~/modals/company_modal";
import types from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  create(context: ActionContext<S, R>, companyModal: CompanyModal): void;
}

const actions: Actions<CompanyState, RootState> = {
  create({ commit }, companyModal: CompanyModal) {
    commit(types.CREATE, companyModal);
  }
};

export default actions;
