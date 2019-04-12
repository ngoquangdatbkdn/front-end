import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";
import { DistrictState } from "./state";
import DistrictModal from "~/modals/district_modal";
import types from "./types";

export interface Actions<S, R> extends ActionTree<S, R> {
  create(context: ActionContext<S, R>, districtModal: DistrictModal): void;
}

const actions: Actions<DistrictState, RootState> = {
  create({ commit }, districtModal: DistrictModal) {
    commit(types.CREATE, districtModal);
  }
};

export default actions;
