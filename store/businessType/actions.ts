import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";
import { BusinessTypeState } from "./state";
import BusinessTypeModal from "~/modals/business_type_modal";
import types from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  create(context: ActionContext<S, R>, businessTypeModal: BusinessTypeModal): void;
}

const actions: Actions<BusinessTypeState, RootState> = {
  create({ commit }, businessTypeModal: BusinessTypeModal) {
    commit(types.CREATE, businessTypeModal);
  }
};

export default actions;
